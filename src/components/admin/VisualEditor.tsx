import { useState } from "react";
import { Icon } from "@iconify/react";
import { Header } from "@/components/public/Header";
import { HeroLookbook } from "@/components/public/HeroLookbook";
import { ProductCard } from "@/components/public/ProductCard";
import { Footer } from "@/components/public/Footer";
import { LookbookLoop } from "@/components/public/LookbookLoop";
import { CategoryHeading } from "@/components/public/CategoryHeading";
import { useStore } from "@/lib/store";
import { EditBadge } from "./editor/fields";
import { AnnounceEditor } from "./editor/AnnounceEditor";
import { HeaderEditor } from "./editor/HeaderEditor";
import { HeroEditor } from "./editor/HeroEditor";
import { LookbookEditor } from "./editor/LookbookEditor";
import { GridEditor } from "./editor/GridEditor";
import { FooterEditor } from "./editor/FooterEditor";
import { SaveCloudButton } from "./SaveCloudButton";

type EditMode = "announce" | "header" | "hero" | "lookbook" | "grid" | "footer" | null;

const LABELS: Record<Exclude<EditMode, null>, string> = {
  announce: "Anúncio do Topo",
  header: "Cabeçalho",
  hero: "Banner Principal",
  lookbook: "Carrossel Lookbook",
  grid: "Estilo do Catálogo",
  footer: "Rodapé da Loja",
};

const zone =
  "relative border-2 border-dashed border-transparent hover:border-[color:var(--gold)]/70 transition cursor-pointer group";

export function VisualEditor({ onExit }: { onExit: () => void }) {
  const [editing, setEditing] = useState<EditMode>(null);
  const settings = useStore((s) => s.settings);
  const products = useStore((s) => s.products);
  const categories = useStore((s) => s.categories);

  const openEdit = (m: EditMode) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditing(m);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F7F4EF] flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-foreground text-background text-[10px] uppercase tracking-[0.25em] font-semibold">
        <span className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          Live Preview — Editor Visual
        </span>
        <span className="hidden sm:flex items-center gap-3 text-background/60">
          Toque nas seções para editar
          <SaveCloudButton label="Salvar Mudanças" compact />
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="mx-auto max-w-md sm:max-w-2xl bg-white min-h-full shadow-2xl">
          {settings.announcement && (
            <button onClick={openEdit("announce")} className={`${zone} block w-full text-left`}>
              <EditBadge label="Editar Anúncio" />
              <div className="bg-foreground text-background text-center text-[10px] tracking-[0.25em] uppercase py-2 px-4 font-semibold">
                {settings.announcement}
              </div>
            </button>
          )}

          <div onClick={openEdit("header")} className={zone}>
            <EditBadge label="Editar Cabeçalho" />
            <div className="pointer-events-none">
              <Header />
            </div>
          </div>

          <div onClick={openEdit("hero")} className={zone}>
            <EditBadge label="Editar Banner Hero" />
            <div className="pointer-events-none">
              <HeroLookbook />
            </div>
          </div>

          {/* O container "grid" original transformado na renderização real das categorias */}
          <div onClick={openEdit("grid")} className={`${zone} p-4 sm:p-8 bg-neutral-50/50 flex flex-col gap-10`}>
            <EditBadge label="Editar Estilo da Grade" />

            {categories.map((category) => {
              const categoryProducts = products.filter((p) => p.category === category);
              if (categoryProducts.length === 0) return null;

              return (
                <section key={category} className="w-full">
                  <div className="mb-6 flex items-center gap-4">
                    <CategoryHeading name={category} />
                    <div className="h-[1px] flex-1 bg-black/10" />
                  </div>
                  <div className="pointer-events-none grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {categoryProducts.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>

          <div onClick={openEdit("lookbook")} className={zone}>
            <EditBadge label="Editar Lookbook Loop" />
            <div className="pointer-events-none">
              <LookbookLoop />
            </div>
          </div>

          <div onClick={openEdit("footer")} className={zone}>
            <EditBadge label="Editar Rodapé" />
            <div className="pointer-events-none">
              <Footer />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onExit}
        className="fixed bottom-6 right-6 z-[60] group inline-flex items-center gap-2 rounded-full bg-foreground text-background pl-4 pr-5 py-3 text-xs uppercase tracking-[0.2em] font-semibold shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:bg-[color:var(--gold)] hover:text-foreground hover:scale-105 transition-all"
      >
        <Icon icon="ph:x-circle-duotone" className="w-5 h-5" />
        Sair do Editor
      </button>

      {editing && (
        <EditorDrawer mode={editing} onClose={() => setEditing(null)} />
      )}
    </div>
  );
}

function EditorDrawer({
  mode,
  onClose,
}: {
  mode: Exclude<EditMode, null>;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[70] pointer-events-none flex items-end sm:items-start sm:justify-end sm:p-6">
      <div className="absolute inset-0 pointer-events-auto" onClick={onClose} />
      <div
        className="bg-white/95 backdrop-blur-2xl w-full sm:w-[420px] pointer-events-auto sm:rounded-3xl rounded-t-3xl p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.15)] border border-black/10 max-h-[70vh] sm:max-h-[85vh] overflow-y-auto relative z-10 animate-in slide-in-from-bottom-10 sm:slide-in-from-right-10 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-black/10 rounded-full mx-auto mb-6 sm:hidden" />
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-display text-xl flex items-center gap-2">
            <Icon icon="ph:magic-wand-duotone" className="text-[color:var(--gold)] w-6 h-6" />
            {LABELS[mode]}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/5 text-foreground/60 hover:text-foreground hover:bg-black/10 transition"
          >
            <Icon icon="ph:x-bold" className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6">
          {mode === "announce" && <AnnounceEditor />}
          {mode === "header" && <HeaderEditor />}
          {mode === "hero" && <HeroEditor />}
          {mode === "lookbook" && <LookbookEditor />}
          {mode === "grid" && <GridEditor />}
          {mode === "footer" && <FooterEditor />}
        </div>

        <div className="flex gap-2 mt-8">
          <SaveCloudButton label="Salvar Mudanças" className="flex-1 justify-center py-4 rounded-2xl" />
          <button
            onClick={onClose}
            className="px-4 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] py-4 rounded-2xl hover:bg-[color:var(--gold)] transition-all"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
