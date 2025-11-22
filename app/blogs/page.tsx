"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../components/ui/Navbar";
import { BookOpen, Calendar, Eye, Plus, Search, Tag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Blog } from "@/lib/supabase";

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await fetch('/api/blogs');
            const data = await response.json();
            setBlogs(data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    // Get all unique tags
    const allTags = Array.from(new Set(blogs.flatMap(blog => blog.tags)));

    // Filter blogs by selected tag and search query
    const filteredBlogs = blogs.filter(blog => {
        const matchesTag = selectedTag ? blog.tags.includes(selectedTag) : true;
        const matchesSearch = searchQuery
            ? blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            : true;
        return matchesTag && matchesSearch;
    });

    return (
        <>
            <Navbar />
            <main className="min-h-screen relative overflow-hidden">
                {/* Animated Background */}
                <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-[#030014] to-cyan-900" />
                <div className="fixed inset-0 opacity-20">
                    <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
                    <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
                    <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
                </div>

                {/* Hero Section */}
                <section className="relative pt-32 pb-20 px-4">
                    <div className="max-w-7xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                                <BookOpen className="text-cyan-400" size={24} />
                                <span className="text-white font-semibold">Tech Blogs</span>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">
                                Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Tutorials</span>
                            </h1>
                            <p className="text-l md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                                Explore Latest Articles on Web Development, AI, & Modern Tech!
                            </p>

                            {/* New Blog Button */}
                            <Link href="/blogs/new">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 transition-all"
                                >
                                    <Plus size={20} />
                                    Write New Post
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* Search and Filter Bar */}
                <section className="relative px-4 mb-12">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col md:flex-row gap-4 items-stretch md:items-center"
                        >
                            {/* Search Bar */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search blogs by title, content, or tags..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                                />
                            </div>

                            {/* Tag Filter Dropdown */}
                            <div className="relative min-w-[200px]">
                                <select
                                    value={selectedTag || ""}
                                    onChange={(e) => setSelectedTag(e.target.value || null)}
                                    className="w-full px-4 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none cursor-pointer"
                                >
                                    <option value="" className="bg-[#030014] text-white">All Categories</option>
                                    {allTags.map((tag) => (
                                        <option key={tag} value={tag} className="bg-[#030014] text-white">
                                            {tag}
                                        </option>
                                    ))}
                                </select>
                                <Tag className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                            </div>
                        </motion.div>

                        {/* Active Filters Display */}
                        {(selectedTag || searchQuery) && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="flex flex-wrap gap-2 mt-4"
                            >
                                {searchQuery && (
                                    <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-sm flex items-center gap-2">
                                        Search: "{searchQuery}"
                                        <button onClick={() => setSearchQuery("")} className="hover:text-white">×</button>
                                    </span>
                                )}
                                {selectedTag && (
                                    <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-sm flex items-center gap-2">
                                        Category: {selectedTag}
                                        <button onClick={() => setSelectedTag(null)} className="hover:text-white">×</button>
                                    </span>
                                )}
                            </motion.div>
                        )}
                    </div>
                </section>

                {/* Blog Grid */}
                <section className="relative px-4 pb-20">
                    <div className="max-w-7xl mx-auto">
                        {loading ? (
                            <div className="text-center text-white py-20">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent" />
                            </div>
                        ) : filteredBlogs.length === 0 ? (
                            <div className="text-center py-20">
                                <BookOpen className="mx-auto mb-4 text-gray-400" size={64} />
                                <p className="text-gray-400 text-xl">
                                    {selectedTag ? `No blogs found with tag "${selectedTag}"` : 'No blogs published yet.'}
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredBlogs.map((blog, index) => (
                                    <motion.div
                                        key={blog.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Link href={`/blogs/${blog.slug}`}>
                                            <div className="group h-full bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2">
                                                {/* Cover Image */}
                                                {blog.cover_image && (
                                                    <div className="relative w-full h-56 overflow-hidden">
                                                        <Image
                                                            src={blog.cover_image}
                                                            alt={blog.title}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                    </div>
                                                )}

                                                <div className="p-6">
                                                    {/* Tags */}
                                                    {blog.tags.length > 0 && (
                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                            {blog.tags.slice(0, 3).map((tag) => (
                                                                <span
                                                                    key={tag}
                                                                    className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Title */}
                                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 transition-all line-clamp-2">
                                                        {blog.title}
                                                    </h3>

                                                    {/* Excerpt */}
                                                    {blog.excerpt && (
                                                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                                            {blog.excerpt}
                                                        </p>
                                                    )}

                                                    {/* Meta Info */}
                                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar size={14} />
                                                            {new Date(blog.created_at).toLocaleDateString()}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Eye size={14} />
                                                            {blog.views}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
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
