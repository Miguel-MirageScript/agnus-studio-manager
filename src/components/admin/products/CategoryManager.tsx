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
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { store, useStore } from "@/lib/store";
import { SortableCategoryRow } from "./SortableCategoryRow";

export function CategoryManager() {
  const categories = useStore((s) => s.categories);
  const [newCat, setNewCat] = useState("");
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = categories.indexOf(String(active.id));
    const newIdx = categories.indexOf(String(over.id));
    if (oldIdx < 0 || newIdx < 0) return;
    store.setCategories(arrayMove(categories, oldIdx, newIdx));
  };

  const handleAddCategory = () => {
    if (newCat.trim()) {
      store.addCategory(newCat.trim());
      setNewCat("");
    }
  };

  return (
    <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-4 flex items-center gap-2 text-black/60">
        <Icon icon="ph:folders-duotone" className="w-5 h-5 text-[color:var(--gold)]" />
        Ordem das Categorias
      </h2>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={categories} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-2 mb-6">
            {categories.map((c) => (
              <SortableCategoryRow key={c} id={c} />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="flex gap-2 max-w-sm">
        <input
          value={newCat}
          onChange={(e) => setNewCat(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddCategory();
            }
          }}
          placeholder="Criar nova categoria..."
          className="flex-1 rounded-xl border border-black/15 px-4 py-2.5 text-sm outline-none focus:border-foreground bg-neutral-50"
        />
        <button
          onClick={handleAddCategory}
          className="rounded-xl bg-foreground text-background px-5 text-[10px] font-bold uppercase tracking-widest hover:bg-[color:var(--gold)] transition"
        >
          Adicionar
        </button>
      </div>
    </section>
  );
}
