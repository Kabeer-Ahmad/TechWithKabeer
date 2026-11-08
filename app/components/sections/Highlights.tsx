import { STATS, SKILLS } from "@/app/constants";
import { CountUp } from "../ui/CountUp";
import { Marquee } from "../ui/Marquee";
import { Reveal } from "../ui/Reveal";

const STACK = Array.from(new Set(Object.values(SKILLS).flat()));

/** Stats strip + scrolling tech stack, sits right below the hero. */
export const Highlights = () => (
    <section aria-label="Highlights" className="relative">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
            <Reveal>
                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
                    {STATS.map((s) => (
                        <div key={s.label} className="flex flex-col gap-2 bg-ink px-5 py-8 md:px-7">
                            <dd className="text-5xl font-medium tracking-[-0.04em] text-fg md:text-6xl">
                                <CountUp to={s.value} suffix={s.suffix} />
                            </dd>
                            <dt className="text-sm text-muted">{s.label}</dt>
                        </div>
                    ))}
                </dl>
            </Reveal>
        </div>

        <div className="mt-10 py-2">
            <Marquee duration={60}>
                {STACK.map((t) => (
                    <span key={t} className="flex items-center gap-6 pr-6 font-mono text-sm uppercase tracking-[0.12em] text-dim">
                        {t}
                        <span className="text-accent/60">✦</span>
                    </span>
                ))}
            </Marquee>
        </div>
    </section>
);
