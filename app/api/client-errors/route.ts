import { env } from "cloudflare:workers";
import { getRawDb } from "@/db";
import { notifySuperAdmin } from "@/lib/ops-alerts";
import { readJson, requestFailure, validateRequest, RequestError } from "@/lib/request-security";

export async function POST(request: Request) {
  try {
    validateRequest(request);
    const value = await readJson(request, 2048);
    if (!value || typeof value.message !== "string" || value.message.length < 1 || value.message.length > 600) throw new RequestError(400, "Invalid client error report.");
    const path = typeof value.path === "string" ? value.path.slice(0, 160) : "unknown";
    const category = typeof value.category === "string" && /^[a-z0-9_-]{1,50}$/i.test(value.category) ? value.category : "client-error";
    const message = `Client error on ${path}: ${value.message.slice(0, 600)}`;
    await notifySuperAdmin(getRawDb(), env, category, message);
    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return requestFailure(error);
  }
}
