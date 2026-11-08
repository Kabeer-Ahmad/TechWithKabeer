"use client";

import { ReactNode, useRef } from "react";
import { cn } from "@/app/lib/utils";

/** Adds a soft accent glow that follows the cursor across the element. */
export const Spotlight = ({ children, className, as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "article" }) => {
    const ref = useRef<HTMLElement>(null);
    const onMove = (e: React.PointerEvent<HTMLElement>) => {
        const el = ref.current;
        if (!el || e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    return (
        <Tag ref={ref as never} onPointerMove={onMove} className={cn("relative", className)}>
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(180 161 255 / 0.10), transparent 60%)" }}
            />
            {children}
        </Tag>
    );
};
