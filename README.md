# Sri Sadguru Aadhar Foundation

Complete frontend-only React/Vite website reproduced from the accessible client reference. No backend, login, credentials, analytics, or collection of donor information.

Foundation copy uses only the supplied reference website. See `CONTENT-SOURCES.md` for the content review and the client-requested additions. The live reference required login during the 10 October review; previously saved captures of its five pages were used.

## Status

Includes Home, About us, Our services, Gallery, and Contact us, with the original logo, imagery, brochures, typography, blue/orange design, phone numbers, address, WhatsApp links, directions, and FOR HEALTH CARE links. Navigation and the gallery lightbox use React. The donation card contains the client-supplied QR images and exact bank details, with payment method buttons and copy controls. All fonts and images are local. The reference's ChatGPT access gate is not part of this public client website.

## Run

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Use Node.js 22.12+ or 24. Run commands from the project folder.

## Deploy

Upload **the contents of `dist/`** to your HTTPS website root (for example `public_html` on cPanel). It already contains all five HTML entry files and assets. No Node server or database is needed in production. Do not upload `src/` or `node_modules/` as the public website.

For hosting that builds from source, set the build command to `npm run build` and the output directory to `dist`. Netlify and Vercel configuration files are included. For Cloudflare Pages use the same build command/output directory. A root or subdirectory deployment can use the generated relative asset paths. Preserve the `.html` links.

`public/_headers` configures production security headers on compatible static hosts. `vercel.json` supplies equivalent headers on Vercel. The included `.htaccess` supplies headers on Apache with `mod_headers`. On other hosts configure equivalent HTTP response headers. Enable HTTPS; confirm headers after deployment. The development/preview servers do not apply these production headers.

The build generates `index.html`, `about.html`, `services.html`, `gallery.html`, and `contact.html`; these can be opened directly through a static server without SPA rewrites. Test by serving with `npm run preview`, not by opening HTML through `file://`.

## Media update — 9 October 2026

The gallery includes all 47 supplied JPEG photos, grouped into 23 spaces and 24 community moments. All five supplied videos appear together in a selectable playlist above the photos on both the home and gallery pages. Selecting another video replaces the current player, so two videos cannot play audio together. The home page shows six representative photos with a link to the complete gallery. Photo filters, a full-resolution viewer, previous/next buttons, and keyboard arrows are included. The hero uses the garden image as its full background, with a responsive gradient for readable text.

The home and Contact us pages include a contact form with required first name, last name, mobile number and email fields. Names, email and phone input are validated; the website prepares a visible enquiry draft and a WhatsApp link to the foundation's existing number. The visitor reviews and sends the message in WhatsApp. The form does not post to a server, store personal details, or claim an enquiry has been delivered. Editing a field clears the prepared draft to prevent sending stale details.

JPEG files retain their original bytes and resolution. Videos are MP4 files with their indexes moved to the beginning for progressive playback; their picture/audio streams were copied without recompression. Native controls support fullscreen and inline mobile playback. Videos load when requested rather than all downloading on page load. The main film's original resolution is 464 × 832; no artificial detail or HD quality is claimed. Hosting should support HTTP byte-range requests for video seeking (Vercel, Netlify, Cloudflare Pages, and ordinary Apache static hosting generally do).

The donation QR is a clean vector in `public/assets/donation-qr-clear.svg`. It was decoded from the original photo, regenerated, and independently decoded to verify the exact same UPI payload. No new recipient details were inferred. The original QR/card images remain available, and the bank details are unchanged. Media security policy allows only same-origin video playback.

## Edit files

- `src/pages/`: page composition and page-specific content.
- `src/components/`: shared about, service, healthcare, gallery, contact, and donation sections.
- `src/main.jsx`: shared header, navigation, footer, and accessible image dialog.
- `src/style.css`: reference styling, local fonts, responsive breakpoints, and donation controls.
- `src/refinements.css`: the updated foundation presentation, gallery, video, and donation styling.
- `src/media.json`: all client gallery photos, captions, categories, and additional videos.
- `public/assets/`: reference imagery, brochures, logo, and original client QR photos.
- `src/donation.js`: public donation account details.

Donation details live in `src/donation.js`. Both payment images are supplied unchanged by the client. The QR recipient has not been independently verified; verify it in a UPI app before client launch. There is no inferred UPI payment link. Frontend code and bank details are public by design. Never add secrets, credentials, or private donor data to frontend source.

A static frontend cannot validate donations, securely store submissions, send messages, or issue verified receipts. WhatsApp, calling, directions, and healthcare links open their intended external applications; the website does not silently submit messages. The site displays no unverified payment success or receipt.

## Payment and asset integrity

Production HTML includes SHA-384 Subresource Integrity hashes for its JavaScript and CSS. Browsers reject those resources if the bytes no longer match the HTML. The build also verifies SHA-256 hashes for the client-supplied bank-detail source, clean QR, and original payment photos against `security/payment-integrity.json`; `npm run check` verifies the deployed payment files and script/style hashes again. These checks detect accidental or unreviewed edits; they do not prove account ownership or protect against an attacker who can rewrite the entire hosting account and HTML. Keep hosting access protected and deploy over HTTPS with the included headers.

When the client intentionally changes payment details, verify the new recipient and QR payload first, review the changed files, then update the corresponding SHA-256 baseline in `security/payment-integrity.json`. Never automatically regenerate that baseline during builds. Donation data is public, and payment processing stays inside the donor's bank/UPI application.
