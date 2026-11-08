import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/app/constants";
import { ProjectVisual } from "./ProjectVisual";
import { Spotlight } from "./Spotlight";
import { cn } from "@/app/lib/utils";

export const ProjectCard = ({
    project,
    index,
    size = "default",
    className,
}: {
    project: Project;
    index: number;
    size?: "default" | "large" | "wide" | "stack";
    className?: string;
}) => {
    const extra = project.tech.length - 5;
    return (
        <Spotlight
            as="article"
            className={cn(
                "group relative flex h-full flex-col panel p-3 transition-colors duration-300 hover:border-line-strong",
                (size === "wide" || size === "stack") && "md:flex-row md:gap-4",
                size === "stack" && "bg-surface md:h-[min(560px,calc(100vh-10rem))]",
                className
            )}
        >
            <ProjectVisual
                project={project}
                className={cn(
                    "aspect-[16/10]",
                    size === "large" && "md:aspect-auto md:min-h-[360px] md:flex-1",
                    size === "wide" && "md:w-[55%] md:shrink-0",
                    size === "stack" && "md:aspect-auto md:h-full md:w-[58%] md:shrink-0"
                )}
            />

            <div className={cn("flex flex-1 flex-col px-2 pb-2 pt-5", (size === "wide" || size === "stack") && "md:py-4 md:pr-4")}>
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
                    <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
                    <span>{project.category}</span>
                    {project.isNew && (
                        <span className="rounded-full bg-signal/10 px-2 py-0.5 text-signal ring-1 ring-signal/25">New</span>
                    )}
                </div>

                <h3 className={cn("mt-3 font-medium tracking-[-0.02em] text-fg", size === "large" || size === "stack" ? "text-3xl md:text-4xl" : "text-2xl")}>
                    {project.title}
                </h3>
                <p className="mt-1 font-serif text-lg italic text-accent/90">{project.subtitle}</p>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted">{project.description}</p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 5).map((t) => (
                        <li key={t} className="rounded-md border border-line bg-white/[0.02] px-2 py-1 text-[11px] text-muted">
                            {t}
                        </li>
                    ))}
                    {extra > 0 && (
                        <li className="rounded-md px-2 py-1 text-[11px] text-dim" title={project.tech.slice(5).join(", ")}>
                            +{extra}
                        </li>
                    )}
                </ul>

                <div className="mt-auto flex items-center gap-2 pt-6">
                    {project.demoLink && (
                        <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-fg px-3 py-2 text-xs font-medium text-ink transition-colors hover:bg-accent"
                        >
                            Live site <ArrowUpRight size={14} />
                        </a>
                    )}
                    {project.githubLink && (
                        <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong px-3 py-2 text-xs text-muted transition-colors hover:border-accent hover:text-fg"
                        >
                            <Github size={14} /> Source
                        </a>
                    )}
                    {!project.demoLink && !project.githubLink && (
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">Private · demo on request</span>
                    )}
                </div>
            </div>
        </Spotlight>
    );
};
