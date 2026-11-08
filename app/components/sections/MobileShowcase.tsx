"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, MotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { PROJECTS, type Project } from "@/app/constants";
import { Phone, PhoneScreen } from "../ui/Phone";
import { SectionHeading } from "../ui/SectionHeading";
import { useIsDesktop } from "@/app/lib/motion";

const ORDER = ["SomnAI", "Pillbook", "Plainly", "Physio School", "CoinSensei"];
const APPS = ORDER.map((t) => PROJECTS.find((p) => p.title === t)).filter(Boolean) as Project[];

const Caption = ({ app, i }: { app: Project; i: number }) => (
    <div className="max-w-[260px]">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
            <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> · {app.tech.slice(0, 2).join(" · ")}
        </p>
        <h3 className="mt-3 text-3xl font-medium tracking-tight text-fg">{app.title}</h3>
        <p className="mt-1 font-serif text-lg italic text-accent">{app.subtitle}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{app.description}</p>
        <div className="mt-5 flex gap-2">
            {app.demoLink && (
                <a href={app.demoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg bg-fg px-3 py-2 text-xs font-medium text-ink transition-colors hover:bg-accent">
                    Website <ArrowUpRight size={14} />
                </a>
            )}
            {app.githubLink && (
                <a href={app.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong px-3 py-2 text-xs text-muted transition-colors hover:border-accent hover:text-fg">
                    <Github size={14} /> Source
                </a>
            )}
        </div>
    </div>
);

/** Phone that turns in 3D depending on how far it is from the centre of the viewport. */
const Slide = ({ app, i, x }: { app: Project; i: number; x: MotionValue<number> }) => {
    const ref = useRef<HTMLDivElement>(null);
    const offset = (vx: number) => {
        const el = ref.current;
        if (!el) return 0;
        const vw = window.innerWidth;
        return (el.offsetLeft + vx + el.offsetWidth / 2 - vw / 2) / vw;
    };
    const rotateY = useTransform(x, (vx) => Math.max(-38, Math.min(38, -offset(vx) * 45)));
    const scale = useTransform(x, (vx) => 1 - Math.min(Math.abs(offset(vx)), 1) * 0.14);
    const floatY = useTransform(x, (vx) => Math.sin(offset(vx) * 3) * 18);

    return (
        <div ref={ref} className="flex w-[600px] shrink-0 items-center gap-12">
            <motion.div style={{ rotateY, scale, y: floatY, transformPerspective: 1200 }}>
                <Phone>
                    <PhoneScreen title={app.title} />
                </Phone>
            </motion.div>
            <Caption app={app} i={i} />
        </div>
    );
};

const Pinned = () => {
    const section = useRef<HTMLElement>(null);
    const track = useRef<HTMLDivElement>(null);
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        const measure = () => track.current && setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
        measure();
        const ro = new ResizeObserver(measure);
        if (track.current) ro.observe(track.current);
        window.addEventListener("resize", measure);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, []);

    const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
    const x = useTransform(scrollYProgress, (v) => -v * distance);
    const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section ref={section} id="apps" className="relative" style={{ height: `calc(100vh + ${distance}px)` }}>
            <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
                <motion.div ref={track} style={{ x }} className="flex w-max items-center gap-24 pl-[max(2rem,calc((100vw-72rem)/2+2rem))] pr-[20vw]">
                    <div className="w-[420px] shrink-0">
                        <div className="flex items-center gap-3 eyebrow">
                            <span className="text-accent">02</span>
                            <span className="h-px w-8 bg-line-strong" />
                            <span>Mobile apps</span>
                        </div>
                        <h2 className="mt-5 text-6xl font-medium leading-[1.02] tracking-[-0.035em] text-fg">
                            Pocket-sized, <em className="font-serif font-normal italic tracking-normal text-accent">AI-powered.</em>
                        </h2>
                        <p className="mt-5 text-lg leading-relaxed text-muted">
                            Native iOS and React Native apps — from an on-device dream journal to an adaptive quiz platform. Keep scrolling →
                        </p>
                    </div>
                    {APPS.map((app, i) => (
                        <Slide key={app.title} app={app} i={i} x={x} />
                    ))}
                    <Link href="/projects" className="group flex size-56 shrink-0 flex-col items-center justify-center rounded-full border border-line-strong text-center transition-colors hover:border-accent">
                        <span className="font-serif text-3xl italic text-fg">All work</span>
                        <ArrowUpRight className="mt-2 text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </Link>
                </motion.div>

                <div className="absolute inset-x-0 bottom-10 mx-auto flex max-w-6xl items-center gap-4 px-8">
                    <span className="font-mono text-[11px] text-dim">01</span>
                    <div className="h-px flex-1 bg-line-strong">
                        <motion.div style={{ scaleX: bar }} className="h-px origin-left bg-accent" />
                    </div>
                    <span className="font-mono text-[11px] text-dim">{String(APPS.length).padStart(2, "0")}</span>
                </div>
            </div>
        </section>
    );
};

const Swipe = () => (
    <section id="apps" className="py-24">
        <div className="px-5">
            <SectionHeading
                index="02"
                label="Mobile apps"
                title={
                    <>
                        Pocket-sized, <em>AI-powered.</em>
                    </>
                }
                description="Native iOS and React Native apps. Swipe →"
            />
        </div>
        <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 scrollbar-hide">
            {APPS.map((app, i) => (
                <div key={app.title} className="flex w-[78vw] max-w-[320px] shrink-0 snap-center flex-col gap-6">
                    <Phone className="origin-top-left scale-[0.92]">
                        <PhoneScreen title={app.title} />
                    </Phone>
                    <div className="-mt-10">
                        <Caption app={app} i={i} />
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export const MobileShowcase = () => {
    const isDesktop = useIsDesktop();
    const reduce = useReducedMotion();
    return isDesktop && !reduce ? <Pinned /> : <Swipe />;
};
