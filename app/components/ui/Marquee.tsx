import { ReactNode } from "react";
import { cn } from "@/app/lib/utils";

/** Infinite horizontal marquee. Children are rendered twice for a seamless loop. */
export const Marquee = ({
    children,
    reverse = false,
    duration = 40,
    className,
}: {
    children: ReactNode;
    reverse?: boolean;
    duration?: number;
    className?: string;
}) => (
    <div className={cn("marquee-group relative flex overflow-hidden mask-fade-x", className)}>
        <div
            className={cn("marquee-track flex w-max shrink-0", reverse ? "animate-marquee-reverse" : "animate-marquee")}
            style={{ ["--marquee-duration" as string]: `${duration}s` }}
        >
            <div className="flex shrink-0 items-center">{children}</div>
            <div className="flex shrink-0 items-center" aria-hidden>
                {children}
            </div>
        </div>
    </div>
);
