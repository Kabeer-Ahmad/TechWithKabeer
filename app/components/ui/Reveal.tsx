"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type RevealProps = {
    children: ReactNode;
    delay?: number;
    y?: number;
    className?: string;
    as?: "div" | "li" | "section" | "article";
};

/** Fades + lifts content in once when it scrolls into view. */
export const Reveal = ({ children, delay = 0, y = 24, className, as = "div" }: RevealProps) => {
    const reduce = useReducedMotion();
    const Comp = motion[as];
    return (
        <Comp
            className={className}
            initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </Comp>
    );
};
