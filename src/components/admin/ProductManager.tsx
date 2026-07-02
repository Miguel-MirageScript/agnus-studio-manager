import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { store, useStore, type AdminProduct, type HangtagStyle } from "@/lib/store";
import { Hangtag } from "@/components/brand/Hangtag";
import { cn } from "@/lib/utils";
import type { StatusTag } from "@/lib/products";
import { createClient } from '@supabase/supabase-js';

// Supabase configuration - using provided values
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
  { key: "classic", label: "Classic Hangtag", hint: "Etiqueta pendurada com fio fino" },
  { key: "ribbon", label: "Minimalist Ribbon", hint: "Faixa lateral discreta" },
  { key: "seal", label: "Dark Seal", hint: "Selo circular escuro em relevo" },
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

// Corrected function: Upload image to Supabase and return public URL
async function uploadToSupabase(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

  // Uses the official library for a secure upload
  const { data, error } = await supabase.storage
    .from('products')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error("Supabase storage error details:", error);
    throw new Error(error.message);
  }

  // Generates the definitive public URL for the image
  const { data: publicUrlData } = supabase.storage
    .from('products')
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}

// Corrected function: Delete file from Supabase storage
async function deleteFromSupabase(imageUrl: string) {
  const prefix = `${supabaseUrl}/storage/v1/object/public/products/`;
  if (!imageUrl || !imageUrl.startsWith(prefix)) return;

  const fileName = imageUrl.replace(prefix, "");

  const { error } = await supabase.storage
    .from('products')
    .remove([fileName]);

  if (error) {
    console.error("Error deleting file:", error);
  }
}

export function ProductManager() {
  const products = useStore((s) => s.products);
  const categories = useStore((s) => s.categories);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [newCat, setNewCat] = useState("");
  const [loading, setLoading] = useState(false);

  const save = async (fileToUpload: File | null) => {
    if (!editing || !editing.name.trim()) return;
    setLoading(true);

    try {
      let finalImageUrl = editing.image;

      // If a new image was selected
      if (fileToUpload) {
        // Space optimization: if editing and an old image exists, remove it from Supabase
        if (editing.id) {
          const oldProduct = products.find(p => p.id === editing.id);
          if (oldProduct && oldProduct.image) {
            await deleteFromSupabase(oldProduct.image);
          }
        }
        // Upload the new image and get the URL
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
      alert("Error saving product to Supabase: " + (error.message || "Upload failed"));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string, imageUrl: string) => {
    if (window.confirm("Are you sure you want to delete this product? The image will also be removed from the server.")) {
      setLoading(true);
      try {
        // 1. Remove the physical file from Supabase Storage
        await deleteFromSupabase(imageUrl);
        // 2. Remove the product record
        store.deleteProduct(id);
      } catch (error: any) {
        alert("Error removing image from server: " + (error.message || "Deletion failed"));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl">Catálogo de Produtos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            CRUD completo conectado ao Supabase Storage.
          </p>
        </div>
        <button
          disabled={loading}
          onClick={() => setEditing(emptyDraft(categories[0] ?? "Camisetas"))}
          className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] hover:bg-[color:var(--gold)] hover:text-foreground transition disabled:opacity-50"
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
              if (newCat.trim()) {
                store.addCategory(newCat.trim());
                setNewCat("");
              }
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
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[oklch(0.97_0.005_85)] flex items-center justify-center">
              {p.image ? (
                <img src={p.image} alt={p.name} className="h-full w-full object-cover p-6" />
              ) : (
                <Icon icon="ph:image-square-thin" className="w-12 h-12 text-black/10" />
              )}
              <Hangtag style={p.hangtag} label={p.tags[0] ?? "AGNUS.93"} />
            </div>
            <div className="mt-3">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.category}</p>
              <h3 className="text-sm font-semibold truncate">{p.name}</h3>
              <div className="mt-1 flex items-center justify-between text-xs">
                <span className="font-mono">R$ {p.price.toFixed(2)}</span>
                <span className={cn("font-mono", p.stock === 0 ? "text-red-600" : "text-muted-foreground")}>
                  Estoque: {p.stock}
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  disabled={loading}
                  onClick={() => setEditing({ ...p })}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-black/15 py-2 text-[11px] font-semibold uppercase tracking-widest hover:border-foreground disabled:opacity-50"
                >
                  <Icon icon="ph:pencil-simple" className="w-3.5 h-3.5" /> Editar
                </button>
                <button
                  disabled={loading}
                  onClick={() => handleDeleteProduct(p.id, p.image)}
                  className="inline-flex items-center justify-center rounded-lg border border-black/15 px-3 py-2 text-red-600 hover:border-red-600 hover:bg-red-50 disabled:opacity-50"
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
          loading={loading}
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
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-150"
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
          {/* UPLOAD BOX COM PREVIEW REAL */}
          <div>
            <Label>Imagem do Produto</Label>
            <div className="relative w-full h-52 rounded-xl border-2 border-dashed border-black/15 bg-neutral-50 flex flex-col items-center justify-center cursor-pointer hover:border-foreground overflow-hidden transition group">
              {preview ? (
                <img src={preview} alt="Preview" className="h-full w-full object-contain p-4 bg-white" />
              ) : (
                <div className="flex flex-col items-center text-muted-foreground text-xs gap-1">
                  <Icon icon="ph:cloud-arrow-up-duotone" className="w-8 h-8 text-[color:var(--gold)]" />
                  <span className="font-semibold text-black/70">Selecionar Mockup ou Foto</span>
                  <span className="text-[10px]">Toque para abrir a galeria</span>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              disabled={loading}
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
                    type="button"
                    disabled={loading}
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
                    type="button"
                    disabled={loading}
                    onClick={() => onChange({ ...draft, hangtag: h.key })}
                    className={cn(
                      "relative rounded-xl border-2 p-3 text-left transition bg-[#F7F4EF]",
                      selected ? "border-[color:var(--gold)] shadow-md" : "border-black/10 hover:border-foreground",
                    )}
                  >
                    <div className="relative h-24 rounded-lg overflow-hidden bg-white flex items-center justify-center">
                      {preview ? (
                        <img src={preview} alt="" className="h-full object-contain p-2" />
                      ) : (
                        <div className="text-[9px] text-black/20">Sem preview</div>
                      )}
                      <Hangtag style={h.key} label={draft.tags[0] ?? "AGNUS.93"} />
                    </div>
                    <p className="mt-2 text-xs font-semibold">{h.label}</p>
                    <p className="text-[9px] text-muted-foreground">{h.hint}</p>
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
          <button 
            type="button"
            onClick={onCancel} 
            disabled={loading}
            className="px-4 py-2.5 text-xs uppercase tracking-widest font-semibold text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => onSave(file)}
            className="rounded-full bg-foreground text-background px-6 py-2.5 text-xs uppercase tracking-widest font-semibold hover:bg-[color:var(--gold)] hover:text-foreground transition flex items-center gap-2 disabled:opacity-70"
          >
            {loading && <Icon icon="line-md:loading-twotone-loop" className="w-4 h-4" />}
            {loading ? "Processando..." : "Salvar"}
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
        className="w-full rounded-lg border border-black/15 px-3 py-2.5 text-sm outline-none focus:border-foreground disabled:opacity-50"
      />
    </div>
  );
}
