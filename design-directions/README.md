# Portfolio design review

Three proposed layouts at `https://reedos.github.io/design-directions/`. The existing root homepage remains unchanged while Reed chooses a direction.

- **A / Studio:** split introduction, two featured tools, three compact project rows, and a composed photography section. Recommended for balancing engineering and photography.
- **B / Technical Index:** concise introduction and a compact index of all five projects, with a selectable desktop preview. Mobile keeps small previews beside each entry and direct outbound links.
- **C / Field Journal:** a 4:3 photographic opening, editorial project spreads, and a 3:4 / 4:3 photographic composition.

Use `?direction=studio`, `?direction=index`, or `?direction=journal`. Add `&theme=light` or `&theme=dark` to share a specific appearance. The appearance control also supports device preference and remembers explicit choices under the separate `reed-design-theme` storage key.

The proposed RO monogram is original typography related to the RW mark on Reed’s wildlife site: Barlow Condensed, paired initials, and a neutral vertical rule. It does not change that site's RW identity. The header uses a restrained translucent surface and backdrop blur, with an opaque fallback.

Only 3:4 and 4:3 frames are used for standalone wildlife photographs. The Alpine ibex asset is natively 3:4. The fox and flycatcher are 3:2 source images displayed with conservative 4:3 crops, consistent with the wildlife site's existing gallery. The fox uses right alignment; the flycatcher is centered. Originals are unchanged. Project screenshots and scientific figures preserve their own geometry and colors in both themes.

All three studies retain five projects, primary and source links, the wildlife site, About, Contact, and noindex directives. Some project copy is shortened for comparison; the existing CONTENT.md remains the source of biography and image provenance. The proposal controls appear only on this review page.

These are design studies for selection, not a completed replacement homepage. Browser rendering was not available in the authoring session; structure, asset references, script syntax, and theme/frame rules were checked from source.
