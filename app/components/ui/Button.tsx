import { cn } from "@/app/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "outline";
}

export const Button = ({ children, className, variant = "primary", ...props }: ButtonProps) => {
    const variants = {
        primary: "bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:opacity-90",
        secondary: "bg-white/10 text-white hover:bg-white/20",
        outline: "border border-purple-500 text-purple-400 hover:bg-purple-500/10",
    };

    return (
        <button
            className={cn(
                "px-6 py-3 rounded-lg font-medium transition-all duration-200",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
