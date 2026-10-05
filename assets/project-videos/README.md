# Project video previews

These clips reuse Reed's October 2026 portfolio reel captures, rendered from the
actual Photon to Photo and Guardian Ring applications. No sound or cursor.

- `photon-to-photo-v1.mp4`: camera model and cutaway, aperture and sensor, then
  the light-to-photo sequence. 7.10 seconds.
- `guardian-ring-v1.mp4`: geostationary ring, satellite, light-focus demo, and
  rising plume from the revised v2 reel. 7.27 seconds. Ends before the reel's
  dissolve to the wildlife gallery.
- Matching `*-poster-v1.webp` files provide static previews before playback and
  for visitors who prefer reduced motion.

Exported from the reel's original 1920 × 1080 PNG sequences at 30 fps to
1280 × 720 H.264, YUV 4:2:0, CRF 23, with fast-start metadata and no audio.
The Photon clip uses all 105 camera frames and the first 108 shot frames; the
Guardian clip uses the first 218 frames of the revised Guardian sequence.
Brief fades at the start and end soften the loop. The reel's large title cards
are omitted because the surrounding portfolio card already names each project.

Playback is managed by `main.js`: preload near the viewport, play only while at
least 20% visible, pause in a hidden tab, and honor the card's pause button.
Reduced-motion visitors see the poster until they explicitly press Play video.
