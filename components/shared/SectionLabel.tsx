import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "green" | "teal" | "light";
}

export function SectionLabel({ children, className, variant = "default" }: SectionLabelProps) {
  const color = {
    default: "text-[#78716c]",
    green: "text-[#16a34a]",
    teal: "text-[#0d9488]",
    light: "text-[#a8a29e]",
  }[variant];

  return (
    <p className={cn("text-xs font-semibold uppercase tracking-[0.15em] mb-3", color, className)}>
      {children}
    </p>
  );
}
