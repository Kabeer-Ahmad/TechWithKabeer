"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS, type ProjectCategory } from "@/app/constants";
import { ProjectCard } from "../ui/ProjectCard";
import { cn } from "@/app/lib/utils";

const FILTERS: ("All" | ProjectCategory)[] = ["All", "AI", "Mobile", "Web", "Client", "Systems"];

export const Projects = () => {
    const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
    const counts = useMemo(() => {
        const c: Record<string, number> = { All: PROJECTS.length };
        PROJECTS.forEach((p) => (c[p.category] = (c[p.category] ?? 0) + 1));
        return c;
    }, []);
    const visible = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

    return (
        <section className="mx-auto max-w-6xl px-5 pb-12 md:px-8">
            <div className="sticky top-20 z-30 -mx-2 mb-10 flex gap-1 overflow-x-auto rounded-2xl border border-line bg-ink/80 p-1.5 backdrop-blur-xl scrollbar-hide sm:inline-flex sm:max-w-full">
                {FILTERS.map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={cn(
                            "relative shrink-0 rounded-xl px-4 py-2 text-sm transition-colors",
                            filter === f ? "text-ink" : "text-muted hover:text-fg"
                        )}
                    >
                        {filter === f && (
                            <motion.span layoutId="project-filter" className="absolute inset-0 rounded-xl bg-fg" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                        )}
                        <span className="relative">
                            {f} <span className={cn("font-mono text-[11px]", filter === f ? "text-ink/60" : "text-dim")}>{counts[f] ?? 0}</span>
                        </span>
                    </button>
                ))}
            </div>

            <motion.div layout className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {visible.map((p) => (
                        <motion.div
                            key={p.title}
                            layout
                            initial={{ opacity: 0, scale: 0.97, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <ProjectCard project={p} index={PROJECTS.indexOf(p)} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};
