import { useState } from "react";
import { Icon } from "@iconify/react";
import { Header } from "@/components/public/Header";
import { HeroLookbook } from "@/components/public/HeroLookbook";
import { ProductCard } from "@/components/public/ProductCard";
import { Footer } from "@/components/public/Footer";
import { LookbookLoop } from "@/components/public/LookbookLoop";
import { store, useStore, type ContainerStyle, type CategoryStyle, type FooterLink } from "@/lib/store";
import { cn } from "@/lib/utils";

type EditMode = "announce" | "header" | "hero" | "lookbook" | "grid" | "footer" | null;

const CONTAINER_STYLES: { key: ContainerStyle; label: string; hint: string }[] = [
  { key: "minimal", label: "Minimalista", hint: "Bordas retas e discretas" },
  { key: "soft", label: "Suave", hint: "Cantos arredondados e sombra sutil" },
  { key: "brutalist", label: "Brutalista", hint: "Bordas duras com sombra dura" },
];

const CATEGORY_STYLES: { key: CategoryStyle; label: string }[] = [
  { key: "serif-italic", label: "Serifada Itálica" },
  { key: "wide-sans", label: "Sans Espaçada" },
  { key: "stamp", label: "Carimbo Mono" },
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
    "relative border-2 border-dashed border-transparent hover:border-[color:var(--gold)]/70 transition cursor-pointer";

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
        <span className="hidden sm:inline text-background/60">Toque em qualquer seção</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-md sm:max-w-2xl">
          {settings.announcement && (
            <button onClick={openEdit("announce")} className={`${zone} block w-full text-left`}>
              <EditBadge label="Anúncio" />
              <div className="bg-foreground text-background text-center text-[10px] tracking-[0.25em] uppercase py-2 px-4 font-semibold">
                {settings.announcement}
              </div>
            </button>
          )}

          <div onClick={openEdit("header")} className={zone}>
            <EditBadge label="Cabeçalho" />
            <div className="pointer-events-none">
              <Header />
            </div>
          </div>

          <div onClick={openEdit("hero")} className={zone}>
            <EditBadge label="Hero" />
            <div className="pointer-events-none">
              <HeroLookbook />
            </div>
          </div>

          <div onClick={openEdit("grid")} className={`${zone} p-4`}>
            <EditBadge label="Grade" />
            <div className="pointer-events-none grid grid-cols-2 gap-3">
              {products.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>

          <div onClick={openEdit("lookbook")} className={zone}>
            <EditBadge label="Lookbook" />
            <div className="pointer-events-none">
              <LookbookLoop />
            </div>
          </div>

          <div onClick={openEdit("footer")} className={zone}>
            <EditBadge label="Rodapé" />
            <div className="pointer-events-none">
              <Footer />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onExit}
        className="fixed bottom-6 right-6 z-[60] group inline-flex items-center gap-2 rounded-full bg-foreground text-background pl-4 pr-5 py-3 text-xs uppercase tracking-[0.2em] font-semibold shadow-2xl hover:bg-[color:var(--gold)] hover:text-foreground transition"
      >
        <Icon icon="ph:x-circle-duotone" className="w-5 h-5" />
        Sair do Editor
      </button>

      {editing && (
        <div
          className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center"
          onClick={() => setEditing(null)}
        >
          <div
            className="bg-white w-full max-w-lg sm:rounded-3xl rounded-t-3xl p-6 pb-10 shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1.5 bg-black/10 rounded-full mx-auto mb-5 sm:hidden" />
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl flex items-center gap-2">
                <Icon icon="ph:sliders-horizontal-duotone" className="text-[color:var(--gold)]" />
                Editando: {sectionLabel(editing)}
              </h3>
              <button
                onClick={() => setEditing(null)}
                className="p-2 rounded-full bg-black/5 text-foreground/60 hover:text-foreground"
              >
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
                </>
              )}

              {editing === "grid" && (
                <>
                  <FieldLabel label="Estilo do Container do Produto" />
                  <div className="grid gap-2">
                    {CONTAINER_STYLES.map((c) => (
                      <button
                        key={c.key}
                        onClick={() => store.setSettings({ containerStyle: c.key })}
                        className={cn(
                          "flex items-center justify-between rounded-xl border p-3 text-left transition",
                          settings.containerStyle === c.key
                            ? "border-foreground bg-foreground/5"
                            : "border-black/10 hover:border-black/30",
                        )}
                      >
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider">{c.label}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{c.hint}</p>
                        </div>
                        {settings.containerStyle === c.key && (
                          <Icon icon="ph:check-circle-fill" className="w-5 h-5 text-[color:var(--gold)]" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="pt-4">
                    <FieldLabel label="Estilo do Título das Categorias" />
                    <div className="grid gap-2">
                      {CATEGORY_STYLES.map((c) => (
                        <button
                          key={c.key}
                          onClick={() => store.setSettings({ categoryStyle: c.key })}
                          className={cn(
                            "flex items-center justify-between rounded-xl border p-3 text-left transition",
                            settings.categoryStyle === c.key
                              ? "border-foreground bg-foreground/5"
                              : "border-black/10 hover:border-black/30",
                          )}
                        >
                          <span className="text-xs font-bold uppercase tracking-wider">{c.label}</span>
                          {settings.categoryStyle === c.key && (
                            <Icon icon="ph:check-circle-fill" className="w-5 h-5 text-[color:var(--gold)]" />
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
                    label="Tagline"
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
                  <div>
                    <FieldLabel label="Links Rápidos" />
                    <div className="space-y-2">
                      {settings.footerLinks.map((l, i) => (
                        <div key={i} className="flex gap-2">
                          <input
                            value={l.label}
                            onChange={(e) => {
                              const next: FooterLink[] = [...settings.footerLinks];
                              next[i] = { ...l, label: e.target.value };
                              store.setSettings({ footerLinks: next });
                            }}
                            placeholder="Rótulo"
                            className="flex-1 rounded-lg border border-black/15 p-2 text-xs outline-none"
                          />
                          <input
                            value={l.href}
                            onChange={(e) => {
                              const next: FooterLink[] = [...settings.footerLinks];
                              next[i] = { ...l, href: e.target.value };
                              store.setSettings({ footerLinks: next });
                            }}
                            placeholder="URL"
                            className="flex-1 rounded-lg border border-black/15 p-2 text-xs outline-none"
                          />
                          <button
                            onClick={() =>
                              store.setSettings({
                                footerLinks: settings.footerLinks.filter((_, j) => j !== i),
                              })
                            }
                            className="rounded-lg border border-black/10 p-2 text-black/40 hover:text-red-600"
                          >
                            <Icon icon="ph:trash-bold" className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() =>
                          store.setSettings({
                            footerLinks: [...settings.footerLinks, { label: "Novo Link", href: "#" }],
                          })
                        }
                        className="text-[10px] font-bold uppercase tracking-widest text-foreground/60 hover:text-foreground inline-flex items-center gap-1"
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
  return {
    announce: "Anúncio",
    header: "Cabeçalho",
    hero: "Hero",
    lookbook: "Lookbook",
    grid: "Grade",
    footer: "Rodapé",
  }[m];
}

function FieldLabel({ label }: { label: string }) {
  return (
    <label className="block text-[10px] uppercase tracking-[0.2em] font-semibold text-foreground/70 mb-2">
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
        className="w-full rounded-xl border border-black/15 p-3.5 text-sm outline-none focus:border-foreground"
      />
    </div>
  );
}

function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <FieldLabel label={label} />
      <div className="flex gap-3 items-start">
        <div className="h-20 w-20 shrink-0 rounded-xl border border-black/10 bg-neutral-50 overflow-hidden flex items-center justify-center">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <Icon icon="ph:image-duotone" className="w-6 h-6 text-black/30" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <label className="cursor-pointer inline-flex items-center gap-2 rounded-lg border border-black/15 px-3 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-black/5 transition">
            <Icon icon="ph:cloud-arrow-up-duotone" className="w-4 h-4 text-[color:var(--gold)]" />
            Upload
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (f) onChange(await fileToDataUrl(f));
              }}
            />
          </label>
          <input
            value={value.startsWith("data:") ? "" : value}
            placeholder="ou cole uma URL"
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-lg border border-black/15 p-2 text-xs outline-none focus:border-foreground"
          />
        </div>
      </div>
    </div>
  );
}
