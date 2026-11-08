import type { Metadata } from "next";
import { ArrowDownToLine } from "lucide-react";
import { PageShell, PageHeader } from "../components/ui/PageShell";
import { Experience } from "../components/sections/Experience";
import { PROFILE } from "../constants";

export const metadata: Metadata = {
    title: "Experience",
    description: "Kabeer Ahmad's professional experience — Innovage.io, Stylique Technologies, PureLogics, 10Pearls, Mindstorm Studios and more.",
};

export default function ExperiencePage() {
    return (
        <PageShell>
            <PageHeader
                eyebrow="Experience"
                title={
                    <>
                        Shipping across the <em>whole stack</em>.
                    </>
                }
                description="From QA automation and game dev internships to founding an AI try-on startup and building on-device AI for mobile — here's the full timeline."
            >
                <a
                    href={PROFILE.cv}
                    download="Kabeer_Ahmad_CV.pdf"
                    className="mt-10 inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 text-sm text-fg transition-colors hover:border-accent"
                >
                    Download résumé <ArrowDownToLine size={16} />
                </a>
            </PageHeader>
            <Experience />
        </PageShell>
    );
}
