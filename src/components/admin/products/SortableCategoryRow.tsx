import { Icon } from "@iconify/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { store } from "@/lib/store";

export function SortableCategoryRow({ id }: { id: string }) {
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
        onClick={() => {
          if (window.confirm(`Deletar categoria ${id}? Os produtos ficarão órfãos.`)) {
            store.deleteCategory(id);
          }
        }}
        className="rounded-full p-1.5 text-black/30 hover:text-red-600 hover:bg-red-50 transition"
      >
        <Icon icon="ph:trash-bold" className="w-4 h-4" />
      </button>
    </div>
  );
}
