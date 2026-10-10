import { env } from "cloudflare:workers";
export function GET() {
  const id = env.GA_MEASUREMENT_ID;
  return Response.json({measurementId: id && /^G-[A-Z0-9]+$/.test(id) ? id : null}, {headers: {"Cache-Control": "no-store"}});
}
