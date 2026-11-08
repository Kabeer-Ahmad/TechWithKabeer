import { SKILLS } from "@/app/constants";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";

export const Skills = () => (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 md:px-8 md:py-32">
        <SectionHeading
            index="05"
            label="Toolkit"
            title={
                <>
                    The <em>stack</em> behind the work
                </>
            }
            description="Tools I use in production — picked for the problem, not the hype."
        />

        <div className="border-t border-line">
            {Object.entries(SKILLS).map(([group, items], i) => (
                <Reveal key={group} delay={i * 0.04}>
                    <div className="group grid gap-4 border-b border-line py-7 md:grid-cols-[260px_1fr] md:gap-10">
                        <div className="flex items-baseline gap-4">
                            <span className="font-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
                            <h3 className="font-serif text-2xl italic text-fg transition-colors group-hover:text-accent md:text-3xl">{group}</h3>
                        </div>
                        <ul className="flex flex-wrap gap-2">
                            {items.map((s) => (
                                <li
                                    key={s}
                                    className="rounded-full border border-line px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-accent/60 hover:bg-accent/[0.06] hover:text-fg"
                                >
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Reveal>
            ))}
        </div>
    </section>
);
