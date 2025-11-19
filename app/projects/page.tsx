import { Projects } from "../components/sections/Projects";
import { Navbar } from "../components/ui/Navbar";

export default function ProjectsPage() {
    return (
        <main className="h-full w-full">
            <Navbar />
            <div className="flex flex-col gap-10 pt-20">
                <Projects />
            </div>
        </main>
    );
}
