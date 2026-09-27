# reedos.github.io

Reed Cameron Osaki's personal site: https://reedos.github.io/

Static HTML, one stylesheet, and a few small scripts. No build step, analytics, or external
requests. GitHub Pages publishes the root of `main`. The page carries a noindex tag while it is in
review.

## Preview locally

```sh
python -m http.server 8000
```

Then open http://localhost:8000.

## Files

- `index.html`: the page.
- `styles.css`: all styling.
- `main.js`: theme, phone menu, the Signal Lab filter demonstration, and the layer and datacenter
  animations.
- `photo-options.js`: autoplay for the wildlife gallery.
- `404.html`: the error page.
- `assets/`: photographs, the hero exports in `assets/hero/`, project previews, and fonts.

## Licenses

The fonts are under the SIL Open Font License; each license file sits next to its font in
`assets/fonts/`. The Signal Lab demonstration uses DSP code from
[reedos/ee-labs](https://github.com/reedos/ee-labs) under the MIT License
(`assets/previews/EE-Labs-MIT.txt`).
