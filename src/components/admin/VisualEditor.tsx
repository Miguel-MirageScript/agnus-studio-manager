import { useState } from "react";
import { Icon } from "@iconify/react";
import { Header } from "@/components/public/Header";
import { HeroLookbook } from "@/components/public/HeroLookbook";
import { ProductCard } from "@/components/public/ProductCard";
import { Footer } from "@/components/public/Footer";
import { store, useStore } from "@/lib/store";

type EditMode = "announce" | "hero" | "grid" | "footer" | null;

export function VisualEditor({ onExit }: { onExit: () => void }) {
  const [editing, setEditing] = useState<EditMode>(null);
  const settings = useStore((s) => s.settings);
  const products = useStore((s) => s.products);

  const zone =
    "relative border-2 border-dashed border-transparent hover:border-[color:var(--gold)]/70 transition cursor-pointer";

  return (
    <div className="fixed inset-0 z-50 bg-[#F7F4EF] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-foreground text-background text-[10px] uppercase tracking-[0.25em] font-semibold">
        <span className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          Live Preview — Editor Visual
        </span>
        <span className="hidden sm:inline text-background/60">Toque em qualquer seção</span>
      </div>

      {/* Live site preview */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-md sm:max-w-2xl">
          {/* Announcement */}
          {settings.announcement && (
            <button
              onClick={() => setEditing("announce")}
              className={`${zone} block w-full text-left`}
            >
              <EditBadge label="Anúncio" />
              <div className="bg-foreground text-background text-center text-[10px] tracking-[0.25em] uppercase py-2 px-4 font-semibold">
                {settings.announcement}
              </div>
            </button>
          )}

          {/* Hero */}
          <div onClick={() => setEditing("hero")} className={zone}>
            <EditBadge label="Hero" />
            <div className="pointer-events-none">
              <Header />
              <HeroLookbook />
            </div>
          </div>

          {/* Product grid */}
          <div onClick={() => setEditing("grid")} className={`${zone} p-4`}>
            <EditBadge label="Grade" />
            <div className="pointer-events-none grid grid-cols-2 gap-3">
              {products.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div onClick={() => setEditing("footer")} className={zone}>
            <EditBadge label="Rodapé" />
            <div className="pointer-events-none">
              <Footer />
            </div>
          </div>
        </div>
      </div>

      {/* Exit FAB */}
      <button
        onClick={onExit}
        className="fixed bottom-6 right-6 z-[60] group inline-flex items-center gap-2 rounded-full bg-foreground text-background pl-4 pr-5 py-3 text-xs uppercase tracking-[0.2em] font-semibold shadow-2xl hover:bg-[color:var(--gold)] hover:text-foreground transition"
      >
        <Icon icon="ph:x-circle-duotone" className="w-5 h-5" />
        Sair do Editor
      </button>

      {/* Bottom drawer */}
      {editing && (
        <div className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-end justify-center" onClick={() => setEditing(null)}>
          <div
            className="bg-white w-full max-w-lg rounded-t-3xl p-6 pb-10 shadow-2xl animate-in slide-in-from-bottom-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-black/10 rounded-full mx-auto mb-5" />
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl flex items-center gap-2">
                <Icon icon="ph:sliders-horizontal-duotone" className="text-[color:var(--gold)]" />
                Editando: {sectionLabel(editing)}
              </h3>
              <button onClick={() => setEditing(null)} className="p-2 rounded-full bg-black/5 text-foreground/60 hover:text-foreground">
                <Icon icon="ph:x" className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {editing === "announce" && (
                <TextField
                  label="Texto do Anúncio"
                  value={settings.announcement}
                  onChange={(v) => store.setSettings({ announcement: v })}
                />
              )}
              {editing === "hero" && (
                <TextField
                  label="Título do Banner"
                  value={settings.heroTitle}
                  onChange={(v) => store.setSettings({ heroTitle: v })}
                />
              )}
              {editing === "grid" && (
                <p className="text-sm text-muted-foreground">
                  A grade é gerada automaticamente pelo Catálogo. Use{" "}
                  <span className="font-semibold text-foreground">Catálogo de Produtos</span> para adicionar, editar
                  ou reordenar itens e estilos de tag.
                </p>
              )}
              {editing === "footer" && (
                <>
                  <TextField
                    label="URL do Instagram"
                    value={settings.instagramUrl}
                    onChange={(v) => store.setSettings({ instagramUrl: v })}
                  />
                  <TextField
                    label="Número do WhatsApp"
                    value={settings.whatsappNumber}
                    onChange={(v) => store.setSettings({ whatsappNumber: v })}
                  />
                </>
              )}
            </div>

            <button
              onClick={() => setEditing(null)}
              className="w-full mt-8 bg-foreground text-background text-[11px] font-bold uppercase tracking-[0.2em] py-4 rounded-xl hover:bg-[color:var(--gold)] hover:text-foreground transition"
            >
              Concluir
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function EditBadge({ label }: { label: string }) {
  return (
    <div className="absolute top-2 right-2 z-10 bg-foreground text-background text-[9px] uppercase tracking-[0.2em] font-semibold px-2 py-1 rounded flex items-center gap-1 shadow-lg">
      <Icon icon="ph:pencil-simple" className="w-3 h-3" />
      {label}
    </div>
  );
}

function sectionLabel(m: Exclude<EditMode, null>) {
  return { announce: "Anúncio", hero: "Hero", grid: "Grade", footer: "Rodapé" }[m];
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-foreground/70 mb-2">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-black/15 p-3.5 text-sm outline-none focus:border-foreground"
      />
    </div>
  );
}
