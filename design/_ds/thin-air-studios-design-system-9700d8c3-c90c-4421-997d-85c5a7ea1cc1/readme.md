# Thin Air Studios — Design System

> *"We built it out of thin air."*

The brand system for **Thin Air Studios**, an all-around software studio: marketing
sites, large applications with serious UI/UX, and embedded systems. The identity has
to flex from a one-page site to a product dashboard to firmware docs and still feel
like one studio.

This project is the **source of truth**. An automated compiler reads it, bundles the
React components into `_ds_bundle.js` (window namespace **`ThinAirStudiosDesignSystem_9700d8`**),
and indexes the tokens. Consumers link one file — `styles.css` — and import components
from the bundle.

---

## The one idea — *thinning*

Air thins as you climb; things appear *out of* thin air. Every signature choice
expresses progressive thinning: strokes that lighten and spread as they rise, type
that breathes wider, matter resolving from almost nothing. It carries both wells of
the name at once — **altitude** (clarity, the rarefied top) and **conjuring** (made
from nothing).

**Personality:** precise, light, quietly confident, a touch of magic.
**Not:** heavy, corporate, gradient-tech-startup, neon circuit-board "tech",
Etsy-craft, or generic agency.

**Spend boldness in one place:** the thinning motif + the airy letter-spacing.
Everything else stays disciplined and quiet.

---

## Sources (provided to build this system)

These were the inputs. Stored here for reference — don't assume the reader has access.

- `uploads/design-system.md` — the brand spec / brief (essence, color, type, space, logo, motion, voice, imagery).
- `uploads/tokens.css` — the exact design tokens. Split here into `tokens/*.css`.
- `uploads/site-content.md` — pages, component scope, and all real copy (no lorem ipsum).
- `uploads/thin-air-mark.svg` — the Atmosphere mark (concept A), primary signature.
- `uploads/index.html` — the four logo concepts (A Atmosphere · B Altitude A · C TAS monogram · D Lockup).

No codebase, Figma, or live site was provided — this is a greenfield identity build
from the brief. All three webfonts are free (Google Fonts / OFL).

---

## Content fundamentals — how the studio writes

Plain, precise, a little wonder. Active voice. Specific over clever. The studio
doesn't oversell — the work carries it.

- **Person:** "we" (the studio) speaking to "you" (the client). Warm but spare.
- **Casing:** sentence case for prose and headings. Labels, eyebrows, nav, and
  buttons are **UPPERCASE** and wide-tracked (the "air"). Never bold.
- **Sentences:** short, declarative, often two-beat. "Tell us the problem. We'll
  hand you the product." Fragments are allowed when they land.
- **Punctuation:** periods, not exclamation points. No hype, ever.
- **Emoji:** none. The brand's accent is the particle, not an emoji.
- **Numbers:** services are numbered `01 / 02 / 03` in mono. Project codenames are
  weather/altitude words (Cirrus, Meridian, Aurora).

**On-brand examples**
- "We built it out of thin air." (the line — footer + sign-offs)
- "From the browser to the bare metal."
- "Tell us the problem. We'll hand you the product."
- "A sentence is enough to start."

**Off-brand (never)**
- "Leveraging cutting-edge synergies."
- "We are passionate about innovation."
- Exclamation-point hype, "synergy," "passionate about," template marketing-speak.

**Errors & empty states** (for product work): say what happened and the way forward,
in the studio's calm voice. Never apologize, never blame the user. The contact form's
error reads "That doesn't look like an email yet."; its success reads "Got it. We'll
be in touch shortly."

---

## Visual foundations

**Color.** Monochrome-first. Cool atmospheric **slate** (`--slate-950…100`, ink is
`--slate-800`), warm **paper** (`--paper #f3f1ec`, the default light surface), true
**night** (`--night #14171a`, dark surface), and one pale-cyan **particle**
(`--particle #8fb6c4`) as the *only* accent. Never pure `#000`/`#fff`. The particle is
a **spark, not a fill** — reach for it only at the moment of "appearing": a hero spark,
a live link, a focus ring, the top dot of the mark. On paper, use `--particle-deep`
for legible accents; on night, `--particle`. Build everything else in slate + paper/night.
Consume the **semantic** tokens (`--bg`, `--surface`, `--text`, `--text-muted`,
`--line`, `--accent`), which flip automatically between light and night themes
(`prefers-color-scheme` + `[data-theme]`).

**Type.** Three faces: **Space Grotesk** (display — heroes, headings, wordmark; weights
300/400), **Inter** (body — paragraphs and UI; 400/500), **JetBrains Mono** (data —
code, captions, specs, and all wide-tracked labels). The signature move:
**letter-spacing IS the air.** Display and labels are set *light and wide*; body stays
tight. Tracking tokens: wordmark `.42em`, eyebrows/nav/labels `.22em` (`--track-air`),
body `0`, huge display `-.015em`. **Weight stays light (300–400) on display — never
bold the display type.** The scale opens up at the top (`--text-4xl` 5rem, `--text-5xl`
7rem) for airy hero moments.

**Space & layout.** 8pt grid (`--space-*`); generous whitespace is the brand breathing.
Heroes get `--space-24`/`32` of vertical air. Wide margins, lots of negative space,
prose held to a comfortable ~62ch measure (`--measure`). Asymmetry and altitude (things
sitting high, rising) over dense grids. Content shell maxes ~1120px.

**Lines & shape.** Hairline rules (`--hairline`, 1px slate) as *structure* — a horizon,
a divider between real sections — never decoration. Radii are small and precise:
`--radius-sm` 4px, `--radius` 6px, `--radius-lg` 12px (cards). The studio is exact;
nothing should look pillowy.

**Backgrounds & texture.** Flat paper or night — **no gradient backgrounds**, no
neon-tech imagery, no busy collages. The only texture is an optional faint **particle
point-field** (a low-opacity dot grid that masks out toward the content), used once in
the hero. Imagery, when present, is atmospheric: altitude skies, point fields, long
depth, generous emptiness; product shots sit in airy space with room around them.

**Shadows.** **None.** No drop shadows, no pillowy elevation. Depth comes from hairlines,
hierarchy, and negative space. (Specimen cards use the faintest `inset 0 0 0 1px` ring
only to show a swatch edge against paper.)

**Borders & cards.** Cards are hairline-bounded with a small radius and **no fill beyond
the surface token** — `ServiceCard` is just a top hairline + content; `WorkCard` is a
12px hairline box. Avoid the "rounded card with a colored left border" trope entirely.

**Corner radii summary.** Buttons/inputs 6px; tags 4px; cards 12px. Underline-style
inputs have no radius (a single hairline that becomes the particle on focus).

**Motion.** Motion *is* the brand, but orchestrated, not scattered — and it respects
`prefers-reduced-motion` (the duration tokens zero out).
- **Signature load:** the Atmosphere strata **assemble bottom-up** — base line first,
  each thinner line settling in above it, the particle landing *last*. The logo forms
  out of thin air. (`Mark animate`, `--dur-slow`, staggered.)
- **Scroll reveal:** elements **rise + thin in** — slight translateY up, opacity 0→1,
  faint blur→sharp. Gentle, once (IntersectionObserver, unobserve after).
- **Hover:** quiet lift (1–3px) / lighten; links and ghost buttons **draw the particle**
  (a small dot appears).
- **Press:** settle back to baseline (no shrink/bounce).
- **Easing:** `--ease` `cubic-bezier(.2,.7,.2,1)` — a gentle ease-out; things *settle*,
  like air. Durations `--dur-fast 180ms / --dur 420ms / --dur-slow 760ms`.

**Transparency & blur.** Used sparingly: the scroll-reveal's blur→sharp, the strata's
built-in opacity ramp, and `--particle-glow` (an 18%-alpha cyan) for selection
highlights. No frosted-glass panels.

---

## Iconography

Thin Air Studios is **icon-light by design** — the brand leans on type, hairlines, and
the particle rather than a dense icon set. There is no bundled icon font.

- **The mark is the icon.** The Atmosphere strata (concept A) is the one true glyph —
  see `assets/mark-atmosphere.svg` (currentColor; particle dot `#8fb6c4`) and the
  `Mark` / `Wordmark` React components. The TAS monogram (concept C) is the utility
  stamp for footers — `assets/mark-tas.svg`.
- **The particle dot** (a 4–5px filled circle, `--accent`) is the recurring functional
  "icon": it marks live/active nav links, ghost-button hover, eyebrow accents, and
  focus moments. Drawn inline, not from an icon set.
- **Directional cue:** a single Unicode arrow `↗` (mono) appears on `WorkCard` hover.
  This is the only glyph-as-icon in the kit.
- **Emoji:** never.
- **If a project needs a UI icon set** (settings gears, chevrons, etc. for app work):
  use a thin, single-stroke, geometric set that matches Space Grotesk's line weight —
  **Lucide** (`https://unpkg.com/lucide-static`) at ~1.5px stroke is the recommended
  CDN match. Keep them slate, never the particle, and never filled. *(Substitution —
  no icon set was provided in the brief; flag if a different set is preferred.)*

---

## Index / manifest

**Root**
- `styles.css` — the entry point consumers link. `@import`s only.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skills-compatible front matter for use in Claude Code.

**Tokens** (`tokens/`, all `@import`ed by `styles.css`)
- `fonts.css` — Google Fonts `@import` (Space Grotesk · Inter · JetBrains Mono).
- `colors.css` — slate ramp, paper, night, particle, semantic aliases + theme scopes.
- `typography.css` — faces, tracking, scale, weights.
- `spacing.css` — 8pt space scale, radii, hairline, measure.
- `motion.css` — easing + durations (reduced-motion aware).

**Assets** (`assets/`)
- `mark-atmosphere.svg` — primary mark (concept A), currentColor.
- `mark-tas.svg` — TAS monogram (concept C), footer/stamp.

**Components** (`components/`, namespace `ThinAirStudiosDesignSystem_9700d8`)
- `core/` — `Mark`, `Wordmark`, `Eyebrow`, `SectionHeading`, `Button`
- `forms/` — `Input`, `Textarea`
- `display/` — `ServiceCard`, `WorkCard`, `Tag`
- `navigation/` — `Nav`, `Footer`

**Guidelines** (`guidelines/`) — foundation specimen cards (Colors · Type · Spacing · Brand).

**UI kits** (`ui_kits/`)
- `marketing-site/` — the full Thin Air Studios site: Home (hero → closing CTA),
  Services, Work (+ detail pattern), Studio, Contact. `index.html` is interactive
  (in-page routing, animated hero, scroll reveals, working contact form).

---

## Quick start (consuming project)

```html
<link rel="stylesheet" href="styles.css">
<script src="_ds_bundle.js"></script>
<script type="text/babel">
  const { Nav, Button, Eyebrow, SectionHeading } = window.ThinAirStudiosDesignSystem_9700d8;
  // …compose. Build in slate + paper/night; spend the particle once.
</script>
```

Default to the **light/paper** theme; set `data-theme="dark"` on a root for night.
Derive every color/type decision from the tokens — don't invent new ones.
