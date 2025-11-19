"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { SectionHeading } from "../ui/SectionHeading";
import { PROJECTS } from "@/app/constants";
import { Rocket, ExternalLink, Github, Filter } from "lucide-react";
import { useState } from "react";

export const Projects = () => {
    const [filter, setFilter] = useState("All");

    // Get unique categories from projects
    const categories = ["All", ...new Set(PROJECTS.flatMap(p => p.tech.slice(0, 2)))];

    const filteredProjects = filter === "All"
        ? PROJECTS
        : PROJECTS.filter(p => p.tech.includes(filter));

    return (
        <section id="projects" className="flex flex-col items-center justify-center py-20 relative z-20">
            <SectionHeading
                icon={<Rocket className="text-cyan-500" size={48} />}
                title="My Projects"
                subtitle="Innovative solutions and applications I've built"
                gradient="from-cyan-500 to-purple-500"
            />

            <div className="w-full max-w-7xl px-4 md:px-10">
                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                >
                    <Card className="p-4 text-center">
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 mb-1">
                            {PROJECTS.length}
                        </div>
                        <div className="text-gray-400 text-sm">Total Projects</div>
                    </Card>
                    <Card className="p-4 text-center">
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 mb-1">
                            {new Set(PROJECTS.flatMap(p => p.tech)).size}
                        </div>
                        <div className="text-gray-400 text-sm">Technologies</div>
                    </Card>
                    <Card className="p-4 text-center">
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 mb-1">
                            100%
                        </div>
                        <div className="text-gray-400 text-sm">Completion</div>
                    </Card>
                    <Card className="p-4 text-center">
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 mb-1">
                            ⭐
                        </div>
                        <div className="text-gray-400 text-sm">Quality</div>
                    </Card>
                </motion.div>

                {/* Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Filter size={20} className="text-cyan-400" />
                        <h3 className="text-lg font-semibold text-white">Filter by Technology</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-4 py-2 rounded-full transition-all ${filter === category
                                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            layout
                        >
                            <Card className="h-full flex flex-col justify-between p-6 group hover:border-cyan-500 transition-all duration-300">
                                <div>
                                    {/* Project Icon/Image placeholder */}
                                    <div className="w-full h-40 mb-4 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
                                        <Rocket size={48} className="text-cyan-400" />
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
                                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-all">
                                        <ExternalLink size={16} />
                                        <span className="text-sm">Live Demo</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 transition-all">
                                        <Github size={16} />
                                    </button>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
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
