# Big Fish Collective Design Reference

This document is the visual source of truth for future pages, components, and motion work in this application.

## Design direction

Big Fish Collective is a Hyderabad-based talent agency for film and creative production. The interface should feel like an editorial production dossier: confident, cinematic, direct, and human. Every element should support clarity and momentum without becoming decorative for its own sake.

The visual language is intentionally monochrome. Photography, layout, typography, and motion create the atmosphere; color is used sparingly so the work and the people remain the focus.

## Core visual system

### Color

Use the shared CSS tokens in [`app/globals.css`](./app/globals.css) rather than introducing page-specific colors.

| Token | Current value | Use |
| --- | --- | --- |
| `--ink` | `#000000` | Primary text, dark sections, overlays |
| `--paper` | `#ffffff` | Page backgrounds, cards, inverse text |
| `--ocean` | `#000000` | Action links and dark accent text |
| `--deep-ocean` | `#000000` | Hero and cinematic backgrounds |
| `--seafoam` | `#ffffff` | Inverse accent text and small highlights |

Opacity creates hierarchy: use white/black opacity for secondary copy, dividers, scrims, and hover states. Do not add new accent colors without a strong content or accessibility reason.

### Typography

- Primary typeface: `Helvetica, "Helvetica Neue", Arial, sans-serif`.
- Body copy: relaxed line-height, generally `1.5` or `1.6`.
- Display copy: heavy weight, tight tracking, compact leading, and large responsive sizes.
- Eyebrows: uppercase, bold, approximately `.76rem`, with `.18em` tracking.
- Italic emphasis is replaced with normal-style emphasis colored with the shared accent token.
- Prefer short, high-confidence headlines and supporting copy that reads quickly.

### Layout

- Use the shared `max-w-360` container with responsive horizontal padding: `px-5`, `sm:px-8`, `lg:px-12`.
- Use generous vertical rhythm: generally `py-20` on small screens and `py-28` to `py-32` on large screens.
- Use borders, one-pixel rules, and `gap-px` grids to create structure.
- Use two-column layouts for editorial contrast; collapse to one column on smaller screens.
- Keep calls to action rectangular and direct. Primary buttons use solid black or white; secondary buttons use a clear border.

## Component patterns

### Site chrome

Use [`components/site-header.tsx`](./components/site-header.tsx) and [`components/site-footer.tsx`](./components/site-footer.tsx) for global navigation and footer treatments. Header logos invert on dark hero backgrounds. Navigation should stay sparse and utilitarian.

### Page heroes

Use [`components/page-hero.tsx`](./components/page-hero.tsx) for internal pages. A page hero should establish the page with one eyebrow, one strong headline, and a concise intro. The home hero can layer photography beneath a dark scrim, as implemented in [`app/page.tsx`](./app/page.tsx).

### Content sections

Alternate white and black sections to create a visual sequence. Use a `bg-paper` or `bg-white` surface for reading-heavy sections and `bg-ink text-white` for statements, missions, and calls to action. Keep cards quiet: the grid, border, and typography should do most of the work.

### Imagery

Photography should feel documentary, cinematic, and people-led. Use `object-cover`, deliberate positioning, and a dark scrim when text overlays an image. Avoid stock-looking decorative images and avoid adding gradients that compete with the subject.

## Motion principles

- Motion should communicate a production cue: roll, reveal, drift, sweep, or transition.
- Keep easing cinematic and smooth; avoid bouncy UI motion except for the clapboard hinge.
- Use the existing progressive reveal behavior from [`components/motion-effects.tsx`](./components/motion-effects.tsx).
- Respect `prefers-reduced-motion`. Content must remain available without animation.
- Do not delay access to forms, navigation, or primary content unnecessarily.

### Opening title / loading reveal

The global opening animation lives in [`components/cinematic-intro.tsx`](./components/cinematic-intro.tsx) and is mounted from [`app/layout.tsx`](./app/layout.tsx).

- Shot 1: a monochrome clapboard with a single hinge/clap cue.
- Shot 2: a front-facing camera body with a centered lens, focus HUD, and recording cue.
- Reveal: the lens expands through an SVG mask and clip path, exposing the page from the center outward.
- Timing: the current clapboard hold is 2 seconds, followed by a 1.8 second camera shot and a 1.35 second lens reveal.
- Loading indicator: 3px, edge-to-edge viewport width, fixed to the bottom of the intro.
- Escape hatch: always provide a visible “Skip intro” control.
- Reduced motion: skip the intro immediately.

Future intro changes should preserve the application’s black/white system and should not introduce a separate brand palette.

## Accessibility and responsive behavior

- Every interactive control needs a visible focus state.
- Decorative imagery needs empty alt text or should be marked decorative.
- Do not encode meaning by color alone.
- Check the intro, headers, cards, and buttons at narrow mobile widths.
- Keep text readable over imagery with sufficient scrim contrast.
- Test keyboard access and reduced-motion behavior whenever motion is changed.

## Review checklist

- Does the page use the shared color tokens?
- Does the layout follow the container and spacing rhythm?
- Are headlines concise and editorial rather than generic marketing copy?
- Does the page alternate surfaces with purpose?
- Are motion and hover states restrained and accessible?
- Does the experience still make sense with animation disabled?
