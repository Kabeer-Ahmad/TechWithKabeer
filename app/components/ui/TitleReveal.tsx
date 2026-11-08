"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

/** Heading that wipes up from behind a mask when it scrolls into view. */
export const TitleReveal = ({ children, className }: { children: ReactNode; className?: string }) => {
    const reduce = useReducedMotion();
    return (
        <motion.h2
            className={className}
            initial={reduce ? false : { clipPath: "inset(0 0 100% 0)", y: 48, rotateX: -18 }}
            whileInView={{ clipPath: "inset(-10% -5% -25% -5%)", y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformPerspective: 900, transformOrigin: "bottom" }}
        >
            {children}
        </motion.h2>
    );
};
