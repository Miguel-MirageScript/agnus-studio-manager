import { Icon } from "@iconify/react";
import { store, useStore } from "@/lib/store";
import { THEMES_META } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { FieldLabel } from "./fields";

/**
 * Seletor único de Tema Global — controla o container do produto,
 * a tipografia da categoria e o estilo da etiqueta ao mesmo tempo.
 */
export function GridStyleSelector() {
  const active = useStore((s) => s.settings.theme);
  return (
    <div>
      <FieldLabel label="Tema Global Unificado — 20 opções radicalmente diferentes" />
      <p className="text-[10px] text-black/50 mb-3 uppercase tracking-widest">
        Um único tema controla o cartão, o título da categoria e a etiqueta.
      </p>
      <div className="grid gap-2 max-h-[520px] overflow-y-auto pr-1">
        {THEMES_META.map((c) => (
          <button
            key={c.key}
            onClick={() => store.setSettings({ theme: c.key })}
            className={cn(
              "flex items-center justify-between gap-3 rounded-xl border-2 p-3 text-left transition-all",
              active === c.key
                ? "border-[color:var(--gold)] bg-[#F9F6F0] shadow-md"
                : "border-transparent bg-neutral-50 hover:bg-neutral-100",
            )}
          >
            <span
              className="h-10 w-10 rounded-lg shrink-0 border border-black/10 shadow-inner"
              style={{ background: c.swatch }}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-black uppercase tracking-wider text-black">{c.label}</p>
              <p className="text-[9px] text-black/50 mt-1 uppercase tracking-widest truncate">{c.hint}</p>
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
