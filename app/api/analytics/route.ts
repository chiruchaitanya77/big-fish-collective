import { getRawDb } from "@/db";
import { eventNames, pagePaths, recordEvent } from "@/lib/analytics";
import { readJson, rateLimit, validateRequest, requestFailure, RequestError } from "@/lib/request-security";
export async function POST(request: Request) {
  try {
    validateRequest(request);
    const value = await readJson(request, 1024);
    if (!value || !eventNames.includes(value.event) || !pagePaths.includes(value.path) || value.event.endsWith("_success")) throw new RequestError(400, "Invalid event.");
    const db = getRawDb();
    await rateLimit(db, "analytics", request.headers.get("cf-connecting-ip") || "unknown", 120, 60);
    await recordEvent(db, value.event, value.path);
    return new Response(null, {status: 204, headers: {"Cache-Control": "no-store"}});
  } catch (error) { return requestFailure(error); }
}
