import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Hangtag } from "@/components/brand/Hangtag";
import { whatsappHref, useStore, type AdminProduct } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: AdminProduct }) {
  // Fazemos um casting (as any) aqui para o TypeScript aceitar os novos estilos antes de atualizarmos o store
  const containerStyle = useStore((s) => s.settings.containerStyle) as any;
  const disabled = product.tags.includes("ESGOTADO");
  const primaryTag = product.tags[0] ?? "AGNUS.93";

  // 1. LÓGICA DO CONTÊINER (CARD EXTERNO)
  const containerClass = cn(
    "group relative flex flex-col overflow-visible transition-all duration-300",
    
    // Minimalista: Sem cantos arredondados, borda fina
    containerStyle === "minimal" && "bg-white border border-black/15 rounded-none",
    
    // Suave: Cantos arredondados, sombra difusa
    containerStyle === "soft" && "bg-white rounded-2xl border border-black/5 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.08)]",
    
    // Brutalista: Bordas grossas, sombra preta dura
    containerStyle === "brutalist" && "bg-white rounded-none border-2 border-black shadow-[6px_6px_0_0_#000]",
    
    // Polaroid: Moldura grossa branca ao redor da foto
    containerStyle === "polaroid" && "bg-white border-[12px] border-b-0 border-white shadow-xl rounded-none",
    
    // Glassmorphism: Efeito de vidro temperado
    containerStyle === "glass" && "bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-3xl",
    
    // Elegante: Tons pastéis/ouro, borda sutil
    containerStyle === "elegant" && "bg-[#FDFBF7] border border-[color:var(--gold)]/30 rounded-sm shadow-sm",
    
    // Fallback de segurança
    !["minimal", "soft", "brutalist", "polaroid", "glass", "elegant"].includes(containerStyle) && "bg-white border border-black/10"
  );

  // 2. LÓGICA DO FUNDO DA IMAGEM
  const imageClass = cn(
    "relative aspect-[4/5] overflow-hidden flex items-center justify-center",
    
    // O fundo cinza padrão do mockup
    containerStyle !== "glass" ? "bg-[oklch(0.97_0.005_85)]" : "bg-transparent",
    
    // Ajustes de arredondamento baseados no estilo
    containerStyle === "soft" && "rounded-t-2xl",
    containerStyle === "glass" && "rounded-t-3xl",
    containerStyle === "polaroid" && "rounded-none border border-black/5"
  );

  // 3. LÓGICA DO BOTÃO DO WHATSAPP
  const buttonShape = cn(
    "group/btn inline-flex items-center justify-between gap-2 border px-4 py-3 text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300",
    (containerStyle === "brutalist" || containerStyle === "minimal" || containerStyle === "polaroid") ? "rounded-none" : "",
    (containerStyle === "soft" || containerStyle === "glass") ? "rounded-full" : "",
    containerStyle === "elegant" ? "rounded-md" : ""
  );

  return (
    <motion.article
      id={`p-${product.id}`}
      whileHover={{ y: containerStyle === "brutalist" ? 0 : -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={containerClass}
    >
      <div className={imageClass}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={cn(
            "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110",
            // Se não for foto de modelo real e sim PNG, aplicamos um padding
            product.image.includes("png") ? "p-6 object-contain mix-blend-multiply" : ""
          )}
        />
        <Hangtag style={product.hangtag} label={primaryTag} />
      </div>
      
      <div className={cn("flex flex-col gap-4", containerStyle === "polaroid" ? "p-4 pt-6" : "p-5")}>
        <div className="min-w-0">
          <h3 className={cn(
            "truncate tracking-[0.1em] uppercase",
            containerStyle === "elegant" ? "font-serif text-base italic text-black/80" : "font-black text-sm text-black"
          )}>
            {product.name}
          </h3>
          <p className={cn(
            "mt-1.5 font-mono text-sm",
            containerStyle === "elegant" ? "text-[color:var(--gold)] font-bold" : "text-black/60"
          )}>
            R$ {product.price.toFixed(2).replace(".", ",")}
          </p>
        </div>
        
        <a
          href={disabled ? undefined : whatsappHref(product.name, product.id)}
          target="_blank"
          rel="noreferrer"
          aria-disabled={disabled}
          className={cn(
            buttonShape,
            disabled
              ? "border-neutral-200 text-neutral-400 cursor-not-allowed bg-neutral-50"
              : "border-black/15 text-black hover:border-[#25D366] hover:bg-[#25D366]/5",
            containerStyle === "brutalist" && !disabled && "hover:shadow-[3px_3px_0_0_#25D366]"
          )}
        >
          <span>{disabled ? "Esgotado" : "Negociar"}</span>
          <span className={cn(
            "flex h-7 w-7 items-center justify-center transition-transform group-hover/btn:scale-110",
            disabled ? "bg-neutral-300 rounded-full" : "bg-[#25D366] text-white",
            (containerStyle === "brutalist" || containerStyle === "minimal") ? "rounded-none" : "rounded-full"
          )}>
            <Icon icon="ic:baseline-whatsapp" className="w-4 h-4" />
          </span>
        </a>
      </div>
    </motion.article>
  );
}
