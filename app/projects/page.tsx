import type { Metadata } from "next";
import { PageShell, PageHeader } from "../components/ui/PageShell";
import { Projects } from "../components/sections/Projects";
import { PROJECTS } from "../constants";

export const metadata: Metadata = {
    title: "Work",
    description: "Selected projects by Kabeer Ahmad — AI products, full-stack web apps, mobile apps and systems work.",
};

export default function ProjectsPage() {
    return (
        <PageShell>
            <PageHeader
                eyebrow={`Work · ${PROJECTS.length} projects`}
                title={
                    <>
                        Products, experiments &amp; <em>everything between</em>.
                    </>
                }
                description="AI platforms, full-stack web apps, mobile apps and low-level systems projects. Live projects show a real screenshot; private ones show what they do."
            />
            <Projects />
        </PageShell>
    );
}
