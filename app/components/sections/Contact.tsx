"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Check, Copy, Linkedin, MessageCircle } from "lucide-react";
import { PROFILE, SOCIAL_LINKS } from "@/app/constants";
import { LocalClock } from "../ui/LocalClock";

export const Contact = () => {
    const [copied, setCopied] = useState(false);
    const whatsappLink = `https://wa.me/${PROFILE.whatsapp.replace(/\D/g, "")}`;
    const linkedin = SOCIAL_LINKS.find((s) => s.name === "LinkedIn")!;
    const reduce = useReducedMotion();
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.35"] });
    const sp = useSpring(scrollYProgress, { stiffness: 100, damping: 26 });
    const rotateX = useTransform(sp, [0, 1], [24, 0]);
    const scale = useTransform(sp, [0, 1], [0.88, 1]);
    const y = useTransform(sp, [0, 1], [80, 0]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(PROFILE.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {
            /* clipboard unavailable */
        }
    };

    return (
        <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
            <motion.div
                ref={ref}
                style={reduce ? undefined : { rotateX, scale, y, transformPerspective: 1400, transformOrigin: "bottom center" }}
            >
                <div className="relative overflow-hidden rounded-[32px] border border-line bg-surface p-6 sm:p-10 md:p-14">
                    <div aria-hidden className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
                    <div aria-hidden className="absolute -right-32 -top-32 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgb(124_92_255/0.35),transparent)]" />

                    <div className="relative">
                        <div className="flex items-center gap-3 eyebrow">
                            <span className="text-accent">08</span>
                            <span className="h-px w-8 bg-line-strong" />
                            <span>Contact</span>
                        </div>
                        <h2 className="mt-6 max-w-3xl text-balance text-5xl font-medium leading-[0.98] tracking-[-0.04em] text-fg md:text-7xl">
                            Have an idea? <em className="font-serif font-normal italic tracking-normal text-accent">Let&apos;s build it.</em>
                        </h2>
                        <p className="mt-6 max-w-xl text-lg text-muted">
                            Full-stack products, AI features, agents or automations — tell me what you&apos;re working on and I&apos;ll get back to you.
                        </p>

                        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <a
                                href={`mailto:${PROFILE.email}`}
                                className="group inline-flex min-w-0 items-center justify-between gap-4 rounded-2xl bg-fg px-6 py-5 text-ink transition-colors hover:bg-accent sm:justify-start"
                            >
                                <span className="truncate text-lg font-medium tracking-tight md:text-2xl">{PROFILE.email}</span>
                                <ArrowUpRight className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                            <button
                                onClick={copy}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-line-strong px-5 py-5 text-sm text-muted transition-colors hover:border-accent hover:text-fg"
                            >
                                {copied ? <Check size={16} className="text-signal" /> : <Copy size={16} />}
                                {copied ? "Copied" : "Copy email"}
                            </button>
                        </div>

                        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
                            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 bg-surface p-5 transition-colors hover:bg-surface-2">
                                <MessageCircle size={20} className="text-signal" />
                                <span>
                                    <span className="block eyebrow">WhatsApp</span>
                                    <span className="block text-sm text-fg">{PROFILE.whatsapp}</span>
                                </span>
                                <ArrowUpRight size={16} className="ml-auto text-dim transition-colors group-hover:text-fg" />
                            </a>
                            <a href={linkedin.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 bg-surface p-5 transition-colors hover:bg-surface-2">
                                <Linkedin size={20} className="text-accent" />
                                <span>
                                    <span className="block eyebrow">LinkedIn</span>
                                    <span className="block text-sm text-fg">{linkedin.handle}</span>
                                </span>
                                <ArrowUpRight size={16} className="ml-auto text-dim transition-colors group-hover:text-fg" />
                            </a>
                            <div className="flex items-center gap-4 bg-surface p-5">
                                <span className="relative flex size-5 items-center justify-center">
                                    <span className="size-2 rounded-full bg-signal animate-pulse-dot" />
                                </span>
                                <span>
                                    <span className="block eyebrow">Local time</span>
                                    <span className="block text-sm text-fg">
                                        <LocalClock timeZone={PROFILE.timezone} /> · {PROFILE.location}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
