import { Icon } from "@iconify/react";
import type { HangtagStyle } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Hangtag({
  style,
  label,
  className,
}: {
  style: HangtagStyle;
  label: string;
  className?: string;
}) {
  if (style === "ribbon") {
    return (
      <div className={cn("absolute top-4 left-0 z-10", className)}>
        <div className="flex items-center gap-1.5 bg-foreground text-background px-3 py-1.5 pr-4 text-[9px] font-semibold tracking-[0.2em] uppercase shadow-md">
          <span className="h-1 w-1 rounded-full bg-[color:var(--gold)]" />
          {label}
        </div>
      </div>
    );
  }
  if (style === "seal") {
    return (
      <div className={cn("absolute top-3 right-3 z-10", className)}>
        <div className="relative h-14 w-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.25)] ring-2 ring-[color:var(--gold)]/60 ring-offset-2 ring-offset-white">
          <Icon icon="ph:seal-check-duotone" className="absolute inset-0 m-auto w-8 h-8 opacity-10" />
          <span className="text-[7px] font-bold tracking-[0.15em] uppercase leading-tight text-center px-1">
            {label}
          </span>
        </div>
      </div>
    );
  }
  // classic — hanging tag with string
  return (
    <div className={cn("absolute top-0 right-6 z-10 flex flex-col items-center", className)}>
      <span className="block h-6 w-px bg-foreground/40" />
      <div className="relative bg-[#f5eedf] border border-foreground/70 px-3 py-2 shadow-md rotate-[2deg]">
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full border border-foreground/70 bg-white" />
        <p className="text-[8px] font-bold tracking-[0.2em] uppercase text-foreground">{label}</p>
        <p className="mt-0.5 text-[7px] font-mono tracking-widest text-foreground/50 text-center">
          .93
        </p>
      </div>
    </div>
  );
}
