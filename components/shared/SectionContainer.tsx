import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "white" | "earth" | "dark";
}

export function SectionContainer({ children, className, id, variant = "white" }: SectionContainerProps) {
  const bg = {
    white: "bg-white",
    earth: "bg-[#fafaf9]",
    dark: "bg-[#1c1917] text-white",
  }[variant];

  return (
    <section id={id} className={cn(bg, "py-16 sm:py-20 lg:py-24", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
