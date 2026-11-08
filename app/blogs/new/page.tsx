"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Lock, Save, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PageShell } from "../../components/ui/PageShell";

const field =
    "w-full rounded-xl border border-line bg-white/[0.02] px-4 py-3 text-fg placeholder:text-dim transition-colors focus:border-accent focus:outline-none";
const labelCls = "mb-2 block font-mono text-[11px] uppercase tracking-[0.14em] text-dim";

export default function NewBlogPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [adminPassword, setAdminPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authError, setAuthError] = useState("");
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        cover_image: "",
        tags: "",
        published: false
    });


    const handleAuthentication = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!adminPassword) {
            setAuthError("Please enter a password");
            return;
        }

        setLoading(true);
        setAuthError("");

        try {
            // Verify password using dedicated auth endpoint
            const response = await fetch('/api/auth/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ adminPassword })
            });

            if (response.status === 401) {
                setAuthError("Invalid admin password");
                setAdminPassword("");
            } else if (response.ok) {
                setIsAuthenticated(true);
                setAuthError("");
            } else {
                setAuthError("Authentication failed. Please try again.");
            }
        } catch (error) {
            console.error('Authentication error:', error);
            setAuthError("Authentication failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!adminPassword) {
            alert("Please enter admin password first");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('adminPassword', adminPassword);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                setFormData(prev => ({ ...prev, cover_image: data.url }));
            } else {
                alert(data.error || 'Upload failed');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
                    adminPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Blog post created successfully!');
                router.push(`/blogs/${data.slug}`);
            } else {
                if (response.status === 401) {
                    alert('Invalid admin password. Please try again.');
                    setIsAuthenticated(false);
                    setAdminPassword("");
                } else {
                    alert(data.error || 'Failed to create blog post');
                }
            }
        } catch (error) {
            console.error('Error creating blog:', error);
            alert('Failed to create blog post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageShell footer={false}>
            <section className="mx-auto max-w-3xl px-5 pb-24 pt-36 md:pt-44">
                <Link href="/blogs" className="group inline-flex items-center gap-2 eyebrow transition-colors hover:text-fg">
                    <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" /> All posts
                </Link>
                <h1 className="mt-6 text-5xl font-medium tracking-[-0.04em] text-fg md:text-6xl">
                    New <em className="font-serif font-normal italic tracking-normal text-accent">post</em>
                </h1>
                <p className="mt-4 text-lg text-muted">Write in Markdown. Publish when it&apos;s ready.</p>

                {!isAuthenticated ? (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-12 max-w-md panel p-8"
                    >
                        <span className="grid size-12 place-items-center rounded-xl bg-accent/10 text-accent">
                            <Lock size={20} />
                        </span>
                        <h2 className="mt-5 text-2xl font-medium tracking-tight text-fg">Admin access</h2>
                        <p className="mt-1 text-sm text-muted">Enter the admin password to create a post.</p>

                        <form onSubmit={handleAuthentication} className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="admin-password" className="sr-only">Admin password</label>
                                <input
                                    id="admin-password"
                                    type="password"
                                    value={adminPassword}
                                    onChange={(e) => {
                                        setAdminPassword(e.target.value);
                                        setAuthError("");
                                    }}
                                    placeholder="Admin password"
                                    className={field}
                                    autoFocus
                                />
                                {authError && <p className="mt-2 text-sm text-red-400">{authError}</p>}
                            </div>
                            <div className="flex gap-3">
                                <Link href="/blogs" className="flex-1 rounded-xl border border-line px-4 py-3 text-center text-sm text-muted transition-colors hover:text-fg">
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 rounded-xl bg-fg px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {loading ? "Verifying…" : "Continue"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-12 space-y-7">
                        <div>
                            <label htmlFor="title" className={labelCls}>Title *</label>
                            <input
                                id="title"
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="A great headline"
                                className={`${field} text-xl`}
                            />
                        </div>

                        <div>
                            <label htmlFor="excerpt" className={labelCls}>Excerpt</label>
                            <textarea
                                id="excerpt"
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                placeholder="One or two sentences shown on the blog list (optional)"
                                rows={3}
                                className={field}
                            />
                        </div>

                        <div>
                            <label htmlFor="content" className={labelCls}>Content * · Markdown</label>
                            <textarea
                                id="content"
                                required
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                placeholder="# Start writing…"
                                rows={18}
                                className={`${field} font-mono text-sm leading-relaxed`}
                            />
                        </div>

                        <div>
                            <span className={labelCls}>Cover image</span>
                            <div className="flex items-center gap-3">
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="cover-upload" />
                                <label
                                    htmlFor="cover-upload"
                                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
                                >
                                    <Upload size={16} /> Upload image
                                </label>
                                {formData.cover_image && <span className="text-sm text-signal">✓ Uploaded</span>}
                            </div>
                            {formData.cover_image && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={formData.cover_image} alt="Cover preview" className="mt-4 max-h-56 rounded-2xl border border-line object-cover" />
                            )}
                        </div>

                        <div>
                            <label htmlFor="tags" className={labelCls}>Tags · comma-separated</label>
                            <input
                                id="tags"
                                type="text"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                placeholder="Next.js, AI, Automation"
                                className={field}
                            />
                        </div>

                        <label htmlFor="published" className="flex cursor-pointer items-center gap-3 text-fg">
                            <input
                                type="checkbox"
                                id="published"
                                checked={formData.published}
                                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                className="size-5 rounded accent-[#b4a1ff]"
                            />
                            Publish immediately
                        </label>

                        <div className="border-t border-line pt-7">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-fg px-6 py-3.5 font-medium text-ink transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                            >
                                <Save size={18} />
                                {loading ? "Creating…" : "Create post"}
                            </button>
                        </div>
                    </form>
                )}
            </section>
        </PageShell>
    );
}
