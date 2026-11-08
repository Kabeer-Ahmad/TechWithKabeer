"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowDownToLine, Menu, X } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { PROFILE } from "@/app/constants";
import { getLenis } from "@/app/lib/motion";

const NAV_ITEMS = [
    { name: "Work", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blogs" },
    { name: "Contact", href: "/#contact" },
];

export const Navbar = () => {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [hovered, setHovered] = useState<string | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        if (open) getLenis()?.stop();
        else getLenis()?.start();
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        if (open) window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [open]);

    const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);
    const highlight = hovered ?? NAV_ITEMS.find((i) => isActive(i.href))?.name ?? null;

    return (
        <>
            <motion.header
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
            >
                <nav
                    className={cn(
                        "flex w-full max-w-6xl items-center justify-between rounded-2xl border px-3 py-2 transition-all duration-500",
                        scrolled || open
                            ? "border-line bg-ink/75 shadow-[0_8px_40px_-12px_rgb(0_0_0/0.8)] backdrop-blur-xl"
                            : "border-transparent bg-transparent"
                    )}
                >
                    <Link href="/" onClick={() => setOpen(false)} className="group flex items-center gap-3 rounded-xl px-1.5 py-1" aria-label="Home">
                        <span className="grid size-9 place-items-center rounded-lg bg-fg font-mono text-[13px] font-semibold text-ink transition-transform duration-300 group-hover:-rotate-6">
                            KA
                        </span>
                        <span className="hidden leading-tight sm:block">
                            <span className="block text-sm font-medium text-fg">{PROFILE.name}</span>
                            <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-dim">{PROFILE.title}</span>
                        </span>
                    </Link>

                    <ul className="hidden items-center md:flex" onMouseLeave={() => setHovered(null)}>
                        {NAV_ITEMS.map((item) => (
                            <li key={item.name} className="relative">
                                <Link
                                    href={item.href}
                                    onMouseEnter={() => setHovered(item.name)}
                                    className={cn(
                                        "relative z-10 block px-4 py-2 text-sm transition-colors",
                                        isActive(item.href) || hovered === item.name ? "text-fg" : "text-muted"
                                    )}
                                >
                                    {item.name}
                                </Link>
                                {highlight === item.name && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        className="absolute inset-0 rounded-lg bg-white/[0.06]"
                                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-2">
                        <a
                            href={PROFILE.cv}
                            download="Kabeer_Ahmad_CV.pdf"
                            className="hidden items-center gap-2 rounded-xl bg-fg px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent sm:inline-flex"
                        >
                            Résumé
                            <ArrowDownToLine size={15} />
                        </a>
                        <button
                            onClick={() => setOpen((v) => !v)}
                            className="grid size-10 place-items-center rounded-xl text-fg transition-colors hover:bg-white/5 md:hidden"
                            aria-label={open ? "Close menu" : "Open menu"}
                            aria-expanded={open}
                        >
                            {open ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </nav>
            </motion.header>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-40 bg-ink/95 px-6 pt-28 backdrop-blur-xl md:hidden"
                    >
                        <ul className="flex flex-col">
                            {NAV_ITEMS.map((item, i) => (
                                <motion.li
                                    key={item.name}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                    className="border-b border-line"
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setOpen(false)}
                                        className="flex items-baseline justify-between py-5"
                                    >
                                        <span className={cn("text-3xl tracking-tight", isActive(item.href) ? "text-accent" : "text-fg")}>
                                            {item.name}
                                        </span>
                                        <span className="font-mono text-xs text-dim">0{i + 1}</span>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                        <a
                            href={PROFILE.cv}
                            download="Kabeer_Ahmad_CV.pdf"
                            className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-fg py-4 font-medium text-ink"
                        >
                            Download Résumé <ArrowDownToLine size={16} />
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
