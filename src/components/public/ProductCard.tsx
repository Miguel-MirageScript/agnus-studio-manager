import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Hangtag } from "@/components/brand/Hangtag";
import { whatsappHref, useStore, type AdminProduct } from "@/lib/store";
import { THEME_CARDS } from "@/lib/themes";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: AdminProduct }) {
  const theme = useStore((s) => s.settings.theme);
  const disabled = product.tags.includes("ESGOTADO");
  const primaryTag = product.tags[0] ?? "AGNUS.93";

  const v = THEME_CARDS[theme] ?? THEME_CARDS["minimalist-luxury"];
  const bodyClass = v.body ?? "p-5";

  const images = useMemo(() => {
    const list = [product.image];
    if (product.backImage && product.backImage !== product.image) list.push(product.backImage);
    return list;
  }, [product.image, product.backImage]);

  const [idx, setIdx] = useState(0);
  const hasMultiple = images.length > 1;
  const current = images[idx] ?? product.image;

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx((i) => (i + 1) % images.length);
  };
  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx((i) => (i - 1 + images.length) % images.length);
  };

  return (
    <motion.article
      id={`p-${product.id}`}
      whileHover={{ y: v.disableHoverLift ? 0 : -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn("group relative flex flex-col overflow-visible", v.root)}
    >
      {v.frame}
      <div className={cn("relative aspect-[4/5] overflow-hidden flex items-center justify-center", v.imageWrap)}>
        <img
          key={current}
          src={current}
          alt={product.name}
          loading="lazy"
          className={cn(
            "h-full w-full transition-all duration-500 group-hover:scale-105 animate-in fade-in",
            // Correção: Aplicando o padding (p-6) e object-contain para TODOS os formatos de imagem
            "p-6 object-contain"
          )}
        />
        <Hangtag label={primaryTag} theme={theme} />
        {v.overlay}

        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Imagem anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 h-9 w-9 rounded-full bg-white/85 backdrop-blur border border-black/10 text-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-white"
            >
              <Icon icon="ph:caret-left-bold" className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Próxima imagem"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 h-9 w-9 rounded-full bg-white/85 backdrop-blur border border-black/10 text-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-white"
            >
              <Icon icon="ph:caret-right-bold" className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Ir para imagem ${i + 1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIdx(i);
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all border border-black/20 backdrop-blur",
                    i === idx ? "w-6 bg-white" : "w-1.5 bg-white/60 hover:bg-white/90",
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className={cn("flex flex-col gap-4", bodyClass)}>
        <div className="min-w-0 w-full">
          <h3 className={cn("truncate", v.title)}>{product.name}</h3>
          <p className={cn("mt-1.5", v.price)}>
            R$ {product.price.toFixed(2).replace(".", ",")}
          </p>
        </div>

        <a
          href={disabled ? undefined : whatsappHref(product.name, product.id)}
          target="_blank"
          rel="noreferrer"
          aria-disabled={disabled}
          className={cn(
            "group/btn inline-flex items-center justify-between gap-2 transition-all",
            v.button,
            v.autoWidthButton ? "w-auto self-start" : "w-full",
            disabled && "opacity-40 grayscale cursor-not-allowed pointer-events-none",
          )}
        >
          <span>{disabled ? "Esgotado" : "Negociar"}</span>
          <span className={cn("flex items-center justify-center transition-transform group-hover/btn:scale-110", v.buttonIcon)}>
            <Icon icon="ic:baseline-whatsapp" className="w-4 h-4" />
          </span>
        </a>
      </div>
    </motion.article>
  );
}
