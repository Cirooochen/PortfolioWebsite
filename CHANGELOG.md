# Changelog

## 2026-10-18 — Session 7: Project Filters, UI Work Grid, Footer, Water, Detail Page Endings

Work now happens on the `development` branch; `main` is updated only on request.

### Changes

#### Projects page
- Headline replaced with a sentence, "Designing and building thoughtful digital products"; subtitle removed
- **Quick filter** (`FilterPills`): All / UI/UX / Development pills, each with a superscript count; active pill filled. Filter applies to both views and is kept in the URL (`?category=development`) alongside `?view=list`; categories with no projects get no pill; result count announced to screen readers
- View toggle simplified to two round icon-only buttons (names kept as `aria-label` and tooltip)
- Results fade in on filter or view change (off under reduced motion)

#### Project data
- `Project.categories` (`ui-ux` | `development`, a project can have both) and `projectCategories` labels
- Lumen counts as UI/UX and Development
- **Balance** added: full-stack health tracking app (2025), showcase template; name and year are real, the rest is placeholder (description, role, stack, write-ups, images)

#### Home
- Selected work: the note + "All projects" row replaced by one centred "More projects →" pill
- About and Design philosophy labels lead with 👋 and 🤔 instead of the dot (`Eyebrow` `icon` prop)
- **UI Work grid filled** with placeholder mockups drawn in code (not AI-generated): 3 images and 3 looping videos. One large highlight tile (onboarding flow video) plus regular, tall and wide tiles; phones stack each at its own shape. Videos play only on screen and hold their poster under reduced motion; every tile has alt text

#### Footer
- Moved to `src/components/footer/` with its content in `src/data/footer.ts`
- Simplified to one compact row: clock, social links (LinkedIn, Dribbble), "© year Ciro Chen". Site and brand columns, headings and divider removed; `onNavigate` prop dropped

#### Water hero
- Curvier waterline: broad swell + cross wave + fine ripple, measured along the true width so curves keep their shape on any screen
- More natural water: tone deepens with depth, a pale band under the surface, soft drifting caustics; depth tone and caustics ease off as the hero fills so it hands over cleanly

#### Chat button
- Shown only on Home and Projects, never on project detail pages
- Starts hidden and slides up once the first fold has scrolled away (Home: the water hero; Projects: headline + filter row, marked `data-first-fold`); slides away again when scrolling back up. Unreachable while hidden; fades instead under reduced motion
- `useHeroPassed` takes an optional selector

#### Project detail pages
- **Reading progress / back to top** (`ScrollProgressButton`), adapted from Ciro's `ScrollLinkedProgressBtn` without `motion` or `lucide-react`: ring fills with reading progress and doubles as the button's border; past 60% an arrow appears and it scrolls back to the top (via Lenis) and moves focus to the page title. Frosted background matching the navbar
- **Next project section** (`NextCase`, replaces `NextProject`): dark band with a curved top edge, 80% of the viewport on desktop. Left: "Next project" label, title, description; right: cover image. With a mouse, hovering dims the title, grows the image and swaps the cursor for a trailing "View project" pill. Bottom row: "All projects" pill with count. Touch and keyboard work without hover; reduced motion turns scaling and the pill off

### New Files

| File | Purpose |
| --- | --- |
| `src/components/ui/FilterPills.tsx` | Filter pills with counts |
| `src/components/ui/ScrollProgressButton.tsx` | Reading progress ring / back to top |
| `src/components/case-study/NextCase.tsx` | Next project section on detail pages |
| `src/components/footer/Footer.tsx` | Footer (moved from `layout/`) |
| `src/components/footer/FooterLinkList.tsx` | Inline footer links |
| `src/data/footer.ts` | Footer content |
| `public/images/ui-work/*.webp`, `public/videos/ui-work/*.webm` | UI Work placeholder mockups and loops (~1.6 MB) |

### Modified Files

| File | Change |
| --- | --- |
| `src/types/index.ts` | `ProjectCategory`, `Project.categories`; `ShowcaseItem` gets `alt`, `poster`, drops `gif` |
| `src/data/projects.ts`, `showcaseDetails.ts`, `showcase.ts` | Categories, Balance, UI Work items |
| `src/data/about.ts` | Hometown and city filled in (Ciro's edit) |
| `src/pages/ProjectsPage.tsx` | Headline, filters, icon toggle, first-fold marker |
| `src/pages/HomePage.tsx` | More projects button, emoji labels |
| `src/pages/CaseStudyPage.tsx`, `ShowcasePage.tsx` | `NextCase`, `ScrollProgressButton`, new footer |
| `src/App.tsx` | Chat button rules |
| `src/components/chat/ChatButton.tsx` | `visible` prop, slide in/out |
| `src/components/cards/BentoGrid.tsx` | Mixed-size grid, real media, video behaviour |
| `src/components/ui/ViewToggle.tsx` | Icon-only round buttons |
| `src/components/typography/Eyebrow.tsx` | Optional leading icon |
| `src/components/water/waterSurface.ts` | Waterline shape and water shading |
| `src/hooks/useHeroPassed.ts` | Optional selector |

### Removed
- `src/components/case-study/NextProject.tsx` (replaced by `NextCase`)
- `src/components/layout/Footer.tsx` (moved to `footer/`)

### What's NOT Done

- [ ] **Balance details** — description, role, stack, write-ups and images are placeholders
- [ ] **UI Work grid** — placeholder mockups; replace with real work
- [ ] **Footer social links** point to site homepages, not Ciro's profiles
- [ ] **About intro** — hometown/city still wrapped in `[ ]` brackets, and "Urimqi" vs "Urumqi" in the clock
- [ ] **Back-to-top button over the dark Next project section** looks greyish; may need a dark variant
- [ ] **Hero end** — the filled water still meets the white section below in a visible line
- [ ] Not tested in Safari or on real devices (WebM videos, WebGL water)

---

## 2026-10-18 — Session 6: Portfolio Master Prompt — Projects Collection, List View, Showcase Template

Following `Portfolio_Claude_Master_Prompt.md` (functional minimalism, “utilitarian, but beautifully designed”).

### Changes

#### Shared project data
- One collection, `src/data/projects.ts` (replaces `caseStudies.ts`), feeds Home, both Projects views and both detail templates
- Each `Project` has `template` (`case-study` | `showcase`), `featured`, `discipline`, `role` and 3–5 `previewImages`
- `featuredProjects` = the three Home projects; dev build warns if there aren't exactly 3 or one isn't a case study
- Route renamed `case-study` → `project` (`/work/:id` unchanged); `App` picks the template per project

#### Home
- Shows exactly the 3 featured case studies (Oaks, EV Smart Money, Lumen) plus an "All projects →" link explaining the rest lives on Projects
- Cards are now real `<a href>` links (open in new tab works)

#### Projects page — all 6 projects, two views
- Cards / List segmented toggle (`aria-pressed` buttons, focus stays on the toggle); view saved in the URL (`?view=list`) so reload and Back keep it
- **Interactive list** (`ProjectList`): each row shows its number, title, year and an arrow; the one-line description opens under the title on hover, keyboard focus or Preview (discipline, role and type removed by request); other rows dim on hover
- **Hover preview follows the cursor** (changed by request from the fixed side panel): a 4:3 image carousel trails the pointer with light easing, appears on hover and fades out on leave; no caption. It flips to the pointer's left near the right edge so it never leaves the screen or covers the year/arrow, and never takes clicks
- Carousel: 3–5 placeholder images per project (`Project.previewImages`), cutting to the next every 0.5s in a loop; restarts from the first image per project. Replaces the hover video; the Tempo clip stays on its showcase page
- Touch / narrow screens: explicit Preview button per row opens the same carousel inline (`aria-expanded`); tapping the row always opens the project. Escape closes an open preview and returns focus to its button
- Keyboard: focusing a row's link shows the carousel beside that row and reveals its description; Escape hides it
- Reduced motion: preview stays still beside the row and shows only the first image; no transitions

#### Visual Showcase template — `ShowcasePage`
- Compact hero (kicker "Visual showcase", back to All projects) → metadata → short intro → media blocks; reuses case study hero, metadata grid, block list and media figure
- Three placeholder showcase projects: Tempo (mobile booking interaction, with a prototype video), Pulse (analytics dashboard), Kitbase (design system)
- "Next project" link (`NextProject`) now shared by both templates and cycles through all projects

#### Mobile navigation
- Below `md` (768px) the nav links become a menu button: two lines that rotate into a cross (`aria-expanded`, label switches Open/Close menu)
- Full-screen menu (`MobileMenu`) slides in from the right; page behind is `inert` and stops scrolling (Lenis paused via new `getLenis()`)
- Large numbered links (Home, Projects; current page underlined) rise in one after another; email link (`mailto:`) pinned at the bottom under "Get in touch"
- Background: the site's WebGL water at 70% opacity, faded out toward the top so links stay crisp; ambient drops, a trail under the finger, ripples on tap. Mounted only while the menu is visible
- Focus moves to the first link on open and back to the menu button on close; Escape closes; resizing past `md` closes it
- Reduced motion: menu fades instead of sliding, no staggered rise, no ambient ripples

#### Typography
- Essential small text raised to 14px: `Label`, `Eyebrow`, card year, case study `cs-label` (13 → 14px), footer clock controls (12 → 14px)
- 12px kept only for secondary annotations: card tags and the hero status pill

### New Files

| File | Purpose |
| --- | --- |
| `src/components/projects/ProjectList.tsx` | Interactive list view with cursor-following image carousel |
| `src/components/ui/ViewToggle.tsx` | Segmented view toggle |
| `src/components/navigation/MobileMenu.tsx` | Full-screen mobile menu with water background |
| `src/components/case-study/NextProject.tsx` | Next project link for both templates |
| `src/pages/ShowcasePage.tsx` | Visual Showcase template |
| `src/data/showcaseDetails.ts` | Showcase content (placeholders) |
| `src/data/media.ts` | Shared `unsplash()` placeholder helper |
| `public/videos/tempo-preview.webm` | Placeholder prototype clip (6s, 300 KB, generated) |

### Modified Files

| File | Change |
| --- | --- |
| `src/types/index.ts` | `Project`, `ProjectTemplate`, `ShowcaseDetail`; `project` page |
| `src/data/projects.ts` | Renamed from `caseStudies.ts`; all 6 projects, `featuredProjects` |
| `src/components/cards/ProjectCard.tsx` | Renamed from `CaseStudyCard.tsx`; real link, emphasis override, 14px year |
| `src/hooks/useRouteState.ts` | `project` route, `projectHref()`, `inAppClick()` |
| `src/hooks/useLenis.ts` | `getLenis()` for pausing scroll |
| `src/components/navigation/NavBar.tsx` | Menu button and `MobileMenu` below `md` |
| `src/pages/HomePage.tsx`, `ProjectsPage.tsx`, `CaseStudyPage.tsx`, `src/App.tsx` | Featured projects, view toggle, template switch, shared next link |
| `src/components/case-study/CaseStudyHero.tsx` | `kind`, `backLabel`, `compact` props |
| `Label`, `Eyebrow`, `ClockUI`, `globals.css` | Text size fixes |

### What's NOT Done

- [ ] **Lumen content** — shown as a real project but copy, metrics and images are placeholders
- [ ] **Showcase projects** — Tempo, Pulse and Kitbase are placeholders; replace with real work
- [ ] **EV Smart Money results** — drafted, kept for now
- [ ] **UI Work section on Home** — six empty media slots; consider replacing with the showcase projects
- [ ] **Home Selected Work intro** still says "the one I'm building right now", but no project is marked current

---

## 2026-10-17 — Session 5: Case Study Detail Pages

### Changes

#### Case study pages — `/work/:id`
- Each Selected Work card on Home now opens a dedicated case study page (Gridwise, Ledger, Lumen) instead of linking to the Projects page
- Built to `docs/case-study-design-spec.md`: Nordic editorial style, warm off-white page, deep slate accent (`#2F4F4F`) used only for labels, numbers, and the active index item
- Page structure: hero → metadata grid → Background → Challenge → Persona (optional) → Key work 1 → Key work 2 (optional) → Results → Summary; optional sections disappear from the page and the index
- Content spans the full page width; body text stays at reading width (≈70 characters). The spec's sticky section index was built, then removed by request
- Three block types usable in any section or sub-section: text + media (side or stacked), text only, media only (1–3 items)
- Gentle 300ms fade-in for blocks below the fold, off with `prefers-reduced-motion`
- "Next case study" link and site footer at the end of each page; page title updates per study

#### Oaks — first real case study
- Replaces the Gridwise placeholder as the featured case study (`/work/oaks`); content rewritten from the original Webflow case study in plain, simple language
- Story: background → challenge → personas (Alexa, Ryan) → new onboarding (data, failed quick fix, research, brainstorm, final design) → product pivot (in-store visits, prepaid-card concept) → results (14 merchants, 676 sign-ups, 2.4% sign-up rate, 32 accounts) → lessons
- Persona portraits are real (`public/images/case-studies/oaks/`, 1000px JPEGs), shown in a new 4:5 `portrait` text + media layout that alternates sides; Challenge has a real illustration in a square frame (`aspect: 'square'`); other images are Unsplash placeholders until the real screens are exported

#### EV Smart Money — second real case study
- Replaces the Ledger placeholder (`/work/ev-smart-money`); rewritten from the original Webflow case study in plain language
- Story: background → challenge → persona → research (competitors, journey map, first-flow testing) → onboarding design (4 principles, process, final screens) → launch → lessons
- Results and Summary were not in the source and are drafted — need real outcome numbers
- Persona portrait is real (`public/images/case-studies/ev-smart-money/`), in the 4:5 portrait layout; other images are Unsplash placeholders

#### Case study hero + metadata
- Hero fills the first screen with metadata pinned at the fold; title words rise in from a mask, an accent rule draws beneath, then the summary (new `cs-lead` size) and metadata fade in
- Title block drifts up and fades slightly on scroll; "In progress" status for current projects; all motion off with `prefers-reduced-motion`
- Metadata: lighter 16px values, hairline over each column, label/value rows on mobile; values can be lists (`CaseStudyMeta`), shown one entry per line

#### Projects page
- Lists the same three case studies as equal-sized cards; each opens its case study page
- Removed the old project popup and its data: `ProjectDetail`, `ProjectCard`, `src/data/projects.ts`, and the `Project` type

#### Routing
- `useRouteState` now syncs with the URL (`/`, `/projects`, `/work/:id`) via the History API — links are shareable and back/forward work
- `vercel.json` rewrites non-API paths to `index.html` so deep links load on Vercel

#### Design tokens
- `cs-*` tokens in `globals.css`: colours, fluid type scale (display / section / subtitle / body / caption / label / stat), section rhythm, reading width (`32em`), media radius

### New Files

| File | Purpose |
| --- | --- |
| `docs/case-study-design-spec.md` | Design spec for case study pages |
| `src/pages/CaseStudyPage.tsx` | Case study page layout |
| `src/components/case-study/*` | `CaseStudyHero`, `MetadataGrid`, `SectionHeader`, `CaseStudySection`, `ResultStat`, `TextMedia`, `TextOnly`, `MediaOnly`, `BlockList`, `MediaFigure`, `Prose` |
| `src/data/caseStudyDetails.ts` | Structured case study content (placeholder SaaS cases) |
| `src/hooks/useRevealOnScroll.ts` | Scroll fade-in for `[data-reveal]` elements |
| `vercel.json` | SPA rewrite for deep links |

### Modified Files

| File | Change |
| --- | --- |
| `src/types/index.ts` | `case-study` page, `NavigateFn`, case study content types |
| `src/hooks/useRouteState.ts` | URL-backed routing |
| `src/App.tsx`, `src/pages/HomePage.tsx`, `src/pages/ProjectsPage.tsx` | Render the case study page; cards open it |
| `src/components/layout/PageLayout.tsx` | Off-white background on case study pages |
| `src/styles/globals.css` | `cs-*` tokens, reveal styles |

### What's NOT Done

- [ ] **Real case study content** — Oaks and EV Smart Money are real; Lumen is still a placeholder
- [ ] **EV Smart Money results** — add real outcome metrics; confirm the drafted summary
- [ ] **Oaks images** — replace Unsplash placeholders with the real screens, flows, and team photo

---

## 2026-10-16 — Session 4: Water Hero, Intro, Case Studies, Drink Contact

### Changes

#### Hero — Real-time WebGL water
- New full-screen water surface (raw WebGL2, no new dependencies): ripple simulation in half-float ping-pong textures, "Ciro Chen" refracting under the surface
- Light follows the cursor, pointer movement leaves a faint trail, clicks drop micro ripples, occasional ambient drops
- Scroll fills the water: hero pins until the waterline reaches 50% of the viewport, then scrolls away as the name sinks out of view
- Work note ("Currently working at SIV.AG…") surfaces on the filled water
- Hero copy: "Based in Berlin" tag with a spinning outline globe, "Senior Product Designer", single "Talk to my AI" link button
- Fallbacks: static name when WebGL2 is unavailable; no ambient motion with `prefers-reduced-motion`

#### NavBar
- Transparent over the hero, showing "Currently: developing an app"; switches to 45% white + blur with the "Ciro Chen" logo once the hero's bottom reaches 7% of the viewport
- Nav links are text-only: 2px underline for the current page, bold on hover (no layout shift)

#### New sections
- **Introduction** — two columns: About (dominant) + Design philosophy (AI-assisted design); "surfacing" text that rises out of a blur on scroll, wave underline on key phrases
- **Selected Work** — three case study cards in three sizes (feature / standard / compact) with glass tags, greyscale-to-colour hover, cursor-following light; placeholder projects with Unsplash images
- **Get in Touch** — "What's your favourite drink?": four options; picking one swaps in a drink-specific reply, icon, and email link that opens Gmail compose
- Contact + footer sit on a second water surface (call-back to the hero); footer is frosted glass

#### Design system
- Monochrome palette; `--color-focus` token (currently `#171717`)
- Buttons: transparent at rest, frosted glass on hover; new `link` variant
- Shared glass styles (`ui/glass.ts`), `Tag` glass/live variants, `Eyebrow` label, `GlobeIcon`
- Frosted floating chat button

### New Files

| File | Purpose |
| --- | --- |
| `src/components/water/waterSurface.ts` | WebGL2 water engine |
| `src/components/water/WaterPool.tsx` | Plain water background for any section |
| `src/hooks/useWaterSurface.ts` | Mounts the engine + shared pointer interactions |
| `src/components/hero/WaterHero.tsx` | Hero section |
| `src/hooks/useHeroPassed.ts` | NavBar state from hero position |
| `src/components/text/SurfacingText.tsx` | Scroll-scrubbed word reveal |
| `src/components/cards/CaseStudyCard.tsx` | Case study card |
| `src/components/contact/DrinkContact.tsx` | Drink-picker contact |
| `src/components/icons/GlobeIcon.tsx` | Animated globe icon |
| `src/components/typography/Eyebrow.tsx` | Section label |
| `src/components/ui/glass.ts` | Shared glass styles |
| `src/data/about.ts`, `caseStudies.ts`, `contact.ts` | Section content |

### Notes

- `npm install` needs `--legacy-peer-deps`: `@tailwindcss/vite` 4.2.1 doesn't list Vite 8 as a supported peer yet

### What's NOT Done

- [ ] **About placeholders** — replace `[hometown]` and `[current city]` in `src/data/about.ts`
- [ ] **Real case studies** — replace placeholder projects in `src/data/caseStudies.ts`; ~~cards currently link to the Projects page~~ (Session 5: cards open case study pages)
- [ ] Everything still open from Session 3 below (Vercel deploy, real content, social links, favicon, meta tags)

---

## 2026-03-18 — Session 3: Font Swap, OpenAI Integration, GitHub + Vercel Setup

### Changes

#### Font — Inter → Google Sans
- Swapped Google Fonts import in `index.html` from Inter to Google Sans (full weight + italic range)
- Updated `--font-sans` token in `globals.css` to `'Google Sans'`

#### API — Claude → OpenAI
- Rewrote `api/chat.ts` to call OpenAI `gpt-4o-mini` instead of Claude
- Updated auth header to `Authorization: Bearer` (OpenAI format)
- System prompt injected as first message in array (OpenAI chat format)
- Response parsing updated: `data.choices[0].message.content`
- Env var renamed: `CLAUDE_API_KEY` → `OPENAI_API_KEY`
- Updated `.env.example` to reflect new variable name

#### GitHub — Repo Created & Pushed
- Initialized git repo, made initial commit
- Created public GitHub repo: `Cirooochen/PortfolioWebsite` via `gh` CLI
- Added `.playwright-mcp/` to `.gitignore`, removed screenshots from tracking
- Installed and authenticated `gh` CLI

### Modified Files

| File | Change |
| --- | --- |
| `index.html` | Google Sans font import |
| `src/styles/globals.css` | `--font-sans` updated to Google Sans |
| `api/chat.ts` | Switched from Claude API to OpenAI API |
| `.env.example` | Renamed `CLAUDE_API_KEY` → `OPENAI_API_KEY` |
| `.gitignore` | Added `.playwright-mcp/` exclusion |

### What's NOT Done (carried over)

#### Must-do before launch

- [x] ~~Connect Claude API~~ → Switched to OpenAI, API key added to `.env.local`
- [ ] **Deploy to Vercel** — Vercel account auth issue (403), retry tomorrow
- [ ] **Real project content** — Replace placeholder projects in `src/data/projects.ts`
- [ ] **Real showcase content** — Replace placeholder items in `src/data/showcase.ts`
- [ ] **Project thumbnails** — Add real images
- [ ] **Social links** — Update footer links to real profiles
- [ ] **Favicon** — Replace default Vite favicon
- [ ] **Meta tags** — Open Graph / Twitter Card for social sharing

#### Nice-to-have / Polish

- [x] ~~GSAP scroll-triggered animations~~ → intro text reveal (Session 4)
- [ ] Page transition animations
- [ ] Mobile hamburger menu
- [ ] Focus trapping in modals (accessibility)
- [ ] Dark mode toggle
- [ ] Analytics (Vercel Analytics or Plausible)
- [ ] Chat message persistence (localStorage)
- [ ] Rate limiting on chat API endpoint
- [ ] Image optimization (WebP/AVIF)

---

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
| --- | --- |
| `src/components/cards/BentoGrid.tsx` | Bento grid layout for UI work showcase |
| `src/components/layout/Footer.tsx` | Site footer with clock, links, social, copyright |
| `src/components/ui/ClockUI.tsx` | Analog clock with timezone selector |
| `src/data/showcase.ts` | Showcase items data (placeholder) |
| `src/hooks/useLenis.ts` | Lenis smooth scroll initialization |
| `src/hooks/useGsap.ts` | GSAP + ScrollTrigger setup and exports |

### Modified Files

| File | Change |
| --- | --- |
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
| --- | --- | --- |
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

- [x] ~~GSAP scroll-triggered animations~~ → intro text reveal (Session 4) (libraries installed, not yet wired to components)
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
