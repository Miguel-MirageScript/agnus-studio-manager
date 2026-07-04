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
  if (!label) return null;

  if (style === "ribbon") {
    return (
      <div className={cn("absolute top-5 left-0 z-10", className)}>
        <div className="flex items-center gap-2 bg-foreground/95 backdrop-blur-md text-background px-4 py-2 pr-5 text-[9px] font-bold tracking-[0.25em] uppercase shadow-lg border-y border-r border-white/10 rounded-r-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--gold)] shadow-[0_0_6px_var(--gold)]" />
          {label}
        </div>
      </div>
    );
  }

  if (style === "seal") {
    return (
      <div className={cn("absolute top-4 right-4 z-10", className)}>
        <div className="relative h-14 w-14 rounded-full bg-foreground text-background flex items-center justify-center shadow-xl border border-white/10 ring-1 ring-[color:var(--gold)]/80 ring-offset-2 ring-offset-transparent">
          <Icon icon="ph:seal-check-duotone" className="absolute inset-0 m-auto w-8 h-8 text-[color:var(--gold)] opacity-20" />
          <span className="text-[7px] font-black tracking-[0.2em] uppercase leading-tight text-center px-1 z-10">
            {label}
          </span>
        </div>
      </div>
    );
  }

  if (style === "metallic") {
    return (
      <div className={cn("absolute bottom-4 right-4 z-10", className)}>
        <div
          className="relative overflow-hidden rounded-sm px-4 py-2 text-[9px] font-black tracking-[0.25em] uppercase text-black shadow-[0_4px_15px_rgba(183,151,102,0.3)] ring-1 ring-inset ring-white/40"
          style={{
            background: "linear-gradient(135deg, #F9F1D8 0%, #D4AF37 45%, #9E7A27 60%, #EADDAB 100%)",
          }}
        >
          {/* Brilho interno simulando metal */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-50" />
          <span className="relative z-10 drop-shadow-sm">{label}</span>
        </div>
      </div>
    );
  }

  if (style === "side-label") {
    return (
      <div className={cn("absolute top-1/2 right-0 z-10 -translate-y-1/2 flex items-center shadow-xl", className)}>
        <div className="bg-white/95 backdrop-blur-sm text-foreground px-2.5 py-4 text-[9px] font-black tracking-[0.3em] uppercase [writing-mode:vertical-rl] rotate-180 border-y border-l border-black/10 rounded-l-md">
          {label}
        </div>
      </div>
    );
  }

  if (style === "minimal-float") {
    return (
      <div className={cn("absolute top-5 left-5 z-10", className)}>
        <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-black/5 shadow-sm flex items-center justify-center">
          <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-foreground/80 drop-shadow-sm">
            {label}
          </span>
        </div>
      </div>
    );
  }

  if (style === "brutalist") {
    return (
      <div className={cn("absolute top-4 left-4 z-10", className)}>
        <div className="bg-white border-2 border-black px-3 py-1.5 text-[10px] font-black tracking-[0.2em] uppercase text-black shadow-[4px_4px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#000] transition-all cursor-default">
          {label}
        </div>
      </div>
    );
  }

  // classic — Etiqueta pendurada com fio realista
  return (
    <div className={cn("absolute top-0 right-8 z-10 flex flex-col items-center drop-shadow-md", className)}>
      <span className="block h-8 w-px bg-gradient-to-b from-transparent to-black/30" />
      <div className="relative bg-[#F7F4EF] border border-black/10 px-4 py-2.5 shadow-lg rotate-[3deg] origin-top">
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full border border-black/20 bg-white shadow-inner" />
        <p className="text-[8px] font-black tracking-[0.25em] uppercase text-foreground">{label}</p>
        <div className="mt-1 h-[1px] w-full bg-black/5" />
        <p className="mt-1 text-[7px] font-mono tracking-widest text-foreground/40 text-center">
          .93
        </p>
      </div>
    </div>
  );
}
