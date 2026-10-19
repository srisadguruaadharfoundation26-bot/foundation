import fs from "node:fs";
import { createHash } from "node:crypto";
// Real HTML entry files work on ordinary static hosting without SPA rewrites.
const pages = [
  ["index", "Home"],
  ["about", "About us"],
  ["services", "Our services"],
  ["gallery", "Gallery"],
  ["contact", "Contact us"],
];
const template = fs.readFileSync("dist/index.html", "utf8").replace(
  /<(script|link)\b[^>]*(?:src|href)="(\.\/assets\/[^" ]+\.(?:js|css))"[^>]*>/g,
  (tag, _element, url) => {
    const integrity = createHash("sha384").update(fs.readFileSync(`dist/${url}`)).digest("base64");
    return tag.replace(/\s+crossorigin(?:="[^"]*")?/, "").replace(/>$/, ` integrity="sha384-${integrity}" crossorigin="anonymous">`);
  },
);
for (const [name, title] of pages) {
  const html = template.replace(
    /<title>[^<]*<\/title>/,
    `<title>${title} | Sri Sadguru Aadhar Foundation</title>`,
  );
  fs.writeFileSync(`dist/${name}.html`, html);
}
