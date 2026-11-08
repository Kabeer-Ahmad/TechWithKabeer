import { ReactNode } from "react";
import { cn } from "@/app/lib/utils";

/** CSS iPhone-style frame. Content is laid out at 260×540 and scales with `className`. */
export const Phone = ({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={cn("relative h-[540px] w-[260px] shrink-0 rounded-[46px] bg-[#1b1b20] p-[9px] shadow-[0_50px_100px_-30px_rgb(0_0_0/0.9),inset_0_0_0_1px_rgb(255_255_255/0.08)]", className)}>
        <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-black">
            {children}
            <div className="absolute left-1/2 top-2.5 z-20 h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-black" />
        </div>
        <span aria-hidden className="absolute -left-[2px] top-28 h-10 w-[3px] rounded-l bg-[#2a2a30]" />
        <span aria-hidden className="absolute -right-[2px] top-36 h-16 w-[3px] rounded-r bg-[#2a2a30]" />
    </div>
);

const StatusBar = ({ dark = true }: { dark?: boolean }) => (
    <div className={cn("flex items-center justify-between px-6 pt-3.5 text-[11px] font-semibold", dark ? "text-white" : "text-black")}>
        <span>9:41</span>
        <span className="flex items-center gap-1">
            <span className={cn("h-2 w-3.5 rounded-[2px] border", dark ? "border-white/80" : "border-black/80")} />
        </span>
    </div>
);

const SomnAIScreen = () => (
    <div className="flex h-full flex-col bg-[radial-gradient(120%_70%_at_50%_0%,#2b2160_0%,#0d0b1f_60%,#07060f_100%)] text-white">
        <StatusBar />
        {[[30, 70], [200, 60], [60, 140], [220, 170], [120, 40], [180, 110]].map(([x, y], i) => (
            <span key={i} className="absolute size-[2px] rounded-full bg-white/60" style={{ left: x, top: y }} />
        ))}
        <div className="px-6 pt-10">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">Good morning</p>
            <p className="mt-1 font-serif text-[28px] italic leading-tight">What did you dream?</p>
        </div>
        <div className="relative mx-auto mt-10 grid size-40 place-items-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-[#8b7bff]/20 [animation-duration:3s]" />
            <span className="absolute inset-3 rounded-full bg-[radial-gradient(circle_at_35%_30%,#e6dcff,#8b7bff_45%,#3b2a9a_80%)] shadow-[0_0_60px_10px_rgb(139_123_255/0.45)]" />
        </div>
        <p className="mt-6 text-center text-xs text-white/60">Hold Somna to record</p>
        <div className="mx-5 mt-auto mb-4 grid grid-cols-2 gap-2 text-[11px]">
            <div className="rounded-2xl bg-white/[0.06] p-3">
                <p className="text-white/50">Streak</p>
                <p className="mt-0.5 text-base font-semibold">12 days</p>
            </div>
            <div className="rounded-2xl bg-white/[0.06] p-3">
                <p className="text-white/50">Top motif</p>
                <p className="mt-0.5 text-base font-semibold">Water</p>
            </div>
        </div>
        <div className="flex justify-around border-t border-white/10 pb-6 pt-3 text-[10px] text-white/50">
            <span className="text-white">Today</span>
            <span>Patterns</span>
            <span>Journal</span>
        </div>
    </div>
);

const PillbookScreen = () => {
    const doses = [
        { name: "Vitamin D", dose: "1 tablet", time: "8:00", done: true },
        { name: "Antibiotic", dose: "500 mg", time: "13:00", done: true },
        { name: "Omega-3", dose: "1 capsule", time: "18:00", done: false },
        { name: "Antibiotic", dose: "500 mg", time: "21:00", done: false },
    ];
    return (
        <div className="flex h-full flex-col bg-[#f4f1ea] text-[#1d2a26]">
            <StatusBar dark={false} />
            <div className="px-5 pt-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#1d2a26]/50">Today</p>
                <div className="mt-2 flex items-end justify-between">
                    <p className="text-[26px] font-semibold leading-none tracking-tight">2 of 4 taken</p>
                    <div className="relative size-12">
                        <svg viewBox="0 0 36 36" className="size-12 -rotate-90">
                            <circle cx="18" cy="18" r="15" fill="none" stroke="#1d2a26" strokeOpacity="0.1" strokeWidth="4" />
                            <circle cx="18" cy="18" r="15" fill="none" stroke="#1f8a70" strokeWidth="4" strokeDasharray="47 94" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="mt-6 space-y-2 px-4">
                {doses.map((d, i) => (
                    <div key={i} className={cn("flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm", !d.done && i === 2 && "ring-2 ring-[#1f8a70]")}>
                        <span className={cn("grid size-9 place-items-center rounded-xl text-[13px] font-bold", d.done ? "bg-[#1f8a70] text-white" : "bg-[#1d2a26]/5 text-[#1d2a26]/60")}>
                            {d.done ? "✓" : "•"}
                        </span>
                        <span className="flex-1">
                            <span className="block text-[13px] font-semibold">{d.name}</span>
                            <span className="block text-[11px] text-[#1d2a26]/50">{d.dose}</span>
                        </span>
                        <span className="font-mono text-[12px] text-[#1d2a26]/60">{d.time}</span>
                    </div>
                ))}
            </div>
            <div className="mx-4 mt-auto mb-7 rounded-2xl bg-[#1f8a70] py-3.5 text-center text-sm font-semibold text-white">Mark Omega-3 as taken</div>
        </div>
    );
};

const PlainlyScreen = () => (
    <div className="flex h-full flex-col bg-white text-[#111]">
        <StatusBar dark={false} />
        <div className="px-5 pt-8">
            <div className="flex items-center gap-2.5">
                <span className="grid h-10 w-8 place-items-center rounded-md bg-[#ff5a3c] text-[9px] font-bold text-white">PDF</span>
                <span>
                    <span className="block text-[13px] font-semibold">Tenancy_Agreement.pdf</span>
                    <span className="block text-[11px] text-black/45">14 pages · 1 min read</span>
                </span>
            </div>
            <p className="mt-6 font-serif text-[24px] italic leading-tight">In plain words</p>
            <ul className="mt-3 space-y-2.5 text-[12.5px] leading-snug text-black/75">
                {["You rent the flat for 12 months, starting 1 March.", "Rent is due on the 1st; late after 7 days.", "Two months' notice is needed to leave early.", "You pay for any damage beyond normal wear."].map((t) => (
                    <li key={t} className="flex gap-2">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#ff5a3c]" />
                        {t}
                    </li>
                ))}
            </ul>
            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/40">Watch out for</p>
            <div className="mt-2 rounded-xl bg-[#fff3ef] p-3 text-[12px] text-[#b2391f]">Clause 9: deposit can be kept for cleaning costs.</div>
        </div>
        <div className="mx-5 mt-auto mb-7 flex gap-2 text-[12px] font-medium">
            <span className="flex-1 rounded-xl bg-black py-3 text-center text-white">Ask a question</span>
            <span className="rounded-xl border border-black/10 px-4 py-3">Share</span>
        </div>
    </div>
);

const PhysioScreen = () => (
    <div className="flex h-full flex-col bg-[#0b1220] text-white">
        <StatusBar />
        <div className="px-5 pt-8">
            <div className="flex items-center justify-between text-[11px] text-white/50">
                <span>Neuroanatomy</span>
                <span className="font-mono">4 / 10</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[40%] rounded-full bg-[#38bdf8]" />
            </div>
            <p className="mt-7 text-[19px] font-semibold leading-snug">Which nerve supplies the deltoid muscle?</p>
            <div className="mt-5 space-y-2 text-[13px]">
                {[
                    ["A", "Radial nerve", ""],
                    ["B", "Axillary nerve", "ok"],
                    ["C", "Musculocutaneous nerve", ""],
                    ["D", "Suprascapular nerve", ""],
                ].map(([k, v, st]) => (
                    <div key={k} className={cn("flex items-center gap-3 rounded-xl border p-3", st ? "border-[#34d399] bg-[#34d399]/10" : "border-white/10")}>
                        <span className={cn("grid size-6 place-items-center rounded-md text-[11px] font-bold", st ? "bg-[#34d399] text-black" : "bg-white/10")}>{k}</span>
                        {v}
                    </div>
                ))}
            </div>
            <p className="mt-4 rounded-xl bg-white/[0.05] p-3 text-[11.5px] leading-relaxed text-white/70">
                Correct — the axillary nerve (C5–C6) wraps around the surgical neck of the humerus.
            </p>
        </div>
        <div className="mx-5 mt-auto mb-7 flex items-center justify-between text-[11px] text-white/50">
            <span>Difficulty adapts to you</span>
            <span className="rounded-full bg-[#38bdf8] px-4 py-2 text-[12px] font-semibold text-black">Next</span>
        </div>
    </div>
);

const CoinSenseiScreen = () => (
    <div className="flex h-full flex-col bg-[#06120e] text-white">
        <StatusBar />
        <div className="px-5 pt-8">
            <p className="text-[11px] text-white/50">Wallet balance</p>
            <p className="mt-1 text-[30px] font-semibold tracking-tight">
                1,250.00 <span className="text-base text-[#26a17b]">USDT</span>
            </p>
            <div className="mt-6 grid grid-cols-2 rounded-xl bg-white/[0.06] p-1 text-[13px] font-semibold">
                <span className="rounded-lg bg-[#26a17b] py-2 text-center">Buy</span>
                <span className="py-2 text-center text-white/50">Sell</span>
            </div>
            <div className="mt-5 space-y-3 text-[12px]">
                <div className="rounded-xl border border-white/10 p-3">
                    <p className="text-white/45">You pay</p>
                    <p className="mt-1 text-lg font-semibold">PKR 28,000</p>
                </div>
                <div className="rounded-xl border border-white/10 p-3">
                    <p className="text-white/45">You receive</p>
                    <p className="mt-1 text-lg font-semibold">≈ 99.5 USDT</p>
                </div>
                <div className="flex gap-2">
                    <span className="rounded-full bg-[#26a17b]/20 px-3 py-1 text-[11px] text-[#5fe0b4]">TRC20</span>
                    <span className="rounded-full bg-white/[0.06] px-3 py-1 text-[11px] text-white/60">BEP20</span>
                </div>
            </div>
        </div>
        <div className="mx-5 mt-auto mb-7 rounded-xl bg-[#26a17b] py-3.5 text-center text-sm font-semibold">Continue</div>
    </div>
);

const SCREENS: Record<string, () => React.JSX.Element> = {
    SomnAI: SomnAIScreen,
    Pillbook: PillbookScreen,
    Plainly: PlainlyScreen,
    "Physio School": PhysioScreen,
    CoinSensei: CoinSenseiScreen,
};

export const hasPhoneScreen = (title: string) => title in SCREENS;

export const PhoneScreen = ({ title }: { title: string }) => {
    const Screen = SCREENS[title];
    return Screen ? <Screen /> : null;
};
