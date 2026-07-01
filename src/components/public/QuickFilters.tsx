import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export type FilterKey = "todos" | "novidades" | "mais-vendidos" | "pronta-entrega" | "limitados";

const FILTERS: { key: FilterKey; label: string; icon: string }[] = [
  { key: "novidades", label: "Novidades", icon: "svg-spinners:pulse-rings-2" },
  { key: "mais-vendidos", label: "Mais Vendidos", icon: "ph:crown-duotone" },
  { key: "pronta-entrega", label: "Pronta Entrega", icon: "svg-spinners:pulse-3" },
  { key: "limitados", label: "Limitados", icon: "line-md:bell-loop" },
];

export function QuickFilters({ active, onChange }: { active: FilterKey; onChange: (k: FilterKey) => void }) {
  return (
    <section className="border-t border-b border-black/5 bg-[oklch(0.98_0.005_85)]">
      <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        <h2 className="font-display text-2xl md:text-3xl mb-5">Filtros Rápidos</h2>
        <div className="flex flex-wrap gap-3">
          {FILTERS.map((f) => {
            const isActive = active === f.key;
            return (
              <button
                key={f.key}
                onClick={() => onChange(isActive ? "todos" : f.key)}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition",
                  isActive
                    ? "bg-[color:var(--gold)] text-white border-[color:var(--gold)] shadow-md"
                    : "border-[color:var(--gold)]/40 text-foreground hover:border-[color:var(--gold)] hover:bg-[color:var(--gold)]/5"
                )}
              >
                <Icon icon={f.icon} className={cn("w-4 h-4", isActive ? "text-white" : "text-[color:var(--gold)]")} />
                {f.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
