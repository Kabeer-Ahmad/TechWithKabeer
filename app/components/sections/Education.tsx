import { ArrowUpRight, FileText } from "lucide-react";
import { CREDENTIALS, EDUCATION, PROFILE, PUBLICATIONS } from "@/app/constants";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

export const Education = () => (
    <>
        {/* Education + Languages */}
        <section className="mx-auto max-w-6xl px-5 py-20 md:px-8">
            <SectionHeading index="02" label="Education" title={<>Where I <em>learned</em></>} />
            <div className="grid gap-4 md:grid-cols-3">
                {EDUCATION.map((e, i) => (
                    <Reveal key={e.degree} delay={i * 0.06} className="h-full">
                        <div className="flex h-full flex-col panel p-6">
                            <span className="font-mono text-xs text-dim">{e.period}</span>
                            <h3 className="mt-6 text-2xl font-medium tracking-tight text-fg">{e.degree}</h3>
                            <p className="mt-1 text-muted">{e.institution}</p>
                            <p className="mt-auto pt-8 font-serif text-3xl italic text-accent">{e.details}</p>
                        </div>
                    </Reveal>
                ))}
                <Reveal delay={0.12} className="h-full">
                    <div className="flex h-full flex-col panel p-6">
                        <span className="font-mono text-xs text-dim">Languages</span>
                        <ul className="mt-6 divide-y divide-line">
                            {PROFILE.languages.map((l) => (
                                <li key={l.name} className="flex items-baseline justify-between py-3">
                                    <span className="text-2xl font-medium tracking-tight text-fg">{l.name}</span>
                                    <span className="font-serif text-lg italic text-accent">{l.level}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Reveal>
            </div>
        </section>

        {/* Publication */}
        <section className="mx-auto max-w-6xl px-5 py-20 md:px-8">
            <SectionHeading index="03" label="Research" title={<>Published <em>work</em></>} />
            {PUBLICATIONS.map((p) => (
                <Reveal key={p.id}>
                    <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-line-strong md:flex-row md:items-center md:p-10"
                    >
                        <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent">
                            <FileText size={28} />
                        </span>
                        <span className="flex-1">
                            <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-dim">
                                {p.venue} · Article {p.id}
                            </span>
                            <span className="mt-2 block text-balance text-2xl font-medium leading-snug tracking-tight text-fg md:text-3xl">{p.title}</span>
                        </span>
                        <ArrowUpRight className="shrink-0 text-dim transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" size={28} />
                    </a>
                </Reveal>
            ))}
        </section>

        {/* Credentials */}
        <section className="mx-auto max-w-6xl px-5 py-20 md:px-8">
            <SectionHeading
                index="04"
                label="Credentials"
                title={<>Certifications &amp; <em>courses</em></>}
                description={`${CREDENTIALS.length} completed — from AWS and Meta to security, robotics and test automation.`}
            />
            <ul className="border-t border-line">
                {CREDENTIALS.map((c, i) => {
                    const inner = (
                        <>
                            <span className="font-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
                            <span className="min-w-0">
                                <span className="block truncate text-base text-fg md:text-lg">{c.title}</span>
                                <span className="block text-sm text-dim md:hidden">
                                    {c.provider} · {c.date}
                                </span>
                            </span>
                            <span className="hidden text-sm text-muted md:block">{c.provider}</span>
                            <span className="hidden font-mono text-xs text-dim md:block">{c.date}</span>
                            <span className="hidden rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-dim sm:inline">
                                {c.type}
                            </span>
                            <ArrowUpRight size={18} className={c.link ? "text-dim transition-colors group-hover:text-accent" : "invisible"} />
                        </>
                    );
                    const cls =
                        "group grid grid-cols-[32px_1fr_auto] items-center gap-4 border-b border-line py-4 sm:grid-cols-[32px_1fr_auto_auto] md:grid-cols-[40px_1fr_160px_90px_auto_24px]";
                    return (
                        <li key={c.title}>
                            {c.link ? (
                                <a href={c.link} target="_blank" rel="noopener noreferrer" className={`${cls} transition-colors hover:bg-white/[0.02]`}>
                                    {inner}
                                </a>
                            ) : (
                                <div className={cls}>{inner}</div>
                            )}
                        </li>
                    );
                })}
            </ul>
        </section>
    </>
);
