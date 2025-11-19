import { Experience } from "../components/sections/Experience";
import { Navbar } from "../components/ui/Navbar";

export default function ExperiencePage() {
    return (
        <main className="h-full w-full">
            <Navbar />
            <div className="flex flex-col gap-10 pt-20">
                <Experience />
            </div>
        </main>
    );
}
