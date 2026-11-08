"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Words wrapped in *asterisks* get the serif-italic accent.
const TEXT =
    "I build software where *AI does real work* — on-device models that read your dreams, diffusion pipelines that dress shoppers, voice agents that pick up the phone, and automations that quietly *give teams their time back.*";

const tokens = (() => {
    const out: { word: string; accent: boolean }[] = [];
    let accent = false;
    for (const raw of TEXT.split(" ")) {
        let w = raw;
        const opens = w.startsWith("*");
        if (opens) {
            accent = true;
            w = w.slice(1);
        }
        const closes = w.endsWith("*") || w.endsWith("*.");
        w = w.replace(/\*/g, "");
        out.push({ word: w, accent });
        if (closes) accent = false;
    }
    return out;
})();

/** Large statement whose words light up one by one as it scrolls through the viewport. */
export const Statement = () => {
    const ref = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });

    return (
        <section aria-label="What I do" className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
            <p className="eyebrow mb-8 flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-accent" /> What I do
            </p>
            <p ref={ref} className="flex flex-wrap text-[2rem] font-medium leading-[1.12] tracking-[-0.035em] md:text-6xl md:leading-[1.08]">
                {tokens.map((t, i) => (
                    <Word key={i} progress={scrollYProgress} range={[i / tokens.length, (i + 1) / tokens.length]} accent={t.accent}>
                        {t.word}
                    </Word>
                ))}
            </p>
        </section>
    );
};

const Word = ({ children, progress, range, accent }: { children: string; progress: MotionValue<number>; range: [number, number]; accent: boolean }) => {
    const opacity = useTransform(progress, range, [0.12, 1]);
    const y = useTransform(progress, range, [8, 0]);
    return (
        <span className="relative mr-[0.25em] mt-1">
            <motion.span
                style={{ opacity, y }}
                className={accent ? "inline-block font-serif font-normal italic tracking-[-0.01em] text-accent" : "inline-block text-fg"}
            >
                {children}
            </motion.span>
        </span>
    );
};
