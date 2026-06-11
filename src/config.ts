try {
  const dotenv = await import("dotenv");
  dotenv.config();
} catch {
  // Not running in Node.js (e.g. Cloudflare Workers) — env vars come from runtime bindings
}

const missing: string[] = [];

if (!process.env.API_KEY) missing.push("API_KEY");
if (!process.env.GITHUB_TOKEN) missing.push("GITHUB_TOKEN");

if (missing.length > 0) {
  throw new Error(
    `Missing required env vars: ${missing.join(", ")}. ` +
    `Set them in opencode.json under mcpServers.job-board.env or in .env file.`
  );
}

export const API_KEY = process.env.API_KEY as string;
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN as string;
