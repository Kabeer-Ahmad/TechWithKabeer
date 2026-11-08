"use client";

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Magnetic } from "../ui/Magnetic";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PROFILE, SOCIAL_LINKS, EXPERIENCES } from "@/app/constants";
import { LocalClock } from "../ui/LocalClock";

const ease = [0.22, 1, 0.36, 1] as const;

// WebGL scene is client-only and loaded after first paint.
const HeroOrb = dynamic(() => import("../3d/HeroOrb"), { ssr: false });

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 28, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.9, delay, ease },
});

export const Hero = () => {
    const latest = EXPERIENCES[0];
    const reduce = useReducedMotion();
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
    const sp = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.5 });
    const textY = useTransform(sp, [0, 1], [0, -140]);
    const textOpacity = useTransform(sp, [0, 0.65], [1, 0]);
    const cardY = useTransform(sp, [0, 1], [0, 120]);
    const cardRotateX = useTransform(sp, [0, 1], [0, 28]);
    const cardScale = useTransform(sp, [0, 1], [1, 0.82]);

    return (
        <section ref={sectionRef} className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pb-16 pt-32 md:px-8 md:pt-28">
            <div className="grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
                <motion.div style={reduce ? undefined : { y: textY, opacity: textOpacity }} className="relative z-10">
                    <motion.div {...fadeUp(0.05)} className="flex flex-wrap items-center gap-x-4 gap-y-2 eyebrow">
                        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 normal-case tracking-normal text-muted">
                            <span className="size-1.5 rounded-full bg-signal animate-pulse-dot" />
                            {latest.role} · {latest.company}
                        </span>
                        <span className="hidden sm:inline">
                            {PROFILE.location} — <LocalClock timeZone={PROFILE.timezone} /> PKT
                        </span>
                    </motion.div>

                    <motion.h1
                        {...fadeUp(0.15)}
                        className="mt-8 text-balance text-[2.9rem] font-medium leading-[0.95] tracking-[-0.045em] text-fg sm:text-6xl md:text-7xl lg:text-[5.4rem]"
                    >
                        I turn LLMs into{" "}
                        <span className="relative whitespace-nowrap font-serif font-normal italic tracking-[-0.01em] text-accent">
                            production-ready
                            <svg
                                aria-hidden
                                viewBox="0 0 300 12"
                                preserveAspectRatio="none"
                                className="absolute -bottom-1 left-0 h-2.5 w-full text-accent/50"
                            >
                                <motion.path
                                    d="M2 9 C 60 3, 140 3, 298 7"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.2, delay: 0.9, ease }}
                                />
                            </svg>
                        </span>{" "}
                        products.
                    </motion.h1>

                    <motion.p {...fadeUp(0.28)} className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted">
                        I&apos;m <span className="text-fg">{PROFILE.name}</span>, a software engineer working across{" "}
                        <span className="text-fg">full-stack development</span> and <span className="text-fg">applied AI</span> —
                        LLM integration, AI agents and automation that ship to real users.
                    </motion.p>

                    <motion.div {...fadeUp(0.4)} className="mt-10 flex flex-wrap items-center gap-3">
                        <Magnetic>
                            <Link
                                href="/projects"
                                className="group inline-flex items-center gap-2 rounded-xl bg-fg px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent"
                            >
                                See selected work
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </Magnetic>
                        <Magnetic>
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 rounded-xl border border-line-strong bg-ink/40 px-5 py-3 text-sm text-fg backdrop-blur-sm transition-colors hover:border-accent hover:bg-white/[0.03]"
                            >
                                Get in touch
                            </a>
                        </Magnetic>
                        <div className="ml-1 flex items-center gap-1">
                            {SOCIAL_LINKS.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.url}
                                    target={s.url.startsWith("http") ? "_blank" : undefined}
                                    rel="noopener noreferrer"
                                    aria-label={s.name}
                                    className="grid size-11 place-items-center rounded-xl text-muted transition-colors hover:bg-white/5 hover:text-fg"
                                >
                                    <s.icon size={18} />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                <div className="relative flex justify-center [perspective:1400px] lg:justify-end">
                    {!reduce && (
                        <motion.div
                            aria-hidden
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.8, delay: 0.2, ease }}
                            className="pointer-events-none absolute left-1/2 top-1/2 -z-0 size-[min(560px,100vw)] -translate-x-1/2 -translate-y-1/2 sm:size-[min(720px,100vw)] lg:left-[55%] lg:size-[820px]"
                        >
                            <HeroOrb />
                        </motion.div>
                    )}
                    <motion.div
                        initial={{ opacity: 0, y: 40, rotate: 4 }}
                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                        transition={{ duration: 1.1, delay: 0.3, ease }}
                        style={reduce ? undefined : { y: cardY, rotateX: cardRotateX, scale: cardScale, transformStyle: "preserve-3d" }}
                        className="relative z-10"
                    >
                        <IdCard />
                    </motion.div>
                </div>
            </div>

            <motion.a
                href="#work"
                {...fadeUp(0.7)}
                className="mt-16 hidden items-center gap-3 self-start eyebrow transition-colors hover:text-fg md:inline-flex"
            >
                <span className="relative block h-8 w-px overflow-hidden bg-line-strong">
                    <motion.span
                        className="absolute inset-x-0 top-0 h-3 bg-accent"
                        animate={{ y: [-12, 32] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    />
                </span>
                Scroll to explore
            </motion.a>
        </section>
    );
};

/** A tilting "developer ID badge" that frames the avatar. */
const IdCard = () => {
    const reduce = useReducedMotion();
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 });
    const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 18 });
    const glareX = useTransform(mx, [-0.5, 0.5], ["0%", "100%"]);

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
    };
    const onLeave = () => {
        mx.set(0);
        my.set(0);
    };

    const rows: [string, string][] = [
        ["Focus", PROFILE.focus],
        ["Stack", "Next.js · React Native · Python"],
        ["Based", PROFILE.location],
    ];

    return (
        <div className="relative [perspective:1200px]" onMouseMove={onMove} onMouseLeave={onLeave}>
            {/* Lanyard */}
            <div aria-hidden className="absolute -top-28 left-1/2 hidden h-28 w-6 -translate-x-1/2 bg-[repeating-linear-gradient(180deg,#7c5cff_0_6px,#6a4be8_6px_12px)] lg:block" />
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative w-[300px] overflow-hidden rounded-[28px] border border-line-strong bg-surface shadow-[0_40px_120px_-40px_rgb(124_92_255/0.45)] sm:w-[340px]"
            >
                {/* Clip slot */}
                <div className="flex items-center justify-between px-5 pt-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">ID · KA—26</span>
                    <span aria-hidden className="h-2 w-14 rounded-full bg-ink ring-1 ring-line-strong" />
                    <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-signal">
                        <span className="size-1.5 rounded-full bg-signal" /> Active
                    </span>
                </div>

                <div className="relative mx-5 mt-4 aspect-[4/4.2] overflow-hidden rounded-2xl bg-[radial-gradient(120%_90%_at_50%_100%,#3b2a7a_0%,#191629_55%,#121218_100%)]">
                    <div aria-hidden className="absolute inset-0 bg-grid opacity-60 [background-size:24px_24px]" />
                    <Image
                        src="/hero-img.png"
                        alt="Illustrated portrait of Kabeer Ahmad"
                        fill
                        priority
                        sizes="340px"
                        className="object-cover object-[50%_18%] scale-[1.35] translate-y-[14%]"
                    />
                </div>

                <div className="px-5 pb-5 pt-5">
                    <p className="text-2xl font-medium tracking-tight text-fg">{PROFILE.name}</p>
                    <p className="mt-0.5 font-serif text-lg italic text-accent">{PROFILE.title}</p>

                    <dl className="mt-4 divide-y divide-line border-y border-line">
                        {rows.map(([k, v]) => (
                            <div key={k} className="flex items-center justify-between gap-4 py-2.5">
                                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">{k}</dt>
                                <dd className="truncate text-right text-[13px] text-muted">{v}</dd>
                            </div>
                        ))}
                    </dl>

                    <div className="mt-4 flex items-end justify-between">
                        <Barcode />
                        <ArrowUpRight size={18} className="text-dim" />
                    </div>
                </div>

                {/* Glare */}
                <motion.div
                    aria-hidden
                    style={{ left: glareX }}
                    className="pointer-events-none absolute -top-1/2 h-[200%] w-24 -translate-x-1/2 rotate-12 bg-white/[0.05] blur-2xl"
                />
            </motion.div>
        </div>
    );
};

const BARS = [3, 1, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2];
const Barcode = () => (
    <div aria-hidden className="flex h-8 items-stretch gap-[2px] opacity-70">
        {BARS.map((w, i) => (
            <span key={i} className="bg-fg/70" style={{ width: w }} />
        ))}
    </div>
);
