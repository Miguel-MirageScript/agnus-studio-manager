import { Icon } from "@iconify/react";
import { useState } from "react";
import { store, useStore, type AdminProduct, type HangtagStyle } from "@/lib/store";
import { Hangtag } from "@/components/brand/Hangtag";
import { cn } from "@/lib/utils";
import type { StatusTag } from "@/lib/products";
import { createClient } from '@supabase/supabase-js';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Supabase configuration
const supabaseUrl = "https://jypmxfhaxcniztkswueb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cG14ZmhheGNuaXp0a3N3dWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MTAxMjEsImV4cCI6MjA5ODQ4NjEyMX0.zHttmS0Q1M2qIxMhsOjlf7xNDScwpLfWV0BGVtqu3nE";
const supabase = createClient(supabaseUrl, supabaseKey);

const STATUS_OPTIONS: StatusTag[] = [
  "PRONTA ENTREGA",
  "SOB ENCOMENDA",
  "NOVO DROP",
  "LIMITADO",
  "PROMOÇÃO",
  "ESGOTADO",
];

const HANGTAG_OPTIONS: { key: HangtagStyle; label: string; hint: string }[] = [
  { key: "classic", label: "Classic Hangtag", hint: "Etiqueta pendurada com fio" },
  { key: "ribbon", label: "Minimalist Ribbon", hint: "Faixa lateral discreta" },
  { key: "seal", label: "Dark Seal", hint: "Selo circular escuro" },
  { key: "metallic", label: "Metallic Gold", hint: "Selo dourado metálico" },
  { key: "side-label", label: "Vertical Label", hint: "Etiqueta lateral vertical" },
  { key: "minimal-float", label: "Minimal Float", hint: "Texto flutuante minimalista" },
  { key: "brutalist", label: "Brutalist Box", hint: "Caixa dura com sombra sólida" },
];

type Draft = Omit<AdminProduct, "id"> & { id?: string };

const emptyDraft = (category: string): Draft => ({
  name: "",
  price: 0,
  image: "",
  tags: ["PRONTA ENTREGA"],
  filters: ["novidades"],
  category,
  stock: 10,
  hangtag: "classic",
});

async function uploadToSupabase(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('products')
    .upload(fileName, file, { cacheControl: '3600', upsert: false });

  if (error) throw new Error(error.message);

  const { data: publicUrlData } = supabase.storage
    .from('products')
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}

async function deleteFromSupabase(imageUrl: string) {
  const prefix = `${supabaseUrl}/storage/v1/object/public/products/`;
  if (!imageUrl || !imageUrl.startsWith(prefix)) return;
  const fileName = imageUrl.replace(prefix, "");
  await supabase.storage.from('products').remove([fileName]);
}

export function ProductManager() {
  const products = useStore((s) => s.products);
  const categories = useStore((s) => s.categories);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [newCat, setNewCat] = useState("");
  const [loading, setLoading] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const save = async (fileToUpload: File | null) => {
    if (!editing || !editing.name.trim()) return;
    setLoading(true);

    try {
      let finalImageUrl = editing.image;

      if (fileToUpload) {
        if (editing.id) {
          const oldProduct = products.find(p => p.id === editing.id);
          if (oldProduct && oldProduct.image) await deleteFromSupabase(oldProduct.image);
        }
        finalImageUrl = await uploadToSupabase(fileToUpload);
      }

      const updatedDraft = { ...editing, image: finalImageUrl };

      if (editing.id) {
        store.updateProduct(editing.id, updatedDraft);
      } else {
        store.addProduct(updatedDraft);
      }
      setEditing(null);
    } catch (error: any) {
      alert("Erro ao salvar produto no Supabase: " + (error.message || "Upload falhou"));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string, imageUrl: string) => {
    if (window.confirm("Certeza que deseja excluir? A imagem também sairá do servidor.")) {
      setLoading(true);
      try {
        await deleteFromSupabase(imageUrl);
        store.deleteProduct(id);
      } catch (error: any) {
        alert("Erro ao remover imagem: " + (error.message || "Falha ao deletar"));
      } finally {
        setLoading(false);
      }
    }
  };

  const onCategoryDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = categories.indexOf(String(active.id));
    const newIdx = categories.indexOf(String(over.id));
    if (oldIdx < 0 || newIdx < 0) return;
    store.setCategories(arrayMove(categories, oldIdx, newIdx));
  };

  const onProductDragEnd = (category: string) => (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const catProducts = products.filter((p) => p.category === category);
    const oldIdx = catProducts.findIndex((p) => p.id === active.id);
    const newIdx = catProducts.findIndex((p) => p.id === over.id);
    if (oldIdx < 0 || newIdx < 0) return;
    const reordered = arrayMove(catProducts, oldIdx, newIdx);

    const newProducts: AdminProduct[] = [];
    categories.forEach((cat) => {
      if (cat === category) newProducts.push(...reordered);
      else newProducts.push(...products.filter((p) => p.category === cat));
    });
    const orphaned = products.filter((p) => !categories.includes(p.category));
    newProducts.push(...orphaned);
    store.setProducts(newProducts);
  };

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-wrap items-end justify-between gap-3 border-b border-black/5 pb-6">
        <div>
          <h1 className="font-display text-2xl md:text-3xl">Painel de Vitrine</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Arraste em qualquer direção para organizar seu catálogo.
          </p>
        </div>
        <button
          disabled={loading}
          onClick={() => setEditing(emptyDraft(categories[0] ?? "Camisetas"))}
          className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[color:var(--gold)] hover:text-foreground transition disabled:opacity-50 shadow-md"
        >
          <Icon icon="ph:plus-bold" className="w-4 h-4" />
          Novo Produto
        </button>
      </header>

      {/* Categories */}
      <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-4 flex items-center gap-2 text-black/60">
          <Icon icon="ph:folders-duotone" className="w-5 h-5 text-[color:var(--gold)]" />
          Ordem das Categorias
        </h2>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onCategoryDragEnd}>
          <SortableContext items={categories} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2 mb-6">
              {categories.map((c) => (
                <SortableCategoryRow key={c} id={c} onDelete={() => {
                  if (window.confirm(`Deletar categoria ${c}? Os produtos ficarão órfãos.`)) store.deleteCategory(c);
                }} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <div className="flex gap-2 max-w-sm">
          <input
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            placeholder="Criar nova categoria..."
            className="flex-1 rounded-xl border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-foreground bg-neutral-50"
          />
          <button
            onClick={() => {
              if (newCat.trim()) { store.addCategory(newCat.trim()); setNewCat(""); }
            }}
            className="rounded-xl bg-foreground text-background px-5 text-[10px] font-bold uppercase tracking-widest hover:bg-[color:var(--gold)] transition"
          >
            Adicionar
          </button>
        </div>
      </section>

      {/* Products grid — 2D drag per category */}
      <div className="flex flex-col gap-12">
        {categories.map((category) => {
          const catProducts = products.filter((p) => p.category === category);
          return (
            <section key={category} className="space-y-4">
              <div className="flex items-center gap-4 px-2">
                <h3 className="font-display text-xl uppercase tracking-widest text-foreground">
                  {category}
                </h3>
                <div className="h-[1px] flex-1 bg-black/10" />
                <span className="text-[10px] font-bold tracking-widest text-black/40">{catProducts.length} ITENS</span>
              </div>

              {catProducts.length === 0 ? (
                <div className="text-center p-8 border-2 border-dashed border-black/10 rounded-2xl bg-white/50">
                  <p className="text-xs text-black/40 uppercase tracking-widest font-bold">Nenhum produto em {category}</p>
                </div>
              ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onProductDragEnd(category)}>
                  <SortableContext items={catProducts.map((p) => p.id)} strategy={rectSortingStrategy}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {catProducts.map((p) => (
                        <SortableProductCard
                          key={p.id}
                          product={p}
                          loading={loading}
                          onEdit={() => setEditing({ ...p })}
                          onDelete={() => handleDeleteProduct(p.id, p.image)}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </section>
          );
        })}
      </div>

      {editing && (
        <ProductEditor
          draft={editing}
          categories={categories}
          loading={loading}
          onChange={setEditing}
          onCancel={() => setEditing(null)}
          onSave={save}
        />
      )}
    </div>
  );
}

function SortableCategoryRow({ id, onDelete }: { id: string; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between bg-[#F7F4EF] border border-black/5 px-4 py-3 rounded-xl group"
    >
      <div className="flex items-center gap-4">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 bg-white rounded-md shadow-sm border border-black/5 text-black/40 group-hover:text-black transition touch-none"
        >
          <Icon icon="ph:dots-six-vertical-bold" className="w-4 h-4" />
        </button>
        <span className="text-xs font-bold uppercase tracking-wider">{id}</span>
      </div>
      <button
        onClick={onDelete}
        className="rounded-full p-1.5 text-black/30 hover:text-red-600 hover:bg-red-50 transition"
      >
        <Icon icon="ph:trash-bold" className="w-4 h-4" />
      </button>
    </div>
  );
}

function SortableProductCard({
  product,
  loading,
  onEdit,
  onDelete,
}: {
  product: AdminProduct;
  loading: boolean;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: product.id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : "auto",
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative rounded-2xl border border-black/10 bg-white p-4 shadow-sm group"
    >
      <button
        {...attributes}
        {...listeners}
        aria-label="Arrastar"
        className="absolute top-6 left-6 z-10 cursor-grab active:cursor-grabbing bg-white/90 backdrop-blur border border-black/10 shadow-sm p-1.5 rounded-md text-black/50 hover:text-black transition touch-none"
      >
        <Icon icon="ph:dots-six-vertical-bold" className="w-5 h-5" />
      </button>

      <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[oklch(0.97_0.005_85)] flex items-center justify-center">
        {product.image ? (
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <Icon icon="ph:image-square-thin" className="w-12 h-12 text-black/10" />
        )}
        <Hangtag style={product.hangtag} label={product.tags[0] ?? "AGNUS.93"} />
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-bold truncate tracking-wide">{product.name}</h3>
        <div className="mt-1.5 flex items-center justify-between text-xs">
          <span className="font-mono font-medium">R$ {product.price.toFixed(2)}</span>
          <span className={cn("font-mono font-medium", product.stock === 0 ? "text-red-600" : "text-black/50")}>
            Estoque: {product.stock}
          </span>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            disabled={loading}
            onClick={onEdit}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-black/15 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:border-foreground hover:bg-black/5 transition disabled:opacity-50"
          >
            <Icon icon="ph:pencil-simple-bold" className="w-3.5 h-3.5" /> Editar
          </button>
          <button
            disabled={loading}
            onClick={onDelete}
            className="inline-flex items-center justify-center rounded-xl border border-red-200 px-3.5 py-2.5 text-red-600 hover:border-red-600 hover:bg-red-50 transition disabled:opacity-50"
          >
            <Icon icon="ph:trash-bold" className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductEditor({
  draft,
  categories,
  loading,
  onChange,
  onCancel,
  onSave,
}: {
  draft: Draft;
  categories: string[];
  loading: boolean;
  onChange: (d: Draft) => void;
  onCancel: () => void;
  onSave: (file: File | null) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(draft.image);

  const toggleTag = (t: StatusTag) => {
    onChange({
      ...draft,
      tags: draft.tags.includes(t) ? draft.tags.filter((x) => x !== t) : [...draft.tags, t],
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onCancel}>
      <div
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5 sticky top-0 bg-white/95 backdrop-blur z-10">
          <h3 className="font-display text-xl flex items-center gap-2">
            <Icon icon="ph:t-shirt-duotone" className="text-[color:var(--gold)] w-6 h-6" />
            {draft.id ? "Editar Produto" : "Novo Drop"}
          </h3>
          <button onClick={onCancel} className="p-2 rounded-full text-black/40 hover:bg-black/5 hover:text-black transition">
            <Icon icon="ph:x-bold" className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <Label>Imagem do Produto</Label>
            <div className="relative w-full h-56 rounded-2xl border-2 border-dashed border-black/15 bg-neutral-50 flex flex-col items-center justify-center cursor-pointer hover:border-black/40 hover:bg-neutral-100 transition group overflow-hidden">
              {preview ? (
                <img src={preview} alt="Preview" className="h-full w-full object-contain p-4 mix-blend-multiply" />
              ) : (
                <div className="flex flex-col items-center text-black/40 gap-2">
                  <Icon icon="ph:cloud-arrow-up-duotone" className="w-10 h-10 text-[color:var(--gold)]" />
                  <span className="font-bold text-xs uppercase tracking-widest text-black/60">Upload de Mockup</span>
                  <span className="text-[10px]">Toque para selecionar da galeria</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Nome do Produto" value={draft.name} disabled={loading} onChange={(v) => onChange({ ...draft, name: v })} />
            <Field
              label="Preço (R$)"
              type="number"
              value={String(draft.price)}
              disabled={loading}
              onChange={(v) => onChange({ ...draft, price: parseFloat(v) || 0 })}
            />
            <div>
              <Label>Categoria</Label>
              <select
                value={draft.category}
                disabled={loading}
                onChange={(e) => onChange({ ...draft, category: e.target.value })}
                className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm font-medium bg-white outline-none focus:border-black transition"
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
              disabled={loading}
              onChange={(v) => onChange({ ...draft, stock: parseInt(v) || 0 })}
            />
          </div>

          <div>
            <Label>Status Tags (Filtros)</Label>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((t) => {
                const on = draft.tags.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    disabled={loading}
                    onClick={() => toggleTag(t)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                      on
                        ? "border-black bg-black text-white shadow-md"
                        : "border-black/15 text-black/50 hover:border-black/40 hover:text-black",
                    )}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <Label>Estilo da Etiqueta no Card</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {HANGTAG_OPTIONS.map((h) => {
                const selected = draft.hangtag === h.key;
                return (
                  <button
                    key={h.key}
                    type="button"
                    disabled={loading}
                    onClick={() => onChange({ ...draft, hangtag: h.key })}
                    className={cn(
                      "relative rounded-2xl border-2 p-4 text-left transition-all bg-[#F7F4EF]",
                      selected ? "border-[color:var(--gold)] shadow-lg scale-[1.02]" : "border-black/5 hover:border-black/20",
                    )}
                  >
                    <div className="relative h-24 rounded-xl overflow-hidden bg-white flex items-center justify-center border border-black/5 shadow-inner">
                      {preview ? (
                        <img src={preview} alt="" className="h-full object-contain p-2 mix-blend-multiply" />
                      ) : (
                        <div className="text-[9px] text-black/20 font-bold uppercase tracking-widest">Sem Arte</div>
                      )}
                      <Hangtag style={h.key} label={draft.tags[0] ?? "AGNUS.93"} />
                    </div>
                    <div className="mt-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-black">{h.label}</p>
                      <p className="text-[9px] text-black/50 mt-1">{h.hint}</p>
                    </div>
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

        <div className="border-t border-black/5 px-6 py-5 flex justify-end gap-3 sticky bottom-0 bg-white/95 backdrop-blur rounded-b-3xl">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-5 py-3 text-[10px] uppercase tracking-widest font-bold text-black/50 hover:text-black hover:bg-black/5 rounded-xl transition disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => onSave(file)}
            className="rounded-xl bg-black text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-[color:var(--gold)] transition shadow-lg flex items-center gap-2 disabled:opacity-70"
          >
            {loading && <Icon icon="line-md:loading-twotone-loop" className="w-4 h-4" />}
            {loading ? "Processando..." : "Salvar Produto"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-black/40 mb-2">{children}</p>;
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-foreground transition disabled:opacity-50"
      />
    </div>
  );
}
