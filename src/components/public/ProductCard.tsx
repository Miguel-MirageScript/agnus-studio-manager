import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { StatusBadge } from "@/components/brand/StatusBadge";
import { Hangtag } from "@/components/brand/Hangtag";
import { whatsappHref, type AdminProduct } from "@/lib/store";

export function ProductCard({ product }: { product: AdminProduct }) {
  const disabled = product.tags.includes("ESGOTADO");
  const primaryTag = product.tags[0] ?? "AGNUS.93";
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="group relative flex flex-col overflow-visible rounded-xl border border-black/5 bg-white shadow-[0_2px_20px_-8px_rgba(0,0,0,0.08)]"
    >
      <div className="relative aspect-[4/5] bg-[oklch(0.97_0.005_85)] overflow-hidden rounded-t-xl">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
        />
        <Hangtag style={product.hangtag} label={primaryTag} />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-1.5">
          {product.tags.map((t) => (
            <StatusBadge key={t} tag={t} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 p-5">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold tracking-[0.08em] uppercase">{product.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground font-mono">${product.price.toFixed(2).replace(".", ",")}</p>
        </div>
        <a
          href={disabled ? undefined : whatsappHref(product.name)}
          target="_blank"
          rel="noreferrer"
          aria-disabled={disabled}
          className={`group/btn inline-flex items-center justify-between gap-2 rounded-full border px-4 py-2.5 text-[11px] font-semibold tracking-[0.15em] uppercase transition
            ${disabled
              ? "border-neutral-200 text-neutral-400 cursor-not-allowed"
              : "border-black/15 text-foreground hover:border-[color:var(--whatsapp)] hover:bg-[color:var(--whatsapp)]/5"}`}
        >
          <span>Negociar via WhatsApp</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--whatsapp)] text-white transition group-hover/btn:scale-110">
            <Icon icon="ic:baseline-whatsapp" className="w-3.5 h-3.5" />
          </span>
        </a>
      </div>
    </motion.article>
  );
}
