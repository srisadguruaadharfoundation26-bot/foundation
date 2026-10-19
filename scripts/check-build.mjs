import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { verifyPayment } from "./verify-payment.mjs";
verifyPayment(true);

// Verify deployment artifacts and local asset/link integrity, not component internals.
const pages = ["index", "about", "services", "gallery", "contact"];
for (const name of pages) {
  const html = fs.readFileSync(`dist/${name}.html`, "utf8");
  assert(html.includes('id="root"'), `${name}: React mount missing`);
  for (const tag of html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)="(\.\/assets\/[^" ]+\.(?:js|css))"[^>]*>/g)) {
    const expected = createHash("sha384").update(fs.readFileSync(path.join("dist", tag[1]))).digest("base64");
    assert(tag[0].includes(`integrity="sha384-${expected}"`), `${name}: missing or incorrect asset integrity`);
  }
  for (const match of html.matchAll(/(?:src|href)="(\.\/[^"#]+)"/g)) {
    assert(
      fs.existsSync(path.join("dist", match[1])),
      `${name}: missing ${match[1]}`,
    );
  }
}
const walk = (directory) =>
  fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
for (const file of walk("src").filter((name) => name.endsWith(".jsx"))) {
  const source = fs.readFileSync(file, "utf8");
  assert(
    !source.includes("dangerouslySetInnerHTML"),
    `${file}: raw HTML injection`,
  );
  for (const match of source.matchAll(
    /(?:src|href)=['"](assets\/[^'"#]+|[a-z]+\.html)(?:#[^'"]*)?['"]/g,
  )) {
    assert(
      fs.existsSync(path.join("dist", match[1])),
      `${file}: missing ${match[1]}`,
    );
  }
}
assert(fs.existsSync("dist/_headers"), "Static host security headers missing");
assert(fs.existsSync("dist/.htaccess"), "Apache security headers missing");
const media = JSON.parse(fs.readFileSync("src/media.json", "utf8"));
for (const item of [...media.photos, ...media.videos]) {
  assert(
    fs.existsSync(path.join("dist", item.src)),
    `Missing client media: ${item.src}`,
  );
}
assert(
  fs.existsSync("dist/assets/foundation/foundation-film.mp4"),
  "Foundation film missing",
);
assert(
  fs.existsSync("dist/assets/foundation/film-poster.jpg"),
  "Foundation film poster missing",
);
for (let i = 0; i < media.videos.length; i++) {
  assert(
    fs.existsSync(`dist/assets/foundation/clip-poster-${i + 1}.jpg`),
    "Video poster missing",
  );
}
assert(
  fs.existsSync("dist/assets/donation-qr-clear.svg"),
  "Clear donation QR missing",
);
for (const config of ["dist/_headers", "dist/.htaccess", "vercel.json"]) {
  assert(
    fs.readFileSync(config, "utf8").includes("media-src 'self'"),
    `${config}: media blocked by security policy`,
  );
}
console.log(
  `Verified 5 pages, ${media.photos.length} client photos, ${media.videos.length + 1} videos, posters, QR, and media security headers.`,
);
