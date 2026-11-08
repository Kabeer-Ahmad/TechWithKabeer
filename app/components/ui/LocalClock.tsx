"use client";

import { useEffect, useState } from "react";

/** Live wall-clock time for a given IANA timezone (renders nothing until mounted to avoid hydration mismatch). */
export const LocalClock = ({ timeZone, className }: { timeZone: string; className?: string }) => {
    const [now, setNow] = useState<Date | null>(null);

    useEffect(() => {
        const tick = () => setNow(new Date());
        const first = setTimeout(tick, 0);
        const id = setInterval(tick, 15_000);
        return () => {
            clearTimeout(first);
            clearInterval(id);
        };
    }, []);

    const text = now
        ? new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone }).format(now)
        : "--:--";

    return (
        <span className={className} suppressHydrationWarning>
            {text}
        </span>
    );
};
