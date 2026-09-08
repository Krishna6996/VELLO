import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { concernSlugs } from "@/lib/catalog/concerns";
import type { ConcernSlug } from "@/lib/catalog/types";

export interface GuideMeta {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  authorReg: string;
  reviewer: string;
  reviewerReg: string;
  /** ISO dates. */
  published: string;
  updated: string;
  concerns: ConcernSlug[];
  sources: string[];
  readingMinutes: number;
  /** "Dr. Achal, MBBS" */
  byline: string;
}

export interface Guide extends GuideMeta {
  /** MDX body without frontmatter. */
  body: string;
}

const dir = path.join(process.cwd(), "content", "guides");

function requireString(data: Record<string, unknown>, key: string, slug: string): string {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Guide "${slug}" is missing "${key}" in its frontmatter`);
  }
  return value.trim();
}

function requireStrings(data: Record<string, unknown>, key: string, slug: string): string[] {
  const value = data[key];
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`Guide "${slug}" needs "${key}" to be a list of strings`);
  }
  return value as string[];
}

function toConcerns(values: string[], slug: string): ConcernSlug[] {
  return values.map((value) => {
    if (!(concernSlugs as readonly string[]).includes(value)) {
      throw new Error(`Guide "${slug}" names an unknown concern "${value}"`);
    }
    return value as ConcernSlug;
  });
}

function readingTime(body: string): number {
  const words = body
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

async function load(file: string): Promise<Guide> {
  const slug = file.replace(/\.mdx$/, "");
  const raw = await readFile(path.join(dir, file), "utf8");
  const { data, content } = matter(raw);
  const author = requireString(data, "author", slug);
  const authorReg = requireString(data, "authorReg", slug);
  return {
    slug,
    title: requireString(data, "title", slug),
    excerpt: requireString(data, "excerpt", slug),
    author,
    authorReg,
    reviewer: requireString(data, "reviewer", slug),
    reviewerReg: requireString(data, "reviewerReg", slug),
    published: requireString(data, "published", slug),
    updated: requireString(data, "updated", slug),
    concerns: toConcerns(requireStrings(data, "concerns", slug), slug),
    sources: requireStrings(data, "sources", slug),
    readingMinutes: readingTime(content),
    byline: `${author}, ${authorReg}`,
    body: content,
  };
}

let cache: Promise<Guide[]> | null = null;

/** Every guide, newest first. Read once per server process. */
export function getGuides(): Promise<Guide[]> {
  cache ??= (async () => {
    const files = (await readdir(dir)).filter((file) => file.endsWith(".mdx"));
    const guides = await Promise.all(files.map(load));
    return guides.sort((a, b) => b.published.localeCompare(a.published));
  })();
  return cache;
}

export async function getGuideBySlug(slug: string): Promise<Guide | undefined> {
  return (await getGuides()).find((guide) => guide.slug === slug);
}

export async function getGuidesForConcern(concern: ConcernSlug): Promise<Guide[]> {
  return (await getGuides()).filter((guide) => guide.concerns.includes(concern));
}

/** Guides matching any of the given concerns, without duplicates. */
export async function getGuidesForConcerns(concerns: readonly ConcernSlug[]): Promise<Guide[]> {
  const all = await getGuides();
  return all.filter((guide) => guide.concerns.some((concern) => concerns.includes(concern)));
}
