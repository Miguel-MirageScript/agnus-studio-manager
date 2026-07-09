import { useState } from "react";
import { Icon } from "@iconify/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { store } from "@/lib/store";

export function SortableCategoryRow({ id }: { id: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(id);

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  const handleSave = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== id) {
      // Usa a nova função mágica do store.ts para atualizar o nome e migrar os produtos
      store.updateCategory(id, trimmed);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(id);
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between bg-[#F7F4EF] border border-black/5 px-4 py-3 rounded-xl group"
    >
      <div className="flex items-center gap-4 flex-1">
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1 bg-white rounded-md shadow-sm border border-black/5 text-black/40 group-hover:text-black transition touch-none shrink-0"
        >
          <Icon icon="ph:dots-six-vertical-bold" className="w-4 h-4" />
        </button>
        
        {isEditing ? (
          <input
            autoFocus
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            className="text-xs font-bold uppercase tracking-wider bg-white border border-black/10 rounded px-2 py-1.5 outline-none focus:ring-2 ring-[color:var(--gold)] w-full max-w-[250px]"
          />
        ) : (
          <span className="text-xs font-bold uppercase tracking-wider truncate">{id}</span>
        )}
      </div>

      <div className="flex items-center gap-1 shrink-0 ml-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="rounded-full p-1.5 text-emerald-600 hover:bg-emerald-50 transition"
              title="Salvar"
            >
              <Icon icon="ph:check-bold" className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="rounded-full p-1.5 text-black/30 hover:text-black hover:bg-black/5 transition"
              title="Cancelar"
            >
              <Icon icon="ph:x-bold" className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-full p-1.5 text-black/30 hover:text-[color:var(--gold)] hover:bg-[color:var(--gold)]/10 transition"
              title="Editar Categoria"
            >
              <Icon icon="ph:pencil-simple-bold" className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (window.confirm(`Deletar a categoria "${id}"? ATENÇÃO: Todos os produtos vinculados a ela também serão apagados.`)) {
                  store.deleteCategory(id);
                }
              }}
              className="rounded-full p-1.5 text-black/30 hover:text-red-600 hover:bg-red-50 transition"
              title="Excluir Categoria"
            >
              <Icon icon="ph:trash-bold" className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
