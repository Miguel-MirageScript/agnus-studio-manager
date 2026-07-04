import { Icon } from "@iconify/react";
import { store, useStore, type ContainerStyle } from "@/lib/store";
import { cn } from "@/lib/utils";
import { FieldLabel } from "./fields";

const CONTAINER_STYLES: { key: ContainerStyle; label: string; hint: string }[] = [
  { key: "brutalism", label: "Neo-Brutalismo", hint: "Amarelo vibrante, borda 4px, sombra dura preta" },
  { key: "cyberpunk", label: "Cyberpunk Neon", hint: "Fundo escuro, bordas em neon, hover glitch" },
  { key: "polaroid", label: "Polaroid Vintage", hint: "Fita adesiva, padding largo, título manuscrito" },
  { key: "glass", label: "Glassmorphism Premium", hint: "Vidro translúcido com blur intenso" },
  { key: "swiss", label: "Swiss Minimalismo", hint: "Zero borda, tipografia gigante alinhada à esquerda" },
];

export function GridStyleSelector() {
  const active = useStore((s) => s.settings.containerStyle);
  return (
    <div>
      <FieldLabel label="Estilo do Container (Cartão de Produto)" />
      <div className="grid gap-3">
        {CONTAINER_STYLES.map((c) => (
          <button
            key={c.key}
            onClick={() => store.setSettings({ containerStyle: c.key })}
            className={cn(
              "flex items-center justify-between rounded-2xl border-2 p-4 text-left transition-all",
              active === c.key
                ? "border-[color:var(--gold)] bg-[#F9F6F0] shadow-md scale-[1.02]"
                : "border-transparent bg-neutral-50 hover:bg-neutral-100",
            )}
          >
            <div>
              <p className="text-[11px] font-black uppercase tracking-wider text-black">{c.label}</p>
              <p className="text-[9px] text-black/50 mt-1 uppercase tracking-widest">{c.hint}</p>
            </div>
            {active === c.key && (
              <Icon icon="ph:check-circle-fill" className="w-5 h-5 text-[color:var(--gold)]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
