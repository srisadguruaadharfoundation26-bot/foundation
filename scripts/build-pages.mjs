import fs from "node:fs";
import { createHash } from "node:crypto";

// Real HTML entry files work on ordinary static hosting without SPA rewrites.
const pages = [
  {
    name: "index",
    title: "Sri Sadguru Aadhar Foundation | Senior Citizen Care Home & Rehabilitation in Bengaluru",
    description: "Sri Sadguru Aadhar Foundation is a registered charity trust and senior citizen care home in Kalena Agrahara, Bengaluru. Providing compassionate elderly care, assisted living, medical rehabilitation, and daily dignity since 2012.",
    canonical: "https://www.srisadguruaadharfoundation.org/",
  },
  {
    name: "about",
    title: "About Us | Sri Sadguru Aadhar Foundation - Elder Care Trust in Bengaluru",
    description: "Learn about Sri Sadguru Aadhar Foundation's history, mission, and compassionate senior citizen care in Bengaluru. Restoring strength and dignity since 2012.",
    canonical: "https://www.srisadguruaadharfoundation.org/about.html",
  },
  {
    name: "services",
    title: "Our Services | Senior Citizen Care & Rehabilitation | Sri Sadguru Aadhar Foundation",
    description: "Comprehensive elder care services including 24/7 assisted living, nutritious meals, medical rehabilitation, social engagement, and healthcare support in Bengaluru.",
    canonical: "https://www.srisadguruaadharfoundation.org/services.html",
  },
  {
    name: "gallery",
    title: "Photo & Video Gallery | Sri Sadguru Aadhar Foundation Bengaluru",
    description: "Browse photos and video walkthroughs of Sri Sadguru Aadhar Foundation senior care home, clean living spaces, peaceful gardens, and joyful community moments.",
    canonical: "https://www.srisadguruaadharfoundation.org/gallery.html",
  },
  {
    name: "contact",
    title: "Contact Us & Directions | Sri Sadguru Aadhar Foundation Kalena Agrahara",
    description: "Connect with Sri Sadguru Aadhar Foundation in Kalena Agrahara, Bengaluru. Call +91 81479 42784, send a WhatsApp message, or visit our senior care home.",
    canonical: "https://www.srisadguruaadharfoundation.org/contact.html",
  },
];

const template = fs.readFileSync("dist/index.html", "utf8").replace(
  /<(script|link)\b[^>]*(?:src|href)="(\.\/assets\/[^" ]+\.(?:js|css))"[^>]*>/g,
  (tag, _element, url) => {
    const integrity = createHash("sha384").update(fs.readFileSync(`dist/${url}`)).digest("base64");
    return tag.replace(/\s+crossorigin(?:="[^"]*")?/, "").replace(/>$/, ` integrity="sha384-${integrity}" crossorigin="anonymous">`);
  },
);

for (const page of pages) {
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, `<meta name="description" content="${page.description}" />`)
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${page.canonical}" />`)
    .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${page.title}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${page.description}" />`)
    .replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${page.canonical}" />`)
    .replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${page.title}" />`)
    .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${page.description}" />`);

  fs.writeFileSync(`dist/${page.name}.html`, html);
}
