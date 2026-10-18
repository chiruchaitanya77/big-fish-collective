import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const config = fileURLToPath(new URL("../dist/server/wrangler.json", import.meta.url));

// The Vite dev server uses the creator-local placeholder D1 binding from the
// generated Worker config, while hosting deployments use wrangler.hosting.json.
// Keep both local stores current so `pnpm db:local` works for either preview.
const configNeedsBuild = !existsSync(config) || !readFileSync(config, "utf8").includes('"migrations_dir":"../../drizzle"');
if (configNeedsBuild) {
  const build = spawnSync("pnpm", ["run", "build"], { cwd: root, stdio: "inherit" });
  if (build.status !== 0) process.exit(build.status ?? 1);
}

const result = spawnSync("pnpm", ["exec", "wrangler", "d1", "migrations", "apply", "DB", "--local", "--config", config, "--persist-to", ".wrangler/state"], { cwd: root, stdio: "inherit" });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
