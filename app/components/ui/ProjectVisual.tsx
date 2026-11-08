"use client";

import { useEffect, useRef, useState } from "react";
import type { Project } from "@/app/constants";
import { cn } from "@/app/lib/utils";
import { Phone, PhoneScreen, hasPhoneScreen } from "./Phone";

/**
 * Visual preview for a project. Live projects get a real screenshot inside a
 * browser frame; everything else gets a hand-drawn illustration of what it does.
 */
export const ProjectVisual = ({ project, className }: { project: Project; className?: string }) => {
    const [failed, setFailed] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    // Image may finish loading before hydration attaches onLoad.
    useEffect(() => {
        const img = imgRef.current;
        if (img?.complete && img.naturalWidth > 0) queueMicrotask(() => setLoaded(true));
    }, []);
    const shot =
        project.demoLink && !failed && !hasPhoneScreen(project.title)
            ? `https://v1.screenshot.11ty.dev/${encodeURIComponent(project.demoLink)}/opengraph/_wait:5/`
            : null;

    return (
        <div className={cn("relative overflow-hidden rounded-2xl border border-line bg-surface-2", className)}>
            {shot ? (
                <div className="absolute inset-0 flex flex-col">
                    <div className="flex items-center gap-1.5 border-b border-line bg-surface px-3 py-2">
                        <span className="size-2 rounded-full bg-white/15" />
                        <span className="size-2 rounded-full bg-white/15" />
                        <span className="size-2 rounded-full bg-white/15" />
                        <span className="ml-2 truncate rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-dim">
                            {project.demoLink!.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                        </span>
                    </div>
                    <div className="relative flex-1 overflow-hidden">
                        {!loaded && (
                            <div className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,transparent_30%,rgb(255_255_255/0.04)_50%,transparent_70%)]">
                                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-serif text-5xl italic text-white/[0.06]">
                                    {project.title}
                                </span>
                            </div>
                        )}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            ref={imgRef}
                            src={shot}
                            alt={`${project.title} screenshot`}
                            loading="lazy"
                            onLoad={() => setLoaded(true)}
                            onError={() => setFailed(true)}
                            className={cn(
                                "absolute inset-0 h-full w-full object-cover object-top transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.04]",
                                loaded ? "opacity-100" : "opacity-0"
                            )}
                        />
                    </div>
                </div>
            ) : (
                <Illustration project={project} />
            )}
        </div>
    );
};

const Illustration = ({ project }: { project: Project }) => {
    const key = project.title.toLowerCase();
    if (hasPhoneScreen(project.title)) return <PhonePeek title={project.title} />;
    if (key.includes("faceless")) return <VideoTimeline />;
    if (key.includes("sniper")) return <TradingChart />;
    if (key.includes("face")) return <FaceScan />;
    return <Terminal project={project} />;
};

const PhonePeek = ({ title }: { title: string }) => (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(80%_70%_at_50%_100%,rgb(124_92_255/0.35),transparent_70%)]">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-40 [background-size:28px_28px]" />
        <div className="absolute left-1/2 top-6 origin-top -translate-x-1/2 scale-[0.62] transition-transform duration-700 ease-out group-hover:-translate-y-3">
            <Phone>
                <PhoneScreen title={title} />
            </Phone>
        </div>
    </div>
);

const Frame = ({ children, label }: { children: React.ReactNode; label: string }) => (
    <div className="absolute inset-0 flex flex-col">
        <div className="flex items-center justify-between border-b border-line bg-surface px-3 py-2">
            <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-white/15" />
                <span className="size-2 rounded-full bg-white/15" />
                <span className="size-2 rounded-full bg-white/15" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-dim">{label}</span>
        </div>
        <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
);

const VideoTimeline = () => {
    const tracks = [
        { name: "Script", color: "bg-accent/70", clips: [[2, 30], [34, 28], [66, 30]] },
        { name: "Visual", color: "bg-[#5ee1c2]/70", clips: [[2, 18], [22, 24], [48, 20], [70, 26]] },
        { name: "Voice", color: "bg-signal/70", clips: [[2, 44], [50, 46]] },
        { name: "Music", color: "bg-white/25", clips: [[2, 94]] },
    ];
    return (
        <Frame label="render · 1080p">
            <div className="absolute inset-0 flex flex-col justify-between p-4">
                <div className="flex flex-1 items-center justify-center">
                    <div className="relative grid aspect-video w-[58%] place-items-center rounded-lg border border-line bg-[radial-gradient(circle_at_30%_30%,#3b2a7a,#121218)]">
                        <div className="size-0 border-y-[9px] border-l-[15px] border-y-transparent border-l-fg/80" />
                        <span className="absolute bottom-1.5 left-2 font-mono text-[9px] text-muted">00:42 / 01:30</span>
                    </div>
                </div>
                <div className="relative mt-3 space-y-1.5">
                    {tracks.map((t) => (
                        <div key={t.name} className="flex items-center gap-2">
                            <span className="w-10 shrink-0 font-mono text-[9px] uppercase text-dim">{t.name}</span>
                            <div className="relative h-3 flex-1 rounded-sm bg-white/[0.03]">
                                {t.clips.map(([l, w], i) => (
                                    <span key={i} className={cn("absolute inset-y-0 rounded-sm", t.color)} style={{ left: `${l}%`, width: `${w}%` }} />
                                ))}
                            </div>
                        </div>
                    ))}
                    <span className="absolute -top-1 bottom-0 left-[calc(2.5rem+0.5rem+46%)] w-px bg-fg" />
                </div>
            </div>
        </Frame>
    );
};

const CANDLES = [
    [60, 48, 66, 44], [50, 42, 54, 38], [44, 52, 56, 40], [52, 58, 62, 50], [58, 46, 60, 44], [46, 40, 50, 36],
    [40, 34, 44, 30], [34, 40, 42, 30], [40, 30, 42, 26], [30, 24, 34, 20], [24, 30, 32, 20], [30, 22, 32, 18],
    [22, 16, 26, 12], [16, 20, 24, 12], [20, 12, 22, 8],
];
const TradingChart = () => (
    <Frame label="XAUUSD · M15">
        <svg viewBox="0 0 160 80" preserveAspectRatio="none" className="absolute inset-0 h-full w-full p-4">
            {[16, 32, 48, 64].map((y) => (
                <line key={y} x1="0" x2="160" y1={y} y2={y} stroke="rgb(255 255 255 / 0.05)" strokeWidth="0.5" />
            ))}
            {CANDLES.map(([o, c, h, l], i) => {
                const x = 6 + i * 10;
                const up = c < o;
                const color = up ? "#d4ff4f" : "#6b6b75";
                return (
                    <g key={i}>
                        <line x1={x} x2={x} y1={l} y2={h} stroke={color} strokeWidth="0.7" />
                        <rect x={x - 2.5} y={Math.min(o, c)} width="5" height={Math.max(Math.abs(o - c), 1)} fill={color} rx="0.6" />
                    </g>
                );
            })}
            <line x1="0" x2="160" y1="10" y2="10" stroke="#b4a1ff" strokeDasharray="2 2" strokeWidth="0.6" />
        </svg>
        <div className="absolute right-4 top-4 rounded-md border border-signal/30 bg-signal/10 px-2 py-1 font-mono text-[10px] text-signal">
            AI ▲ BUY · conf 0.82
        </div>
        <div className="absolute bottom-4 left-4 flex gap-2 font-mono text-[9px] text-dim">
            <span className="rounded bg-white/5 px-1.5 py-0.5">SL 1.2%</span>
            <span className="rounded bg-white/5 px-1.5 py-0.5">TP 2.8R</span>
        </div>
    </Frame>
);

const FaceScan = () => (
    <Frame label="opencv · live">
        <div className="absolute inset-0 grid place-items-center">
            <div className="relative h-[68%] aspect-[3/4] rounded-[40%] border border-white/10 bg-[radial-gradient(circle_at_50%_40%,#2a2440,#121218)]">
                <span className="absolute -inset-3 rounded-md border border-accent/70" />
                {["-left-3 -top-3 border-l-2 border-t-2", "-right-3 -top-3 border-r-2 border-t-2", "-left-3 -bottom-3 border-l-2 border-b-2", "-right-3 -bottom-3 border-r-2 border-b-2"].map((c) => (
                    <span key={c} className={cn("absolute size-3 border-signal", c)} />
                ))}
            </div>
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 space-y-1 font-mono text-[9px]">
            {[["skin", "medium"], ["eyes", "brown"], ["hair", "black / short"], ["glasses", "no"]].map(([k, v]) => (
                <div key={k} className="rounded bg-ink/80 px-1.5 py-0.5 text-muted">
                    <span className="text-dim">{k}:</span> {v}
                </div>
            ))}
        </div>
    </Frame>
);

const Terminal = ({ project }: { project: Project }) => {
    const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return (
        <Frame label="zsh">
            <div className="absolute inset-0 p-4 font-mono text-[11px] leading-relaxed">
                <p className="text-dim">
                    <span className="text-signal">➜</span> <span className="text-accent">~/{slug}</span> git:(main)
                </p>
                <p className="text-muted">$ run --stack</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 6).map((t) => (
                        <span key={t} className="rounded border border-line px-1.5 py-0.5 text-[10px] text-muted">
                            {t}
                        </span>
                    ))}
                </div>
                <p className="mt-2 text-dim">✓ build complete</p>
                <p className="text-muted">
                    $ <span className="inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-accent" />
                </p>
            </div>
            <span className="pointer-events-none absolute -bottom-6 -right-2 select-none font-serif text-[7rem] italic leading-none text-white/[0.04]">
                {project.title.charAt(0)}
            </span>
        </Frame>
    );
};
