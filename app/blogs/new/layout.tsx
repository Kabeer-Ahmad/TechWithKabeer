import type { Metadata } from "next";

// Admin-only editor: keep it out of search results.
export const metadata: Metadata = {
    title: "New post",
    robots: { index: false, follow: false },
};

export default function NewPostLayout({ children }: { children: React.ReactNode }) {
    return children;
}
