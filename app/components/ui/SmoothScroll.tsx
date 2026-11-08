"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { setLenis } from "@/app/lib/motion";

/** Inertia-based smooth scrolling (skipped when the user prefers reduced motion). */
export const SmoothScroll = () => {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const instance = new Lenis({
            duration: 1.15,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            anchors: { offset: -80 },
            autoRaf: true,
        });
        setLenis(instance);
        return () => {
            instance.destroy();
            setLenis(null);
        };
    }, []);
    return null;
};
