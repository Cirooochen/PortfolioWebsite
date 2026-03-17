# Changelog

## 2026-03-17 — Session 2: Homepage Sections, Chat UX, Motion Setup

### Changes

#### Chat Modal — Centered + Close-only

- Chat modal now opens as a **centered overlay** with dark backdrop (was a small bottom-right panel)
- Chat can **only be dismissed via the X button** — clicking the overlay or pressing Escape no longer closes it, preventing accidental loss of ongoing conversations

#### HomePage — New Sections

- **UI Work (Bento Grid)** — Added a showcase section below the hero with a 3-column bento grid layout
  - Supports images, videos, and GIFs via `src/data/showcase.ts`
  - Grid items have configurable spans: `normal`, `wide`, `tall`, `large`
  - Placeholder state shows media type icons; hover reveals title overlay
  - New component: `BentoGrid` (`components/cards/BentoGrid.tsx`)
  - New type: `ShowcaseItem` in `types/index.ts`
- **Get in Touch** — Contact section with heading, subtitle, and email link (`cirochen0406@gmail.com`)
- **Footer** — 4-column footer with:
  - **Local Time** — Analog clock widget with Berlin and Urumqi timezone selector (`components/ui/ClockUI.tsx`, adapted from external `clock-ui.tsx`)
  - **Site** — Home/Projects navigation links
  - **Connect** — LinkedIn, X/Twitter, Dribbble, Email social links
  - **Ciro Chen** — Brand tagline
  - Copyright line at bottom
- Sections separated by `Divider` components

#### Motion Libraries Installed

- **Lenis** (`lenis`) — Smooth scroll active globally via `useLenis()` hook in `App.tsx`, CSS imported in `globals.css`
- **GSAP** (`gsap`) — ScrollTrigger registered and exported from `src/hooks/useGsap.ts`, ready for scroll-triggered animations

### New Files

| File | Purpose |
|---|---|
| `src/components/cards/BentoGrid.tsx` | Bento grid layout for UI work showcase |
| `src/components/layout/Footer.tsx` | Site footer with clock, links, social, copyright |
| `src/components/ui/ClockUI.tsx` | Analog clock with timezone selector |
| `src/data/showcase.ts` | Showcase items data (placeholder) |
| `src/hooks/useLenis.ts` | Lenis smooth scroll initialization |
| `src/hooks/useGsap.ts` | GSAP + ScrollTrigger setup and exports |

### Modified Files

| File | Change |
|---|---|
| `src/components/chat/ChatModal.tsx` | Centered modal, close-only via X button |
| `src/pages/HomePage.tsx` | Added Bento Grid, Contact, and Footer sections |
| `src/types/index.ts` | Added `ShowcaseItem` interface |
| `src/styles/globals.css` | Added Lenis CSS import |
| `src/App.tsx` | Added `useLenis()` hook |

---

## 2026-03-17 — Session 1: Initial Implementation

### Stack

- **Framework:** Vite 8 + React + TypeScript
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/vite`) with CSS custom properties
- **Font:** Inter (Google Fonts CDN) — drop-in replacement for Google Sans
- **Routing:** State-based (`useState<'home' | 'projects'>`) — no React Router
- **API:** Vercel serverless function (`api/chat.ts`) proxying to Claude API

### What's Done

#### Design Token System (`src/styles/globals.css`)

- Full gray scale (50–950) + semantic color aliases (bg, text, border, accent)
- Typography scale (xs–6xl), font stacks, weights
- Spacing scale (4px base), border radius, shadows, transitions
- Keyframe animations: `fade-in`, `slide-up`, `pulse-dot`
- All tokens defined via Tailwind `@theme` — usable as utility classes (e.g. `bg-bg-primary`, `text-text-secondary`)

#### Components (19 total)

| Component | Path | Notes |
|---|---|---|
| `Container` | `components/layout/` | Max-width + centering wrapper |
| `Section` | `components/layout/` | Consistent vertical padding |
| `PageLayout` | `components/layout/` | NavBar + main content wrapper |
| `Divider` | `components/layout/` | Horizontal rule with token color |
| `Footer` | `components/layout/` | 4-column footer with clock, links, social |
| `NavBar` | `components/navigation/` | Sticky header, blur backdrop |
| `NavLink` | `components/navigation/` | Active/inactive states |
| `Heading` | `components/typography/` | Levels 1–4 with responsive sizing |
| `Text` | `components/typography/` | sm/base/lg sizes, muted variant |
| `Label` | `components/typography/` | Uppercase metadata text |
| `Button` | `components/ui/` | primary/secondary/ghost + sm/md/lg |
| `Tag` | `components/ui/` | Pill-shaped category badge |
| `ClockUI` | `components/ui/` | Analog clock with timezone selector |
| `BentoGrid` | `components/cards/` | Bento grid for visual work showcase |
| `ProjectCard` | `components/cards/` | Thumbnail + metadata + tags, hover effects |
| `ProjectDetail` | `components/project/` | Modal with Overview/Challenge/Approach/Outcome/Metrics |
| `ChatButton` | `components/chat/` | Fixed FAB, bottom-right |
| `ChatModal` | `components/chat/` | Centered modal, close via X only |
| `ChatMessage` | `components/chat/` | User (right, dark) / assistant (left, light) bubbles |
| `ChatInput` | `components/chat/` | Text input + send button |

#### Pages

- **HomePage** — Hero, UI Work bento grid, Get in Touch contact section, Footer
- **ProjectsPage** — 2-column grid of project cards, detail modal on click

#### Data

- `src/data/projects.ts` — 4 placeholder projects with full case study content
- `src/data/showcase.ts` — 6 placeholder showcase items for bento grid
- `src/data/designer-info.ts` — System prompt for the Claude-powered AI substitute

#### Services & Hooks

- `src/services/claude.ts` — Client wrapper calling `/api/chat`
- `src/hooks/useChat.ts` — Message state, loading state, error handling
- `src/hooks/useRouteState.ts` — Simple page navigation with scroll-to-top
- `src/hooks/useLenis.ts` — Lenis smooth scroll initialization
- `src/hooks/useGsap.ts` — GSAP + ScrollTrigger setup

#### API

- `api/chat.ts` — Vercel serverless function proxying to Claude Messages API

### What's NOT Done

#### Must-do before launch

- [ ] **Connect Claude API** — Add `CLAUDE_API_KEY` to `.env`, deploy to Vercel
- [ ] **Real project content** — Replace placeholder projects in `src/data/projects.ts`
- [ ] **Real showcase content** — Replace placeholder items in `src/data/showcase.ts` with actual images/videos/GIFs
- [ ] **Project thumbnails** — Add real images (currently first-letter placeholders)
- [ ] **Social links** — Update footer links to real LinkedIn/Twitter/Dribbble profiles
- [ ] **Favicon** — Replace default Vite favicon
- [ ] **Meta tags** — Open Graph / Twitter Card for social sharing
- [ ] **Deploy to Vercel** — Connect repo, set env vars, deploy

#### Nice-to-have / Polish

- [ ] GSAP scroll-triggered animations (libraries installed, not yet wired to components)
- [ ] Page transition animations between Home and Projects
- [ ] Mobile hamburger menu
- [ ] Focus trapping in modals (accessibility)
- [ ] Dark mode toggle
- [ ] Analytics (Vercel Analytics or Plausible)
- [ ] Chat message persistence (localStorage)
- [ ] Rate limiting on chat API endpoint
- [ ] Image optimization (WebP/AVIF)

### Architecture Decisions

- **No React Router** — Only 2 pages, state-based routing keeps the bundle small
- **CSS custom properties over Tailwind config** — Tokens live in one CSS file; swapping the palette means editing only `globals.css`
- **Inter instead of Google Sans** — Google Sans isn't publicly available; Inter is the closest match and is swap-ready via the `--font-sans` token
- **Vercel serverless for API** — Keeps `CLAUDE_API_KEY` server-side; zero infrastructure to manage
- **No component library** — All primitives are hand-rolled for full control and minimal bundle size
- **Lenis + GSAP** — Smooth scroll and scroll-triggered animations for motion design
