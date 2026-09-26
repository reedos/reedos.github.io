# Reed Cameron Osaki

A static personal hub for **https://reedos.github.io**. HTML, one CSS file, and a small navigation script. No build, package manager, server runtime, analytics, or external font requests. The site remains readable and navigable without JavaScript.

## Review preview

The site is published for feedback at **https://reedos.github.io/**. Both HTML pages include `noindex, nofollow, noimageindex`; no sitemap or canonical tag is included during review. This asks supporting search engines to omit the preview. The URL and repository are public and do not require sign-in.

Do not add a root `robots.txt` with `Disallow: /`: crawlers must be able to read the `noindex` tag, and the same hostname also serves Reed’s existing project sites. When Reed is ready for search discovery, remove the robots tag from `index.html` and restore `<link rel="canonical" href="https://reedos.github.io/">`. Keep the 404 page excluded from indexing. See [Google’s noindex documentation](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

For feedback updates, edit the static files, commit, and push to `main`. GitHub Pages republishes the root automatically. No local preview server or Tailscale connection is needed to view the published site.

## Publish on GitHub Pages

1. Create or use the `reedos/reedos.github.io` repository. Copy the **contents** of this folder into the repository root, including `.nojekyll` and `assets/`. Commit to `main`.
2. In the repository, open **Settings → Pages → Build and deployment**.
3. Choose **Deploy from a branch**, select **main** and **/(root)**, and save.
4. Wait for the Pages deployment to complete, then visit **https://reedos.github.io**.

Alternatively, put all the files inside `/docs` and choose **main /docs** as the publishing source. The public address stays the same. The 404 page uses root-relative links so missing nested paths still load the stylesheet. No `CNAME` is needed.

Official instructions: [create a Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) and [choose the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Preview locally

Open `index.html` directly, or, if Python is installed, run this optional preview command from this folder:

```sh
python -m http.server 8000
```

Visit `http://localhost:8000`. Python is only for local preview; GitHub Pages needs no runtime. Preview `404.html` through HTTP to resolve its root-relative stylesheet.

## Project previews, photos, and contact

The layout uses a full-bleed photographic hero, wide Barlow display type, and five individual project scenes. Previews have no surrounding card frames; each scene has one outlined primary action and a Source link. Scenes stack into a natural single column on phones. All controls keep visible keyboard focus, navigation remains available without JavaScript, and reduced-motion preferences disable the brief hover transitions. The About and Contact sections remain compact.

Every project has a clickable visual tied to the real app: RLC response, Smith matching, Gradient Ascent’s technique map, infrastructure spending charts, and Field Catalog’s photo library. Three are compressed screenshots; the technique map is an SVG export. The Smith figure is a self-contained SVG with exact analytical geometry checked against the corrected RF tool, labeled resistance/reactance lines, and a static example load. Its results are readable HTML below the plot. All five are local, load lazily, and require no live embed. Sources, captured views, and refresh instructions are recorded in [CONTENT.md](CONTENT.md).

Five photographs are **Reed’s own published wildlife images**, sourced from his `wildlife-site` repository: red fox, vermilion flycatcher, Alpine ibex, American robin, and great blue heron. Compressed local WebP files total about 364 KiB. The source records, exact alt text, and swap instructions are in [CONTENT.md](CONTENT.md). No stock photo placeholders remain.

Keep hero and Field replacements near 1920px wide and under 400 KB each; preserve filenames or update every reference. Update `width`, `height`, and `alt` to match the actual photograph. Check both phone and desktop crops. CSS uses black contrast scrims; recheck contrast when replacing photos. Aim for at least 4.5:1 for body text and 3:1 for large headings.

The About section includes a compact experience and education block with a LinkedIn link. Public sources support the displayed affiliation and coursework; exact job titles, earlier roles, and completed degrees can be filled in from Reed’s confirmation. See `CONTENT.md` for the sourcing limits.

`hello@` is a labeled, non-clickable placeholder. Replace it with a verified address as documented in `CONTENT.md`. Do not publish an invented email. Update the static footer year in both HTML files when needed.

## Outbound URLs

| Destination | Live page | Source |
| --- | --- | --- |
| EE Labs | https://reedos.github.io/ee-labs/ | https://github.com/reedos/ee-labs |
| RF Lab Reference | https://reedos.github.io/rf_lab_reference/ | https://github.com/reedos/rf_lab_reference |
| Gradient Ascent | https://reedos.github.io/gradient_ascent/ | https://github.com/reedos/gradient_ascent |
| Stack Ledger | https://reedos.github.io/stack_ledger/ | https://github.com/reedos/stack_ledger |
| Field Catalog | https://github.com/reedos/field-catalog/releases | https://github.com/reedos/field-catalog |

- GitHub profile: https://github.com/reedos
- Wildlife photography: https://reedos.github.io/wildlife-site/index.html
- Instagram: https://www.instagram.com/reed.wildlife.photography/
- LinkedIn: https://www.linkedin.com/in/reed-osaki/

Links open in the same tab; users can choose to open a new one. Project counts are supplied editorial copy, not live statistics. Update them in `index.html` when the projects change.

## Typography and files

The interface uses local Latin-subset Barlow 400/500 and IBM Plex Mono 400 from Google Fonts. Barlow Condensed 600 remains available in the assets but is not loaded by the current design. Their SIL Open Font License files are included in `assets/fonts/`. The map preview embeds its native DM Sans 600 font; its OFL is also included in `assets/fonts/`. Keep those licenses with the fonts.

`index.html` contains all content. `styles.css` contains all styling and responsive rules. `main.js` handles only the mobile menu, Escape, focus, and closing after navigation. `404.html` is the matching error page. `.nojekyll` disables Jekyll processing. `CONTENT.md` records photo provenance, biography sources, and the remaining email placeholder. No build or installation step is required.
