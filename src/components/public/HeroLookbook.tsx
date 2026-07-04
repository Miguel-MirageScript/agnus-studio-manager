import { Icon } from "@iconify/react";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function HeroLookbook() {
  const [playing, setPlaying] = useState(true);
  const title = useStore((s) => s.settings.heroTitle);
  const heroImage = useStore((s) => s.settings.heroImage);
  
  // Puxa a cor do texto do painel (Padrão é escuro se não tiver nada marcado)
  const textColor = useStore((s) => (s.settings as any).heroTextColor || "dark");
  const isLight = textColor === "light";

  return (
    <section className="relative overflow-hidden bg-[oklch(0.96_0.005_85)]">
      <div className="relative aspect-[16/10] md:aspect-[21/9] w-full">
        <img
          src={heroImage}
          alt="AGNUS.1993 Lookbook"
          className={cn(
            "h-full w-full object-cover object-top transition-transform duration-[6000ms] ease-out",
            playing ? "scale-105" : "scale-100"
          )}
          width={1600}
          height={900}
        />
        
        {/* Degradê inteligente: Protege a leitura baseado na cor escolhida */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t via-transparent to-transparent",
          isLight ? "from-black/60" : "from-white/50"
        )} />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <h1 className={cn(
            "font-display text-[13vw] md:text-[9vw] leading-none font-bold tracking-tighter drop-shadow-lg transition-colors duration-300",
            isLight ? "text-white" : "text-foreground"
          )}>
            {title.replace(/\.$/, "")}
            <span className="text-[color:var(--gold)]">.</span>
          </h1>
        </div>

        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-8 flex gap-2">
          <button
            onClick={() => setPlaying(true)}
            aria-label="Play"
            className={cn(
              "group flex h-10 w-10 items-center justify-center rounded-full backdrop-blur shadow-lg transition-all duration-300",
              isLight
                ? "bg-black/30 border border-white/20 hover:bg-black/60"
                : "bg-white/80 border border-black/10 hover:bg-white"
            )}
          >
            <Icon 
              icon="ph:play-fill" 
              className={cn(
                "w-4 h-4 transition-colors group-hover:text-[color:var(--gold)]", 
                isLight ? "text-white" : "text-foreground"
              )} 
            />
          </button>
          <button
            onClick={() => setPlaying(false)}
            aria-label="Pause"
            className={cn(
              "group flex h-10 w-10 items-center justify-center rounded-full backdrop-blur shadow-lg transition-all duration-300",
              isLight
                ? "bg-black/30 border border-white/20 hover:bg-black/60"
                : "bg-white/80 border border-black/10 hover:bg-white"
            )}
          >
            <Icon 
              icon="ph:pause-fill" 
              className={cn(
                "w-4 h-4 transition-colors group-hover:text-[color:var(--gold)]", 
                isLight ? "text-white" : "text-foreground"
              )} 
            />
          </button>
        </div>
      </div>
    </section>
  );
}
