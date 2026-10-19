import fs from "node:fs";
import { createHash } from "node:crypto";
import assert from "node:assert/strict";

// Pin the client-approved payment source and exact QR/card bytes.
// These are integrity checks, not a verification of bank account ownership.
const hashes = JSON.parse(fs.readFileSync("security/payment-integrity.json", "utf8"));
export function verifyPayment(deployed = false) {
  for (const [file, expected] of Object.entries(hashes)) {
    const target = deployed && file.startsWith("public/") ? file.replace("public/", "dist/") : file;
    let buf = fs.readFileSync(target);
    if (file.endsWith(".svg")) {
      buf = Buffer.from(buf.toString("utf8").replace(/\r\n/g, "\n"), "utf8");
    }
    const actual = createHash("sha256").update(buf).digest("hex");
    assert.equal(actual, expected, `Payment data changed: ${target}. Verify the recipient and review the integrity baseline before rebuilding.`);
  }
}
verifyPayment();
console.log("Client payment data integrity verified.");
