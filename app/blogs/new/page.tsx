"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { Card } from "../../components/ui/Card";
import { Navbar } from "../../components/ui/Navbar";
import { Save, Upload, Eye, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

    useEffect(() => {
        // Make body background transparent to show gradient
        document.body.style.background = 'transparent';

        return () => {
            document.body.style.background = '';
        };
    }, []);

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
        <>
            <Navbar />
            <main className="min-h-screen relative overflow-hidden">
                {/* Animated Background */}
                <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-[#030014] to-cyan-900" />
                <div className="fixed inset-0 opacity-20 overflow-hidden">
                    <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
                    <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
                    <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
                </div>

                <section className="flex flex-col items-center justify-center py-10 md:py-14 relative z-10 pt-40">
                    <div className="w-full max-w-4xl px-4 md:px-10">

                        <div className="text-center mt-4 md:mt-14 mb-8">
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Create New <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Blog Post</span>
                            </h1>
                            <p className="text-gray-300 text-lg mb-6">
                                Share your knowledge with the world
                            </p>

                            {/* Back Button */}
                            <Link href="/blogs">
                                <motion.button
                                    whileHover={{ scale: 1.05, x: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all shadow-lg"
                                >
                                    <ArrowLeft size={20} />
                                    Back to Blogs
                                </motion.button>
                            </Link>
                        </div>

                        {/* Authentication Gate */}
                        {!isAuthenticated ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="max-w-md mx-auto"
                            >
                                <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8">
                                    <div className="text-center mb-6">
                                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Admin Authentication</h3>
                                        <p className="text-gray-400">Enter your admin password to create a blog post</p>
                                    </div>

                                    <form onSubmit={handleAuthentication} className="space-y-4">
                                        <div>
                                            <input
                                                type="password"
                                                value={adminPassword}
                                                onChange={(e) => {
                                                    setAdminPassword(e.target.value);
                                                    setAuthError("");
                                                }}
                                                placeholder="Admin Password"
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                                                autoFocus
                                            />
                                            {authError && (
                                                <p className="text-red-400 text-sm mt-2">{authError}</p>
                                            )}
                                        </div>

                                        <div className="flex gap-3">
                                            <Link href="/blogs" className="flex-1">
                                                <button
                                                    type="button"
                                                    className="w-full px-4 py-3 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </Link>
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {loading ? 'Verifying...' : 'Continue'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        ) : (
                            <>
                                {/* Blog Creation Form */}
                                <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-8">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Title */}
                                        <div>
                                            <label className="block text-white font-semibold mb-2">Title *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                placeholder="Enter blog title"
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                                            />
                                        </div>

                                        {/* Excerpt */}
                                        <div>
                                            <label className="block text-white font-semibold mb-2">Excerpt</label>
                                            <textarea
                                                value={formData.excerpt}
                                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                                placeholder="Brief description (optional)"
                                                rows={3}
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div>
                                            <label className="block text-white font-semibold mb-2">Content * (Markdown supported)</label>
                                            <textarea
                                                required
                                                value={formData.content}
                                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                                placeholder="Write your blog content in Markdown..."
                                                rows={15}
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 font-mono text-sm"
                                            />
                                        </div>

                                        {/* Cover Image */}
                                        <div>
                                            <label className="block text-white font-semibold mb-2">Cover Image</label>
                                            <div className="flex gap-3">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                    id="cover-upload"
                                                />
                                                <label
                                                    htmlFor="cover-upload"
                                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
                                                >
                                                    <Upload size={20} />
                                                    Upload Image
                                                </label>
                                                {formData.cover_image && (
                                                    <span className="text-green-400 text-sm flex items-center">✓ Image uploaded</span>
                                                )}
                                            </div>
                                            {formData.cover_image && (
                                                <img src={formData.cover_image} alt="Cover" className="mt-3 rounded-lg max-h-48 object-cover" />
                                            )}
                                        </div>

                                        {/* Tags */}
                                        <div>
                                            <label className="block text-white font-semibold mb-2">Tags (comma-separated)</label>
                                            <input
                                                type="text"
                                                value={formData.tags}
                                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                                placeholder="Next.js, React, TypeScript"
                                                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                                            />
                                        </div>

                                        {/* Published */}
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="checkbox"
                                                id="published"
                                                checked={formData.published}
                                                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                                className="w-5 h-5 rounded bg-white/5 border border-white/10 checked:bg-purple-500"
                                            />
                                            <label htmlFor="published" className="text-white">Publish immediately</label>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="flex gap-3 pt-4">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <Save size={20} />
                                                {loading ? 'Creating...' : 'Create Blog Post'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </main>

            <style jsx global>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </>
    );
}
