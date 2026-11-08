import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EXPERIENCES } from "@/app/constants";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

export const ExperiencePreview = () => {
    const items = EXPERIENCES.slice(0, 5);
    return (
        <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
            <SectionHeading
                index="03"
                label="Experience"
                title={
                    <>
                        Where I&apos;ve been <em>shipping</em>
                    </>
                }
                action={{ href: "/experience", label: "Full timeline" }}
            />

            <ol className="border-t border-line">
                {items.map((exp, i) => (
                    <Reveal as="li" key={`${exp.company}-${exp.role}`} delay={i * 0.05}>
                        <Link
                            href="/experience"
                            className="group relative grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 border-b border-line py-6 transition-colors md:grid-cols-[180px_1fr_auto_auto] md:py-7"
                        >
                            <span aria-hidden className="absolute inset-y-0 -left-4 -right-4 -z-10 rounded-xl bg-white/[0.025] opacity-0 transition-opacity group-hover:opacity-100" />
                            <span className="order-3 col-span-2 font-mono text-xs text-muted md:order-none md:col-span-1">{exp.period}</span>
                            <span className="min-w-0">
                                <span className="block text-lg font-medium tracking-tight text-fg md:text-xl">{exp.role}</span>
                                <span className="block text-sm text-muted">
                                    {exp.company} · {exp.location}
                                </span>
                            </span>
                            <span className="hidden rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-dim md:inline">
                                {exp.type}
                            </span>
                            <ArrowUpRight
                                size={20}
                                className="text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                            />
                        </Link>
                    </Reveal>
                ))}
            </ol>
        </section>
    );
};
