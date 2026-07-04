import { Icon } from "@iconify/react";
import { store, useStore, type CategoryStyle } from "@/lib/store";
import { cn } from "@/lib/utils";
import { FieldLabel } from "./fields";

const CATEGORY_STYLES: { key: CategoryStyle; label: string; preview: React.ReactNode }[] = [
  {
    key: "vogue",
    label: "Vogue Magazine",
    preview: (
      <span className="font-display text-2xl leading-none">
        <span className="italic">C</span>
        <span>amiseta</span>
        <span className="italic">s</span>
      </span>
    ),
  },
  {
    key: "caution",
    label: "Caution Tape",
    preview: (
      <div className="bg-hazard py-1 px-0.5 -rotate-2 border-y-2 border-black">
        <div className="bg-yellow-300 px-2 py-0.5 border-y border-black">
          <span className="font-black uppercase tracking-widest text-[10px] text-black">CAMISETAS</span>
        </div>
      </div>
    ),
  },
  {
    key: "outline",
    label: "Giant Outline",
    preview: (
      <span
        className="font-black uppercase tracking-tight text-2xl text-transparent"
        style={{ WebkitTextStroke: "1.2px #000" }}
      >
        CAMISETAS
      </span>
    ),
  },
];

export function CategoryStyleSelector() {
  const active = useStore((s) => s.settings.categoryStyle);
  return (
    <div className="pt-4 border-t border-black/5">
      <FieldLabel label="Tipografia dos Títulos das Categorias" />
      <div className="grid gap-3">
        {CATEGORY_STYLES.map((c) => (
          <button
            key={c.key}
            onClick={() => store.setSettings({ categoryStyle: c.key })}
            className={cn(
              "flex items-center justify-between rounded-xl border p-4 text-left transition gap-4",
              active === c.key
                ? "border-[color:var(--gold)] bg-[#F9F6F0] shadow-md"
                : "border-black/10 bg-white hover:border-black/30",
            )}
          >
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/50 mb-2">
                {c.label}
              </p>
              <div className="text-black">{c.preview}</div>
            </div>
            {active === c.key && (
              <Icon icon="ph:check-circle-fill" className="w-5 h-5 text-[color:var(--gold)] shrink-0" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
