"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";
import { Blog } from "@/lib/supabase";
import { PageShell } from "../../components/ui/PageShell";

const readingTime = (text: string) => Math.max(1, Math.round(text.split(/\s+/).length / 220));

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        (async () => {
            try {
                const response = await fetch(`/api/blogs?slug=${encodeURIComponent(slug)}`);
                const data = await response.json();
                setBlog(data && data.id ? data : null);
            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, [slug]);

    if (loading) {
        return (
            <PageShell footer={false}>
                <div className="mx-auto max-w-3xl px-5 pt-44">
                    <div className="h-4 w-40 animate-pulse rounded bg-white/5" />
                    <div className="mt-6 h-14 w-full animate-pulse rounded bg-white/5" />
                    <div className="mt-3 h-14 w-2/3 animate-pulse rounded bg-white/5" />
                    <div className="mt-12 aspect-[16/9] animate-pulse rounded-3xl bg-white/5" />
                </div>
            </PageShell>
        );
    }

    if (!blog) {
        return (
            <PageShell>
                <div className="mx-auto max-w-3xl px-5 pt-44 text-center">
                    <p className="eyebrow">404</p>
                    <h1 className="mt-4 font-serif text-5xl italic text-fg">Post not found.</h1>
                    <Link href="/blogs" className="mt-8 inline-flex items-center gap-2 text-muted transition-colors hover:text-fg">
                        <ArrowLeft size={16} /> Back to the blog
                    </Link>
                </div>
            </PageShell>
        );
    }

    const tags = blog.tags ?? [];

    return (
        <PageShell>
            <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-6xl px-5 pt-36 md:px-8 md:pt-44"
            >
                <div className="mx-auto max-w-3xl">
                    <Link href="/blogs" className="group inline-flex items-center gap-2 eyebrow transition-colors hover:text-fg">
                        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" /> All posts
                    </Link>
                    <h1 className="mt-8 text-balance text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-fg md:text-6xl">{blog.title}</h1>
                    {blog.excerpt && <p className="mt-6 text-pretty text-xl leading-relaxed text-muted">{blog.excerpt}</p>}
                    <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-line py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
                        <span className="text-fg">{blog.author}</span>
                        <span>·</span>
                        <span>{new Date(blog.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                        <span>·</span>
                        <span>{readingTime(blog.content)} min read</span>
                        <span>·</span>
                        <span>{blog.views} views</span>
                    </div>
                </div>

                {blog.cover_image && (
                    <div className="relative mx-auto mt-12 aspect-[16/8] max-w-5xl overflow-hidden rounded-3xl border border-line">
                        <Image src={blog.cover_image} alt={blog.title} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
                    </div>
                )}

                <div className="mx-auto mt-14 max-w-3xl text-[17px] leading-[1.8] text-fg/85">
                    {/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any -- react-markdown passes `node`, which must not reach the DOM */}
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ node, ...props }) => <h2 className="mb-4 mt-14 text-3xl font-medium tracking-tight text-fg" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="mb-4 mt-12 text-2xl font-medium tracking-tight text-fg" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="mb-3 mt-10 text-xl font-medium text-fg" {...props} />,
                            p: ({ node, ...props }) => <p className="mb-6" {...props} />,
                            ul: ({ node, ...props }) => <ul className="mb-6 list-disc space-y-2 pl-6 marker:text-accent" {...props} />,
                            ol: ({ node, ...props }) => <ol className="mb-6 list-decimal space-y-2 pl-6 marker:font-mono marker:text-dim" {...props} />,
                            code: ({ node, inline, className, ...props }: any) =>
                                inline || !className ? (
                                    <code className="rounded-md bg-accent/10 px-1.5 py-0.5 font-mono text-[0.88em] text-accent" {...props} />
                                ) : (
                                    <code className={`${className} font-mono text-sm`} {...props} />
                                ),
                            pre: ({ node, ...props }) => (
                                <pre className="mb-6 overflow-x-auto rounded-2xl border border-line bg-surface p-5 font-mono text-sm leading-relaxed text-fg/90 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit" {...props} />
                            ),
                            a: ({ node, ...props }) => (
                                <a className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent" target="_blank" rel="noopener noreferrer" {...props} />
                            ),
                            blockquote: ({ node, ...props }) => <blockquote className="my-8 border-l-2 border-accent pl-6 font-serif text-2xl italic leading-snug text-fg" {...props} />,
                            hr: () => <hr className="my-12 border-line" />,
                            img: ({ node, ...props }: any) => (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img className="my-8 w-full rounded-2xl border border-line" alt={props.alt ?? ""} {...props} />
                            ),
                            table: ({ node, ...props }) => (
                                <div className="mb-6 overflow-x-auto rounded-xl border border-line">
                                    <table className="w-full text-left text-sm" {...props} />
                                </div>
                            ),
                            th: ({ node, ...props }) => <th className="border-b border-line bg-white/[0.03] px-4 py-2 font-medium text-fg" {...props} />,
                            td: ({ node, ...props }) => <td className="border-b border-line px-4 py-2 text-muted" {...props} />,
                        }}
                    >
                        {blog.content}
                    </ReactMarkdown>
                    {/* eslint-enable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */}

                    {tags.length > 0 && (
                        <div className="mt-12 flex flex-wrap gap-2 border-t border-line pt-8">
                            {tags.map((tag) => (
                                <span key={tag} className="rounded-full border border-line px-3 py-1 text-sm text-muted">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="mt-12 flex items-center gap-5 rounded-3xl border border-line bg-surface p-6 md:p-8">
                        <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-fg font-mono text-sm font-semibold text-ink">KA</span>
                        <div>
                            <p className="eyebrow">Written by</p>
                            <p className="mt-1 text-lg font-medium text-fg">{blog.author}</p>
                            <p className="mt-1 text-sm leading-relaxed text-muted">
                                Software engineer working across full-stack development and applied AI — LLM integration, agents and automation.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.article>
        </PageShell>
    );
}
