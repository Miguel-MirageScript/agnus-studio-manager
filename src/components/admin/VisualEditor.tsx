import { useState } from "react";
import { Icon } from "@iconify/react";
import { Header } from "@/components/public/Header";
import { HeroLookbook } from "@/components/public/HeroLookbook";
import { ProductCard } from "@/components/public/ProductCard";
import { Footer } from "@/components/public/Footer";
import { LookbookLoop } from "@/components/public/LookbookLoop";
import { store, useStore, type CategoryStyle, type FooterLink } from "@/lib/store";
import { cn } from "@/lib/utils";

type EditMode = "announce" | "header" | "hero" | "lookbook" | "grid" | "footer" | null;

const CONTAINER_STYLES: { key: string; label: string; hint: string }[] = [
  { key: "minimal", label: "Minimalista", hint: "Bordas retas e sem sombra" },
  { key: "soft", label: "Suave", hint: "Cantos arredondados e sombra sutil" },
  { key: "brutalist", label: "Brutalista", hint: "Bordas duras com sombra preta" },
  { key: "polaroid", label: "Polaroid", hint: "Moldura fotográfica branca e grossa" },
  { key: "glass", label: "Vidro (Glassmorphism)", hint: "Fundo translúcido com desfoque" },
  { key: "elegant", label: "Elegante", hint: "Tons marfim com detalhes dourados" },
];

const CATEGORY_STYLES: { key: CategoryStyle; label: string }[] = [
  { key: "serif-italic", label: "Serifada Elegante" },
  { key: "wide-sans", label: "Moderna Espaçada" },
  { key: "stamp", label: "Carimbo Monospace" },
];

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export function VisualEditor({ onExit }: { onExit: () => void }) {
  const [editing, setEditing] = useState<EditMode>(null);
  const settings = useStore((s) => s.settings);
  const products = useStore((s) => s.products);

  const zone =
    "relative border-2 border-dashed border-transparent hover:border-[color:var(--gold)]/70 transition cursor-pointer group";

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
        <span className="hidden sm:inline text-background/60">Toque nas seções para editar</span>
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

          <div onClick={openEdit("grid")} className={`${zone} p-4 sm:p-8 bg-neutral-50/50`}>
            <EditBadge label="Editar Estilo da Grade" />
            
            <div className="mb-6 flex items-center gap-4">
              <h2 className={cn(
                "text-xl md:text-2xl",
                settings.categoryStyle === "serif-italic" && "font-serif italic tracking-wide",
                settings.categoryStyle === "wide-sans" && "font-display uppercase tracking-[0.2em]",
                settings.categoryStyle === "stamp" && "font-mono font-black uppercase tracking-widest border-2 border-black px-3 py-1 inline-block"
              )}>
                Exemplo de Categoria
              </h2>
              <div className="h-[1px] flex-1 bg-black/10"></div>
            </div>

            <div className="pointer-events-none grid grid-cols-2 gap-4 sm:gap-6">
              {products.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
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
        <div className="fixed inset-0 z-[70] pointer-events-none flex items-end sm:items-start sm:justify-end sm:p-6">
          <div className="absolute inset-0 pointer-events-auto" onClick={() => setEditing(null)} />
          
          <div
            className="bg-white/95 backdrop-blur-2xl w-full sm:w-[420px] pointer-events-auto sm:rounded-3xl rounded-t-3xl p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.15)] border border-black/10 max-h-[70vh] sm:max-h-[85vh] overflow-y-auto relative z-10 animate-in slide-in-from-bottom-10 sm:slide-in-from-right-10 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-black/10 rounded-full mx-auto mb-6 sm:hidden" />
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-display text-xl flex items-center gap-2">
                <Icon icon="ph:magic-wand-duotone" className="text-[color:var(--gold)] w-6 h-6" />
                {sectionLabel(editing)}
              </h3>
              <button
                onClick={() => setEditing(null)}
                className="p-2 rounded-full bg-black/5 text-foreground/60 hover:text-foreground hover:bg-black/10 transition"
              >
                <Icon icon="ph:x-bold" className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-6">
              {editing === "announce" && (
                <TextField
                  label="Texto do Anúncio (Faixa do Topo)"
                  value={settings.announcement}
                  onChange={(v) => store.setSettings({ announcement: v })}
                />
              )}

              {editing === "header" && (
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
                  <TextField
                    label="Anúncio do Topo"
                    value={settings.announcement}
                    onChange={(v) => store.setSettings({ announcement: v })}
                  />
                </>
              )}

              {editing === "hero" && (
                <>
                  <TextField
                    label="Título do Banner"
                    value={settings.heroTitle}
                    onChange={(v) => store.setSettings({ heroTitle: v })}
                  />
                  
                  <div>
                    <FieldLabel label="Cor do Texto (Contraste)" />
                    <div className="flex gap-2">
                      <button
                        onClick={() => store.setSettings({ heroTextColor: "light" } as any)}
                        className={cn(
                          "flex-1 py-2.5 rounded-xl border border-black/15 text-[10px] font-bold uppercase tracking-widest transition",
                          (settings as any).heroTextColor === "light" ? "bg-black text-white" : "bg-white text-black hover:bg-neutral-100"
                        )}
                      >
                        Texto Claro
                      </button>
                      <button
                        onClick={() => store.setSettings({ heroTextColor: "dark" } as any)}
                        className={cn(
                          "flex-1 py-2.5 rounded-xl border border-black/15 text-[10px] font-bold uppercase tracking-widest transition",
                          (settings as any).heroTextColor !== "light" ? "bg-white border-2 border-black text-black shadow-md" : "bg-white text-black hover:bg-neutral-100"
                        )}
                      >
                        Texto Escuro
                      </button>
                    </div>
                  </div>

                  <ImageField
                    label="Imagem de Fundo do Hero"
                    value={settings.heroImage}
                    onChange={(v) => store.setSettings({ heroImage: v })}
                  />
                </>
              )}

              {editing === "lookbook" && (
                <>
                  <TextField
                    label="Título do Lookbook"
                    value={settings.lookbookTitle}
                    onChange={(v) => store.setSettings({ lookbookTitle: v })}
                  />
                  <div className="space-y-4 pt-2">
                    <FieldLabel label="Fotos do Carrossel" />
                    {[0, 1, 2].map((i) => (
                      <ImageField
                        key={i}
                        label={`Frame ${i + 1}`}
                        value={settings.lookbookImages[i] ?? ""}
                        onChange={(v) => {
                          const next = [...settings.lookbookImages];
                          next[i] = v;
                          store.setSettings({ lookbookImages: next });
                        }}
                      />
                    ))}
                  </div>
                </>
              )}

              {editing === "grid" && (
                <>
                  <div>
                    <FieldLabel label="Estilo do Container (Foto e Borda)" />
                    <div className="grid gap-3">
                      {CONTAINER_STYLES.map((c) => (
                        <button
                          key={c.key}
                          onClick={() => store.setSettings({ containerStyle: c.key as any })}
                          className={cn(
                            "flex items-center justify-between rounded-2xl border-2 p-4 text-left transition-all",
                            settings.containerStyle === c.key
                              ? "border-[color:var(--gold)] bg-[#F9F6F0] shadow-md scale-[1.02]"
                              : "border-transparent bg-neutral-50 hover:bg-neutral-100",
                          )}
                        >
                          <div>
                            <p className="text-[11px] font-black uppercase tracking-wider text-black">{c.label}</p>
                            <p className="text-[9px] text-black/50 mt-1 uppercase tracking-widest">{c.hint}</p>
                          </div>
                          {settings.containerStyle === c.key && (
                            <Icon icon="ph:check-circle-fill" className="w-5 h-5 text-[color:var(--gold)]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-black/5">
                    <FieldLabel label="Tipografia dos Títulos das Categorias" />
                    <div className="grid gap-3">
                      {CATEGORY_STYLES.map((c) => (
                        <button
                          key={c.key}
                          onClick={() => store.setSettings({ categoryStyle: c.key })}
                          className={cn(
                            "flex items-center justify-between rounded-xl border p-4 text-left transition",
                            settings.categoryStyle === c.key
                              ? "border-black bg-black text-white shadow-md"
                              : "border-black/10 bg-white hover:border-black/30",
                          )}
                        >
                          <span className={cn(
                            "text-sm",
                            c.key === "serif-italic" && "font-serif italic",
                            c.key === "wide-sans" && "font-display uppercase tracking-[0.2em] text-[11px]",
                            c.key === "stamp" && "font-mono font-black uppercase tracking-widest text-[10px]"
                          )}>
                            {c.label}
                          </span>
                          {settings.categoryStyle === c.key && (
                            <Icon icon="ph:check-circle-fill" className="w-4 h-4 text-[color:var(--gold)]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {editing === "footer" && (
                <>
                  <TextField
                    label="Nome da Marca"
                    value={settings.brandLine}
                    onChange={(v) => store.setSettings({ brandLine: v })}
                  />
                  <TextField
                    label="Tagline (Subtítulo)"
                    value={settings.footerTagline}
                    onChange={(v) => store.setSettings({ footerTagline: v })}
                  />
                  <TextField
                    label="URL do Instagram"
                    value={settings.instagramUrl}
                    onChange={(v) => store.setSettings({ instagramUrl: v })}
                  />
                  <TextField
                    label="WhatsApp"
                    value={settings.whatsappNumber}
                    onChange={(v) => store.setSettings({ whatsappNumber: v })}
                  />
                  <div className="pt-4 border-t border-black/5">
                    <FieldLabel label="Links Rápidos (Menus)" />
                    <div className="space-y-3">
                      {settings.footerLinks.map((l, i) => (
                        <div key={i} className="flex gap-2">
                          <input
                            value={l.label}
                            onChange={(e) => {
                              const next: FooterLink[] = [...settings.footerLinks];
                              next[i] = { ...l, label: e.target.value };
                              store.setSettings({ footerLinks: next });
                            }}
                            placeholder="Nome do Link"
                            className="flex-1 rounded-xl border border-black/15 px-3 py-2.5 text-xs outline-none focus:border-black bg-neutral-50 focus:bg-white transition"
                          />
                          <input
                            value={l.href}
                            onChange={(e) => {
                              const next: FooterLink[] = [...settings.footerLinks];
                              next[i] = { ...l, href: e.target.value };
                              store.setSettings({ footerLinks: next });
                            }}
                            placeholder="URL (#)"
                            className="w-1/3 rounded-xl border border-black/15 px-3 py-2.5 text-xs outline-none focus:border-black bg-neutral-50 focus:bg-white transition"
                          />
                          <button
                            onClick={() =>
                              store.setSettings({
                                footerLinks: settings.footerLinks.filter((_, j) => j !== i),
                              })
                            }
                            className="rounded-xl border border-red-100 bg-red-50 p-2.5 text-red-600 hover:bg-red-600 hover:text-white transition"
                          >
                            <Icon icon="ph:trash-bold" className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() =>
                          store.setSettings({
                            footerLinks: [...settings.footerLinks, { label: "Novo Link", href: "#" }],
                          })
                        }
                        className="w-full mt-2 rounded-xl border border-dashed border-black/20 py-3 text-[10px] font-bold uppercase tracking-widest text-black/50 hover:bg-black/5 hover:text-black transition inline-flex items-center justify-center gap-2"
                      >
                        <Icon icon="ph:plus-bold" className="w-3 h-3" /> Adicionar Link
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setEditing(null)}
              className="w-full mt-8 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] py-4 rounded-2xl hover:bg-[color:var(--gold)] shadow-xl hover:shadow-[0_0_20px_rgba(183,151,102,0.4)] transition-all"
            >
              Aplicar Mudanças
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function EditBadge({ label }: { label: string }) {
  return (
    <div className="absolute top-4 right-4 z-10 bg-black text-white text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-lg group-hover:bg-[color:var(--gold)] transition">
      <Icon icon="ph:pencil-simple-bold" className="w-3 h-3" />
      {label}
    </div>
  );
}

function sectionLabel(m: Exclude<EditMode, null>) {
  return {
    announce: "Anúncio do Topo",
    header: "Cabeçalho",
    hero: "Banner Principal",
    lookbook: "Carrossel Lookbook",
    grid: "Estilo do Catálogo",
    footer: "Rodapé da Loja",
  }[m];
}

function FieldLabel({ label }: { label: string }) {
  return (
    <label className="block text-[10px] uppercase tracking-[0.25em] font-bold text-black/50 mb-2">
      {label}
    </label>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <FieldLabel label={label} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-black/15 p-3.5 text-sm font-medium outline-none focus:border-black bg-neutral-50 focus:bg-white transition"
      />
    </div>
  );
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <FieldLabel label={label} />
      <div className="flex gap-4 items-center">
        <div className="h-24 w-24 shrink-0 rounded-2xl border-2 border-dashed border-black/15 bg-neutral-50 overflow-hidden flex items-center justify-center relative group cursor-pointer hover:border-black/40 transition">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <Icon icon="ph:image-duotone" className="w-6 h-6 text-black/30" />
          )}
          
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition backdrop-blur-sm">
            <Icon icon="ph:upload-simple-bold" className="w-6 h-6 text-white" />
          </div>
          
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (f) onChange(await fileToDataUrl(f));
            }}
          />
        </div>
        <div className="flex-1 space-y-2">
          <p className="text-[10px] font-bold text-black/40 uppercase tracking-wider">URL da Imagem</p>
          <input
            value={value.startsWith("data:") ? "Upload Local Selecionado" : value}
            placeholder="Cole uma URL direta..."
            onChange={(e) => {
               if(!e.target.value.startsWith("Upload")) {
                 onChange(e.target.value)
               }
            }}
            className="w-full rounded-xl border border-black/15 p-3 text-xs outline-none focus:border-black bg-neutral-50 focus:bg-white transition"
          />
        </div>
      </div>
    </div>
  );
}
