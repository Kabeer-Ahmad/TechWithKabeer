"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { EXPERIENCES } from "@/app/constants";
import { Reveal } from "../ui/Reveal";
import { cn } from "@/app/lib/utils";

export const Experience = () => {
    const ref = useRef<HTMLOListElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.6"] });
    const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

    return (
        <section className="mx-auto max-w-6xl px-5 pb-12 md:px-8">
            <ol ref={ref} className="relative">
                <span aria-hidden className="absolute bottom-0 left-[7px] top-2 w-px bg-line-strong md:left-[239px]" />
                <motion.span
                    aria-hidden
                    style={{ scaleY: fill }}
                    className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-signal via-accent to-accent shadow-[0_0_12px_rgb(180_161_255/0.6)] md:left-[239px]"
                />
                {EXPERIENCES.map((exp, i) => {
                    const lead = i < 3;
                    return (
                        <Reveal as="li" key={`${exp.company}-${exp.role}`} className="relative grid gap-4 pb-14 pl-9 md:grid-cols-[240px_1fr] md:gap-0 md:pl-0">
                            <span
                                aria-hidden
                                className={cn(
                                    "absolute left-0 top-1.5 size-[15px] rounded-full border-2 border-ink md:left-[232px]",
                                    i === 0 ? "bg-signal shadow-[0_0_0_4px_rgb(212_255_79/0.15)]" : lead ? "bg-accent" : "bg-surface-2 ring-1 ring-line-strong",
                                )}
                            />
                            <div className="md:sticky md:top-28 md:self-start md:pr-12">
                                <p className="font-mono text-xs text-muted">{exp.period}</p>
                                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                                    {exp.type} · {exp.location}
                                </p>
                            </div>
                            <div className="md:pl-12">
                                <h2 className={cn("font-medium tracking-tight text-fg", lead ? "text-2xl md:text-3xl" : "text-xl md:text-2xl")}>{exp.role}</h2>
                                <p className="mt-1 font-serif text-xl italic text-accent">{exp.company}</p>
                                <ul className="mt-5 space-y-3">
                                    {exp.description.map((d) => (
                                        <li key={d} className="relative pl-5 text-pretty leading-relaxed text-muted">
                                            <span aria-hidden className="absolute left-0 top-[0.7em] h-px w-2.5 bg-dim" />
                                            {d}
                                        </li>
                                    ))}
                                </ul>
                                <ul className="mt-5 flex flex-wrap gap-1.5">
                                    {exp.technologies.map((t) => (
                                        <li key={t} className="rounded-md border border-line bg-white/[0.02] px-2 py-1 text-[11px] text-muted">
                                            {t}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    );
                })}
            </ol>
        </section>
    );
};
