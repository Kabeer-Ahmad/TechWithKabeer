"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "../../components/ui/Card";
import { Navbar } from "../../components/ui/Navbar";
import { Calendar, Eye, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/lib/supabase";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useParams } from "next/navigation";

export default function BlogPostPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            fetchBlog();
        }

        // Make body background transparent to show gradient
        document.body.style.background = 'transparent';

        return () => {
            document.body.style.background = '';
        };
    }, [slug]);

    const fetchBlog = async () => {
        try {
            const response = await fetch(`/api/blogs?slug=${slug}`);
            const data = await response.json();
            setBlog(data);
        } catch (error) {
            console.error('Error fetching blog:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-gray-400">Loading...</div>
            </main>
        );
    }

    if (!blog) {
        return (
            <main className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Blog Not Found</h1>
                    <Link href="/blogs">
                        <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
                            ← Back to Blogs
                        </button>
                    </Link>
                </div>
            </main>
        );
    }

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

                <article className="max-w-7xl mx-auto px-4 md:px-10 py-10 md:py-14 relative z-10 pt-28 md:pt-30">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Hero Section - Title Left, Image Right */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                            {/* Left Column - Title & Meta */}
                            <div className="flex flex-col justify-center">
                                {/* Title */}
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                    {blog.title}
                                </h1>

                                {/* Meta Info */}
                                <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-6">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={18} />
                                        <span className="text-sm">
                                            {new Date(blog.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Eye size={18} />
                                        <span className="text-sm">{blog.views} views</span>
                                    </div>
                                    <div className="text-cyan-400 text-sm">
                                        By {blog.author}
                                    </div>
                                </div>

                                {/* Tags */}
                                {blog.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {blog.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30 text-sm font-medium"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Back Button */}
                                <div>
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
                            </div>

                            {/* Right Column - Cover Image */}
                            {blog.cover_image && (
                                <div className="relative w-full h-48 md:h-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={blog.cover_image}
                                        alt={blog.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                </div>
                            )}
                        </div>

                        {/* Content Section - Full Width */}
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 md:p-12">
                                <div className="prose prose-invert prose-cyan prose-lg max-w-none">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-white mb-4 mt-8" {...props} />,
                                            h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-white mb-3 mt-6" {...props} />,
                                            h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-white mb-2 mt-4" {...props} />,
                                            p: ({ node, ...props }) => <p className="text-gray-300 mb-4 leading-relaxed" {...props} />,
                                            ul: ({ node, ...props }) => <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2" {...props} />,
                                            ol: ({ node, ...props }) => <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2" {...props} />,
                                            li: ({ node, ...props }) => <li className="text-gray-300" {...props} />,
                                            code: ({ node, inline, ...props }: any) =>
                                                inline ? (
                                                    <code className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-sm" {...props} />
                                                ) : (
                                                    <code className="block bg-black/50 text-cyan-300 p-4 rounded-lg overflow-x-auto mb-4 text-sm" {...props} />
                                                ),
                                            pre: ({ node, ...props }) => <pre className="mb-4" {...props} />,
                                            a: ({ node, ...props }) => <a className="text-cyan-400 hover:text-cyan-300 underline" {...props} />,
                                            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-400 my-4" {...props} />,
                                        }}
                                    >
                                        {blog.content}
                                    </ReactMarkdown>
                                </div>
                            </div>

                            {/* Author Info */}
                            <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-white/10 backdrop-blur-sm">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">
                                        {blog.author.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">About the Author</h3>
                                        <p className="text-cyan-400">{blog.author}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300">
                                    Full Stack & AI Developer decoding the future of tech. I break down complex AI tools, review the latest software, and share real-world advice to help you master new tech stacks and level up your skills.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </article>
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
