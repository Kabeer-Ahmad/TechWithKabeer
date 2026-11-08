import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROFILE, SOCIAL_LINKS } from "@/app/constants";
import { LocalClock } from "./LocalClock";

const LINKS = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/projects" },
    { name: "Experience", href: "/experience" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blogs" },
];

export const Footer = () => (
    <footer className="relative mt-24 border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
            <div>
                <p className="text-2xl font-medium tracking-tight text-fg">
                    Building with <em className="font-serif font-normal text-accent">intent</em>.
                </p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">{PROFILE.summary}</p>
            </div>
            <div>
                <p className="eyebrow mb-4">Pages</p>
                <ul className="space-y-2.5">
                    {LINKS.map((l) => (
                        <li key={l.name}>
                            <Link href={l.href} className="text-sm text-muted transition-colors hover:text-fg">
                                {l.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <p className="eyebrow mb-4">Elsewhere</p>
                <ul className="space-y-2.5">
                    {SOCIAL_LINKS.map((s) => (
                        <li key={s.name}>
                            <a
                                href={s.url}
                                target={s.url.startsWith("http") ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
                            >
                                {s.name}
                                <ArrowUpRight size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <div aria-hidden className="mx-auto max-w-6xl overflow-hidden px-5 md:px-8">
            <p className="translate-y-[18%] select-none whitespace-nowrap bg-gradient-to-b from-white/[0.12] to-transparent bg-clip-text text-center font-serif text-[18vw] italic leading-[0.8] tracking-[-0.03em] text-transparent lg:text-[13.5rem]">
                Kabeer Ahmad
            </p>
        </div>
        <div className="border-t border-line">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-dim sm:flex-row sm:items-center sm:justify-between md:px-8">
                <span>© {new Date().getFullYear()} {PROFILE.name}</span>
                <span>
                    {PROFILE.location} · <LocalClock timeZone={PROFILE.timezone} /> PKT
                </span>
            </div>
        </div>
    </footer>
);
