import { Icon } from "@iconify/react";
import { useState } from "react";
import { store, useStore, type AdminProduct, type HangtagStyle } from "@/lib/store";
import { Hangtag } from "@/components/brand/Hangtag";
import teeBlack from "@/assets/tee-black.jpg";
import { cn } from "@/lib/utils";
import type { StatusTag } from "@/lib/products";

const STATUS_OPTIONS: StatusTag[] = [
  "PRONTA ENTREGA",
  "SOB ENCOMENDA",
  "NOVO DROP",
  "LIMITADO",
  "PROMOÇÃO",
  "ESGOTADO",
];

const HANGTAG_OPTIONS: { key: HangtagStyle; label: string; hint: string }[] = [
  { key: "classic", label: "Classic Hangtag", hint: "Etiqueta pendurada com fio fino" },
  { key: "ribbon", label: "Minimalist Ribbon", hint: "Faixa lateral discreta" },
  { key: "seal", label: "Dark Seal", hint: "Selo circular escuro em relevo" },
];

type Draft = Omit<AdminProduct, "id"> & { id?: string };

const emptyDraft = (category: string): Draft => ({
  name: "",
  price: 0,
  image: teeBlack,
  tags: ["PRONTA ENTREGA"],
  filters: ["novidades"],
  category,
  stock: 10,
  hangtag: "classic",
});

export function ProductManager() {
  const products = useStore((s) => s.products);
  const categories = useStore((s) => s.categories);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [newCat, setNewCat] = useState("");

  const save = () => {
    if (!editing || !editing.name.trim()) return;
    if (editing.id) {
      store.updateProduct(editing.id, editing);
    } else {
      store.addProduct(editing);
    }
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl">Catálogo de Produtos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            CRUD completo com seleção de estilo de tag.
          </p>
        </div>
        <button
          onClick={() => setEditing(emptyDraft(categories[0] ?? "Camisetas"))}
          className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[color:var(--gold)] hover:text-foreground transition"
        >
          <Icon icon="ph:plus-bold" className="w-4 h-4" />
          Novo Produto
        </button>
      </header>

      {/* Categories */}
      <section className="rounded-2xl border border-black/10 bg-white p-5">
        <h2 className="text-xs uppercase tracking-[0.2em] font-semibold mb-3 flex items-center gap-2">
          <Icon icon="ph:folders-duotone" className="w-4 h-4 text-[color:var(--gold)]" />
          Categorias
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <span key={c} className="group inline-flex items-center gap-1.5 rounded-full border border-black/10 pl-3 pr-1.5 py-1 text-xs">
              {c}
              <button
                onClick={() => store.deleteCategory(c)}
                className="rounded-full p-0.5 text-muted-foreground hover:text-red-600 hover:bg-red-50"
                aria-label={`Remover ${c}`}
              >
                <Icon icon="ph:x-bold" className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="Nova categoria"
            className="flex-1 rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-foreground"
          />
          <button
            onClick={() => {
              store.addCategory(newCat);
              setNewCat("");
            }}
            className="rounded-lg bg-foreground text-background px-4 text-xs font-semibold uppercase tracking-widest"
          >
            Adicionar
          </button>
        </div>
      </section>

      {/* Product grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="rounded-2xl border border-black/10 bg-white p-4">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[oklch(0.97_0.005_85)]">
              <img src={p.image} alt={p.name} className="h-full w-full object-contain p-6" />
              <Hangtag style={p.hangtag} label={p.tags[0] ?? "AGNUS.93"} />
            </div>
            <div className="mt-3">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.category}</p>
              <h3 className="text-sm font-semibold truncate">{p.name}</h3>
              <div className="mt-1 flex items-center justify-between text-xs">
                <span className="font-mono">${p.price.toFixed(2)}</span>
                <span className={cn("font-mono", p.stock === 0 ? "text-red-600" : "text-muted-foreground")}>
                  Estoque: {p.stock}
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => setEditing({ ...p })}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-black/15 py-2 text-[11px] font-semibold uppercase tracking-widest hover:border-foreground"
                >
                  <Icon icon="ph:pencil-simple" className="w-3.5 h-3.5" />
                  Editar
                </button>
                <button
                  onClick={() => store.deleteProduct(p.id)}
                  className="inline-flex items-center justify-center rounded-lg border border-black/15 px-3 py-2 text-red-600 hover:border-red-600 hover:bg-red-50"
                  aria-label="Excluir"
                >
                  <Icon icon="ph:trash" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <ProductEditor
          draft={editing}
          categories={categories}
          onChange={setEditing}
          onCancel={() => setEditing(null)}
          onSave={save}
        />
      )}
    </div>
  );
}

function ProductEditor({
  draft,
  categories,
  onChange,
  onCancel,
  onSave,
}: {
  draft: Draft;
  categories: string[];
  onChange: (d: Draft) => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  const toggleTag = (t: StatusTag) => {
    onChange({
      ...draft,
      tags: draft.tags.includes(t) ? draft.tags.filter((x) => x !== t) : [...draft.tags, t],
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onCancel}>
      <div
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-4 sticky top-0 bg-white z-10">
          <h3 className="font-display text-xl flex items-center gap-2">
            <Icon icon="ph:t-shirt-duotone" className="text-[color:var(--gold)]" />
            {draft.id ? "Editar Produto" : "Novo Produto"}
          </h3>
          <button onClick={onCancel} className="p-2 rounded-full hover:bg-black/5">
            <Icon icon="ph:x" className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nome do Produto" value={draft.name} onChange={(v) => onChange({ ...draft, name: v })} />
            <Field
              label="Preço (USD)"
              type="number"
              value={String(draft.price)}
              onChange={(v) => onChange({ ...draft, price: parseFloat(v) || 0 })}
            />
            <div>
              <Label>Categoria</Label>
              <select
                value={draft.category}
                onChange={(e) => onChange({ ...draft, category: e.target.value })}
                className="w-full rounded-lg border border-black/15 px-3 py-2.5 text-sm bg-white outline-none focus:border-foreground"
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <Field
              label="Estoque"
              type="number"
              value={String(draft.stock)}
              onChange={(v) => onChange({ ...draft, stock: parseInt(v) || 0 })}
            />
          </div>

          <div>
            <Label>Status Tags</Label>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((t) => {
                const on = draft.tags.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => toggleTag(t)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest transition",
                      on
                        ? "border-foreground bg-foreground text-background"
                        : "border-black/15 text-muted-foreground hover:border-foreground",
                    )}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <Label>Estilo da Tag no Card (Hangtag)</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {HANGTAG_OPTIONS.map((h) => {
                const selected = draft.hangtag === h.key;
                return (
                  <button
                    key={h.key}
                    onClick={() => onChange({ ...draft, hangtag: h.key })}
                    className={cn(
                      "relative rounded-xl border-2 p-3 text-left transition bg-[#F7F4EF]",
                      selected ? "border-[color:var(--gold)] shadow-md" : "border-black/10 hover:border-foreground",
                    )}
                  >
                    <div className="relative h-32 rounded-lg overflow-hidden bg-white">
                      <img src={draft.image} alt="" className="h-full w-full object-contain p-4" />
                      <Hangtag style={h.key} label={draft.tags[0] ?? "AGNUS.93"} />
                    </div>
                    <p className="mt-2 text-xs font-semibold">{h.label}</p>
                    <p className="text-[10px] text-muted-foreground">{h.hint}</p>
                    {selected && (
                      <Icon
                        icon="ph:check-circle-fill"
                        className="absolute top-2 right-2 w-5 h-5 text-[color:var(--gold)]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-black/10 px-6 py-4 flex justify-end gap-2 sticky bottom-0 bg-white">
          <button onClick={onCancel} className="px-4 py-2.5 text-xs uppercase tracking-widest font-semibold text-muted-foreground hover:text-foreground">
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="rounded-full bg-foreground text-background px-5 py-2.5 text-xs uppercase tracking-widest font-semibold hover:bg-[color:var(--gold)] hover:text-foreground transition"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-foreground/70 mb-2">{children}</p>;
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-foreground"
      />
    </div>
  );
}
