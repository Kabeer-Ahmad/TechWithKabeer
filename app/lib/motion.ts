"use client";

import { useSyncExternalStore } from "react";
import type Lenis from "lenis";

/** Subscribe to a CSS media query. Returns `false` during SSR. */
export const useMediaQuery = (query: string) =>
    useSyncExternalStore(
        (cb) => {
            const mql = window.matchMedia(query);
            mql.addEventListener("change", cb);
            return () => mql.removeEventListener("change", cb);
        },
        () => window.matchMedia(query).matches,
        () => false
    );

/** True on viewports wide enough for pinned / 3D scroll effects. */
export const useIsDesktop = () => useMediaQuery("(min-width: 768px)");

// Single shared Lenis instance so other components (e.g. the mobile menu) can pause scrolling.
let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
    lenis = l;
};
export const getLenis = () => lenis;

export const EASE = [0.22, 1, 0.36, 1] as const;
