"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { SectionHeading } from "../ui/SectionHeading";
import { PROJECTS } from "@/app/constants";
import { Rocket, ExternalLink, Github, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export const Projects = () => {
    const [filter, setFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    // Get unique categories from projects
    const categories = ["All", ...new Set(PROJECTS.flatMap(p => p.tech.slice(0, 2)))];

    const filteredProjects = PROJECTS.filter(project => {
        // Filter by technology
        const matchesFilter = filter === "All" || project.tech.includes(filter);

        // Filter by search query (title or description)
        const matchesSearch = searchQuery === "" ||
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    // Function to get preview image URL
    const getPreviewImage = (project: any) => {
        // Priority 1: Try demo link with screenshot
        if (project.demoLink && project.demoLink !== "https://demo-link.com") {
            try {
                const url = new URL(project.demoLink);
                // Use 11ty screenshot service with wait parameters for fully loaded page
                // wait: wait for network idle, timeout: 10 seconds to ensure full load
                return `https://v1.screenshot.11ty.dev/${encodeURIComponent(project.demoLink)}/opengraph/_wait:10/_timeout:15/`;
            } catch (e) {
                // If URL parsing fails, continue to GitHub
            }
        }

        // Priority 2: Use GitHub's social preview
        if (project.githubLink && !project.githubLink.includes("username")) {
            const parts = project.githubLink.replace('https://github.com/', '').split('/');
            if (parts.length >= 2) {
                return `https://opengraph.githubassets.com/1/${parts[0]}/${parts[1]}`;
            }
        }

        return null;
    };

    return (
        <section id="projects" className="flex flex-col items-center justify-center pb-20 pt-0 relative z-20">
            <div className="w-full max-w-7xl px-4 md:px-10">
                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                >
                    <Card className="p-4 text-center group hover:border-cyan-500 transition-all cursor-pointer">
                        <motion.div
                            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 mb-1"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            55+
                        </motion.div>
                        <div className="text-gray-400 text-sm">Total Projects</div>
                    </Card>
                    <Card className="p-4 text-center group hover:border-purple-500 transition-all cursor-pointer">
                        <motion.div
                            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-1"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {new Set(PROJECTS.flatMap(p => p.tech)).size}+
                        </motion.div>
                        <div className="text-gray-400 text-sm">Technologies</div>
                    </Card>
                    <Card className="p-4 text-center group hover:border-pink-500 transition-all cursor-pointer">
                        <motion.div
                            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 mb-1"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            3+
                        </motion.div>
                        <div className="text-gray-400 text-sm">Years Experience</div>
                    </Card>
                    <Card className="p-4 text-center group hover:border-cyan-500 transition-all cursor-pointer">
                        <motion.div
                            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 mb-1"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            100K+
                        </motion.div>
                        <div className="text-gray-400 text-sm">Lines of Code</div>
                    </Card>
                </motion.div>

                {/* Search and Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                            />
                        </div>

                        {/* Filter Dropdown */}
                        <div className="relative md:w-64">
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full appearance-none px-4 py-3 pr-10 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category} className="bg-gray-900">
                                        {category === "All" ? "All Technologies" : category}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        </div>
                    </div>

                    {/* Results count */}
                    <div className="mt-4 text-sm text-gray-400">
                        Showing {filteredProjects.length} of {PROJECTS.length} projects
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => {
                        const previewImage = getPreviewImage(project);

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                layout
                            >
                                <Card className="h-full flex flex-col justify-between p-6 group hover:border-cyan-500 transition-all duration-300">
                                    <div>
                                        {/* Project Preview Image */}
                                        <div className="w-full h-40 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 relative group/image">
                                            {previewImage ? (
                                                <>
                                                    {/* Loading shimmer effect */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"
                                                        style={{ backgroundSize: '200% 100%' }} />

                                                    <Image
                                                        src={previewImage}
                                                        alt={`${project.title} preview`}
                                                        fill
                                                        className="object-cover group-hover/image:scale-105 transition-transform duration-300 relative z-10"
                                                        unoptimized
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.style.display = 'none';
                                                        }}
                                                    />

                                                    {/* Gradient overlay on hover */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity flex items-end p-4 z-20">
                                                        <div className="flex items-center gap-2">
                                                            <ExternalLink size={16} className="text-cyan-400" />
                                                            <p className="text-white text-sm font-semibold">{project.title}</p>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="w-full h-full flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                                                    {/* Check if project has GitHub link but no demo link */}
                                                    {project.githubLink && !project.githubLink.includes("username") && (!project.demoLink || project.demoLink === "https://demo-link.com") ? (
                                                        <>
                                                            {/* GitHub-themed background */}
                                                            <div className="absolute inset-0 bg-gradient-to-br from-gray-800/40 via-gray-900/40 to-black/40" />
                                                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-cyan-500/10 animate-pulse" />

                                                            {/* Floating particles */}
                                                            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-float-1" />
                                                            <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-400/30 rounded-full animate-float-2" />
                                                            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-cyan-400/30 rounded-full animate-float-3" />

                                                            {/* Pulsing glow behind GitHub logo */}
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <div className="w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
                                                            </div>

                                                            {/* Animated GitHub Logo */}
                                                            <Github
                                                                size={64}
                                                                className="text-white relative z-10 group-hover/image:scale-110 group-hover/image:rotate-12 transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                                            />

                                                            <p className="text-white text-sm font-semibold relative z-10 text-center px-4">
                                                                {project.title}
                                                            </p>

                                                            {/* GitHub badge */}
                                                            <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center gap-1">
                                                                <Github size={12} className="text-white" />
                                                                <span className="text-white text-xs font-medium">GitHub</span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {/* Default animated gradient background */}
                                                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-cyan-500/30 to-pink-500/30" />
                                                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-pink-500/20 animate-pulse" />

                                                            {/* Floating particles effect */}
                                                            <div className="absolute top-0 left-0 w-2 h-2 bg-cyan-400/50 rounded-full animate-float-1" />
                                                            <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-purple-400/50 rounded-full animate-float-2" />
                                                            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-pink-400/50 rounded-full animate-float-3" />

                                                            <Rocket size={48} className="text-cyan-400 relative z-10 group-hover/image:scale-110 group-hover/image:rotate-12 transition-all duration-300" />
                                                            <p className="text-white text-sm font-semibold relative z-10 text-center px-4">{project.title}</p>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                        <p className="text-sm text-cyan-400 mb-3">{project.subtitle}</p>
                                        <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>

                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tech.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="text-xs px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Links */}
                                    <div className="flex gap-3 pt-4 border-t border-white/10">
                                        {project.demoLink && project.demoLink !== "https://demo-link.com" && (
                                            <a
                                                href={project.demoLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-cyan-400 hover:from-cyan-500/20 hover:to-purple-500/20 hover:border-cyan-400 hover:text-cyan-300 transition-all group/btn relative overflow-hidden"
                                            >
                                                {/* Shimmer effect on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />

                                                <ExternalLink size={16} className="group-hover/btn:rotate-12 transition-transform" />
                                                <span className="text-sm font-medium relative z-10">Live Demo</span>

                                                {/* Glow effect */}
                                                <div className="absolute inset-0 bg-cyan-500/0 group-hover/btn:bg-cyan-500/10 blur-xl transition-all" />
                                            </a>
                                        )}
                                        {project.githubLink && !project.githubLink.includes("username") && (
                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all group/btn relative overflow-hidden ${!project.demoLink || project.demoLink === "https://demo-link.com" ? 'flex-1' : ''
                                                    }`}
                                            >
                                                {/* Shimmer effect on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />

                                                <Github size={16} className="group-hover/btn:rotate-12 transition-transform" />
                                                <span className="text-sm font-medium relative z-10">
                                                    {!project.demoLink || project.demoLink === "https://demo-link.com" ? 'View Code' : 'GitHub'}
                                                </span>
                                            </a>
                                        )}
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                        No projects found with this filter.
                    </div>
                )}
            </div>
        </section>
    );
};
