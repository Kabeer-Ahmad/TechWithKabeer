import { ReactNode } from "react";
import { Background } from "./Background";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";
import { SmoothScroll } from "./SmoothScroll";

/** Shared chrome for every page: backdrop, navbar, footer. */
export const PageShell = ({ children, footer = true }: { children: ReactNode; footer?: boolean }) => (
    <>
        <Background />
        <SmoothScroll />
        <ScrollProgress />
        <Navbar />
        <main className="relative">{children}</main>
        {footer && <Footer />}
    </>
);

/** Page-level hero used on inner pages. */
export const PageHeader = ({
    eyebrow,
    title,
    description,
    children,
}: {
    eyebrow: string;
    title: ReactNode;
    description?: ReactNode;
    children?: ReactNode;
}) => (
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-36 md:px-8 md:pb-20 md:pt-44">
        <p className="eyebrow flex items-center gap-3">
            <span className="size-1.5 rounded-full bg-accent" />
            {eyebrow}
        </p>
        <h1 className="mt-6 max-w-4xl text-balance text-5xl font-medium leading-[0.98] tracking-[-0.04em] text-fg md:text-8xl [&_em]:font-serif [&_em]:font-normal [&_em]:italic [&_em]:tracking-[-0.01em] [&_em]:text-accent">
            {title}
        </h1>
        {description && <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted">{description}</p>}
        {children}
    </section>
);
