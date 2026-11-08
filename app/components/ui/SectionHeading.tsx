import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { TitleReveal } from "./TitleReveal";
import { cn } from "@/app/lib/utils";

interface SectionHeadingProps {
    index?: string;
    label: string;
    title: ReactNode;
    description?: ReactNode;
    action?: { href: string; label: string };
    className?: string;
}

/**
 * Editorial section header: "01 — Label" eyebrow, large title (wrap words in
 * <em> for the serif-italic accent), optional description and link.
 */
export const SectionHeading = ({ index, label, title, description, action, className }: SectionHeadingProps) => (
    <Reveal className={cn("mb-12 md:mb-16", className)}>
        <div className="flex items-center gap-3 eyebrow">
            {index && <span className="text-accent">{index}</span>}
            <span className="h-px w-8 bg-line-strong" />
            <span>{label}</span>
        </div>
        <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <TitleReveal className="max-w-3xl text-balance text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-fg md:text-6xl [&_em]:font-serif [&_em]:font-normal [&_em]:italic [&_em]:tracking-normal [&_em]:text-accent">
                {title}
            </TitleReveal>
            {action && (
                <Link
                    href={action.href}
                    className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-line-strong px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-fg md:self-auto"
                >
                    {action.label}
                    <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
            )}
        </div>
        {description && <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted md:text-lg">{description}</p>}
    </Reveal>
);
