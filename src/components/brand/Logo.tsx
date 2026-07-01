import { cn } from "@/lib/utils";

export function Logo({ className, size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "text-base",
    md: "text-xl md:text-2xl",
    lg: "text-3xl md:text-4xl",
  };
  return (
    <div className={cn("font-display flex items-baseline gap-1 text-[color:var(--gold)]", sizes[size], className)}>
      <span className="tracking-[0.35em]">A&nbsp;G&nbsp;N&nbsp;U&nbsp;S</span>
      <span className="text-[0.5em] align-super tracking-widest">.1993</span>
    </div>
  );
}
