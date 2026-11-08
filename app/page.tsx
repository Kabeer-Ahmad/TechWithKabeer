import { PageShell } from "./components/ui/PageShell";
import { Hero } from "./components/sections/Hero";
import { Highlights } from "./components/sections/Highlights";
import { Statement } from "./components/sections/Statement";
import { SelectedWork } from "./components/sections/SelectedWork";
import { MobileShowcase } from "./components/sections/MobileShowcase";
import { ExperiencePreview } from "./components/sections/ExperiencePreview";
import { CodeShowcase } from "./components/sections/CodeShowcase";
import { Skills } from "./components/sections/Skills";
import { MyApproach } from "./components/sections/MyApproach";
import { Clients } from "./components/sections/Clients";
import { Contact } from "./components/sections/Contact";

export default function Home() {
    return (
        <PageShell>
            <Hero />
            <Highlights />
            <Statement />
            <SelectedWork />
            <MobileShowcase />
            <ExperiencePreview />
            <CodeShowcase />
            <Skills />
            <MyApproach />
            <Clients />
            <Contact />
        </PageShell>
    );
}
