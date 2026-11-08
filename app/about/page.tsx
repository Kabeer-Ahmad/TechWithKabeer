import type { Metadata } from "next";
import { PageShell, PageHeader } from "../components/ui/PageShell";
import { Education } from "../components/sections/Education";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";
import { PROFILE } from "../constants";

export const metadata: Metadata = {
    title: "About",
    description: "About Kabeer Ahmad — software engineer in full-stack development and applied AI. Education, research, certifications and languages.",
};

const FACTS = [
    { k: "Now", v: "Building on-device AI, agents and automation" },
    { k: "Before", v: "Founding engineer at an AI virtual try-on startup" },
    { k: "Incubated", v: "LUMS LCE Idea Launch · National Incubation Center" },
    { k: "Research", v: "Network intrusion detection — IEEE Xplore" },
];

export default function AboutPage() {
    return (
        <PageShell>
            <PageHeader
                eyebrow="About"
                title={
                    <>
                        Engineer by training, <em>builder</em> by habit.
                    </>
                }
            />

            <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
                <SectionHeading index="01" label="In short" title={<>The <em>short</em> version</>} />
                <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
                    <Reveal>
                        <div className="space-y-5 text-pretty text-lg leading-relaxed text-muted">
                            <p>
                                <span className="text-fg">{PROFILE.summary}</span>
                            </p>
                            <p>
                                I studied Computer Science at FAST-NUCES Lahore and spent my university years collecting internships across QA automation, game
                                development, cyber security and full-stack engineering — which is why I&apos;m comfortable anywhere from a Unity scene to a
                                Postgres schema.
                            </p>
                            <p>
                                As a founding engineer at Stylique I built a virtual try-on pipeline on custom diffusion models, DensePose and SCHP, and took
                                it from R&amp;D to B2B production. Today I build React Native apps with on-device AI, modernise legacy systems, and design
                                n8n + Python automations — including AI voice agents.
                            </p>
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <dl className="divide-y divide-line border-y border-line">
                            {FACTS.map((f) => (
                                <div key={f.k} className="grid grid-cols-[110px_1fr] gap-4 py-5">
                                    <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-dim">{f.k}</dt>
                                    <dd className="text-fg">{f.v}</dd>
                                </div>
                            ))}
                        </dl>
                    </Reveal>
                </div>
            </section>

            <Education />
        </PageShell>
    );
}
