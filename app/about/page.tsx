import { Education } from "../components/sections/Education";
import { Navbar } from "../components/ui/Navbar";

export default function AboutPage() {
    return (
        <main className="h-full w-full">
            <Navbar />
            <div className="flex flex-col gap-10 pt-20">
                <Education />
            </div>
        </main>
    );
}
