import { gsap } from '../../hooks/useGsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(ScrambleTextPlugin)

/** Random glyphs text decodes out of: letters of both cases plus digits */
export const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

/** Calmer set for big titles: capitals and digits only */
export const SCRAMBLE_CHARS_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export { gsap }
