"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    opacity: number;
}

export const MouseTrace = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    // Brighter, more vibrant colors for particles
    const colors = ["#c084fc", "#22d3ee", "#f472b6", "#a78bfa", "#2dd4bf"];

    useEffect(() => {
        let particleId = 0;
        let trailId = 0;

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);

            // Add trail point
            setTrail((prev) => {
                const newTrail = [
                    ...prev,
                    { x: e.clientX, y: e.clientY, id: trailId++ }
                ].slice(-20); // Keep last 20 points for longer trail
                return newTrail;
            });

            // Generate particles more frequently
            if (Math.random() > 0.6) {
                const newParticle: Particle = {
                    id: particleId++,
                    x: e.clientX,
                    y: e.clientY,
                    size: Math.random() * 40 + 15,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    opacity: Math.random() * 0.5 + 0.5, // Increased base opacity
                };

                setParticles((prev) => [...prev, newParticle]);

                // Remove particle after animation
                setTimeout(() => {
                    setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
                }, 1500);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Main cursor glow - brighter */}
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 bg-cyan-400/70 rounded-full pointer-events-none z-50 blur-xl mix-blend-screen"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                }}
            />

            {/* Larger outer glow - brighter */}
            <motion.div
                className="fixed top-0 left-0 w-20 h-20 bg-purple-400/50 rounded-full pointer-events-none z-50 blur-2xl mix-blend-screen"
                style={{
                    translateX: cursorXSpring,
                    translateY: cursorYSpring,
                    x: -10,
                    y: -10,
                }}
            />

            {/* Trail effect - brighter and more visible */}
            {trail.map((point, index) => {
                const opacity = (index / trail.length) * 0.8; // Increased opacity
                const scale = (index / trail.length) * 0.8 + 0.2;

                return (
                    <motion.div
                        key={point.id}
                        className="fixed rounded-full pointer-events-none z-40 mix-blend-screen"
                        style={{
                            left: point.x,
                            top: point.y,
                            width: 24 * scale,
                            height: 24 * scale,
                            background: `radial-gradient(circle, rgba(192, 132, 252, ${opacity}) 0%, rgba(34, 211, 238, ${opacity * 0.7}) 50%, transparent 100%)`,
                            transform: 'translate(-50%, -50%)',
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: opacity, scale: scale }}
                        exit={{ opacity: 0, scale: 0 }}
                    />
                );
            })}

            {/* Floating particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="fixed rounded-full pointer-events-none z-40 blur-md"
                    style={{
                        left: particle.x,
                        top: particle.y,
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particle.color,
                        mixBlendMode: 'screen',
                    }}
                    initial={{
                        opacity: particle.opacity,
                        scale: 0,
                        x: 0,
                        y: 0,
                    }}
                    animate={{
                        opacity: 0,
                        scale: 1.5,
                        x: (Math.random() - 0.5) * 100,
                        y: (Math.random() - 0.5) * 100 - 50,
                    }}
                    transition={{
                        duration: 1.5,
                        ease: "easeOut",
                    }}
                />
            ))}
        </>
    );
};
