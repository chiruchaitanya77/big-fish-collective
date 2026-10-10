export class RequestError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
export function validateRequest(request: Request) {
  const origin = request.headers.get("origin");
  if ((origin && origin !== new URL(request.url).origin) || request.headers.get("sec-fetch-site") === "cross-site") {
    throw new RequestError(403, "Please submit this form from our website.");
  }
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    throw new RequestError(415, "Please submit a JSON request.");
  }
}
export async function readJson(request: Request, limit = 20000) {
  if (Number(request.headers.get("content-length")) > limit) throw new RequestError(413, "Your enquiry is too long.");
  const reader = request.body?.getReader();
  if (!reader) throw new RequestError(400, "Please check your submission.");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const {done, value} = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > limit) { await reader.cancel(); throw new RequestError(413, "Your enquiry is too long."); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  try { return JSON.parse(new TextDecoder().decode(bytes)); }
  catch { throw new RequestError(400, "Please check your submission."); }
}
export async function digest(value: string) {
  const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(hash), b => b.toString(16).padStart(2, "0")).join("");
}
// Shared database counter: a conditional UPSERT makes the limit atomic across Workers.
export async function rateLimit(db: D1Database, scope: string, identity: string, limit: number, windowSeconds: number) {
  const now = Math.floor(Date.now() / 1000);
  const window = Math.floor(now / windowSeconds);
  const key = await digest(`${scope}:${window}:${identity}`);
  const result = await db.prepare(`INSERT INTO request_limits (key, count, expires_at) VALUES (?, 1, ?)
    ON CONFLICT(key) DO UPDATE SET count = count + 1 WHERE count < ? RETURNING count`)
    .bind(key, (window + 1) * windowSeconds, limit).first();
  await db.prepare("DELETE FROM request_limits WHERE expires_at < ?").bind(now).run();
  if (!result) throw new RequestError(429, "Too many submissions. Please try again later.");
}
export function requestFailure(error: unknown) {
  if (error instanceof RequestError) return Response.json({error: error.message}, {status: error.status, headers: {"Cache-Control": "no-store", ...(error.status === 429 ? {"Retry-After": "3600"} : {})}});
  console.error("Request failed", {type: error instanceof Error ? error.name : "UnknownError"});
  return Response.json({error: "We could not submit your enquiry right now. Please try again shortly."}, {status: 503, headers: {"Cache-Control": "no-store"}});
}
