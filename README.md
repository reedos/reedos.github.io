# Reed Cameron Osaki

A static personal hub for **https://reedos.github.io**. HTML, one CSS file, and a small script for the menu and theme. No build, package manager, server runtime, analytics, or external font requests. Content and navigation remain available without JavaScript.

## Review preview

The site is published for feedback at **https://reedos.github.io/**. The main page, error page, and archived design studies carry `noindex, nofollow, noimageindex`. No sitemap or canonical tag is included during review. These tags ask supporting search engines to omit the preview; the URL and repository are public and do not require sign-in.

Do not add a root `robots.txt` with `Disallow: /`: crawlers must be able to read the `noindex` tag, and this hostname also serves Reed’s project sites. When Reed is ready for search discovery, remove the robots tag from `index.html` and restore `<link rel="canonical" href="https://reedos.github.io/">`. Keep the 404 and design studies excluded. See [Google’s noindex documentation](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

For feedback updates, edit the files, commit, and push to `main`. GitHub Pages republishes the root automatically. No Tailscale connection is needed.

## Publish on GitHub Pages

1. Copy this folder’s **contents**, including `.nojekyll` and `assets/`, into the root of `reedos/reedos.github.io`. Commit to `main`.
2. Open **Settings → Pages → Build and deployment**.
3. Choose **Deploy from a branch**, select **main** and **/(root)**, and save.
4. After deployment, visit **https://reedos.github.io/**.

Alternatively, place the files in `/docs` and select **main /docs**. The public address stays the same. The 404 page uses root-relative links. No `CNAME` is needed.

Official instructions: [create a Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) and [choose the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Preview locally

Open `index.html` directly, or run this optional command from the site folder if Python is installed:

```sh
python -m http.server 8000
```

Visit `http://localhost:8000`. Python is only for local preview. Preview `404.html` through HTTP so its root-relative links resolve.

## Layout, theme, and imagery

The Studio layout blends Reed’s mountain photograph into the name panel. EE Labs and RF Lab Reference have featured previews; Gradient Ascent, Stack Ledger, and Field Catalog follow as three compact rows. Field combines a 3:4 ibex portrait and a 4:3 flycatcher frame. About pairs a small portrait of Reed with his biography and background. A separate datacenter image is explicitly captioned **Datacenter · Generated illustration**; it is not a photograph of Reed’s workplace.

The translucent header uses an RO monogram and a collapsible phone menu. The theme button cycles Auto, Dark, and Light and saves the choice under `reed-hub-theme`. Auto follows the device and is the default. Share `?theme=dark` or `?theme=light` to open a specific appearance. Photographs and project previews retain their original colors in both themes. Controls include keyboard focus styles and phone tap targets; reduced-motion preferences suppress transitions.

Reed supplied the mountain and portrait JPEGs. They are copied byte-for-byte, already web-sized, with no GPS metadata found. Wildlife exports come from his public photography repository. Only 3:4 and 4:3 wildlife frames are used; cropping is done in CSS. Keep replacement photographs under about 400 KB, preserve filenames or update every reference, and update their actual `width`, `height`, and descriptive `alt`. Check the crop and text contrast in both themes at phone and desktop widths. Aim for 4.5:1 for body text and 3:1 for large headings.

All five project visuals link to the real project: RLC response, an analytically verified Smith figure, the actual Gradient Ascent map, infrastructure spending charts, and Field Catalog’s published library screenshot. They are local static assets, not live embeds. Keep technical diagrams uncropped and do not recolor or distort them. The Smith example has readable HTML values below its plot.

[CONTENT.md](CONTENT.md) records the image sources, exact alt text, replacement instructions, biography limits, and the remaining email TODO. [Datacenter provenance](assets/images/datacenter-PROVENANCE.md) includes the exact generation prompt. The earlier alternatives remain at [`design-directions/`](design-directions/) as review studies.

`hello@` is a labeled, non-clickable placeholder. Replace it only with a verified address. Update the static footer year when needed.

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

Links open in the same tab. Project counts are supplied editorial copy, not live statistics; update them in `index.html` when the projects change.

## Files and fonts

`index.html` holds the content, `styles.css` all styling and responsive rules, and `main.js` the mobile menu and theme controls. `404.html` is the matching error page. `.nojekyll` disables Jekyll processing. `assets/` holds the local photographs, illustration, previews, and fonts. No installation step is required.

The site uses local Latin-subset Barlow 400/500, Barlow Condensed 600, and IBM Plex Mono 400. The map embeds its native DM Sans 600. Their SIL Open Font License files are included in `assets/fonts/`; keep them with the fonts.
