# Almost Real – Hugo (v2)

Implements:
- **Overlay header** at top: brand centered; nav centered below (over hero).
- **Sticky white header** after scroll with brand left, nav inline.
- **Hero** is true full-viewport (uses `100svh` to account for mobile UI) with parallax.
- **Avatar** near hero copy (above on mobile, left on md+). Replace `/static/images/avatar.jpg`.
- Grid, effects, and image sources from `/static/trickle/assets/*.json`.

## Run
```bash
hugo server -D
```

## Swap assets
- Hero image URL: `static/trickle/assets/hero-image.json`
- Avatar image: replace `static/images/avatar.jpg` (any size; square looks best).
