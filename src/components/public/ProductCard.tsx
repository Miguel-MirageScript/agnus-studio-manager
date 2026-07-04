import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Hangtag } from "@/components/brand/Hangtag";
import { whatsappHref, useStore, type AdminProduct, type ContainerStyle } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * 5 radically distinct container aesthetics.
 * All variables/tokens documented inline. Selected via store.settings.containerStyle.
 */
export function ProductCard({ product }: { product: AdminProduct }) {
  const containerStyle = useStore((s) => s.settings.containerStyle);
  const disabled = product.tags.includes("ESGOTADO");
  const primaryTag = product.tags[0] ?? "AGNUS.93";

  const V: Record<ContainerStyle, {
    root: string;
    imageWrap: string;
    title: string;
    price: string;
    button: string;
    buttonIcon: string;
    imgClass?: string;
    accent?: string;
  }> = {
    // 1. NEO-BRUTALISM
    brutalism: {
      root: "bg-[#FFF200] border-4 border-black rounded-none shadow-[8px_8px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:translate-x-[4px] hover:translate-y-[4px] transition-all",
      imageWrap: "bg-white border-b-4 border-black",
      title: "font-black text-lg uppercase tracking-tight text-black",
      price: "font-mono font-black text-lg text-black",
      button: "border-4 border-black bg-white text-black rounded-none px-4 py-3 shadow-[4px_4px_0_0_#000] hover:shadow-[1px_1px_0_0_#000] hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-[#00FF88] transition-all font-black uppercase tracking-widest text-xs",
      buttonIcon: "bg-black text-[#00FF88] rounded-none border-2 border-black w-8 h-8",
    },
    // 2. CYBERPUNK
    cyberpunk: {
      root: "bg-[#05010e] border border-fuchsia-500/60 rounded-lg overflow-hidden relative shadow-[0_0_25px_rgba(217,70,239,0.35)] hover:shadow-[0_0_40px_rgba(217,70,239,0.6)] transition-shadow",
      imageWrap: "bg-gradient-to-br from-[#1a0530] to-[#050510] border-b border-cyan-400/40",
      title: "font-mono font-bold uppercase tracking-[0.2em] text-sm text-cyan-300 [text-shadow:0_0_6px_#22d3ee]",
      price: "font-mono font-bold text-sm text-fuchsia-300 [text-shadow:0_0_6px_#e879f9]",
      button: "border border-cyan-400 bg-transparent text-cyan-300 rounded-md px-4 py-3 font-mono text-[11px] uppercase tracking-[0.25em] hover:bg-cyan-400 hover:text-black hover-glitch [text-shadow:0_0_4px_currentColor] transition-colors",
      buttonIcon: "bg-fuchsia-500 text-black rounded-md w-7 h-7 [box-shadow:0_0_10px_#e879f9]",
      imgClass: "opacity-95 saturate-[1.15]",
    },
    // 3. VINTAGE POLAROID
    polaroid: {
      root: "bg-[#fdfaf1] rounded-none pt-4 px-4 pb-16 shadow-[0_10px_25px_-8px_rgba(0,0,0,0.35)] relative border border-neutral-200",
      imageWrap: "bg-neutral-100 rounded-none border border-black/5",
      title: "font-script text-2xl text-neutral-800 leading-none",
      price: "font-mono text-sm text-neutral-600",
      button: "border border-neutral-900/70 bg-white text-neutral-900 rounded-none px-4 py-3 font-sans text-[11px] tracking-widest uppercase hover:bg-neutral-900 hover:text-white transition-colors",
      buttonIcon: "bg-[#25D366] text-white rounded-none w-7 h-7",
    },
    // 4. PREMIUM GLASSMORPHISM
    glass: {
      root: "bg-white/10 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-[0_8px_32px_rgba(255,255,255,0.12),0_20px_40px_rgba(0,0,0,0.15)] hover:bg-white/20 transition-all",
      imageWrap: "bg-white/5 rounded-t-3xl border-b border-white/20",
      title: "font-display italic text-lg text-white/95 drop-shadow-md",
      price: "font-mono text-sm text-white/80",
      button: "border border-white/50 bg-white/15 text-white rounded-full px-5 py-3 backdrop-blur-md font-bold uppercase tracking-widest text-[11px] hover:bg-white/30 transition-colors",
      buttonIcon: "bg-white text-black rounded-full w-7 h-7",
    },
    // 5. SWISS MINIMALISM
    swiss: {
      root: "bg-white rounded-none border-0 shadow-none",
      imageWrap: "bg-neutral-100 rounded-none",
      title: "font-sans font-bold text-2xl uppercase tracking-tight text-black leading-none",
      price: "font-mono text-base text-neutral-500",
      button: "border-b-2 border-black bg-transparent text-black rounded-none px-0 py-3 font-sans uppercase tracking-[0.3em] text-[11px] font-bold hover:tracking-[0.35em] transition-all",
      buttonIcon: "bg-black text-white rounded-none w-6 h-6",
    },
  };

  const v = V[containerStyle] ?? V.swiss;

  return (
    <motion.article
      id={`p-${product.id}`}
      whileHover={{ y: containerStyle === "brutalism" ? 0 : -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn("group relative flex flex-col overflow-visible", v.root)}
    >
      <div className={cn("relative aspect-[4/5] overflow-hidden flex items-center justify-center", v.imageWrap)}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={cn(
            "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105",
            product.image.includes("png") && "p-6 object-contain mix-blend-multiply",
            v.imgClass,
          )}
        />
        <Hangtag style={product.hangtag} label={primaryTag} />

        {containerStyle === "polaroid" && (
          <span
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#f6e8b1]/85 rotate-[-3deg] shadow-sm border border-[#e2ce7d]/60"
            aria-hidden
          />
        )}
        {containerStyle === "cyberpunk" && (
          <>
            <span className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-cyan-400/0 via-cyan-400/70 to-cyan-400/0" aria-hidden />
            <span className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-fuchsia-500/0 via-fuchsia-500/70 to-fuchsia-500/0" aria-hidden />
          </>
        )}
      </div>

      <div
        className={cn(
          "flex flex-col gap-4",
          containerStyle === "polaroid" && "pt-6 pb-2",
          containerStyle === "swiss" && "py-5 items-start",
          containerStyle !== "polaroid" && containerStyle !== "swiss" && "p-5",
        )}
      >
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
            containerStyle === "swiss" && "w-auto",
            containerStyle !== "swiss" && "w-full",
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
