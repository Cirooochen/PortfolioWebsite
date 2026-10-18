# Case Study Detail Page — Design Spec

> Brief for Claude Code: upgrade the case study detail pages in this project to follow the design system below.

## How to approach this task

1. **Read the project first.** Identify the framework, styling approach (CSS, Tailwind, CSS Modules, etc.), the existing fonts, and how case study pages and their content are currently built.
2. **Reuse what exists.** Use the fonts already defined in the project and do not add new typefaces. Follow the project's existing code conventions and file structure.
3. **Define design tokens first** (colors, type scale, spacing) as CSS variables or theme config, then build components on top of them.
4. **Keep scope tight.** Only change case study detail pages and the shared components/tokens they need. Don't break other pages.
5. **Migrate existing content** into the new structured format so current case studies keep working.
6. Before writing code, summarize your plan (files to add/change, component list, content schema) so I can review it.

---

## Design direction

A modern, Nordic-inspired style: calm, clean, and built for comfortable reading. Typography and whitespace carry the design, not decoration.

**Feel:** Scandinavian design studio, editorial magazine layout. Modern, honest, quietly confident.

**Guiding question:** *"Does this make the project story easier to read and understand?"*

---

## Typography

- Use the fonts **already defined in the project**. Don't introduce new typefaces.
- Use a clear, limited type scale with obvious steps between levels:

| Level | Size (desktop) | Use |
|---|---|---|
| Display | 56–72px | Hero title |
| Section title | 32–40px | Section headings |
| Sub-title | 20–24px | Sub-section / block titles |
| Body | 17–19px | Paragraphs |
| Caption & labels | 13–14px | Captions, metadata labels, section index |

- Body text is optimized for reading: line-height **1.6–1.7**, max line length **60–75 characters**, soft near-black **#1a1a1a**.
- Hierarchy comes from **size, weight, and spacing, not color**. Each level should be instantly recognizable.
- Metadata labels are **small uppercase** text with slight letter-spacing.
- Scale the type down proportionally on mobile.

## Color

| Token | Value | Use |
|---|---|---|
| Background | `#FAFAF7` | Warm off-white page background |
| Text primary | `#1a1a1a` | Body and headings |
| Text secondary | muted gray | Captions, labels, inactive index items |
| Divider | light gray | 1px rules |
| Accent | `#2F4F4F` | Deep slate green |

The accent is used **sparingly**: section labels, numbers, links, key highlights, the active item in the section index, and thin accent rules. **Never use it for large fills.**

## Layout

- **12-column grid** with generous whitespace and a steady vertical rhythm (≈120–160px between major sections on desktop, scaled down on mobile).
- **Desktop:** a sticky section index occupies the **left 3 columns**. Main content lives in the **right 9 columns**, with section titles placed above their content.
- Text sits in a comfortable reading width inside the content area. Images and videos can extend to the full content width. The hero and select full-bleed media may span the entire page.
- No heavy shadows, gradients, or decorative graphics. Separate content with whitespace or **1px dividers**.
- Motion: subtle only (gentle fade-in on scroll, **≤300ms**). Respect `prefers-reduced-motion`.

## Sticky section index (desktop only)

- A quiet vertical list of section names (small text, muted gray), sticky on the left as the user scrolls.
- The current section is highlighted in the accent color (`#2F4F4F`) with a thin indicator line or dot, updated on scroll (e.g. IntersectionObserver).
- Clicking an item smooth-scrolls to that section.
- It appears after the hero and stays visually secondary: no background, no borders, no box.
- **Hidden on tablet/mobile** so the reading column gets full width.

---

## Page structure

Each section has a **Title + Description**, plus media where noted.

| # | Section | Required | Media |
|---|---|---|---|
| 1 | **Hero:** project title + one-liner summary | Yes | Text only, large display type |
| 2 | **Project metadata:** Role, Timeline, Team, Platform, Tools, etc., as a label/value grid | Yes | Text only |
| 3 | **Background:** context of the project | Yes | Any block type |
| 4 | **Challenge / Problem:** what needed solving and why it mattered | Yes | Any block type |
| 5 | **Persona:** who we designed for | Optional | Any block type |
| 6 | **Key work 1:** what I did to address the challenge | Yes | Any block type |
| 7 | **Key work 2:** same structure as Key work 1 | Optional | Any block type |
| 8 | **Results / Key achievements:** outcomes, metrics, impact | Yes | Any block type |
| 9 | **Summary / Takeaways:** reflection and learnings | Yes | Text only, calm editorial layout |

- **Key work sections (6, 7)** are the deepest part of the page. Break each into sub-sections such as **Research → Design exploration → Final design → Handover / delivery**, each with its own sub-title and description. The sub-sections should be flexible, so a project can use any number and name them freely.
- **Results (8):** large numbers in the accent color work well for metrics.
- **Optional sections (5, 7)** are omitted from both the page and the section index when not used.

## Content block formats

Sections 3–8 (and their sub-sections) are composed of any sequence of these three block types:

- **A. Text + media:** title and description alongside or above an image/video (side-by-side on desktop, stacked on mobile).
- **B. Text only:** title and description in the reading column.
- **C. Media only:** a wide or full-width image/video, or a 2–3 image grid, with an optional small caption.

Media rules:
- Consistent aspect ratios
- Small corner radius (0–4px)
- Captions use the caption type style
- Lazy-load images, with meaningful `alt` text

Sections 1, 2, and 9 are **typography-only, with no images**.

---

## Components

Build the page from reusable components:

- `TextMedia`: block type A
- `TextOnly`: block type B
- `MediaOnly`: block type C (single media or 2–3 item grid)
- `SectionHeader`: section label/number + title
- `MetadataGrid`: label/value grid for section 2
- `ResultStat`: large accent-colored number + label
- `SectionIndex`: sticky left navigation

Name them to match the project's existing conventions if those differ.

## Content model

Drive each case study from **structured content** (e.g. a data file, MDX frontmatter, or a CMS entry, whichever fits the project) so a new project only needs its content filled in, with no layout code changes. A rough shape:

```yaml
title: string
oneLiner: string
metadata:
  - { label: "Role", value: "Lead Product Designer" }
  - { label: "Timeline", value: "2024 · 6 months" }
sections:
  - id: background
    title: "Background"
    description: string
    blocks:
      - { type: textMedia, title, description, media: { src, alt, kind: image|video }, layout: side|stacked }
      - { type: textOnly, title, description }
      - { type: mediaOnly, media: [ { src, alt, caption } ] }
  - id: key-work-1
    title: "Designing the onboarding flow"
    subsections:
      - title: "Research"
        description: string
        blocks: [ ... ]
results:
  - { value: "+32%", label: "Activation rate" }
summary: string
```

Adapt the schema to the project's stack. Section index items are generated from whichever sections are present.

---

## Quality checklist

- [ ] Uses existing project fonts only
- [ ] Type scale and colors defined as reusable tokens
- [ ] Clear visual hierarchy without relying on color
- [ ] Body line length ≤ 75 characters
- [ ] Accent `#2F4F4F` used sparingly, never as large fills
- [ ] Sticky index works on desktop, hidden on mobile
- [ ] Optional sections hide cleanly
- [ ] All three block types work in every section 3–8
- [ ] Responsive: side-by-side blocks stack on mobile
- [ ] Accessible: semantic headings (h1 → h2 → h3), WCAG AA contrast, keyboard-navigable index, alt text
- [ ] Existing case studies migrated and rendering correctly
