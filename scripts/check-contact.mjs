import assert from "node:assert/strict";
import { submitEnquiry } from "../src/contact-submit.js";

// No messages are sent: exercise failure and acknowledgement handling with mocks.
const payload = { firstName: "Test" };
let request;
await submitEnquiry("https://example.test/contact", payload, { fetchImpl: async (_url, options) => {
  request = options;
  return { ok: true, type: "cors", json: async () => ({ result: "success" }) };
} });
assert.equal(request.mode, "cors");
assert.deepEqual(JSON.parse(request.body), payload);
for (const response of [
  { ok: false },
  { ok: true, type: "opaque" },
  { ok: true, json: async () => ({ result: "error" }) },
  { ok: true, json: async () => { throw new Error("Invalid JSON"); } },
]) await assert.rejects(submitEnquiry("https://example.test/contact", payload, { fetchImpl: async () => response }));
await assert.rejects(submitEnquiry("https://example.test/contact", payload, { fetchImpl: async () => { throw new Error("Offline"); } }));
console.log("Contact checks passed: only confirmed responses succeed; HTTP, opaque, service, invalid JSON and offline failures reject.");
