import { Icon } from "@iconify/react";
import { store, useStore, type ContainerStyle } from "@/lib/store";
import { cn } from "@/lib/utils";
import { FieldLabel } from "./fields";

const CONTAINER_STYLES: { key: ContainerStyle; label: string; hint: string }[] = [
  { key: "minimal", label: "Minimal", hint: "Base branca, borda fina, tudo respirado" },
  { key: "soft", label: "Soft Luxo", hint: "Bege claro, sombra dourada suave" },
  { key: "brutalist", label: "Brutalista Clássico", hint: "Borda 2px preta, sem raio" },
  { key: "elegant", label: "Elegante Gold", hint: "Contorno dourado + display serifado" },
  { key: "neo-brutalism", label: "Neo-Brutalismo", hint: "Amarelo vibrante, sombra dura preta" },
  { key: "cyberpunk", label: "Cyberpunk Neon", hint: "Fundo escuro, bordas em neon, hover glitch" },
  { key: "polaroid", label: "Polaroid Vintage", hint: "Fita adesiva, título manuscrito" },
  { key: "glass", label: "Glassmorphism Premium", hint: "Vidro translúcido com blur intenso" },
  { key: "swiss", label: "Swiss Minimalismo", hint: "Zero borda, tipografia gigante" },
  { key: "blueprint", label: "Blueprint Técnico", hint: "Azul marinho + grade + mono" },
  { key: "neumorphism", label: "Neumorfismo", hint: "Extrusão suave, sombra dupla CSS" },
  { key: "synthwave", label: "Synthwave 80s", hint: "Grade neon + gradiente pôr-do-sol" },
  { key: "high-fashion", label: "High Fashion", hint: "Fundo mármore + borda dourada fina" },
  { key: "grunge", label: "Grunge Sujo", hint: "Fundo escuro texturizado, borda 3px" },
  { key: "y2k", label: "Y2K Chrome", hint: "Borda cromada, botão bolha rosa" },
  { key: "terminal", label: "Terminal DOS", hint: "Preto, monospace verde brilhante" },
  { key: "holographic", label: "Holográfico", hint: "Gradiente animado shimmering" },
  { key: "kraft", label: "Kraft Papelão", hint: "Papel kraft + tracejado industrial" },
  { key: "editorial", label: "Editorial Revista", hint: "Barra lateral preta, drop cap serif" },
  { key: "sci-fi", label: "Sci-Fi Futurista", hint: "Cantos cortados clip-path, HUD ciano" },
];

export function GridStyleSelector() {
  const active = useStore((s) => s.settings.containerStyle);
  return (
    <div>
      <FieldLabel label="Estilo do Container (Cartão de Produto) — 20 opções" />
      <div className="grid gap-2 max-h-[420px] overflow-y-auto pr-1">
        {CONTAINER_STYLES.map((c) => (
          <button
            key={c.key}
            onClick={() => store.setSettings({ containerStyle: c.key })}
            className={cn(
              "flex items-center justify-between rounded-xl border-2 p-3 text-left transition-all",
              active === c.key
                ? "border-[color:var(--gold)] bg-[#F9F6F0] shadow-md"
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
