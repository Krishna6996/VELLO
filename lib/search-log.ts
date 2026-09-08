import "server-only";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

interface UnmatchedEntry {
  query: string;
  at: string;
}

const file = path.join(process.cwd(), ".vello", "unmatched-queries.json");

/**
 * Records a search that found nothing. In development this appends to
 * .vello/unmatched-queries.json; it is our demand signal for what to stock next.
 */
export async function logUnmatched(query: string): Promise<void> {
  if (process.env.NODE_ENV !== "development") return;
  const trimmed = query.trim();
  if (!trimmed) return;

  await mkdir(path.dirname(file), { recursive: true });
  let entries: UnmatchedEntry[] = [];
  try {
    const parsed: unknown = JSON.parse(await readFile(file, "utf8"));
    if (Array.isArray(parsed)) entries = parsed as UnmatchedEntry[];
  } catch {
    entries = [];
  }
  entries.push({ query: trimmed, at: new Date().toISOString() });
  await writeFile(file, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
}
