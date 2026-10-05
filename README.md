# Reedos.dev

Reed Cameron Osaki's personal site: https://reedos.dev/

Static HTML, one stylesheet, and a few small scripts. No build step. GitHub Pages
publishes the root of `main` at [reedos.dev](https://reedos.dev/), and search indexing
is enabled. The page loads Cloudflare Web Analytics from
`static.cloudflareinsights.com`; it is not an offline-only page. The beacon is
configured in `index.html` and `404.html`.

## Preview locally

```sh
python -m http.server 8000
```

Then open http://localhost:8000.

## Files

- `index.html`: the page.
- `styles.css`: all styling.
- `main.js`: theme, phone menu, the Signal Lab filter demonstration, layer animations,
  and playback controls for the project videos.
- `photo-options.js`: autoplay for the wildlife gallery.
- `404.html`: the error page.
- `assets/`: photographs, the hero exports in `assets/hero/`, project previews, and fonts.
- `assets/project-videos/`: muted Photon to Photo and Guardian Ring previews from the
  October 2026 portfolio reel. They play only on screen, with pause controls and
  reduced-motion support. See the folder's README for capture and export details.

## Licenses

The fonts are under the SIL Open Font License; each license file sits next to its font in
`assets/fonts/`. The Signal Lab demonstration uses DSP code from
[reedos/ee-labs](https://github.com/reedos/ee-labs) under the MIT License
(`assets/previews/EE-Labs-MIT.txt`).
