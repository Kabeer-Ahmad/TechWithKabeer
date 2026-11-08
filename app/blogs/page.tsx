"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Search, X } from "lucide-react";
import { Blog } from "@/lib/supabase";
import { PageShell, PageHeader } from "../components/ui/PageShell";
import { cn } from "../lib/utils";

const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("/api/blogs");
                const data = await response.json();
                // API may return an error object or null on failure — coerce to array.
                setBlogs(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Unique tags (guard against rows with null/missing tags)
    const allTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags ?? [])));

    const q = searchQuery.toLowerCase();
    const filteredBlogs = blogs.filter((blog) => {
        const tags = blog.tags ?? [];
        const matchesTag = selectedTag ? tags.includes(selectedTag) : true;
        const matchesSearch = q
            ? blog.title.toLowerCase().includes(q) || blog.excerpt?.toLowerCase().includes(q) || tags.some((tag) => tag.toLowerCase().includes(q))
            : true;
        return matchesTag && matchesSearch;
    });

    return (
        <PageShell>
            <PageHeader
                eyebrow="Blog"
                title={
                    <>
                        Notes from the <em>workbench</em>.
                    </>
                }
                description="Write-ups on web development, applied AI and the tools I'm using right now."
            />

            <section className="mx-auto max-w-6xl px-5 md:px-8">
                {/* Search + tags */}
                <div className="flex flex-col gap-4 border-y border-line py-5 md:flex-row md:items-center">
                    <label className="relative w-full md:w-80 md:shrink-0">
                        <span className="sr-only">Search posts</span>
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dim" size={18} />
                        <input
                            type="text"
                            placeholder="Search by title, excerpt or tag…"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-xl border border-line bg-white/[0.02] py-3 pl-11 pr-10 text-fg placeholder:text-dim focus:border-accent focus:outline-none"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 text-dim hover:text-fg">
                                <X size={16} />
                            </button>
                        )}
                    </label>
                    {allTags.length > 0 && (
                        <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto mask-fade-x scrollbar-hide">
                            {[null, ...allTags].map((tag) => (
                                <button
                                    key={tag ?? "all"}
                                    onClick={() => setSelectedTag(tag)}
                                    className={cn(
                                        "shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                                        selectedTag === tag ? "border-fg bg-fg text-ink" : "border-line text-muted hover:border-line-strong hover:text-fg"
                                    )}
                                >
                                    {tag ?? "All"}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Posts */}
                <div className="py-12">
                    {loading ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="h-80 animate-pulse rounded-[20px] border border-line bg-white/[0.02]" />
                            ))}
                        </div>
                    ) : filteredBlogs.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-line-strong py-24 text-center">
                            <p className="font-serif text-3xl italic text-fg">Nothing here yet.</p>
                            <p className="mt-2 text-muted">
                                {selectedTag || searchQuery ? "No posts match those filters." : "Posts are on the way — check back soon."}
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {filteredBlogs.map((blog, index) => (
                                <motion.div
                                    key={blog.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <Link href={`/blogs/${blog.slug}`} className="group flex h-full flex-col panel p-3 transition-colors hover:border-line-strong">
                                        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface-2">
                                            {blog.cover_image ? (
                                                <Image
                                                    src={blog.cover_image}
                                                    alt={blog.title}
                                                    fill
                                                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                                />
                                            ) : (
                                                <span className="absolute inset-0 grid place-items-center font-serif text-7xl italic text-white/[0.06]">
                                                    {blog.title.charAt(0)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                                            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                                                <span>{formatDate(blog.created_at)}</span>
                                                <span>·</span>
                                                <span>{blog.views} views</span>
                                            </div>
                                            <h2 className="mt-3 line-clamp-2 text-xl font-medium tracking-tight text-fg">{blog.title}</h2>
                                            {blog.excerpt && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{blog.excerpt}</p>}
                                            <div className="mt-auto flex items-center justify-between pt-5">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {(blog.tags ?? []).slice(0, 2).map((tag) => (
                                                        <span key={tag} className="rounded-md bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                                <ArrowUpRight size={18} className="text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PageShell>
    );
}
