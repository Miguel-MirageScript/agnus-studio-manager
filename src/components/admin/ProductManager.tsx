import { Icon } from "@iconify/react";
import { useState } from "react";
import { PRODUCTS, type StatusTag } from "@/lib/products";
import { StatusBadge } from "@/components/brand/StatusBadge";
import { cn } from "@/lib/utils";

const ALL_TAGS: { tag: StatusTag; icon: string }[] = [
  { tag: "PRONTA ENTREGA", icon: "svg-spinners:pulse-3" },
  { tag: "SOB ENCOMENDA", icon: "svg-spinners:clock" },
  { tag: "PROMOÇÃO", icon: "line-md:downloading-loop" },
  { tag: "ESGOTADO", icon: "line-md:close-circle" },
  { tag: "NOVO DROP", icon: "svg-spinners:pulse-rings-2" },
  { tag: "LIMITADO", icon: "line-md:bell-loop" },
];

export function ProductManager() {
  const [rows, setRows] = useState(PRODUCTS.map((p) => ({ ...p })));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activity] = useState([
    { time: "12:35", label: 'Tag "Novo Drop" adicionada à Camiseta Agnus.ED', dot: "emerald" },
    { time: "12:28", label: "Preço atualizado — AGNUS Oversized Tee", dot: "gold" },
    { time: "12:14", label: "Upload de mídia: lookbook-loop.mp4", dot: "neutral" },
  ]);

  const toggle = (id: string, tag: StatusTag) => {
    setRows((r) =>
      r.map((p) =>
        p.id === id
          ? { ...p, tags: p.tags.includes(tag) ? p.tags.filter((t) => t !== tag) : [...p.tags, tag] }
          : p
      )
    );
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl md:text-3xl">Gerenciamento de Produtos</h1>
        <p className="text-sm text-muted-foreground mt-1">Multi-seleção de tags com cores e ícones específicos.</p>
      </header>

      <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
        <div className="rounded-2xl border border-black/10 bg-white overflow-hidden">
          <div className="grid grid-cols-[1fr_120px_160px] items-center gap-4 border-b border-black/10 bg-black/5 px-4 py-3 text-[11px] uppercase tracking-brand text-muted-foreground">
            <span>Produto / Nome</span>
            <span>Preço</span>
            <span>Tags</span>
          </div>
          {rows.map((p) => (
            <div key={p.id} className="grid grid-cols-[1fr_120px_160px] items-center gap-4 border-b border-black/5 px-4 py-3 last:border-0">
              <div className="flex min-w-0 items-center gap-3">
                <div className="h-12 w-12 shrink-0 rounded-md bg-[oklch(0.97_0.005_85)] overflow-hidden">
                  <img src={p.image} alt="" className="h-full w-full object-contain p-1" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">${p.price.toFixed(2)}</p>
                </div>
              </div>
              <p className="text-sm font-mono">${p.price.toFixed(2)}</p>
              <div className="relative">
                <button
                  onClick={() => setEditingId(editingId === p.id ? null : p.id)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-black/10 px-2.5 py-1.5 text-xs hover:border-foreground transition"
                >
                  <Icon icon="ph:tag-duotone" className="w-3.5 h-3.5 text-[color:var(--gold)]" />
                  {p.tags[0] ?? "Adicionar"}
                  <Icon icon="ph:caret-down" className="w-3 h-3" />
                </button>
                {editingId === p.id && (
                  <div className="absolute right-0 top-full mt-1 z-20 w-56 rounded-xl border border-black/10 bg-white p-1.5 shadow-xl">
                    <p className="px-2 py-1.5 text-[10px] tracking-brand uppercase text-muted-foreground">Status Tags Editor</p>
                    {ALL_TAGS.map(({ tag, icon }) => {
                      const on = p.tags.includes(tag);
                      return (
                        <button
                          key={tag}
                          onClick={() => toggle(p.id, tag)}
                          className={cn("flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs hover:bg-black/5 transition", on && "bg-[color:var(--gold)]/5")}
                        >
                          <Icon icon={icon} className="w-3.5 h-3.5 text-[color:var(--gold)]" />
                          <span className="flex-1 text-left uppercase tracking-[0.1em] text-[11px]">{tag}</span>
                          {on && <Icon icon="ph:check-bold" className="w-3.5 h-3.5 text-emerald-600" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border border-black/10 bg-white p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold inline-flex items-center gap-2">
                <Icon icon="ph:image-square-duotone" className="w-4 h-4 text-[color:var(--gold)]" />
                Media Library
              </h3>
              <button className="text-muted-foreground hover:text-foreground"><Icon icon="ph:x" className="w-4 h-4" /></button>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Arraste imagens, GIFs ou vídeos direto para os produtos.</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: "ph:image-duotone", label: "Images" },
                { icon: "ph:file-gif-duotone", label: "GIFs" },
                { icon: "ph:video-camera-duotone", label: "Video" },
              ].map((m) => (
                <div key={m.label} className="aspect-square rounded-lg border border-dashed border-black/15 bg-[oklch(0.97_0.005_85)] flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground hover:border-[color:var(--gold)] hover:text-foreground transition cursor-grab">
                  <Icon icon={m.icon} className="w-6 h-6 text-[color:var(--gold)]" />
                  {m.label}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-4">
            <h3 className="text-sm font-semibold mb-3 inline-flex items-center gap-2">
              <Icon icon="ph:activity-duotone" className="w-4 h-4 text-[color:var(--gold)]" /> Atividade Recente
            </h3>
            <ul className="space-y-3">
              {activity.map((a) => (
                <li key={a.time} className="flex items-start gap-3 text-xs">
                  <span className={cn("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                    a.dot === "emerald" && "bg-emerald-500",
                    a.dot === "gold" && "bg-[color:var(--gold)]",
                    a.dot === "neutral" && "bg-neutral-400"
                  )} />
                  <div className="flex-1">
                    <p className="text-foreground">{a.label}</p>
                    <p className="text-muted-foreground mt-0.5 font-mono">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
