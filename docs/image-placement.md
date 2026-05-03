# Image Placement Log

## Verified filenames

### `assets/images/about/`
- `owner1.avif`
- `owner2.avif`
- `director1.avif`
- `familyimage.avif`

### `assets/images/programs/`
- `3yo_playing.avif`
- `babgirl_redbow.avif`
- `babygirl_bluey.avif`
- `babyboy_blueyshirt.avif`
- `kids_coloring.avif`
- `kids_outside.avif`
- `kids_outside2.avif`
- `kids_outside3.avif`
- `lilbaby.avif`
- `lilman_coloring.avif`
- `lilman_wavinghello.avif`

## Images placed by page
- `about.html`
  - Leadership cards: `owner1.avif`, `owner2.avif`, `director1.avif`
  - “A Heart for Families” section (below existing two-column story/highlight pair): `familyimage.avif`
- `programs.html`
  - Added controlled photo strip after the “Early Learning Rooted in Care, Faith, and Growth” card: `kids_coloring.avif`, `kids_outside2.avif`
- `index.html`
  - Added one supporting image under “Rooted in Faith, Focused on Growth”: `lilman_wavinghello.avif`

## Intentionally not used
- `assets/images/programs/3yo_playing.avif`
- `assets/images/programs/babgirl_redbow.avif`
- `assets/images/programs/babygirl_bluey.avif`
- `assets/images/programs/babyboy_blueyshirt.avif`
- `assets/images/programs/kids_outside.avif`
- `assets/images/programs/kids_outside3.avif`
- `assets/images/programs/lilbaby.avif`
- `assets/images/programs/lilman_coloring.avif`

Reason: not required to meet page-by-page limits and omitted to prevent crowding/compression of existing text-first layouts.

## Cropping/object-position adjustments
- Leadership portraits use `.leader-photo img` with `aspect-ratio: 4 / 5`, `object-fit: cover`, and per-image position utilities where needed (`.image-position-top`, `.image-position-center`).
- Child images default to `object-fit: contain` via `.child-photo img` to preserve full subjects and avoid incomplete figures.
- A single optional gentle crop pattern is used only on one programs image with `.child-photo--cover` (`aspect-ratio: 4 / 3`, centered).

## Unresolved owner-confirmation items
- None. Filenames mapped directly to the existing three named leadership cards and family image placement request.
