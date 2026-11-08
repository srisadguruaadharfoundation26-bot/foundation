# Performance and compatibility review — 8 November 2026

The working project remains in `sai sadguru`. The separately selected `sadghuru` folder was empty.

## Changes

- All 56 gallery photos have 400px and 800px WebP previews selected through `srcset` and `sizes`. The full-resolution viewer still loads the untouched originals. The 400px preview set totals 1,579,680 bytes versus 11,728,166 original bytes: an 86.5% reduction for that preview size.
- Gallery previews are lazy-loaded and decoded asynchronously. Brochure images are lazy-loaded and reserve their dimensions. The healthcare photo uses a smaller WebP copy; the hero retains its original quality.
- Pages are loaded on demand, and production fonts are preloaded. The main entry script decreased from about 292 KB to 240 KB before compression. Page and shared component chunks load as needed; this is not a measurement of total page traffic or real-world load time.
- Gallery animation pauses outside the viewport and when the browser tab is hidden. Reduced-motion users get still, horizontally scrollable rows. Touch devices avoid expensive hover/frosted-header effects. Scroll state updates are grouped into animation frames.
- Fixed mobile input font sizing, short-landscape menu scrolling, section-link offsets after lazy page loading, modified-click handling on links, and simultaneous background/modal video audio.
- Contact submissions now require a readable successful acknowledgement. Network failures, timeouts, opaque responses, invalid JSON and service errors no longer show a false success message. Typed data remains available for retry or WhatsApp. The configured service must support CORS and return `{ "result": "success" }` after recording the enquiry.
- Static-host cache rules and Apache text compression are included. Payment-source integrity checks remain in place.

## Validation

Production pages were checked at widths 320, 360, 390, 768, 1024, 1280 and 1920: 35 page/width combinations, with no horizontal overflow or broken loaded images. Short-landscape navigation, mobile menu/Escape, gallery filters and original-image viewing, video selection/modal playback, donation method switching, copy controls and cross-page donation navigation were also checked.

`npm run build` and `npm run check` verify deployment files, responsive preview assets, a gallery image-size budget, lazy chunk references, payment integrity, and contact response/error handling. Contact network tests use mocks; no messages were sent. Real Google Apps Script delivery, production HTTPS headers, slow-network timings and physical iOS/Android browser behavior must be verified on the deployed host. No claim is made that every device or browser has been tested.

## Updating photos

After changing `src/media.json`, run `python scripts/optimize-media.py` with Pillow installed. The generated previews and `src/image-assets.json` are included in the project; deployment builds require only Node/npm. Then run `npm run build` and `npm run check`.
