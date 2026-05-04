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

## Placement map (every verified image)

### `about.html`
- `owner1.avif` → Leadership card for Mr. Shamon Aiken.
- `owner2.avif` → Leadership card for Mrs. Marquita Aiken.
- `director1.avif` → Leadership card for Mrs. Natasha Jamison.
- `familyimage.avif` → Family visual directly under “A Heart for Families.”

### `index.html`
- `lilman_wavinghello.avif` → Homepage supporting image under “Rooted in Faith, Focused on Growth.”

### `programs.html`
- `kids_coloring.avif` → Intro photo strip after “Early Learning Rooted in Care, Faith, and Growth.”
- `kids_outside2.avif` → Intro photo strip after “Early Learning Rooted in Care, Faith, and Growth.”
- `3yo_playing.avif` → “A Look Inside PCLA” photo row.
- `babgirl_redbow.avif` → “A Look Inside PCLA” photo row.
- `babygirl_bluey.avif` → “A Look Inside PCLA” photo row.
- `babyboy_blueyshirt.avif` → “A Look Inside PCLA” photo row.
- `kids_outside.avif` → “A Look Inside PCLA” photo row.
- `kids_outside3.avif` → “A Look Inside PCLA” photo row.
- `lilbaby.avif` → “A Look Inside PCLA” photo row.
- `lilman_coloring.avif` → “A Look Inside PCLA” photo row.

## Images used more than once
- None.

## Unused images and reason
- None. Every verified, usable uploaded image is used at least once.

## Cropping/object-position safeguards
- Child imagery uses natural display (`.child-photo img`) with `height: auto` and `object-fit: contain` to preserve full subjects.
- Program imagery in visual strips/rows avoids fixed-height cropping.
- Leadership portraits use controlled framing via `.leader-photo img` (`aspect-ratio: 4 / 5`, `object-fit: cover`, `object-position: center top`) with targeted position utility classes where needed.

## Owner-confirmation items
- Leadership filenames mapped directly to the existing named owner/director cards:
  - `owner1.avif` → Mr. Shamon Aiken
  - `owner2.avif` → Mrs. Marquita Aiken
  - `director1.avif` → Mrs. Natasha Jamison
