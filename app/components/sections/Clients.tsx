import { CLIENTS, RECOGNITION } from "@/app/constants";
import { SectionHeading } from "../ui/SectionHeading";
import { Marquee } from "../ui/Marquee";
import { Reveal } from "../ui/Reveal";

/** Real clients and independent recognition — in place of testimonials. */
export const Clients = () => (
    <section id="clients" className="scroll-mt-24 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
            <SectionHeading
                index="07"
                label="Clients & recognition"
                title={
                    <>
                        Built for <em>real</em> businesses
                    </>
                }
                description="From coffee chains and body shops to fashion labels and edtech — plus a few places that picked my work independently."
            />
        </div>

        <div className="border-y border-line py-8">
            <Marquee duration={50}>
                {CLIENTS.map((c) => (
                    <span key={c} className="flex items-center gap-10 pr-10">
                        <span className="whitespace-nowrap font-serif text-4xl italic text-fg/80 transition-colors hover:text-accent md:text-6xl">{c}</span>
                        <span className="text-xl text-accent/60">✦</span>
                    </span>
                ))}
            </Marquee>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-4 px-5 md:grid-cols-3 md:px-8">
            {RECOGNITION.map((r, i) => (
                <Reveal key={r.title} delay={i * 0.08} className="h-full">
                    <div className="group flex h-full flex-col panel p-6 transition-colors hover:border-line-strong">
                        <span className="self-start rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-dim">{r.tag}</span>
                        <p className="mt-8 text-2xl font-medium tracking-tight text-fg">{r.title}</p>
                        <p className="mt-1 text-sm text-muted">{r.detail}</p>
                    </div>
                </Reveal>
            ))}
        </div>
    </section>
);
