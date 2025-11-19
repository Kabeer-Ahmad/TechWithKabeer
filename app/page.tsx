import { Hero } from "./components/sections/Hero";
import { PreviewBoxes } from "./components/sections/PreviewBoxes";
import { CodeShowcase } from "./components/sections/CodeShowcase";
import { Skills } from "./components/sections/Skills";
import { MyApproach } from "./components/sections/MyApproach";
import { ClientReviews } from "./components/sections/ClientReviews";
import { Contact } from "./components/sections/Contact";
import { Navbar } from "./components/ui/Navbar";

export default function Home() {
  return (
    <main className="h-full w-full">
      <Navbar />
      <div className="flex flex-col gap-0">
        <Hero />
        <PreviewBoxes />
        <CodeShowcase />
        <Skills />
        <MyApproach />
        <ClientReviews />
        <Contact />
      </div>
    </main>
  );
}
