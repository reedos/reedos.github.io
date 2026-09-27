# Content handoff

Project descriptions and the core biography come from Reed’s supplied brief. The background section adds the limited public facts below. No formal job title, employment dates, degree-conferral date, award, testimonial, or phone number has been invented.

## Preview publication and layouts

The public review site at `https://reedos.github.io/` carries `noindex, nofollow, noimageindex` on the main page, error page, and archived studies. These are crawler instructions, not authentication. No canonical tag is present during review; README.md explains the changes for search discovery.

Cinematic Chapters is the selected live layout, including for older layout query URLs. The design-review footer has been removed. Theme links accept `theme=dark`, `theme=light`, or `theme=system` (Auto). Dark is the default unless a theme has been saved. The public, noindex review status remains unchanged.

Barlow Condensed 600 supplies the display typography and Manrope the body text, following Reed’s wildlife site. IBM Plex Mono is reserved for technical labels. Gold accents are `#e6ba82` on dark backgrounds and `#80531c` on light backgrounds. Photography and project art retain their own colors.

## Project scope and terminology

All five projects are Reed’s personal projects outside his professional work. Use **Personal Projects** as the umbrella label. Group EE Labs and RF Reference under **Engineering Tools**, Gradient Ascent and Stack Ledger under **Research & Guides**, and Field Catalog under **Photography Tools**. These categories describe their purpose; they do not imply that the guides contain only original research. Keep professional background and education in About.

Use **datacenter interconnect** in place of the former optical wording. In prose, use “high-speed, RF, and datacenter interconnects.” The page uses American English, complete body sentences, and concise display labels.

## Current photographs

The Field section links to Reed’s [wildlife photography site](https://reedos.github.io/wildlife-site/index.html). Instagram remains available among the profile links. No stock-photo placeholders remain.

Reed supplied the mountain and personal portrait photographs on 2026-09-26. The JPEGs are copied byte-for-byte, with normal orientation and no GPS, capture-date, camera, or location EXIF found. Their remaining EXIF describes resolution, dimensions, orientation, and color space. No generative photo edits were made. The page does not claim a capture location or date.

The wildlife images come from Reed’s public [wildlife-site repository](https://github.com/reedos/wildlife-site). Its [About page](https://github.com/reedos/wildlife-site/blob/d48ce94f6a0abd6d297521456f495cf4125ac224/about.html) attributes the collection to Reed and links his Instagram handle. Their species labels come from that collection. The export was downloaded on 2026-09-25, proportionally resized, and compressed to WebP without copying EXIF.

| File in `assets/images/` | Current placement | Source | Asset dimensions | Bytes |
| --- | --- | --- | --- | --- |
| `mountain-ridge.jpg` | Previous hero (desktop); replaced by `assets/hero/` on 09/26/2026 | User attachment `5-Photo-5.jpg` | 1280 × 853 | 291,313 |
| `mountain-portrait.jpg` | Previous hero (phone); replaced by `assets/hero/` on 09/26/2026 | User attachment `1-Photo-1.jpg` | 959 × 1280 | 256,624 |
| `reed-portrait.jpg` | About / 3:4 frame | User attachment `3-Photo-3.jpg` | 853 × 1280 | 135,784 |
| `great-blue-heron.webp` | Archived / unused on homepage | [Great blue heron original](https://github.com/reedos/wildlife-site/blob/d48ce94f6a0abd6d297521456f495cf4125ac224/img/5649e4f4a7ff13066089-2400.jpg) | 800 × 1200 | 101,198 |

The responsive hero uses AVIF and WebP sources with width descriptors from `assets/hero/` (landscape 3:2 at 1280 to 3840 px, and a 3:4 portrait crop centered on the summit for phones) in one `picture` element, with a 1920 px JPEG fallback, and crops to the viewport composition. `assets/hero/share-card.jpg` (1200 × 630) is the link-preview image. Gallery photos are no longer links; the section’s buttons lead to the wildlife site. It is not a standalone wildlife frame. The Field gallery uses three 4:3 frames: red fox (right-aligned crop), American robin (left-aligned crop), and vermilion flycatcher (center crop). No photograph is stretched. Sources for these assets are listed below. The four-second slideshow starts automatically when visible, with swipe and keyboard navigation. There are no visible Previous/Next or Play/Pause buttons. Touch, focus, hover, or wheel interaction holds playback for the rest of the visit; offscreen and hidden-tab playback is suspended. Reduced motion disables automatic photo playback. Attachment `2-Photo-2.jpg` remains an unused alternative. The datacenter reference attachment `4-Photo-4.jpg` is not published and was not an image-generation input.

### Exact photo replacement text

Replace the relevant source, actual dimensions, and literal alt sentence when supplying a different photograph:

- Hero, shared by every source: “Snow-covered mountain peaks beneath a blue sky, with clouds along the ridge.” The visible credit reads “Photograph: Reed Cameron Osaki”.
- About portrait: “Reed Cameron Osaki wearing a hiking backpack in front of a mountain landscape.”
- Field 1: “A red fox walking across snow, facing the camera. Photograph by Reed Cameron Osaki.” Caption: “Red fox”.
- Field 2: “An American robin searching the forest floor. Photograph by Reed Cameron Osaki.” Caption: “American robin”.
- Field 3: “A vermilion flycatcher perched beneath branches against a soft green background. Photograph by Reed Cameron Osaki.” Caption: “Vermilion flycatcher”.

Keep source masters elsewhere; web photos should normally remain below 400 KB. Preserve 3:4 or 4:3 standalone wildlife frames, and check the subject’s head and body after CSS cropping. When changing the hero, update both portrait and landscape sources and check the name overlay on both screen orientations and themes. Keep generic mountain wording unless Reed supplies the actual place. “Southern California” describes Reed’s location, not where the photos were taken.

## Generated datacenter illustration

The current `assets/images/datacenter-symmetry.webp` is an original fictional datacenter illustration created on 2026-09-26 using the built-in image-generation tool. The 1400 × 1050 (4:3) web export is 183,276 bytes. It uses a centered one-point perspective, balanced rack and ceiling architecture, cool cyan lighting, and polished reflections. It is not an image of Reed’s workplace, any identified employer facility, or his photography. Small generated details are not guaranteed to be pixel-identical across the centerline.

- Exact visible caption: **Datacenter / Generated illustration**
- Exact alt: “Generated symmetrical datacenter illustration with dark racks, cyan lighting, and a central vanishing point.”
- Exact generation prompt and processing record: [datacenter-symmetry-PROVENANCE.md](assets/images/datacenter-symmetry-PROVENANCE.md).

The user’s original datacenter reference informed the requested style; none of its pixels were copied into this image. No CLI fallback was used. Keep the generated label for replacement illustrations. If Reed supplies a verified photograph instead, replace the entire caption with an accurate subject and credit, update the alt and provenance, and identify a facility only with confirmation.

## Current project visuals

All five project artboards are **1200 × 900, 4:3**. They are local assets; their primary links open the actual tools. Browser capture was unavailable for this revision, so these are not newly captured screenshots. The existing screenshots are retained without cropping or distortion, and the technical artwork is identified below.

| Local asset in `assets/previews/` | Source and treatment |
| --- | --- |
| `ee-signal-preview.svg` | Mathematical Signal Lab preview and no-JavaScript fallback for the interactive filter demonstration; not an app screenshot. |
| `rf-smith-wide.svg` | Existing verified Smith figure uniformly scaled onto a 4:3 artboard, with a separate readout panel. |
| `gradient-stack.svg` | Gradient Ascent’s actual native isometric level-stack SVG, exported from the rendered source with its geometry and palette preserved. |
| `stack-ledger-wide.webp` | Existing real Stack Ledger capital-spending screenshot, uniformly rescaled and letterboxed. |
| `field-catalog-wide.webp` | Existing published Field Catalog library screenshot, uniformly rescaled and letterboxed. |

The two screenshots use a dark `#090d11` stage. Native app colors are retained in both page themes. They are not live readings. [Wide-preview provenance](assets/previews/wide-preview-provenance.json) records source/output hashes, exact transformations, and RF reference values.

### EE Labs Signal Lab demonstration

The default is a 250 Hz, amplitude-1 square wave through a second-order high-pass filter, cutoff 700 Hz, Q = 1/√2, sample rate 8000 Hz, and 20 ms time span. Waveforms use the upstream sample rule and biquad processor with 4096 warmup samples. The frequency plot is the exact transfer magnitude, not an FFT of the square wave. Its fixed linear axis spans 0–4000 Hz, and its fixed gain range is −60 to +3 dB. The waveform stays on a fixed ±2.5 range with a fixed 0–20 ms time axis; neither mode nor cutoff changes the grid. Lines connect discrete samples; they are not continuous-time reconstruction.

The low-pass/high-pass buttons and cutoff control calculate actual results. The cutoff sweep starts automatically when visible, with a Pause control. It pauses offscreen and in hidden tabs, resumes when visible unless manually paused, and stops when the user adjusts the cutoff. Reduced motion disables automatic playback; explicit Play can enable it. The no-JavaScript SVG also shows the default high-pass result. The comparison keeps 8000 Hz for both filters, while the native app’s separate high-pass preset uses 16000 Hz. This is a small mathematical demonstration, not a recording or imitation of the full application.

Source revision: [EE Labs `fbfb067d187b85f8e1e4081ea7c485dc032de714`](https://github.com/reedos/ee-labs/tree/fbfb067d187b85f8e1e4081ea7c485dc032de714). Relevant source: [biquad math](https://github.com/reedos/ee-labs/blob/fbfb067d187b85f8e1e4081ea7c485dc032de714/packages/dsp/src/biquad.js), [waveforms](https://github.com/reedos/ee-labs/blob/fbfb067d187b85f8e1e4081ea7c485dc032de714/packages/dsp/src/signals.js), and [presets](https://github.com/reedos/ee-labs/blob/fbfb067d187b85f8e1e4081ea7c485dc032de714/apps/signal-lab/src/presets.js#L484). The [MIT license](assets/previews/EE-Labs-MIT.txt) is retained. [Demo provenance and numerical checks](assets/previews/ee-demo-provenance.json).

### RF Smith chart

This is a scientific figure, not an app screenshot. The existing `rf-smith-portfolio.svg` is nested at 900 × 900 with its original 1000 × 1000 viewBox, an exact uniform scale of 0.9. The separate readout panel occupies the remaining 300 pixels. Grid geometry, colors, marker, and original source labels are unchanged.

For normalized impedance z = r+jx = Z/Z₀, resistance circles have center (r/(1+r), 0), radius 1/(1+r); reactance circles have center (1, 1/x), radius 1/|x|, clipped to the unit disk. The image inverts the vertical coordinate. Checks against [the corrected RF module](https://github.com/reedos/rf_lab_reference/blob/1bfb19688897ebef5b9aceb65743e741d26dbb4a/js/rf.js) recorded circle residuals below 2×10⁻¹⁵.

For Z = 75+j35 Ω and Z₀ = 50 Ω, Γ = 0.258160+j0.207715, |Γ| = 0.331349, VSWR = 1.991098, and return loss = 9.594282 dB. The dashed circle is constant |Γ|; the radial line is the reflection vector, not a measured frequency sweep. If the example load changes, update the SVG title/description and readouts together. This figure does not alter the live app.

### Gradient Ascent stack

The current stack replaces the map. It was exported on 2026-09-26 from the native SVG in [LevelStack.tsx](https://github.com/reedos/gradient_ascent/blob/6eab6d6141178b8cb83a2269529c8eaa0ecec9e4/site/src/components/islands/LevelStack.tsx) at revision `6eab6d6141178b8cb83a2269529c8eaa0ecec9e4`. Slab paths, symbols, labels, and coordinates retain the source geometry; the trailing external-link arrows were removed as requested. Its native 585 × 710 viewBox is fitted intact within the 1200 × 900 artboard. Native dark colors and DM Sans 400 are embedded.

[Stack provenance](assets/previews/gradient-stack-provenance.json) records the original source export. The current homepage uses `gradient-layers.svg`, with native slab geometry and colors on the right and project information on the left. Small repeated native labels are replaced by a larger synchronized layer name and description. The shared animation steps through layers every 0.8 seconds, with a 7-unit lift and brightness 1.3, no pointer, and no remote runtime requests. Pause, offscreen suspension, hidden-tab suspension, and reduced-motion support remain available. Keep the [DM Sans license](assets/fonts/DM-Sans-OFL.txt).

### Screenshot refreshes

The original Stack Ledger capture is from 2026-09-25 and shows “The investment taking physical shape.” The original Field Catalog screenshot was downloaded from its [published documentation](https://raw.githubusercontent.com/reedos/field-catalog/b2b7f6679e41ca761622136498c037786b122d40/docs/screenshots/library.jpg) that day; its actual capture date is not asserted. The app screenshot includes its own captions and controls; the hub makes no additional species or location claims.

For a fresh screenshot, capture the actual application, preserve its native styling, and fit it intact to a 1200 × 900 artboard. Compress to WebP, normally below 300 KB. Update the alt, caption, source URL, capture date, and provenance. Do not create animated interface recordings from invented data. Keep all primary and source links listed in README.md unchanged.

## Experience and education

Public sources checked on 2026-09-25:

- [Reed’s LinkedIn profile](https://www.linkedin.com/in/reed-osaki/), as rendered in the public search index: Marvell Technology affiliation and hardware engineering; UCLA Extension coursework in analog, mixed-signal, RF, and microwave circuit design, 2021–2022. Direct profile access was blocked, and the indexed view hides formal roles, employment dates, and much of the education history.
- [CSULB’s 2022 College of Engineering commencement program](https://www.csulb.edu/sites/default/files/document/coe-program-2022.pdf), printed page 12 / PDF page 7: Reed Cameron Osaki appears under Master of Science, Electrical Engineering. The program lists degree candidates, so the initial site used **graduate study**. Reed has since directly confirmed the awarded master’s degree.

Reed directly confirmed his current title as **Senior Staff Engineer** at **Marvell Technology** on 2026-09-26. The datacenter scene and About background list use this confirmed title. The scene specialty line is “Datacenter interconnect · High-speed · RF”; its image remains labeled as a generated illustration. About links to LinkedIn for the full profile and does not claim to be a complete history. Earlier roles and other completed degrees remain unconfirmed; no background dates are displayed. The awarded degree is now directly confirmed by Reed; see the confirmation below. UCLA Extension is coursework, not an asserted degree or certificate.

## Contact

Reed requested removal of the email placeholder. No email address, incomplete address, or email-to-be-added message is published. Contact uses LinkedIn and GitHub. Add an email link only if Reed later supplies an address for publication.

## Retained assets for earlier studies

These are historical exports, not instructions to add more pictures to the current page. They remain available to `design-directions/` and earlier source records.

| Asset | Recorded source |
| --- | --- |
| `red-fox.webp` | [Reed’s red fox original](https://github.com/reedos/wildlife-site/blob/d48ce94f6a0abd6d297521456f495cf4125ac224/img/36353a3b6336e039c0b2-2400.jpg), 1920 × 1280 export. |
| `american-robin.webp` | [Reed’s American robin original](https://github.com/reedos/wildlife-site/blob/d48ce94f6a0abd6d297521456f495cf4125ac224/img/67c8705a99b85a472e85-3840.jpg), 1440 × 960 export. |
| `alpine-ibex.webp` | [Reed’s Alpine ibex original](https://github.com/reedos/wildlife-site/blob/d48ce94f6a0abd6d297521456f495cf4125ac224/img/2ae43b029c597789f1bf-2400.jpg), 900 × 1200 export. |
| `vermilion-flycatcher.webp` | [Reed’s vermilion flycatcher original](https://github.com/reedos/wildlife-site/blob/d48ce94f6a0abd6d297521456f495cf4125ac224/img/ffe9c2a7b1b8bc50bd43-2400.jpg), 1920 × 1280 export. |
| `datacenter-illustration.webp` | Earlier generated 1400 × 1050 matte-rack scene, 186,658 bytes. [Original prompt](assets/images/datacenter-PROVENANCE.md). Replaced on the homepage. |
| `ee-labs.webp` | Real [Circuit Lab](https://reedos.github.io/ee-labs/circuit-lab/) capture, “Q is how sharp, and R sets it,” series RLC with R=20 Ω, L=10 mH, C=100 nF, output across C; 1440 × 900, captured 2026-09-25. |
| `rf-smith-portfolio.svg` | Verified original 1000 × 1000 analytical figure, now also the source of the wide export. |
| `gradient-map.svg` | Native technique-map export from [TechniqueMap.astro](https://github.com/reedos/gradient_ascent/blob/6eab6d6141178b8cb83a2269529c8eaa0ecec9e4/site/src/components/TechniqueMap.astro), downloaded 2026-09-25, 1120 × 1085, native DM Sans 600 embedded. Replaced by the level stack. |
| `stack-ledger.webp` / `field-catalog.webp` | Original screenshot exports, 1440 × 900 and 1440 × 810 respectively; sources of the current letterboxed versions. |

No stock landscape, rack, or deer placeholders are included. Preserve original provenance and font licenses when editing retained studies. The copyright year is static: **© 2026**.

## Animated Smith chart

The homepage inlines the existing verified 1200 × 900 Smith artwork with namespaced styles and IDs. A synthetic 18-second periodic sweep uses R = 75 + 50 sin(t) ohms and X = 80 sin(2t) ohms, with a 50-ohm reference. The reflection coefficient is calculated as (Z − 50)/(Z + 50). Its vector, marker, magnitude circle, VSWR = (1 + |Γ|)/(1 − |Γ|), and return loss = −20 log10|Γ| update together. A faint trace shows the full calculated sweep. The caption identifies this as a calculated sweep, not measured data. Playback pauses offscreen, in hidden tabs, or using Pause. Reduced motion disables automatic playback but explicit Play can enable it. The original standalone SVG remains a static reference.

## Earlier homepage tour and current datacenter motion

The earlier Stack Ledger preview used two existing 1440 × 900 captures from its actual front page: `work/project-previews/references/stack_ledger-initial.png` (exported without changes to pixels other than WebP compression as `assets/previews/stack-home.webp`) and `assets/previews/stack-ledger.webp` (the investment section). The live page was checked for the corresponding homepage heading on 2026-09-26. Fresh browser capture was unavailable. The preview is a tour of captured sections, not an uninterrupted full-page recording; the caption says “Homepage highlights / Captured sections.” The repeated navigation at the top of the second capture is clipped in CSS. The strip moves down and back inside a fixed 4:3 viewport over 12 seconds. That earlier investment panel occupied a full viewport, aligns with the top at the end of the sweep, and holds there for three seconds. The moving strip is absolutely positioned so it cannot expand its viewport. Endpoints are recomputed on image load and layout resize. The original capture itself ends midway through the lower company spending list; rows absent from that capture require a new image and are not fabricated. Images are never stretched.

The generated datacenter illustration has a centered scale animation from 1 to 1.18 and back on a continuous 13-second loop with no endpoint holds. Its text does not move. Both visual tours have Pause controls, stop when offscreen or the tab is hidden, and default to static with reduced motion. Explicit Play can opt into movement.

## Field Catalog theme blending

The current artboard uses the original `assets/previews/field-catalog.webp` (1440 × 810), centered inside a 4:3 frame. The frame background is `var(--paper)`, so it matches the light or dark page. A CSS alpha mask fades the upper and lower 4% of the native image to transparency. The screenshot’s center and its proportions are preserved. The earlier `field-catalog-wide.webp` retains baked-in letterbox bars and is no longer used on the homepage.

## Confirmed education and credentials

Reed directly confirmed that his Master of Science in Electrical Engineering from California State University, Long Beach was awarded. This confirmation supersedes the earlier cautious “graduate study” wording based on a candidate list. His supplied LinkedIn screenshots support the expanded RF/microwave, signal integrity, test automation, chip bring-up, and modeling summary, plus these credential entries: RF Technology Certification (Besser Associates); S-Parameters for Signal Integrity, Advanced Gigabit Channel Design, and Essential Principles of Signal Integrity (Teledyne LeCroy); and the Fundamentals of Engineering Electrical and Computer Exam (NCEES). The FE entry is presented as an examination, not a professional engineering license. No PE or EIT status is inferred.

The current role and awarded degree remain visible. An always-visible “Expertise & credentials” grid shows the technical background, education (California State University, Long Beach, and UCLA Extension coursework), and the credential list; the hero carries the title and employer, so About’s first sentence does not repeat them. Per Reed’s instruction, no employment, education, or credential dates or years are shown. Credential IDs and screenshot UI are not published.

## Earlier SVG layer introductions (superseded by refined chapters)

The earlier Gradient Ascent and Stack Ledger previews used the same 1200 × 900 format: project introduction on the left, native SVG layer artwork on the right, and a synchronized active-layer label below the introduction. The older scrolling screenshot tour is no longer on the homepage. There is no longer an investment screenshot to clip.

- `assets/previews/gradient-layers.svg`: eight native layers from the previously documented Gradient Ascent export. The headline is adapted directly from Reed’s supplied project screenshot: “Learn to work with AI, from a question to a workforce.”
- `assets/previews/stack-layers.svg`: five native layers extracted from Stack Ledger’s public homepage. The native paths, symbols, and layer colors are preserved. Its headline is the project’s “A public record of the AI buildout.”
- Names and short descriptions come from each native layer’s own labels. The SVG geometry is preserved; label leader lines and tiny repeated labels are removed for legibility.
- `assets/previews/layer-preview-provenance.json` records both sources and editorial changes. These are locally adapted project illustrations, not screenshots or recordings.

The same controller steps through both previews at 800 ms per layer, then reverses the sequence. Only one layer is active at a time. The readout follows it without live screen-reader announcements. Reduced motion defaults to static; explicit Play can opt in. Each preview remains a single link to the original project, with its Pause control outside the link.


## Approved refined chapters

The current homepage uses consistent project copy/preview placement, stacking below 1100px in DOM reading order. Layer introductions use responsive HTML copy beside native SVG stacks within fixed 4:3 frames; the standalone `gradient-layers.svg` and `stack-layers.svg` files document the earlier illustration treatment. The active label changes every 800ms, while the explanatory caption remains stable.

The wildlife gallery is wider, supporting headings are quieter, and the datacenter band is shorter. The heading reads “Senior Staff Engineer” with normal spaces. The hero’s role line includes Southern California (Reed approved this with the new hero on 09/26/2026); the footer also keeps the location. The datacenter disclosure remains in alt text rather than a visible caption. Its motion button appears on hover-capable pointer hover or keyboard focus. Reduced-motion behavior remains in place.

The header uses sun/moon action icons with accessible labels indicating the destination theme. Explicit selection switches between light and dark and saves the preference. An existing system preference is honored until the visitor selects a theme.


## Home-screen icon

`apple-touch-icon.png` is an opaque 180 × 180 PNG for iPhone/iPad home-screen bookmarks. Its editable source is `assets/home-icon.svg`: near-white RO lettering and a gold vertical rule on black. The artwork uses vector paths and no external font. iOS applies its own corner mask. The suggested home-screen name is Reed Osaki. The existing browser favicon remains `assets/mark.svg`.


## Signal Lab harmonics

Spectral lines overlaid on the existing filter response plot show H1, H3, H5, H7, H9, H11, H13, and H15 at 250, 750, 1250, 1750, 2250, 2750, 3250, and 3750 Hz. Dashed input lines and teal filtered lines share the fixed frequency coordinates and −60 to +3 dB display range with the gold gain curve. Spectral levels are 20 log10 of peak amplitude relative to unity; gain is an output/input ratio. Values below −60 dB stop at the display floor. Input amplitudes are the exact one-sided discrete Fourier coefficients for the 32-sample 50% duty square, 4/(32 sin(pi h/32)); filtered amplitudes multiply these by the digital biquad magnitude at each frequency. Even harmonics vanish. Values were independently verified against the settled time-domain waveform DFT across 422 filter states.
