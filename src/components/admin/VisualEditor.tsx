import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
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
  const [blocks, setBlocks] = useState<Block[]>(() => {
    const saved = localStorage.getItem("agnus_site_layout");
    return saved ? JSON.parse(saved) : INITIAL;
  });
  
  const [selected, setSelected] = useState<string>("2");
  const [showAdd, setShowAdd] = useState(false);
  const [loopSpeed, setLoopSpeed] = useState(50);

  // Salva automaticamente o layout ao mudar
  useEffect(() => {
    localStorage.setItem("agnus_site_layout", JSON.stringify(blocks));
  }, [blocks]);

  const move = (idx: number, dir: -1 | 1) => {
    const next = [...blocks];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    setBlocks(next);
  };

  const addSection = (kind: Block["kind"], label: string, icon: string) => {
    setBlocks((b) => [...b, { id: crypto.randomUUID(), kind, label: label.toUpperCase(), icon }]);
    setShowAdd(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <header className="px-1">
        <h1 className="font-display text-2xl md:text-3xl text-foreground">Editor Visual — AGNUS.93</h1>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
          <Icon icon="ph:info-duotone" className="w-4 h-4 text-[color:var(--gold)]" />
          Gerencie as seções e conteúdo do site em tempo real.
        </p>
      </header>

      <div className="space-y-3">
        {blocks.map((b, idx) => {
          const isSelected = selected === b.id;
          return (
            <div key={b.id} className="relative">
              <button
                onClick={() => setSelected(b.id)}
                className={cn(
                  "flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all shadow-sm",
                  isSelected
                    ? "bg-white border-[color:var(--gold)] ring-1 ring-[color:var(--gold)]"
                    : "bg-white border-black/10 hover:border-black/30"
                )}
              >
                <Icon icon={b.icon} className={cn("w-6 h-6", isSelected ? "text-[color:var(--gold)]" : "text-black/50")} />
                <div className="flex-1 overflow-hidden">
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-black/80">{b.label}</p>
                </div>
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => move(idx, -1)} className="p-2 hover:bg-black/5 rounded-lg"><Icon icon="ph:arrow-up" /></button>
                  <button onClick={() => move(idx, 1)} className="p-2 hover:bg-black/5 rounded-lg"><Icon icon="ph:arrow-down" /></button>
                </div>
              </button>

              {/* Painel de Edição Expansível (Inline) */}
              {isSelected && b.kind === "loop" && (
                <div className="mt-2 bg-neutral-50 rounded-xl border border-black/5 p-4 space-y-4 animate-in slide-in-from-top-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-white py-3 text-[10px] font-bold uppercase tracking-widest hover:border-[color:var(--gold)] transition">
                      <Icon icon="ph:upload" className="w-4 h-4" /> Alterar Vídeo
                    </button>
                    <button className="flex items-center justify-center gap-2 rounded-lg border border-black/10 bg-white py-3 text-[10px] font-bold uppercase tracking-widest hover:border-[color:var(--gold)] transition">
                      <Icon icon="ph:text-t" className="w-4 h-4" /> Texto Extra
                    </button>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2 block">Velocidade do Loop ({loopSpeed}%)</label>
                    <input type="range" min={10} max={100} value={loopSpeed} onChange={(e) => setLoopSpeed(+e.target.value)}
                      className="w-full h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-[color:var(--gold)]" />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <button
          onClick={() => setShowAdd(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-black/20 py-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:border-[color:var(--gold)] hover:text-[color:var(--gold)] transition"
        >
          <Icon icon="ph:plus" className="w-4 h-4" /> Adicionar Seção
        </button>
      </div>

      {/* Modal de Nova Seção (Mobile-Friendly) */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/50 p-4 backdrop-blur-sm" onClick={() => setShowAdd(false)}>
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl animate-in slide-in-from-bottom-10" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-lg mb-4">Escolha a seção</h3>
            <div className="grid grid-cols-1 gap-2">
              {NEW_SECTIONS.map((s) => (
                <button key={s.label} onClick={() => addSection(s.kind, s.label, s.icon)}
                  className="flex items-center gap-3 rounded-xl border border-black/10 px-4 py-4 hover:bg-[color:var(--gold)]/5 hover:border-[color:var(--gold)] transition">
                  <Icon icon={s.icon} className="w-5 h-5 text-[color:var(--gold)]" />
                  <span className="text-xs font-bold uppercase tracking-widest">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
