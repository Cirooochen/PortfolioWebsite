/**
 * Real-time water surface rendered with raw WebGL2.
 *
 * A heightfield wave simulation runs in a pair of ping-pong half-float textures
 * (red = height, green = velocity). The render pass derives surface normals
 * from that heightfield, refracts a text texture through it, and lights it
 * from a direction that follows the pointer. A rising "water level" driven by
 * scroll progress sinks the text into deeper, blurrier water until it's gone.
 */

const VERT = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`

const SIM_FRAG = `#version 300 es
precision highp float;
uniform sampler2D u_state;
uniform vec2 u_texel;
in vec2 v_uv;
out vec4 o;
void main() {
  vec4 s = texture(u_state, v_uv);
  float avg = (
    texture(u_state, v_uv - vec2(u_texel.x, 0.0)).r +
    texture(u_state, v_uv + vec2(u_texel.x, 0.0)).r +
    texture(u_state, v_uv - vec2(0.0, u_texel.y)).r +
    texture(u_state, v_uv + vec2(0.0, u_texel.y)).r
  ) * 0.25;
  s.g += (avg - s.r) * 2.0;
  s.g *= 0.988;
  s.r += s.g;
  s.r *= 0.9985;
  o = s;
}`

const DROP_FRAG = `#version 300 es
precision highp float;
uniform sampler2D u_state;
uniform vec2 u_center;
uniform float u_radius;
uniform float u_strength;
uniform float u_aspect;
in vec2 v_uv;
out vec4 o;
void main() {
  vec4 s = texture(u_state, v_uv);
  vec2 d = v_uv - u_center;
  d.x *= u_aspect;
  float drop = max(0.0, 1.0 - length(d) / u_radius);
  drop = 0.5 - cos(drop * 3.14159265) * 0.5;
  s.r += drop * u_strength;
  o = s;
}`

const RENDER_FRAG = `#version 300 es
precision highp float;
uniform sampler2D u_state;
uniform sampler2D u_text;
uniform vec2 u_simTexel;
uniform vec2 u_pointer;
uniform float u_aspect;
uniform float u_fill;
uniform float u_time;
uniform float u_maxLod;
uniform vec3 u_accent;
uniform vec3 u_ink;
in vec2 v_uv;
out vec4 o;

void main() {
  vec2 uv = v_uv;
  float h  = texture(u_state, uv).r;
  float hL = texture(u_state, uv - vec2(u_simTexel.x, 0.0)).r;
  float hR = texture(u_state, uv + vec2(u_simTexel.x, 0.0)).r;
  float hD = texture(u_state, uv - vec2(0.0, u_simTexel.y)).r;
  float hU = texture(u_state, uv + vec2(0.0, u_simTexel.y)).r;
  vec3 n = normalize(vec3((hL - hR) * 4.0, (hD - hU) * 4.0, 1.0));

  // Rising water level, with a gently moving meniscus
  float wob = sin(uv.x * 9.0 + u_time * 1.3) * 0.006 + sin(uv.x * 23.0 - u_time * 2.1) * 0.0025;
  float level = mix(-0.08, 1.08, u_fill) + wob + h * 0.03;
  float below = smoothstep(level + 0.004, level - 0.004, uv.y);
  float depth = clamp(0.1 + below * (0.6 + 0.3 * u_fill), 0.0, 1.0);

  // Refract the name through the surface; deeper water blurs and bends more
  vec2 refr = n.xy * (0.02 + depth * 0.045);
  float lod = depth * u_maxLod * 0.5;
  float tR = textureLod(u_text, uv + refr * 1.08, lod).a;
  float tG = textureLod(u_text, uv + refr, lod).a;
  float tB = textureLod(u_text, uv + refr * 0.92, lod).a;

  // Light comes from the pointer, so the surface leans toward it
  vec2 toPointer = (u_pointer - uv) * vec2(u_aspect, 1.0);
  vec3 L = normalize(vec3(toPointer * 0.8, 1.0));

  vec3 paper = mix(vec3(0.965), vec3(1.0), smoothstep(0.0, 1.0, uv.y) * 0.7);
  float glow = exp(-dot(toPointer, toPointer) * 3.0);
  paper = mix(paper, vec3(1.0), glow * 0.6);
  paper += u_accent * 0.03 * glow;

  vec3 deep = vec3(0.948);
  vec3 col = mix(paper, deep, below * (0.55 + 0.45 * u_fill));

  float vis = (1.0 - depth * 0.85) * (1.0 - smoothstep(0.82, 1.0, u_fill));
  vec3 ink = mix(u_ink, deep, depth * 0.55);
  col = vec3(
    mix(col.r, ink.r, tR * vis),
    mix(col.g, ink.g, tG * vis),
    mix(col.b, ink.b, tB * vis)
  );

  // Surface shading, caustic-like focus and specular glints
  float shade = dot(n, L) - L.z;
  col *= 1.0 + shade * 0.9;
  float lap = hL + hR + hD + hU - 4.0 * h;
  col -= u_accent.bgr * lap * 0.35;
  vec3 R = reflect(-L, n);
  col += pow(max(R.z, 0.0), 220.0) * 0.35 * smoothstep(0.0, 0.02, length(n.xy));

  // Meniscus: a bright edge with a soft shadow just under it
  float d = uv.y - level;
  col += exp(-d * d / 0.000007) * 0.07;
  col -= exp(-(d + 0.012) * (d + 0.012) / 0.00008) * 0.025;

  o = vec4(clamp(col, 0.0, 1.0), 1.0);
}`

type Drop = { x: number; y: number; radius: number; strength: number }

interface Program {
  program: WebGLProgram
  uniforms: Record<string, WebGLUniformLocation | null>
}

function hexToRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.replace('#', ''), 16)
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255]
}

/** Site-wide water look; matches --color-focus in globals.css */
export const WATER_DEFAULTS = {
  accent: '#171717',
  ink: '#2b2b2b',
  fontFamily: "'Google Sans', system-ui, -apple-system, sans-serif",
}

export interface WaterSurfaceOptions {
  /** Drawn under the surface; omit for plain water */
  text?: string
  accent: string
  /** Colour of the name under the surface */
  ink: string
  fontFamily: string
  /** Disables ambient drops and the pointer trail. Clicks still ripple. */
  reducedMotion?: boolean
}

export class WaterSurface {
  private gl: WebGL2RenderingContext
  private canvas: HTMLCanvasElement
  private opts: WaterSurfaceOptions
  private sim!: Program
  private drop!: Program
  private render!: Program
  private quad: WebGLBuffer
  private vao: WebGLVertexArrayObject
  private states: WebGLTexture[] = []
  private fbos: WebGLFramebuffer[] = []
  private current = 0
  private simW = 0
  private simH = 0
  private textTex: WebGLTexture
  private textCanvas = document.createElement('canvas')
  private maxLod = 0
  private drops: Drop[] = []
  private pointer = { x: 0.5, y: 0.6 }
  private pointerTarget = { x: 0.5, y: 0.6 }
  private fill = 0
  private raf = 0
  private running = false
  private lastTime = 0
  private accumulator = 0
  private nextAmbient = 0
  private startTime = performance.now()

  static isSupported(): boolean {
    try {
      const gl = document.createElement('canvas').getContext('webgl2')
      return !!gl && !!gl.getExtension('EXT_color_buffer_float')
    } catch {
      return false
    }
  }

  constructor(canvas: HTMLCanvasElement, opts: WaterSurfaceOptions) {
    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, premultipliedAlpha: false })
    if (!gl || !gl.getExtension('EXT_color_buffer_float')) {
      throw new Error('WebGL2 with float render targets is not supported')
    }
    this.gl = gl
    this.canvas = canvas
    this.opts = opts

    this.sim = this.createProgram(SIM_FRAG, ['u_state', 'u_texel'])
    this.drop = this.createProgram(DROP_FRAG, ['u_state', 'u_center', 'u_radius', 'u_strength', 'u_aspect'])
    this.render = this.createProgram(RENDER_FRAG, [
      'u_state', 'u_text', 'u_simTexel', 'u_pointer', 'u_aspect',
      'u_fill', 'u_time', 'u_maxLod', 'u_accent', 'u_ink',
    ])

    // One oversized triangle covers the viewport
    this.quad = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quad)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    this.vao = gl.createVertexArray()!
    gl.bindVertexArray(this.vao)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

    this.textTex = gl.createTexture()!
    this.resize()
  }

  private createProgram(fragSrc: string, uniformNames: string[]): Program {
    const gl = this.gl
    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, src)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader) ?? 'Shader compile failed')
      }
      return shader
    }
    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragSrc))
    gl.bindAttribLocation(program, 0, 'a_pos')
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) ?? 'Program link failed')
    }
    const uniforms: Program['uniforms'] = {}
    for (const name of uniformNames) uniforms[name] = gl.getUniformLocation(program, name)
    return { program, uniforms }
  }

  private createSimTargets() {
    const gl = this.gl
    this.states.forEach((t) => gl.deleteTexture(t))
    this.fbos.forEach((f) => gl.deleteFramebuffer(f))
    this.states = []
    this.fbos = []
    for (let i = 0; i < 2; i++) {
      const tex = gl.createTexture()!
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, this.simW, this.simH, 0, gl.RGBA, gl.HALF_FLOAT, null)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      const fbo = gl.createFramebuffer()!
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      this.states.push(tex)
      this.fbos.push(fbo)
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    this.current = 0
  }

  /** Draws the name into an offscreen canvas and uploads it as a mipmapped texture. */
  drawText() {
    const gl = this.gl
    const { width, height } = this.canvas
    const c = this.textCanvas
    c.width = width
    c.height = height
    const ctx = c.getContext('2d')!
    ctx.clearRect(0, 0, width, height)

    const { text } = this.opts
    const font = (size: number) => `600 ${size}px ${this.opts.fontFamily}`
    if (text) {
      ctx.font = font(100)
      if ('letterSpacing' in ctx) ctx.letterSpacing = '-4px'
      const measured = ctx.measureText(text).width
      const size = Math.min((width * 0.82 / measured) * 100, height * 0.3) * 0.7
      ctx.font = font(size)
      if ('letterSpacing' in ctx) ctx.letterSpacing = `${-size * 0.04}px`
      ctx.fillStyle = '#fff'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(text, width / 2, height * 0.46)
    }

    gl.bindTexture(gl.TEXTURE_2D, this.textTex)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
    gl.generateMipmap(gl.TEXTURE_2D)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    this.maxLod = Math.floor(Math.log2(Math.max(width, height)))
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = Math.max(1, Math.round(this.canvas.clientWidth * dpr))
    const h = Math.max(1, Math.round(this.canvas.clientHeight * dpr))
    if (w === this.canvas.width && h === this.canvas.height && this.states.length) return
    this.canvas.width = w
    this.canvas.height = h

    // Roughly one simulation cell per 4 CSS pixels, capped for performance
    const cssW = this.canvas.clientWidth || 1
    const cssH = this.canvas.clientHeight || 1
    const scale = Math.min(1 / 4, 384 / Math.max(cssW, cssH))
    const simW = Math.max(16, Math.round(cssW * scale))
    const simH = Math.max(16, Math.round(cssH * scale))
    if (simW !== this.simW || simH !== this.simH) {
      this.simW = simW
      this.simH = simH
      this.createSimTargets()
    }
    this.drawText()
  }

  /** Queues a ripple. x/y are 0–1 from the top-left, radius is a fraction of height. */
  addDrop(x: number, y: number, radius: number, strength: number) {
    if (this.drops.length > 24) return
    this.drops.push({ x, y: 1 - y, radius, strength })
  }

  setPointer(x: number, y: number) {
    this.pointerTarget = { x, y: 1 - y }
  }

  setFill(fill: number) {
    this.fill = Math.min(1, Math.max(0, fill))
  }

  start() {
    if (this.running) return
    this.running = true
    this.lastTime = performance.now()
    this.raf = requestAnimationFrame(this.frame)
  }

  stop() {
    this.running = false
    cancelAnimationFrame(this.raf)
  }

  private bindPass(fbo: WebGLFramebuffer | null, w: number, h: number, program: Program) {
    const gl = this.gl
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
    gl.viewport(0, 0, w, h)
    gl.useProgram(program.program)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.states[this.current])
    gl.uniform1i(program.uniforms.u_state, 0)
  }

  private swap(program: Program) {
    const next = 1 - this.current
    this.bindPass(this.fbos[next], this.simW, this.simH, program)
    return next
  }

  private step() {
    const gl = this.gl
    const aspect = this.simW / this.simH
    for (const d of this.drops) {
      const next = this.swap(this.drop)
      const u = this.drop.uniforms
      gl.uniform2f(u.u_center, d.x, d.y)
      gl.uniform1f(u.u_radius, d.radius)
      gl.uniform1f(u.u_strength, d.strength)
      gl.uniform1f(u.u_aspect, aspect)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      this.current = next
    }
    this.drops.length = 0

    const next = this.swap(this.sim)
    gl.uniform2f(this.sim.uniforms.u_texel, 1 / this.simW, 1 / this.simH)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    this.current = next
  }

  private frame = (now: number) => {
    if (!this.running) return
    this.raf = requestAnimationFrame(this.frame)
    const gl = this.gl
    const dt = Math.min(0.1, (now - this.lastTime) / 1000)
    this.lastTime = now

    if (!this.opts.reducedMotion && now > this.nextAmbient) {
      this.addDrop(Math.random(), Math.random(), 0.012 + Math.random() * 0.01, 0.12 + Math.random() * 0.12)
      this.nextAmbient = now + 1400 + Math.random() * 2600
    }

    // Fixed 60Hz simulation so ripples travel at the same speed on every display
    gl.bindVertexArray(this.vao)
    this.accumulator += dt
    let steps = 0
    while (this.accumulator >= 1 / 60 && steps < 4) {
      this.step()
      this.accumulator -= 1 / 60
      steps++
    }

    const ease = 1 - Math.pow(0.001, dt)
    this.pointer.x += (this.pointerTarget.x - this.pointer.x) * ease
    this.pointer.y += (this.pointerTarget.y - this.pointer.y) * ease

    this.bindPass(null, this.canvas.width, this.canvas.height, this.render)
    const u = this.render.uniforms
    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, this.textTex)
    gl.uniform1i(u.u_text, 1)
    gl.uniform2f(u.u_simTexel, 1 / this.simW, 1 / this.simH)
    gl.uniform2f(u.u_pointer, this.pointer.x, this.pointer.y)
    gl.uniform1f(u.u_aspect, this.canvas.width / this.canvas.height)
    gl.uniform1f(u.u_fill, this.fill)
    gl.uniform1f(u.u_time, (now - this.startTime) / 1000)
    gl.uniform1f(u.u_maxLod, this.maxLod)
    gl.uniform3f(u.u_accent, ...hexToRgb(this.opts.accent))
    gl.uniform3f(u.u_ink, ...hexToRgb(this.opts.ink))
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  destroy() {
    this.stop()
    const gl = this.gl
    this.states.forEach((t) => gl.deleteTexture(t))
    this.fbos.forEach((f) => gl.deleteFramebuffer(f))
    gl.deleteTexture(this.textTex)
    gl.deleteBuffer(this.quad)
    gl.deleteVertexArray(this.vao)
    for (const p of [this.sim, this.drop, this.render]) gl.deleteProgram(p.program)
  }
}
