import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import type { StatusTag } from "@/lib/products";

const CONFIG: Record<StatusTag, { icon: string; className: string; animate: string; iconClass?: string }> = {
  "PRONTA ENTREGA": {
    icon: "svg-spinners:pulse-3",
    className: "bg-white text-foreground border border-black/10",
    animate: "before:absolute before:left-3 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-emerald-500 before:animate-pulse-soft",
    iconClass: "text-emerald-500",
  },
  "SOB ENCOMENDA": {
    icon: "svg-spinners:clock",
    className: "bg-neutral-900 text-white",
    animate: "",
    iconClass: "text-amber-300",
  },
  "NOVO DROP": {
    icon: "svg-spinners:pulse-rings-2",
    className: "bg-white text-foreground border border-black/10",
    animate: "",
    iconClass: "text-[color:var(--gold)]",
  },
  "LIMITADO": {
    icon: "line-md:bell-loop",
    className: "bg-white text-red-600 border border-red-500/40",
    animate: "animate-glow",
    iconClass: "text-red-500",
  },
  "ESGOTADO": {
    icon: "line-md:close-circle",
    className: "bg-neutral-200 text-neutral-500 border border-neutral-300",
    animate: "opacity-80",
    iconClass: "text-neutral-500",
  },
  "PROMOÇÃO": {
    icon: "line-md:downloading-loop",
    className: "bg-[color:var(--gold)]/10 text-[color:var(--gold)] border border-[color:var(--gold)]/40",
    animate: "",
    iconClass: "text-[color:var(--gold)]",
  },
};

export function StatusBadge({ tag, className }: { tag: StatusTag; className?: string }) {
  const c = CONFIG[tag];
  return (
    <span
      className={cn(
        "relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase shadow-sm",
        c.className,
        c.animate,
        className
      )}
    >
      <Icon icon={c.icon} className={cn("w-3.5 h-3.5 shrink-0", c.iconClass)} />
      {tag}
    </span>
  );
}
