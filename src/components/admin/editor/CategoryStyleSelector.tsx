import { Icon } from "@iconify/react";
import { store, useStore, type CategoryStyle } from "@/lib/store";
import { cn } from "@/lib/utils";
import { FieldLabel } from "./fields";

const CATEGORY_STYLES: { key: CategoryStyle; label: string; hint: string }[] = [
  { key: "serif-italic", label: "Serifada Itálica", hint: "Display italic clássico" },
  { key: "wide-sans", label: "Sans Larga", hint: "Uppercase amplo & tracking" },
  { key: "stamp", label: "Carimbo Mono", hint: "Monospace com moldura" },
  { key: "vogue", label: "Vogue Magazine", hint: "Serifada com primeira/última itálicas" },
  { key: "caution", label: "Caution Tape", hint: "Fita amarela de aviso inclinada" },
  { key: "outline", label: "Outline Gigante", hint: "Texto vazado com stroke preto" },
  { key: "neon-sign", label: "Placa de Neon", hint: "Glow rosa/ciano com flicker" },
  { key: "extruded-3d", label: "3D Extrudado", hint: "Sombra escalonada em camadas" },
  { key: "glitch", label: "Glitch Digital", hint: "Duplicado ciano/magenta" },
  { key: "marker", label: "Caneta Marker", hint: "Handwritten com fundo highlight" },
  { key: "arcade-pixel", label: "Arcade Pixel", hint: "Fonte pixelada retro" },
  { key: "gold-foil", label: "Folha Dourada", hint: "Gradiente metálico dourado" },
  { key: "ransom", label: "Ransom Note", hint: "Fontes e cores misturadas" },
  { key: "marquee", label: "Marquee Cinético", hint: "Texto rolando horizontalmente" },
  { key: "blur-reveal", label: "Blur Reveal", hint: "Desfoca e nítido no hover" },
  { key: "cyber-tech", label: "Cyber-Tech", hint: "Colchetes e hex codes" },
  { key: "stencil", label: "Stencil Militar", hint: "Fonte estêncil com recortes" },
  { key: "bubblegum", label: "Bubblegum Pop", hint: "Bolha rosa com sombra puffy" },
  { key: "blackletter", label: "Gótica Blackletter", hint: "Fonte medieval serifada" },
  { key: "vertical", label: "Vertical Minimalista", hint: "Escrita rotacionada" },
  { key: "tape-emboss", label: "Fita Rotuladora", hint: "Label maker plástico embossed" },
];

export function CategoryStyleSelector() {
  const active = useStore((s) => s.settings.categoryStyle);
  return (
    <div className="pt-4 border-t border-black/5">
      <FieldLabel label="Tipografia dos Títulos das Categorias — 20 opções" />
      <div className="grid gap-2 max-h-[420px] overflow-y-auto pr-1">
        {CATEGORY_STYLES.map((c) => (
          <button
            key={c.key}
            onClick={() => store.setSettings({ categoryStyle: c.key })}
            className={cn(
              "flex items-center justify-between rounded-xl border p-3 text-left transition gap-4",
              active === c.key
                ? "border-[color:var(--gold)] bg-[#F9F6F0] shadow-md"
                : "border-black/10 bg-white hover:border-black/30",
            )}
          >
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-black uppercase tracking-wider text-black">{c.label}</p>
              <p className="text-[9px] text-black/50 mt-1 uppercase tracking-widest">{c.hint}</p>
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
