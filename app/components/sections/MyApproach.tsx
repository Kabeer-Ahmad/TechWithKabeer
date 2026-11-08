"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Check } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { cn } from "@/app/lib/utils";

const PHASES = [
    {
        title: "Discover",
        summary: "Understand the problem, the people who have it, and what success looks like before writing any code.",
        activities: ["Kick-off call and a walk through your current workflow", "Audit of existing systems, data and constraints", "Scope cut into milestones you can ship"],
        output: "A one-page plan with milestones",
    },
    {
        title: "Design",
        summary: "Shape the architecture, data model and user flows — and prove the risky parts early.",
        activities: ["Data model, API contracts and system diagram", "Clickable UI flows for the key screens", "AI feasibility spike on your real data, not demos"],
        output: "Prototype + technical design",
    },
    {
        title: "Build",
        summary: "Ship in small, reviewed increments you can click through every week.",
        activities: ["Weekly demos on a live preview URL", "Typed APIs, tests and code review on every change", "Eval sets for AI features so quality is measured"],
        output: "Working software, every week",
    },
    {
        title: "Launch",
        summary: "Go live with the boring-but-critical pieces in place, so launch day is uneventful.",
        activities: ["CI/CD with one-click rollback", "Monitoring, alerts and LLM cost caps", "Handover docs and a short recorded walkthrough"],
        output: "Production release + runbook",
    },
    {
        title: "Iterate",
        summary: "Measure what real users do and keep improving after go-live.",
        activities: ["Analytics and a feedback loop from day one", "Prompt and model tuning against the eval set", "Performance and cost optimisation"],
        output: "Measured improvements",
    },
];

const pad = (n: number) => String(n).padStart(2, "0");

const Dial = ({ active, progress }: { active: number; progress: ReturnType<typeof useSpring> }) => {
    const phase = PHASES[active];
    return (
        <div className="panel relative overflow-hidden p-8">
            <div aria-hidden className="absolute inset-0 bg-grid opacity-40 [background-size:32px_32px] [mask-image:radial-gradient(circle_at_50%_40%,black,transparent_70%)]" />
            <div className="relative mx-auto size-64">
                <svg viewBox="0 0 120 120" className="size-full -rotate-90">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="rgb(255 255 255 / 0.06)" strokeWidth="1.5" />
                    {PHASES.map((_, i) => {
                        const a = (i / PHASES.length) * Math.PI * 2;
                        return (
                            <circle
                                key={i}
                                cx={(60 + Math.cos(a) * 54).toFixed(2)}
                                cy={(60 + Math.sin(a) * 54).toFixed(2)}
                                r={i <= active ? 2.6 : 1.8}
                                className={cn("transition-all duration-500", i <= active ? "fill-accent" : "fill-white/20")}
                            />
                        );
                    })}
                    <motion.circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="url(#dial)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        style={{ pathLength: progress }}
                    />
                    <defs>
                        <linearGradient id="dial" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#7c5cff" />
                            <stop offset="60%" stopColor="#b4a1ff" />
                            <stop offset="100%" stopColor="#d4ff4f" />
                        </linearGradient>
                    </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="text-center"
                        >
                            <span className="block font-serif text-7xl italic leading-none text-fg">{pad(active + 1)}</span>
                            <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{phase.title}</span>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className="relative mt-8 border-t border-line pt-6">
                <p className="eyebrow">You get</p>
                <AnimatePresence mode="wait">
                    <motion.p
                        key={active}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 text-xl font-medium tracking-tight text-fg"
                    >
                        {phase.output}
                    </motion.p>
                </AnimatePresence>
                <div className="mt-6 flex gap-1.5">
                    {PHASES.map((p, i) => (
                        <span key={p.title} className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                            <span className={cn("block h-full rounded-full bg-accent transition-transform duration-500 origin-left", i <= active ? "scale-x-100" : "scale-x-0")} />
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const MyApproach = () => {
    const ref = useRef<HTMLOListElement>(null);
    const [active, setActive] = useState(0);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.55", "end 0.55"] });
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

    useMotionValueEvent(scrollYProgress, "change", (v) => {
        const i = Math.min(PHASES.length - 1, Math.max(0, Math.floor(v * PHASES.length)));
        setActive((prev) => (prev === i ? prev : i));
    });

    return (
        <section id="approach" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
            <SectionHeading
                index="06"
                label="Process"
                title={
                    <>
                        How a project <em>moves</em>
                    </>
                }
                description="Five stages, each with something concrete you can see, click or measure — no black box between kick-off and launch."
            />

            <div className="grid gap-10 md:grid-cols-[minmax(0,400px)_1fr] md:gap-16">
                <div className="hidden md:block">
                    <div className="sticky top-28">
                        <Dial active={active} progress={progress} />
                    </div>
                </div>

                <ol ref={ref} className="relative space-y-4 md:space-y-[18vh] md:py-[8vh]">
                    {PHASES.map((p, i) => {
                        const isActive = i === active;
                        return (
                            <li
                                key={p.title}
                                className={cn(
                                    "panel relative p-6 transition-all duration-500 md:p-8",
                                    isActive ? "md:border-accent/40 md:bg-white/[0.04] md:opacity-100" : "md:opacity-35 md:blur-[1px]"
                                )}
                            >
                                <div className="flex items-baseline justify-between">
                                    <span className="font-mono text-xs text-dim">Step {pad(i + 1)}</span>
                                    <span className="font-serif text-5xl italic leading-none text-white/[0.08] md:hidden">{i + 1}</span>
                                </div>
                                <h3 className="mt-3 text-3xl font-medium tracking-tight text-fg md:text-4xl">{p.title}</h3>
                                <p className="mt-3 max-w-xl text-pretty leading-relaxed text-muted">{p.summary}</p>
                                <ul className="mt-6 space-y-3">
                                    {p.activities.map((a) => (
                                        <li key={a} className="flex items-start gap-3 text-sm text-fg/85">
                                            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                                                <Check size={12} strokeWidth={3} />
                                            </span>
                                            {a}
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-6 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-dim md:hidden">
                                    You get · <span className="text-accent">{p.output}</span>
                                </p>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
};
