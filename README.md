# Reed Cameron Osaki

A static personal hub for **https://reedos.github.io**. HTML, one CSS file, and small JavaScript files. No build, package manager, server runtime, analytics, or external font requests. Content and navigation remain available without JavaScript.

## Review preview

The main page, error page, and archived design studies carry `noindex, nofollow, noimageindex`. The URL and repository are public; these tags request exclusion from supporting search engines, not sign-in protection. No sitemap or canonical tag is included during review.

**Cinematic Chapters** is the selected live layout. Older `layout` query parameters now show chapters as well. Use `?theme=dark` or `?theme=light` for a specific appearance. Dark is the default unless a theme has been saved; Auto follows the device. Earlier studies remain in [design-directions/](design-directions/), and the photo comparison remains at [photo-options.html](photo-options.html).

For feedback updates, edit, commit, and push to `main`. Pages republishes the root automatically. No Tailscale connection is needed. Do not add a root `robots.txt` with `Disallow: /`: crawlers need to read the noindex tag, and this hostname also serves Reed’s project sites. When ready for search discovery, remove the robots tag from `index.html` and restore `<link rel="canonical" href="https://reedos.github.io/">`. Keep error and study pages excluded. [Google’s noindex documentation](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

## Publish on GitHub Pages

1. Copy this folder’s contents, including `.nojekyll` and `assets/`, into the root of `reedos/reedos.github.io`. Commit to `main`.
2. Open **Settings > Pages > Build and deployment**.
3. Choose **Deploy from a branch**, select **main** and **/(root)**, and save.
4. Visit **https://reedos.github.io/** after deployment.

Alternatively, place the files in `/docs` and select **main /docs**. The 404 page uses root-relative links. No `CNAME` is needed. [GitHub Pages instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

## Preview locally

Open `index.html` directly, or run this optional command from the site folder if Python is installed:

```sh
python -m http.server 8000
```

Visit `http://localhost:8000`. Python is only for local preview. Preview `404.html` through HTTP so its root-relative links resolve.

## Design and content

All five sites are personal projects created outside Reed’s professional work. One Personal Projects section groups them into Engineering Tools (EE Labs, RF Reference), Research & Guides (Gradient Ascent, Stack Ledger), and Photography Tools (Field Catalog). The grouped navigation and category labels appear throughout the project section. Professional background is kept in About; the photography collection has its own Field section. Public-facing copy uses American English.

The full-height hero uses Reed’s landscape mountain photograph on larger screens and his portrait mountain photograph on phones. The name sits over a controlled fade. Display type is Barlow Condensed 600; body type is Manrope, matching the wildlife site’s font families. Restrained gold accents use `#e6ba82` in dark mode and `#80531c` in light mode. The translucent header contains the RO monogram, section navigation, and theme control.

All five project artboards are **1200 × 900 (4:3)**. EE Labs shows a working Signal Lab filter example; RF sweeps calculated load impedances on the verified Smith chart, updating its vector, VSWR circle, and readouts together; Gradient Ascent uses the native level stack; Stack Ledger scrolls through captured homepage highlights; Field Catalog centers its native screenshot in a theme-colored 4:3 frame, with transparent fades at its top and bottom edges. These are local assets and a small mathematical demonstration, not embedded apps. EE Labs defaults to a high-pass filter with automatic cutoff sweeping while visible, plus manual controls. Its axes remain fixed: 0–4 kHz linear frequency, −60 to +3 dB gain, and ±2.5 waveform amplitude. Gradient Ascent automatically demonstrates its native layer hover effect while visible, with no mouse pointer, a Pause control, and reduced-motion support. Hover no longer suppresses the loop. The technical previews allow explicit Play when reduced motion disables automatic playback. Keep technical diagrams uncropped and undistorted.

Field uses a swipeable 4:3 gallery: red fox, American robin, then vermilion flycatcher. Photos advance automatically every four seconds while visible. Touch, focus, hover, or manual browsing stops playback for the visit. The gallery has no visible transport buttons; swiping and arrow keys remain available. Reduced-motion preferences disable automatic playback. About retains Reed’s portrait. The symmetric datacenter scene is visibly labeled as a generated illustration and does not depict an employer facility. Its image slowly zooms from 1× to 1.18× and back continuously over 13 seconds, without endpoint holds; overlaid text stays still. The captured Stack Ledger tour takes 12 seconds and holds the investment capture aligned at the top for three seconds. Both pause offscreen or when the tab is hidden, offer pause controls, and respect reduced motion. The footer groups identity, section navigation, and profile links, without design-review controls.

[CONTENT.md](CONTENT.md) records sources, exact replacement copy, contact links and biography limits. [Datacenter provenance](assets/images/datacenter-symmetry-PROVENANCE.md) contains the exact generation prompt. Original assets retained for archived studies are not all used on the current homepage.

## Replace images

Keep master photographs elsewhere. Use web-sized files, normally below 400 KB, and update the HTML `src`, actual `width`/`height`, and descriptive `alt`. Use only 3:4 or 4:3 standalone wildlife frames; CSS crops rather than stretches. The hero is a responsive full-screen scene, with separate portrait and landscape sources. Preserve subjects when checking phone and desktop crops.

Keep project artboards at 1200 × 900. Refresh screenshots from the real tools, preserve their native colors and geometry, and letterbox if their captured ratio differs. Generated or reconstructed technical visuals must remain clearly identified in the provenance. Check both themes, keyboard focus, reduced-motion behavior, and text contrast after replacement.

Contact links lead to LinkedIn and GitHub. No email address or placeholder is displayed. Update the static footer year when needed.

## Outbound URLs

| Destination | Live page | Source |
| --- | --- | --- |
| EE Labs | https://reedos.github.io/ee-labs/ | https://github.com/reedos/ee-labs |
| RF Lab Reference | https://reedos.github.io/rf_lab_reference/ | https://github.com/reedos/rf_lab_reference |
| Gradient Ascent | https://reedos.github.io/gradient_ascent/ | https://github.com/reedos/gradient_ascent |
| Stack Ledger | https://reedos.github.io/stack_ledger/ | https://github.com/reedos/stack_ledger |
| Field Catalog | https://github.com/reedos/field-catalog/releases | https://github.com/reedos/field-catalog |

- GitHub: https://github.com/reedos
- Wildlife photography: https://reedos.github.io/wildlife-site/index.html
- Instagram: https://www.instagram.com/reed.wildlife.photography/
- LinkedIn: https://www.linkedin.com/in/reed-osaki/

Project counts are supplied editorial copy, not live statistics. Update them in `index.html` when the projects change.

## Files and fonts

`index.html` holds content; `styles.css` holds all styling; `main.js` handles navigation, theme/layout controls, and the optional filter demonstration. `404.html` is the matching error page. `.nojekyll` disables Jekyll processing. `assets/` contains local images, previews, and fonts.

The main design uses Barlow Condensed 600 and Manrope, with IBM Plex Mono for technical labels. Barlow 400/500 remains for archived studies. Native Gradient Ascent exports embed DM Sans. SIL Open Font License files are included in `assets/fonts/`; retain them with the fonts.
