import { Icon } from "@iconify/react";
import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { store, useStore, type AdminProduct } from "@/lib/store";
import { uploadToSupabase, deleteFromSupabase } from "@/lib/supabase-storage";
import { CategoryManager } from "./products/CategoryManager";
import { SortableProductCard } from "./products/SortableProductCard";
import { ProductEditor, emptyDraft, type Draft } from "./products/ProductEditor";
import { SaveCloudButton } from "./SaveCloudButton";

export function ProductManager() {
  const products = useStore((s) => s.products);
  const categories = useStore((s) => s.categories);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [loading, setLoading] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const save = async (fileToUpload: File | null) => {
    if (!editing || !editing.name.trim()) return;
    setLoading(true);

    try {
      let finalImageUrl = editing.image;

      if (fileToUpload) {
        if (editing.id) {
          const oldProduct = products.find((p) => p.id === editing.id);
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
        <div className="flex flex-wrap items-center gap-2">
          <SaveCloudButton label="Salvar Mudanças" />
          <button
            disabled={loading}
            onClick={() => setEditing(emptyDraft(categories[0] ?? "Camisetas"))}
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[color:var(--gold)] hover:text-foreground transition disabled:opacity-50 shadow-md"
          >
            <Icon icon="ph:plus-bold" className="w-4 h-4" />
            Novo Produto
          </button>
        </div>
      </header>

      <CategoryManager />

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
                <span className="text-[10px] font-bold tracking-widest text-black/40">
                  {catProducts.length} ITENS
                </span>
              </div>

              {catProducts.length === 0 ? (
                <div className="text-center p-8 border-2 border-dashed border-black/10 rounded-2xl bg-white/50">
                  <p className="text-xs text-black/40 uppercase tracking-widest font-bold">
                    Nenhum produto em {category}
                  </p>
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
