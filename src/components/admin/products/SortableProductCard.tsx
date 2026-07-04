import { Icon } from "@iconify/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Hangtag } from "@/components/brand/Hangtag";
import type { AdminProduct } from "@/lib/store";
import { cn } from "@/lib/utils";

export function SortableProductCard({
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
