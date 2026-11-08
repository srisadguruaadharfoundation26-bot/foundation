// Only acknowledge success when the endpoint confirms that it recorded the enquiry.
export async function submitEnquiry(url, payload, { fetchImpl = fetch, signal } = {}) {
  if (!url) throw new Error("Contact endpoint is not configured.");
  const response = await fetchImpl(url, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    signal,
  });
  if (!response.ok || response.type === "opaque") throw new Error("Submission could not be confirmed.");
  const result = await response.json();
  if (result.result !== "success") throw new Error("The service could not record the enquiry.");
  return result;
}
