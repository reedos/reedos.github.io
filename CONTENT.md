# Content handoff

Project descriptions and the core biography come from Reed’s supplied brief. The background section adds the limited public facts documented below. No formal job title, employment dates, degree-conferral date, award, testimonial, or phone number has been invented.

## Preview publication

Reed requested a live, unlisted preview with no search indexing. The review site at `https://reedos.github.io/` is publicly accessible and carries `noindex, nofollow, noimageindex` on both HTML pages. These are crawler instructions, not authentication. The canonical tag is omitted until launch; README.md records the exact changes for enabling search discovery. The email and biography follow-ups below remain editable during review.

## Reed’s photographs

There are **no placeholder images remaining**. Five standalone photographs come from Reed’s public [wildlife-site repository](https://github.com/reedos/wildlife-site). Its [About page](https://github.com/reedos/wildlife-site/blob/d48ce94f6a0abd6d297521456f495cf4125ac224/about.html) explicitly attributes the collection to Reed’s camera and links his exact Instagram handle. Species labels come from that collection. No capture locations or dates have been added.

These are published website exports, not camera raw masters. Downloaded on 2026-09-25, resized proportionally and compressed to WebP without copying EXIF metadata. No generative editing or photo content changes. The complete exported frame is retained in each asset; CSS crops the two backgrounds responsively. All five files together are about 364 KiB. Only the hero loads eagerly.

| File in `assets/images/` | Placement | Public original | Dimensions | Bytes |
| --- | --- | --- | --- | --- |
| `red-fox.webp` | Hero | [Red Fox](https://github.com/reedos/wildlife-site/blob/d48ce94f6a0abd6d297521456f495cf4125ac224/img/36353a3b6336e039c0b2-2400.jpg) | 1920 × 1280 | 48,310 |
| `vermilion-flycatcher.webp` | Field | [Vermilion Flycatcher](https://github.com/reedos/wildlife-site/blob/d48ce94f6a0abd6d297521456f495cf4125ac224/img/ffe9c2a7b1b8bc50bd43-2400.jpg) | 1920 × 1280 | 85,642 |
| `alpine-ibex.webp` | Photo strip | [Alpine Ibex](https://github.com/reedos/wildlife-site/blob/d48ce94f6a0abd6d297521456f495cf4125ac224/img/2ae43b029c597789f1bf-2400.jpg) | 900 × 1200 | 52,992 |
| `american-robin.webp` | Photo strip | [American Robin](https://github.com/reedos/wildlife-site/blob/d48ce94f6a0abd6d297521456f495cf4125ac224/img/67c8705a99b85a472e85-3840.jpg) | 1440 × 960 | 84,918 |
| `great-blue-heron.webp` | Photo strip | [Great Blue Heron](https://github.com/reedos/wildlife-site/blob/d48ce94f6a0abd6d297521456f495cf4125ac224/img/5649e4f4a7ff13066089-2400.jpg) | 800 × 1200 | 101,198 |

### Swapping photographs

Use another confirmed Reed photograph and keep the same filename, or update the HTML `src`. Update its true dimensions and literal alt text. Keep the originals elsewhere; web exports should normally stay below 400 KB each. Check the subject’s head and body at phone and desktop widths. Hero and Field have separate phone crop rules; the photo strip preserves whole frames.

The exact existing alt sentences to replace are:

- `red-fox.webp`: “A red fox stepping forward against a pale, blurred background. Photograph by Reed Cameron Osaki.”
- `vermilion-flycatcher.webp`: “A vermilion flycatcher perched on a branch against green foliage. Photograph by Reed Cameron Osaki.”
- `alpine-ibex.webp`: “An Alpine ibex standing on a snow-covered rock ledge.”
- `american-robin.webp`: “An American robin leaning toward the ground among leaves and melting snow.”
- `great-blue-heron.webp`: “A great blue heron standing in green, plant-covered water.”

Also update the matching visible labels: `Red fox / Photograph by Reed`, `Vermilion flycatcher / Photograph by Reed`, `Alpine ibex`, `American robin`, or `Great blue heron`. The heading `Field work` can stay generic. “Southern California” describes Reed, not the location of the fox photograph.

The previous stock landscape, rack, and deer photographs have been removed from the deliverable. The technical sections now use only real app previews.

## Experience and education

Public sources checked on 2026-09-25:

- [Reed’s LinkedIn profile](https://www.linkedin.com/in/reed-osaki/), as rendered in the public search index: Marvell Technology affiliation and hardware engineering; UCLA Extension coursework in analog, mixed-signal, RF, and microwave circuit design, 2021–2022. Direct profile access was blocked, and the indexed view hides formal roles, employment dates, and much of the education history.
- [CSULB’s 2022 College of Engineering commencement program](https://www.csulb.edu/sites/default/files/document/coe-program-2022.pdf), printed page 12 / PDF page 7: Reed Cameron Osaki appears under Master of Science, Electrical Engineering. The program lists degree candidates, so the website says **graduate study** without asserting degree conferral or a graduation date.

The compact About block links to LinkedIn for the full profile. It does not claim to be a complete employment or education history.

Still needed from Reed: exact current title, earlier roles to include with employer and years, completed degree names, institutions, and optional graduation years. Replace the exact sentence `Hardware engineering.` with his confirmed title and dates if desired. Replace `Graduate study in electrical engineering.` with the confirmed completed degree; add a year only when confirmed. UCLA Extension is coursework, not an asserted degree or certificate. Add earlier roles as additional rows only after Reed supplies them.

## Actual project previews

These five previews represent the real projects: three screenshots, Gradient Ascent’s exported technique map, and a Smith figure verified against RF Lab Reference. They are local static images, not fabricated interfaces or live embeds. Each links to the corresponding primary destination from the brief. Screenshots and the technique map preserve their captured geometry. The Smith figure uses exact analytical geometry with labels arranged for the portfolio. Do not interpret preview numbers as live readings.

| Local file | Actual source/view | Dimensions | Size |
| --- | --- | --- | --- |
| `assets/previews/ee-labs.webp` | [Circuit Lab](https://reedos.github.io/ee-labs/circuit-lab/), Resonance → “Q is how sharp, and R sets it.” Series RLC, R=20 Ω, L=10 mH, C=100 nF, output across C. | 1440 × 900 | 76,102 bytes |
| `assets/previews/rf-smith-portfolio.svg` | [Impedance & match](https://reedos.github.io/rf_lab_reference/match.html), exact normalized impedance Smith geometry checked against the corrected tool; 75+j35 Ω example load, 50 Ω reference. | 1000 × 1000 | 24,894 bytes |
| `assets/previews/gradient-map.svg` | [Gradient Ascent technique map](https://reedos.github.io/gradient_ascent/map/), exported from its live SVG with native dark styling and default relationship visibility. | 1120 × 1085 | 154,861 bytes |
| `assets/previews/stack-ledger.webp` | [Stack Ledger](https://reedos.github.io/stack_ledger/), “The investment taking physical shape,” capital-spending charts and guidance. | 1440 × 900 | 120,036 bytes |
| `assets/previews/field-catalog.webp` | [Published library screenshot](https://raw.githubusercontent.com/reedos/field-catalog/b2b7f6679e41ca761622136498c037786b122d40/docs/screenshots/library.jpg), from the Field Catalog repository at the pinned commit. | 1440 × 810 | 145,844 bytes |

Public web apps were captured on 2026-09-25. The Field Catalog image was downloaded from its public documentation on that date; its original capture date is not asserted. The screenshot includes its own photo captions and app controls; the hub makes no additional species or location claims.

To refresh a project preview, capture the actual app at approximately 1440px wide, preserve the app’s native styling, compress to WebP, and replace the corresponding file. Update its dimensions, alt text, caption, and source record if the view changes. Keep screenshots under 300 KB where practical. The existing primary and source links should stay unchanged. All five previews load lazily.

### RF Smith chart figure

This replaces the earlier sparse native-chart export. It is a scientific figure composed for the portfolio, not a screenshot of the app. All values and grid geometry are checked against [the corrected RF calculation module](https://github.com/reedos/rf_lab_reference/blob/1bfb19688897ebef5b9aceb65743e741d26dbb4a/js/rf.js). The plot is black with major/minor grid hierarchy, labeled resistance and reactance, and the tool’s teal reflection marker. HTML below the image shows the example load, VSWR, and return loss, so those values remain readable on a phone and when text is enlarged.

For normalized impedance z = r+jx = Z/Z₀, each resistance circle has center (r/(1+r), 0) and radius 1/(1+r); each reactance circle has center (1, 1/x) and radius 1/|x|, clipped to the unit disk. The image inverts the vertical coordinate. Checks against the application’s impedance transform have a maximum circle residual below 2×10⁻¹⁵.

For Z = 75+j35 Ω and Z₀ = 50 Ω, Γ = 0.258160+j0.207715, |Γ| = 0.331349, VSWR = 1.991098, and return loss = 9.594282 dB. The marker is at (602.748, 417.329), above and right of the center (500, 500), on a chart with radius 398. The dashed circle is constant |Γ|; the straight teal line is the reflection vector, not a measured frequency sweep. The example is labeled as such.

The SVG embeds the same licensed IBM Plex Mono font as the tool. No scripts, controls, or external requests are included. Refresh the analytical circles and calculate the example using the RF tool; do not approximate the geometry. If the load changes, update the SVG title/description, the HTML alt text, and all three `.smith-readout` values together. This figure does not alter the live RF app.

### Gradient Ascent map export

The map replaces the worked-example screenshot. It was exported on 2026-09-25 from the public `/map/` page, corresponding to [TechniqueMap.astro at the recorded source commit](https://github.com/reedos/gradient_ascent/blob/6eab6d6141178b8cb83a2269529c8eaa0ecec9e4/site/src/components/TechniqueMap.astro). Node positions, labels, and paths are unchanged. Native colors and default visible prerequisite/upgrade paths are baked into the standalone SVG. The diagram’s surrounding controls and HTML sidebar are outside this export. No interaction code or remote dependencies are included.

The native DM Sans 600 font is embedded in the SVG. Its SIL Open Font License is included at `assets/fonts/DM-Sans-OFL.txt`.

To refresh it, export the real map again rather than drawing a replacement. Preserve its native geometry and default relationship visibility; update dimensions and the table above if they change. The hub’s project counts remain the editorial copy from Reed’s brief.

## Email TODO

No email address was supplied. `hello@` is deliberately incomplete, labeled, and not a link. The exact visible sentence to replace is:

> Email to be added.

Replace the **whole paragraph** below in `index.html`, including the incomplete address:

```html
<p class="email-placeholder"><span aria-label="Incomplete email placeholder">hello@</span> <span class="email-note">Email to be added.</span></p>
```

With this structure, substituting Reed’s verified address in **both** places before saving (the braces are instructions, not a publishable value):

```html
<a class="action-link" href="mailto:{VERIFIED_EMAIL}">{VERIFIED_EMAIL}</a>
```

Remove the adjacent email TODO comment afterward. No other biography or project copy needs to change when Reed supplies photos or an address.

## Replacement checks

- Update real image dimensions and clear, descriptive alt text for each replaced photograph or screenshot.
- Preserve photo provenance and the font licenses.
- Verify legibility, crop, focus indicators, and navigation on a phone and desktop.
- Keep descriptions in sentence case. Keep outbound project URLs exactly as listed in `README.md`.
- The copyright year is static: `© 2026` in both HTML files.
