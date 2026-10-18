# Portfolio Website — Project Plan

## Overview

A product designer's personal portfolio website with an AI substitute (Claude-powered chat). Built with Vite + React + TypeScript + Tailwind CSS. Uses a centralized design token system so the UI can evolve easily when the real design arrives.

## Design Principles

- **Black & white palette** — Grayscale-first, accent color via tokens
- **Inter font** — Closest public match to Google Sans, swappable via `--font-sans` token
- **Centralized tokens** — All visual decisions in `src/styles/globals.css`; changing the palette means editing one file
- **Maximum component reuse** — No raw HTML elements in pages; always use typography/ui primitives

## Site Map

```
Home
├── Hero (name, title, bio)
├── "Talk to my AI" CTA → opens Chat
├── "View projects" → navigates to Projects
└── Selected Work cards → Case study page

Case study (/work/:id) — spec: docs/case-study-design-spec.md
├── Hero + metadata grid
├── Background, Challenge, Persona?, Key work 1, Key work 2?, Results
└── Summary, next case study, footer

Projects
└── Case study grid (2-column responsive) → Case study page

Chat (overlay, accessible from any page)
├── Floating button (bottom-right, always visible)
├── Chat modal
│   ├── Message bubbles (user / assistant)
│   ├── Text input + send
│   └── Loading indicator
└── Powered by Claude API via Vercel serverless function
```

## Folder Structure

```
src/
├── components/
│   ├── layout/        Container, Section, PageLayout, Divider
│   ├── typography/    Heading, Text, Label
│   ├── navigation/    NavBar, NavLink
│   ├── cards/         CaseStudyCard, BentoGrid
│   ├── chat/          ChatButton, ChatModal, ChatMessage, ChatInput
│   ├── case-study/    Case study page sections and content blocks
│   └── ui/            Button, Tag
├── data/              caseStudies.ts, caseStudyDetails.ts, designer-info.ts
├── hooks/             useChat.ts, useRouteState.ts
├── pages/             HomePage.tsx, ProjectsPage.tsx, CaseStudyPage.tsx
├── services/          claude.ts
├── styles/            globals.css
├── types/             index.ts
├── App.tsx
└── main.tsx
api/
└── chat.ts            Vercel serverless function (Claude API proxy)
```

## Implementation Phases

### Phase 1 — Foundation (DONE)
- [x] Scaffold Vite + React + TypeScript
- [x] Install and configure Tailwind CSS
- [x] Create design token system (colors, typography, spacing, shadows, transitions)
- [x] Load Inter font from Google Fonts CDN
- [x] Create shared types

### Phase 2 — Component Library (DONE)
- [x] Layout primitives: Container, Section, PageLayout, Divider
- [x] Typography primitives: Heading, Text, Label
- [x] UI primitives: Button (3 variants, 3 sizes), Tag
- [x] Navigation: NavBar, NavLink with active state

### Phase 3 — Pages (DONE)
- [x] HomePage with hero section
- [x] ProjectsPage with responsive card grid
- [x] ~~ProjectDetail modal~~ → replaced by case study pages (Session 5)
- [x] State-based routing between pages (URL-backed since Session 5)
- [x] Case study detail pages (`/work/:id`)

### Phase 4 — Chat UI (DONE)
- [x] ChatButton (floating FAB)
- [x] ChatModal with header, message area, input
- [x] ChatMessage bubbles (user/assistant styling)
- [x] ChatInput with form submission
- [x] useChat hook with loading/error states
- [x] Typing indicator animation

### Phase 5 — Claude API Integration (PARTIAL)
- [x] Vercel serverless function (`api/chat.ts`)
- [x] Client service (`src/services/claude.ts`)
- [x] System prompt for AI substitute persona
- [ ] Add `CLAUDE_API_KEY` to environment
- [ ] Deploy to Vercel and test end-to-end

### Phase 6 — Homepage Sections & Motion Setup (DONE)
- [x] UI Work bento grid showcase section (BentoGrid component + showcase data)
- [x] Get in Touch contact section with email link
- [x] Footer with clock widget, site links, social links, copyright
- [x] Clock UI with Berlin/Urumqi timezone selector
- [x] Chat modal redesigned as centered overlay (close via X button only)
- [x] Lenis smooth scroll installed and active globally
- [x] GSAP + ScrollTrigger installed and configured (ready for use)

### Phase 7 — Content & Polish (TODO)
- [ ] Replace placeholder projects with real case studies
- [ ] Replace placeholder showcase items with real images/videos/GIFs
- [ ] Add project thumbnail images
- [ ] Update social links to real profiles
- [ ] Custom favicon
- [ ] Open Graph / Twitter Card meta tags
- [ ] GSAP scroll-triggered animations on sections
- [ ] Mobile responsive fine-tuning
- [ ] Page transition animations
- [ ] Focus trapping in modals (accessibility)

### Phase 8 — Launch (TODO)
- [ ] Deploy to Vercel
- [ ] Add `CLAUDE_API_KEY` to Vercel env vars
- [ ] Connect custom domain
- [ ] Add analytics (Vercel Analytics or Plausible)
- [ ] Rate limiting on chat API

### Future Ideas
- Dark mode toggle (token system already supports it)
- Chat message persistence (localStorage)
- Image optimization (WebP/AVIF)
- Blog/writing section
- Case study image galleries
