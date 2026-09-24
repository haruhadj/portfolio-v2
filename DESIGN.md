---
name: Michael Fernandez Portfolio
description: A clear observatory for shipped full-stack work.
colors:
  deep-orbit: "#030610"
  smoke-surface: "rgb(7 12 24 / 0.62)"
  smoke-surface-strong: "rgb(7 12 24 / 0.84)"
  starlight-line: "rgb(211 225 255 / 0.18)"
  silver-white: "#f2f6ff"
  lunar-muted: "#a9b4ca"
  tempered-cobalt: "#82aefc"
  cobalt-light: "#a8c7ff"
  cobalt-ink: "#07101f"
typography:
  display:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "clamp(3.6rem, 5.7vw, 5.25rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "clamp(2.8rem, 5.2vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "clamp(1.7rem, 2.4vw, 2.5rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.025em"
  body:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "1.06rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.72rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "normal"
rounded:
  media: "14px"
  masthead: "16px"
  control: "999px"
spacing:
  control-gap: "12px"
  content-gutter: "clamp(24px, 5vw, 72px)"
  section: "clamp(110px, 14vw, 190px)"
components:
  button-primary:
    backgroundColor: "{colors.cobalt-light}"
    textColor: "{colors.cobalt-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.smoke-surface}"
    textColor: "{colors.silver-white}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "48px"
  media-surface:
    backgroundColor: "{colors.smoke-surface-strong}"
    rounded: "{rounded.media}"
---

# Design System: Michael Fernandez Portfolio

## Overview

**Creative North Star: "The Clear Observatory"**

The portfolio is an open astronomical environment for real engineering work. A continuous live WebGL galaxy runs behind the entire page, while restrained interface layers preserve the clarity expected by hiring managers and technical interviewers. The world is cinematic but professional: atmosphere supports project evidence instead of becoming the subject.

Silver-white sans typography, tempered cobalt signals, and sparse smoke surfaces create one quiet visual language. The Bad Apple particle study begins as the hero's living artifact, then yields through a view-timeline handoff to real project screenshots. Project names, destinations, screenshots, résumé access, and the boundary between public and source-only systems remain factual and immediate.

**Key Characteristics:**

- One continuous live WebGL galaxy across the full page.
- Clear IBM Plex Sans hierarchy with JetBrains Mono confined to technology and metadata.
- Asymmetrical evidence grid led by four real featured-project interfaces.
- Transparent composition with selective smoke surfaces where content needs protection.
- Purposeful particle, scroll, reveal, and pointer motion with complete accessibility fallbacks.

## Colors

The palette is a cool nocturne: one deep navy-black ground, silver-white content, muted lunar copy, and a tempered cobalt signal family.

### Primary

- **Tempered Cobalt:** Active navigation, focus, link emphasis, pointer light, and restrained interactive signal.
- **Cobalt Light:** Filled primary controls and the brightest deliberate action state.

### Neutral

- **Deep Orbit:** The persistent page ground beneath every cosmic layer.
- **Smoke Surface / Smoke Surface Strong:** Translucent protection for navigation, controls, index panels, and media wells.
- **Starlight Line:** Low-contrast borders and structural separators.
- **Silver White:** Headings, high-priority labels, and primary reading text.
- **Lunar Muted:** Supporting copy, inactive navigation, captions, and secondary contact information.
- **Cobalt Ink:** Dark text used only on the filled cobalt action.

### Named Rules

**The One Signal Rule.** Cobalt is the only interface accent; keep it functional and subordinate to the work.

**The Open Sky Rule.** Deep Orbit is a base, not an opaque section fill. Preserve the visible galaxy and use smoke only where legibility requires it.

**The Evidence Color Rule.** Project screenshots retain enough native color to remain credible; the animated galaxy stays subordinate to that evidence.

## Typography

**Display Font:** IBM Plex Sans (with sans-serif fallback)

**Body Font:** IBM Plex Sans (with sans-serif fallback)

**Label/Mono Font:** JetBrains Mono (with monospace fallback)

**Character:** IBM Plex Sans gives the portfolio an assured, contemporary engineering voice from the hero through project titles and contact copy. JetBrains Mono is a quiet factual layer, never a costume and never a substitute for the reading hierarchy.

### Hierarchy

- **Display** (500, fluid to 5.25rem, 0.98): The compact two-line hero proposition.
- **Headline** (500, fluid to 5.5rem, 1): Major section statements and the closing invitation.
- **Title** (500, fluid to 2.5rem, 1.05): Featured project names.
- **Body** (400, 1.06rem, 1.7): Explanations and project summaries, generally held between 50ch and 66ch.
- **Label** (500, 0.72rem, compact leading): Technology lists, particle captions, and other genuinely technical metadata.

### Named Rules

**The Sans Authority Rule.** All identity, headings, project titles, descriptions, navigation, and actions use Plex Sans.

**The Mono Boundary Rule.** JetBrains Mono appears only for technology or metadata; it must not turn the page into a terminal interface.

## Layout

The page is a transparent sequence inside a 1400px content field with fluid 24–72px gutters and long 110–190px section intervals. The first viewport is a two-column composition: copy occupies the left and an unframed particle field dissolves into the right. The work section uses a 12-column asymmetrical grid: the first and fourth records span seven columns, the second and third span five, with deliberate vertical offsets that avoid a generic card wall.

Supporting builds sit in one smoke panel; About uses a weighted two-column statement-and-principles split; capabilities use four equal columns; and experiments use a two-column grid. At 900px the hero and featured work become single-column, the masthead navigation hides, and capabilities move to two columns. At 640px controls stack, all secondary grids become one column, gutters resolve to 20px, and media shifts from 16:10 to 4:3.

**The Continuous Field Rule.** Sections organize content through spacing, alignment, and restrained transparency over the live galaxy—not opaque full-width slabs.

## Elevation & Depth

Depth comes first from the fixed WebGL galaxy, layered opacity, masks, and controlled luminance. Smoke surfaces use blur only when text or controls cross visually active media. The masthead and project media carry restrained deep shadows; they must read as optical separation rather than floating dashboard cards.

### Shadow Vocabulary

- **Masthead Drift** (`0 18px 50px rgb(1 4 12 / 0.24)`): Separates the fixed navigation from the moving sky.
- **Evidence Depth** (`0 30px 80px rgb(0 3 12 / 0.38)`): Grounds screenshot media against the galaxy.

### Named Rules

**The Optical Depth Rule.** Prefer imagery, transparency, masking, and luminance before adding shadow.

**The Transparency Safety Rule.** When reduced transparency is requested, replace every smoke layer with an opaque navy surface and remove backdrop blur.

## Shapes

Media and smoke content surfaces use gently rounded 14px corners. The floating masthead uses a related 16px enclosure. Interactive buttons and the résumé control are full pills (999px). Fine one-pixel borders define boundaries; no other component class should acquire a radius, and nested rounded cards are not part of the system.

**The Purposeful Radius Rule.** Curvature belongs to media, smoke protection, the masthead, and compact controls—not to every section or content group.

## Components

### Buttons

- **Shape:** Compact 48px-high pills with 20px horizontal padding.
- **Primary:** Cobalt Light fill with Cobalt Ink text; reserved for the clearest next action.
- **Secondary:** Transparent smoke fill, Starlight Line border, Silver White text, and blur when transparency is allowed.
- **Hover / Focus:** Lift by 2px, brighten or strengthen the cobalt edge, and retain an obvious keyboard focus state. Active press moves down 1px and scales to 0.98.

### Navigation

The fixed masthead is a centered three-part grid: wordmark, section links, and résumé pill. It is 64px high on desktop, becomes denser after scrolling, and carries a one-pixel cobalt scroll-progress line. The current section is underlined in cobalt. Below 900px the central navigation hides while identity and résumé access remain.

### Project Media

Featured screenshots sit in 16:10, 14px evidence surfaces with a quiet line and deep optical shadow. A pointer-following cobalt luminance field adds depth without obscuring the interface; the image scales only to 1.015 on hover. Mobile media shifts to 4:3.

### Project Record

Each record pairs a real screenshot with a Plex Sans title, factual summary, mono technology list, and explicit live/source destinations. The records are asymmetrical by grid span and vertical offset, not by decorative chrome.

### Particle Study

The unframed Bad Apple field is a live canvas. Fine-pointer movement repels particles and pointer-down creates a localized shockwave. The field is masked into the sky, never placed inside a card. As the hero exits, it releases downward while the first project resolves from blur through CSS view timelines.

### Boot Curtain

On entry, a concise canvas space warp sends cobalt and silver stars outward from the viewport center over a translucent deep-orbit veil. The warp releases into the live galaxy in under 1.5 seconds and runs only once; it never introduces a static cosmic image. Reduced-motion visitors skip directly to the composed portfolio.

### Smoke Panels

More Builds, About protection, and experiment links may use low-opacity navy with an 8–16px backdrop blur. Their 14px silhouette protects legibility while allowing the galaxy to remain materially visible.

## Do's and Don'ts

### Do:

- **Do** lead with real project screenshots, live destinations, source links, and direct résumé/contact paths.
- **Do** keep the galaxy continuous and visible through every major section.
- **Do** reserve cobalt for navigation state, action, focus, and restrained optical feedback.
- **Do** use IBM Plex Sans for hierarchy and JetBrains Mono only for technology and metadata.
- **Do** preserve the particle-to-project view-timeline handoff and pointer light as the signature motion sequence.
- **Do** make reduced motion static and fully composed, and reduced transparency opaque and blur-free.

### Don't:

- **Don't** revive acid lime, square archive controls, narrow display lettering, numbered telemetry, or opaque section slabs from the discarded world.
- **Don't** wrap the particle field in a visible frame or let effects obscure project evidence.
- **Don't** introduce a second accent, gradient text, heavy glow, or generic floating-card stacks.
- **Don't** use mono for headings, prose, navigation, or primary actions.
- **Don't** invent testimonials, metrics, commercial claims, or public links to private/auth-gated systems.
