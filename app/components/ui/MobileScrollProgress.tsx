"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { RefObject } from "react";

interface MobileScrollProgressProps {
    containerRef: any;
}

export const MobileScrollProgress = ({ containerRef }: MobileScrollProgressProps) => {
    const { scrollXProgress } = useScroll({ container: containerRef });

    const scaleX = useSpring(scrollXProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="flex justify-center mt-4 md:hidden">
            <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 origin-left"
                    style={{ scaleX }}
                />
            </div>
        </div>
    );
};
