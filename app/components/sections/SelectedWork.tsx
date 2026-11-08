"use client";

import { useRef } from "react";
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { PROJECTS, type Project } from "@/app/constants";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "../ui/ProjectCard";
import { Reveal } from "../ui/Reveal";
import { useIsDesktop } from "@/app/lib/motion";

const FEATURED = PROJECTS.filter((p) => p.featured).slice(0, 4);

/**
 * Each card pins near the top; as the next one slides over it, the previous
 * card shrinks, tilts back in 3D and dims — a stacked deck effect.
 */
const StackCard = ({ project, i, progress }: { project: Project; i: number; progress: MotionValue<number> }) => {
    const total = FEATURED.length;
    const start = i / total;
    const next = Math.min(1, start + 1 / total);
    const last = i === total - 1;
    const scale = useTransform(progress, [start, 1], [1, 1 - (total - 1 - i) * 0.05]);
    const rotateX = useTransform(progress, [start, next], [0, last ? 0 : 7]);
    const dim = useTransform(progress, [start, next], [0, last ? 0 : 0.5]);

    return (
        <div className="sticky top-24 flex h-[calc(100vh-6rem)] items-start justify-center" style={{ paddingTop: i * 22 }}>
            <motion.div style={{ scale, rotateX, transformPerspective: 1600, transformOrigin: "top center" }} className="relative w-full">
                <ProjectCard project={project} index={i} size="stack" />
                <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 rounded-[20px] bg-ink" />
            </motion.div>
        </div>
    );
};

export const SelectedWork = () => {
    const container = useRef<HTMLDivElement>(null);
    const isDesktop = useIsDesktop();
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

    return (
        <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-5 pt-24 md:px-8 md:pt-32">
            <SectionHeading
                index="01"
                label="Selected work"
                title={
                    <>
                        Things I&apos;ve <em>built</em> lately
                    </>
                }
                description="From a diffusion-powered virtual try-on engine to an autonomous video studio — a few products I've taken from idea to production."
                action={{ href: "/projects", label: `All ${PROJECTS.length} projects` }}
            />

            <div ref={container} className={isDesktop && !reduce ? "relative pb-[8vh]" : "space-y-4 pb-12"}>
                {FEATURED.map((p, i) =>
                    isDesktop && !reduce ? (
                        <StackCard key={p.title} project={p} i={i} progress={scrollYProgress} />
                    ) : (
                        <Reveal key={p.title}>
                            <ProjectCard project={p} index={i} />
                        </Reveal>
                    )
                )}
            </div>
        </section>
    );
};
