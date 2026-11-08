#!/usr/bin/env node
/**
 * Syncs the Markdown posts in content/blog/ (and their covers in content/blog/covers/)
 * to the blog through the site's own API.
 *
 *   node scripts/publish-blog-posts.mjs                 # dry run: shows what would happen
 *   node scripts/publish-blog-posts.mjs --covers        # add covers to already-published posts that have none
 *   node scripts/publish-blog-posts.mjs --send          # create new posts (published, with covers)
 *   node scripts/publish-blog-posts.mjs --send --draft  # create new posts unpublished
 *
 * Needs the dev server (or BASE_URL) running and ADMIN_PASS in .env.local.
 * Generate covers first with: node scripts/generate-blog-covers.mjs
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const args = new Set(process.argv.slice(2));
const send = args.has("--send");
const covers = args.has("--covers");
const draft = args.has("--draft");

const env = Object.fromEntries(
    readFileSync(join(root, ".env.local"), "utf8")
        .split("\n")
        .filter((l) => l.includes("=") && !l.trim().startsWith("#"))
        .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim().replace(/^["']|["']$/g, "")])
);
const adminPassword = env.ADMIN_PASS;
if ((send || covers) && !adminPassword) throw new Error("ADMIN_PASS missing from .env.local");

const parse = (file) => {
    const raw = readFileSync(file, "utf8");
    const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!m) throw new Error(`No frontmatter in ${file}`);
    const meta = {};
    for (const line of m[1].split("\n")) {
        const i = line.indexOf(":");
        meta[line.slice(0, i).trim()] = JSON.parse(line.slice(i + 1).trim());
    }
    return { ...meta, content: m[2].trim() };
};

const uploadCover = async (path, slug) => {
    const form = new FormData();
    form.append("file", new Blob([readFileSync(path)], { type: "image/png" }), `${slug}.png`);
    form.append("adminPassword", adminPassword);
    const res = await fetch(`${BASE_URL}/api/upload`, { method: "POST", body: form });
    const data = await res.json();
    if (!res.ok) throw new Error(`upload failed for ${slug}: ${data.error}`);
    return data.url;
};

// The list endpoint doesn't bump view counts (fetching a single post by slug does).
const published = await fetch(`${BASE_URL}/api/blogs`).then((r) => r.json());
const bySlug = new Map((Array.isArray(published) ? published : []).map((b) => [b.slug, b]));

const dir = join(root, "content/blog");
for (const name of readdirSync(dir).filter((f) => f.endsWith(".md")).sort()) {
    const slug = name.replace(/\.md$/, "");
    const post = parse(join(dir, name));
    const coverPath = join(dir, "covers", `${slug}.png`);
    const hasCover = existsSync(coverPath);
    const existing = bySlug.get(slug);

    if (existing) {
        if (existing.cover_image || !hasCover) {
            console.log(`ok     ${slug} (published${existing.cover_image ? ", has cover" : ", no cover file"})`);
            continue;
        }
        if (!covers) {
            console.log(`would  add cover → ${slug}  (run with --covers)`);
            continue;
        }
        const url = await uploadCover(coverPath, slug);
        const res = await fetch(`${BASE_URL}/api/blogs`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: existing.id, cover_image: url, adminPassword }),
        });
        const data = await res.json();
        console.log(res.ok ? `cover  ${slug}` : `FAILED ${slug}: ${data.error}`);
        continue;
    }

    if (!send) {
        console.log(`would  create ${slug}${hasCover ? " (with cover)" : ""}  (run with --send)`);
        continue;
    }
    const cover_image = hasCover ? await uploadCover(coverPath, slug) : null;
    const res = await fetch(`${BASE_URL}/api/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title: post.title,
            slug,
            excerpt: post.excerpt,
            content: post.content,
            tags: post.tags,
            cover_image,
            author: "Kabeer Ahmad",
            published: !draft,
            adminPassword,
        }),
    });
    const data = await res.json();
    console.log(res.ok ? `sent   ${slug} (${draft ? "draft" : "published"})` : `FAILED ${slug}: ${data.error}`);
}
