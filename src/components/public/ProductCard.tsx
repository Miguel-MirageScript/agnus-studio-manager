import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Hangtag } from "@/components/brand/Hangtag";
import { whatsappHref, useStore, type AdminProduct, type ContainerStyle } from "@/lib/store";
import { cn } from "@/lib/utils";

interface Variant {
  root: string;
  imageWrap: string;
  title: string;
  price: string;
  button: string;
  buttonIcon: string;
  imgClass?: string;
  body?: string; // wrapper of text/CTA area
  overlay?: React.ReactNode; // extra decorative overlay on the image
  frame?: React.ReactNode; // extra overlay on the root
}

const V: Record<ContainerStyle, Variant> = {
  // 1
  minimal: {
    root: "bg-white rounded-xl border border-black/5",
    imageWrap: "bg-neutral-50 rounded-t-xl",
    title: "font-sans text-base text-black",
    price: "font-mono text-sm text-neutral-500",
    button: "border border-black bg-white text-black rounded-full px-4 py-2.5 text-[11px] tracking-widest uppercase hover:bg-black hover:text-white transition",
    buttonIcon: "bg-black text-white rounded-full w-6 h-6",
  },
  // 2
  soft: {
    root: "bg-[#F9F6F0] rounded-3xl border border-[color:var(--gold)]/20 shadow-[0_10px_30px_-15px_rgba(183,151,102,0.35)]",
    imageWrap: "bg-white rounded-t-3xl",
    title: "font-display italic text-lg text-neutral-800",
    price: "font-mono text-sm text-[color:var(--gold)]",
    button: "bg-[color:var(--gold)] text-white rounded-full px-5 py-3 text-[11px] tracking-widest uppercase hover:bg-black transition",
    buttonIcon: "bg-white text-[color:var(--gold)] rounded-full w-6 h-6",
  },
  // 3
  brutalist: {
    root: "bg-white border-2 border-black rounded-none",
    imageWrap: "bg-neutral-100 border-b-2 border-black",
    title: "font-black uppercase tracking-tight text-lg text-black",
    price: "font-mono font-bold text-base text-black",
    button: "border-2 border-black bg-white text-black rounded-none px-4 py-3 font-black uppercase tracking-widest text-[11px] hover:bg-black hover:text-white transition",
    buttonIcon: "bg-black text-white rounded-none w-6 h-6",
  },
  // 4
  elegant: {
    root: "bg-white rounded-2xl border border-[color:var(--gold)]/30 shadow-md",
    imageWrap: "bg-neutral-50 rounded-t-2xl",
    title: "font-display text-lg text-neutral-900",
    price: "font-serif italic text-sm text-[color:var(--gold)]",
    button: "border border-[color:var(--gold)] bg-transparent text-[color:var(--gold)] rounded-full px-5 py-3 text-[10px] tracking-[0.3em] uppercase hover:bg-[color:var(--gold)] hover:text-white transition",
    buttonIcon: "bg-[color:var(--gold)] text-white rounded-full w-6 h-6",
  },
  // 5
  "neo-brutalism": {
    root: "bg-[#FFF200] border-4 border-black rounded-none shadow-[8px_8px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:translate-x-[4px] hover:translate-y-[4px] transition-all",
    imageWrap: "bg-white border-b-4 border-black",
    title: "font-black text-lg uppercase tracking-tight text-black",
    price: "font-mono font-black text-lg text-black",
    button: "border-4 border-black bg-white text-black rounded-none px-4 py-3 shadow-[4px_4px_0_0_#000] hover:shadow-[1px_1px_0_0_#000] hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-[#00FF88] transition-all font-black uppercase tracking-widest text-xs",
    buttonIcon: "bg-black text-[#00FF88] rounded-none border-2 border-black w-8 h-8",
  },
  // 6
  cyberpunk: {
    root: "bg-[#05010e] border border-fuchsia-500/60 rounded-lg overflow-hidden relative shadow-[0_0_25px_rgba(217,70,239,0.35)] hover:shadow-[0_0_40px_rgba(217,70,239,0.6)] transition-shadow",
    imageWrap: "bg-gradient-to-br from-[#1a0530] to-[#050510] border-b border-cyan-400/40",
    title: "font-mono font-bold uppercase tracking-[0.2em] text-sm text-cyan-300 [text-shadow:0_0_6px_#22d3ee]",
    price: "font-mono font-bold text-sm text-fuchsia-300 [text-shadow:0_0_6px_#e879f9]",
    button: "border border-cyan-400 bg-transparent text-cyan-300 rounded-md px-4 py-3 font-mono text-[11px] uppercase tracking-[0.25em] hover:bg-cyan-400 hover:text-black hover-glitch [text-shadow:0_0_4px_currentColor] transition-colors",
    buttonIcon: "bg-fuchsia-500 text-black rounded-md w-7 h-7 [box-shadow:0_0_10px_#e879f9]",
    imgClass: "opacity-95 saturate-[1.15]",
    overlay: (
      <>
        <span className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-cyan-400/0 via-cyan-400/70 to-cyan-400/0" aria-hidden />
        <span className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-fuchsia-500/0 via-fuchsia-500/70 to-fuchsia-500/0" aria-hidden />
      </>
    ),
  },
  // 7
  polaroid: {
    root: "bg-[#fdfaf1] rounded-none pt-4 px-4 pb-16 shadow-[0_10px_25px_-8px_rgba(0,0,0,0.35)] relative border border-neutral-200",
    imageWrap: "bg-neutral-100 rounded-none border border-black/5",
    title: "font-script text-2xl text-neutral-800 leading-none",
    price: "font-mono text-sm text-neutral-600",
    button: "border border-neutral-900/70 bg-white text-neutral-900 rounded-none px-4 py-3 font-sans text-[11px] tracking-widest uppercase hover:bg-neutral-900 hover:text-white transition-colors",
    buttonIcon: "bg-[#25D366] text-white rounded-none w-7 h-7",
    body: "pt-6 pb-2",
    overlay: (
      <span
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#f6e8b1]/85 rotate-[-3deg] shadow-sm border border-[#e2ce7d]/60"
        aria-hidden
      />
    ),
  },
  // 8
  glass: {
    root: "bg-white/10 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-[0_8px_32px_rgba(255,255,255,0.12),0_20px_40px_rgba(0,0,0,0.15)] hover:bg-white/20 transition-all",
    imageWrap: "bg-white/5 rounded-t-3xl border-b border-white/20",
    title: "font-display italic text-lg text-white/95 drop-shadow-md",
    price: "font-mono text-sm text-white/80",
    button: "border border-white/50 bg-white/15 text-white rounded-full px-5 py-3 backdrop-blur-md font-bold uppercase tracking-widest text-[11px] hover:bg-white/30 transition-colors",
    buttonIcon: "bg-white text-black rounded-full w-7 h-7",
  },
  // 9
  swiss: {
    root: "bg-white rounded-none border-0 shadow-none",
    imageWrap: "bg-neutral-100 rounded-none",
    title: "font-sans font-bold text-2xl uppercase tracking-tight text-black leading-none",
    price: "font-mono text-base text-neutral-500",
    button: "border-b-2 border-black bg-transparent text-black rounded-none px-0 py-3 font-sans uppercase tracking-[0.3em] text-[11px] font-bold hover:tracking-[0.35em] transition-all",
    buttonIcon: "bg-black text-white rounded-none w-6 h-6",
    body: "py-5 items-start",
  },
  // 10
  blueprint: {
    root: "bg-[#0d3b66] border border-white/30 rounded-md bg-grid relative",
    imageWrap: "bg-[#124a80] border-b border-white/25",
    title: "font-mono uppercase tracking-widest text-sm text-white",
    price: "font-mono text-xs text-cyan-200",
    button: "border border-white/60 bg-transparent text-white rounded-none px-4 py-3 font-mono uppercase tracking-[0.25em] text-[10px] hover:bg-white hover:text-[#0d3b66] transition",
    buttonIcon: "bg-white text-[#0d3b66] rounded-none w-6 h-6",
  },
  // 11
  neumorphism: {
    root: "bg-[#e6e7ee] rounded-3xl shadow-[8px_8px_16px_#c5c6cc,-8px_-8px_16px_#ffffff]",
    imageWrap: "bg-[#e6e7ee] rounded-t-3xl shadow-inner",
    title: "font-sans font-semibold text-base text-neutral-800",
    price: "font-mono text-sm text-neutral-500",
    button: "bg-[#e6e7ee] text-neutral-800 rounded-full px-4 py-3 text-[11px] tracking-widest uppercase font-bold shadow-[4px_4px_10px_#c5c6cc,-4px_-4px_10px_#ffffff] hover:shadow-[inset_2px_2px_6px_#c5c6cc,inset_-2px_-2px_6px_#ffffff] transition-all",
    buttonIcon: "bg-emerald-500 text-white rounded-full w-6 h-6 shadow-inner",
  },
  // 12
  synthwave: {
    root: "rounded-xl relative overflow-hidden border border-pink-500/60 shadow-[0_0_30px_rgba(236,72,153,0.35)]",
    imageWrap: "bg-gradient-to-b from-[#1a0033] via-[#3d0066] to-[#ff3399] border-b border-pink-400/40",
    title: "font-mono uppercase tracking-[0.2em] text-sm text-pink-200 [text-shadow:0_0_8px_#ec4899]",
    price: "font-mono text-sm text-cyan-200 [text-shadow:0_0_8px_#22d3ee]",
    button: "bg-gradient-to-r from-pink-500 to-cyan-400 text-black rounded-md px-4 py-3 font-mono uppercase tracking-[0.25em] text-[10px] font-black hover:brightness-125 transition",
    buttonIcon: "bg-black text-cyan-200 rounded-md w-6 h-6",
    frame: (
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none opacity-70"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent 0 12px, rgba(255,0,153,0.35) 12px 13px), repeating-linear-gradient(90deg, transparent 0 12px, rgba(0,255,255,0.25) 12px 13px)",
          maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
        }}
        aria-hidden
      />
    ),
  },
  // 13
  "high-fashion": {
    root: "rounded-none border border-[color:var(--gold)] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><defs><radialGradient id=%22g%22 cx=%2250%25%22 cy=%2250%25%22 r=%2270%25%22><stop offset=%220%25%22 stop-color=%22%23fafafa%22/><stop offset=%22100%25%22 stop-color=%22%23e6e2d6%22/></radialGradient></defs><rect width=%22120%22 height=%22120%22 fill=%22url(%23g)%22/><path d=%22M0 0 L120 120 M120 0 L0 120%22 stroke=%22%23c9bfa3%22 stroke-width=%220.5%22 opacity=%220.4%22/></svg>')] bg-cover shadow-md",
    imageWrap: "bg-white/60 border-b border-[color:var(--gold)]/40",
    title: "font-display text-xl italic text-neutral-900",
    price: "font-serif text-sm text-[color:var(--gold)]",
    button: "border border-[color:var(--gold)] bg-transparent text-neutral-900 rounded-none px-5 py-3 font-serif tracking-[0.3em] uppercase text-[10px] hover:bg-[color:var(--gold)] hover:text-white transition",
    buttonIcon: "bg-[color:var(--gold)] text-white rounded-none w-6 h-6",
  },
  // 14
  grunge: {
    root: "bg-[#1a1a1a] rounded-none border-[3px] border-black relative shadow-[0_6px_20px_rgba(0,0,0,0.6)]",
    imageWrap: "bg-[#111] border-b-[3px] border-black relative",
    title: "font-black uppercase tracking-tight text-lg text-[#e5e0d5] [text-shadow:1px_1px_0_#000]",
    price: "font-mono text-sm text-neutral-400",
    button: "border-[3px] border-neutral-200 bg-transparent text-neutral-100 rounded-none px-4 py-3 font-black uppercase tracking-widest text-[11px] hover:bg-neutral-200 hover:text-black transition",
    buttonIcon: "bg-neutral-200 text-black rounded-none w-6 h-6",
    imgClass: "contrast-125 saturate-75",
    frame: (
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence baseFrequency=%220.9%22 numOctaves=%222%22 seed=%223%22/><feColorMatrix values=%220 0 0 0 0.05  0 0 0 0 0.05  0 0 0 0 0.05  0 0 0 0.6 0%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22/></svg>')",
        }}
        aria-hidden
      />
    ),
  },
  // 15
  y2k: {
    root: "rounded-3xl border-[3px] border-transparent p-[3px] bg-[linear-gradient(135deg,#c0c0c0,#f0f0f0,#a0a0a0,#e6e6ff,#c0c0c0)] shadow-[0_10px_25px_rgba(120,120,180,0.35)]",
    imageWrap: "bg-gradient-to-br from-sky-100 via-white to-pink-100 rounded-t-2xl",
    title: "font-sans font-black uppercase italic text-lg text-[#3d3d90] [text-shadow:1px_1px_0_#fff]",
    price: "font-mono text-sm text-fuchsia-500",
    button: "bg-[linear-gradient(180deg,#ff9ff3_0%,#f368e0_100%)] text-white rounded-full px-5 py-3 font-black uppercase tracking-widest text-[11px] border-2 border-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_4px_10px_rgba(243,104,224,0.5)] hover:brightness-110 transition",
    buttonIcon: "bg-white text-fuchsia-500 rounded-full w-6 h-6",
  },
  // 16
  terminal: {
    root: "bg-black border border-green-500 rounded-none",
    imageWrap: "bg-black border-b border-green-500/70 relative",
    title: "font-mono uppercase tracking-widest text-sm text-green-400",
    price: "font-mono text-sm text-green-500",
    button: "border border-green-500 bg-transparent text-green-400 rounded-none px-4 py-3 font-mono uppercase tracking-[0.25em] text-[10px] hover:bg-green-500 hover:text-black transition",
    buttonIcon: "bg-green-500 text-black rounded-none w-6 h-6",
    imgClass: "opacity-90 saturate-50 hue-rotate-[60deg]",
    frame: (
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,255,0,0.15) 0 1px, transparent 1px 3px)",
        }}
        aria-hidden
      />
    ),
  },
  // 17
  holographic: {
    root: "rounded-2xl overflow-hidden border border-white/60 bg-holo animate-holo shadow-[0_10px_30px_rgba(255,0,204,0.35)]",
    imageWrap: "bg-white/40 backdrop-blur-sm",
    title: "font-black uppercase tracking-tight text-lg text-white mix-blend-difference",
    price: "font-mono text-sm text-white mix-blend-difference",
    button: "bg-white/80 backdrop-blur text-black rounded-full px-5 py-3 font-black uppercase tracking-widest text-[11px] hover:bg-white transition",
    buttonIcon: "bg-black text-white rounded-full w-6 h-6",
  },
  // 18
  kraft: {
    root: "bg-kraft rounded-none border-y-[3px] border-neutral-900/60 relative",
    imageWrap: "bg-white/70 border-b-[3px] border-neutral-900/40 border-dashed",
    title: "font-mono uppercase tracking-widest text-sm text-neutral-900",
    price: "font-mono text-xs text-neutral-800",
    button: "border-2 border-dashed border-neutral-900 bg-transparent text-neutral-900 rounded-none px-4 py-3 font-mono uppercase tracking-widest text-[10px] hover:bg-neutral-900 hover:text-[#c9a678] transition",
    buttonIcon: "bg-neutral-900 text-[#c9a678] rounded-none w-6 h-6",
  },
  // 19
  editorial: {
    root: "bg-white rounded-none border-l-[6px] border-black relative",
    imageWrap: "bg-neutral-100 rounded-none",
    title: "font-display text-2xl leading-tight text-black",
    price: "font-serif italic text-sm text-neutral-500",
    button: "bg-transparent text-black rounded-none px-0 py-2 font-serif italic tracking-wide text-sm hover:text-[color:var(--gold)] transition underline underline-offset-4",
    buttonIcon: "bg-black text-white rounded-full w-6 h-6",
    body: "pl-6 pr-4 py-6",
  },
  // 20
  "sci-fi": {
    root: "bg-[#0a1620] text-white relative shadow-[0_0_25px_rgba(56,189,248,0.35)] [clip-path:polygon(14px_0,100%_0,100%_calc(100%-14px),calc(100%-14px)_100%,0_100%,0_14px)]",
    imageWrap: "bg-[#081018] border-b border-cyan-400/40",
    title: "font-mono uppercase tracking-[0.25em] text-sm text-cyan-200",
    price: "font-mono text-xs text-cyan-400",
    button: "border border-cyan-400 bg-transparent text-cyan-200 rounded-none px-4 py-3 font-mono uppercase tracking-[0.25em] text-[10px] [clip-path:polygon(8px_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%,0_8px)] hover:bg-cyan-400 hover:text-black transition",
    buttonIcon: "bg-cyan-400 text-black rounded-none w-6 h-6",
    frame: (
      <>
        <span className="absolute top-2 left-2 h-3 w-3 border-t border-l border-cyan-400" aria-hidden />
        <span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-cyan-400" aria-hidden />
      </>
    ),
  },
};

export function ProductCard({ product }: { product: AdminProduct }) {
  const containerStyle = useStore((s) => s.settings.containerStyle);
  const disabled = product.tags.includes("ESGOTADO");
  const primaryTag = product.tags[0] ?? "AGNUS.93";

  const v = V[containerStyle] ?? V.swiss;
  const bodyClass = v.body ?? "p-5";

  return (
    <motion.article
      id={`p-${product.id}`}
      whileHover={{ y: containerStyle === "neo-brutalism" ? 0 : -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn("group relative flex flex-col overflow-visible", v.root)}
    >
      {v.frame}
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
        {v.overlay}
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
            containerStyle === "swiss" || containerStyle === "editorial" ? "w-auto" : "w-full",
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
