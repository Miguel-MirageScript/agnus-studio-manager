import { Icon } from "@iconify/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Block = { id: string; label: string; icon: string; kind: "header" | "loop" | "grid" | "footer" | "banner" | "colecao" };

const INITIAL: Block[] = [
  { id: "1", label: "HEADER", icon: "ph:browsers-duotone", kind: "header" },
  { id: "2", label: "LOOKBOOK LOOP", icon: "ph:film-strip-duotone", kind: "loop" },
  { id: "3", label: "PRODUCT GRID", icon: "ph:squares-four-duotone", kind: "grid" },
  { id: "4", label: "FOOTER", icon: "ph:align-bottom-duotone", kind: "footer" },
];

const NEW_SECTIONS = [
  { kind: "banner", label: "Banner Conceito", icon: "ph:image-square-duotone" },
  { kind: "colecao", label: "Coleção em Destaque", icon: "ph:star-duotone" },
  { kind: "loop", label: "Lookbook Loop", icon: "ph:film-strip-duotone" },
] as const;

export function VisualEditor() {
  const [blocks, setBlocks] = useState<Block[]>(INITIAL);
  const [selected, setSelected] = useState<string>("2");
  const [showAdd, setShowAdd] = useState(false);
  const [loopSpeed, setLoopSpeed] = useState(50);

  const move = (idx: number, dir: -1 | 1) => {
    setBlocks((b) => {
      const next = [...b];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return b;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const addSection = (kind: Block["kind"], label: string, icon: string) => {
    setBlocks((b) => [...b, { id: crypto.randomUUID(), kind, label: label.toUpperCase(), icon }]);
    setShowAdd(false);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl md:text-3xl">Editor Visual do Site — AGNUS.93</h1>
        <p className="text-sm text-muted-foreground mt-1 inline-flex items-center gap-2">
          <Icon icon="ph:cursor-click-duotone" className="w-4 h-4 text-[color:var(--gold)]" />
          Drag & Drop Canvas — reordene ou edite seções ao vivo.
        </p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-dashed border-black/15 bg-white/60 p-4 space-y-3">
          {blocks.map((b, idx) => {
            const isSelected = selected === b.id;
            return (
              <div key={b.id}>
                <button
                  onClick={() => setSelected(b.id)}
                  className={cn(
                    "group grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 rounded-xl border px-4 py-3 text-left transition",
                    isSelected
                      ? "bg-[color:var(--gold)]/10 border-[color:var(--gold)]"
                      : "bg-white border-black/10 hover:border-foreground"
                  )}
                >
                  <Icon icon={b.icon} className={cn("w-5 h-5", isSelected ? "text-[color:var(--gold)]" : "text-foreground/70")} />
                  <span className="text-sm font-semibold tracking-[0.1em] uppercase truncate">{b.label}</span>
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <button onClick={(e) => { e.stopPropagation(); move(idx, -1); }} className="p-1 hover:text-foreground"><Icon icon="ph:arrow-up" className="w-4 h-4" /></button>
                    <button onClick={(e) => { e.stopPropagation(); move(idx, 1); }} className="p-1 hover:text-foreground"><Icon icon="ph:arrow-down" className="w-4 h-4" /></button>
                    <span className="ml-2 text-[10px] uppercase tracking-brand">Drop zone</span>
                    <Icon icon="ph:pencil-simple-line" className="ml-2 w-4 h-4" />
                  </span>
                </button>

                {isSelected && b.kind === "loop" && (
                  <div className="mt-2 rounded-xl border border-[color:var(--gold)]/40 bg-white p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-sm"><Icon icon="ph:upload-simple-duotone" className="w-4 h-4 text-[color:var(--gold)]" /> Selecionar vídeo / GIF</span>
                      <button className="rounded-md border border-black/10 px-3 py-1.5 text-xs hover:bg-black/5">Escolher</button>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground inline-flex items-center gap-2">
                        <Icon icon="ph:gauge-duotone" className="w-4 h-4 text-[color:var(--gold)]" /> Ajustar velocidade do loop ({loopSpeed}%)
                      </label>
                      <input type="range" min={10} max={100} value={loopSpeed} onChange={(e) => setLoopSpeed(+e.target.value)}
                        className="w-full accent-[oklch(0.68_0.09_82)]" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 text-sm"><Icon icon="ph:text-t-duotone" className="w-4 h-4 text-[color:var(--gold)]" /> Adicionar texto sobreposto</span>
                      <button className="rounded-md border border-black/10 px-3 py-1.5 text-xs hover:bg-black/5">+ Texto</button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          <button
            onClick={() => setShowAdd(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-black/15 py-4 text-sm text-muted-foreground hover:border-foreground hover:text-foreground transition"
          >
            <Icon icon="ph:plus-circle-duotone" className="w-5 h-5" /> Adicionar Drop Zone
          </button>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-4">
          <h3 className="font-semibold mb-1 text-sm inline-flex items-center gap-2">
            <Icon icon="ph:palette-duotone" className="w-4 h-4 text-[color:var(--gold)]" /> Paleta AGNUS
          </h3>
          <p className="text-xs text-muted-foreground mb-3">Tons oficiais da marca.</p>
          <div className="grid grid-cols-3 gap-2">
            {["#FFFFFF", "#F2F2F2", "#4A4A4A", "#0A0A0A", "#1F1F1F", "#B79766"].map((c) => (
              <div key={c} className="aspect-square rounded-md border border-black/10" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" onClick={() => setShowAdd(false)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-xl">Adicionar Nova Seção</h3>
              <button onClick={() => setShowAdd(false)}><Icon icon="ph:x" className="w-5 h-5" /></button>
            </div>
            <div className="space-y-2">
              {NEW_SECTIONS.map((s) => (
                <button key={s.label} onClick={() => addSection(s.kind, s.label, s.icon)}
                  className="flex w-full items-center gap-3 rounded-xl border border-black/10 px-4 py-3 hover:bg-[color:var(--gold)]/5 hover:border-[color:var(--gold)] transition">
                  <Icon icon={s.icon} className="w-5 h-5 text-[color:var(--gold)]" />
                  <span className="text-sm font-medium uppercase tracking-[0.1em]">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
