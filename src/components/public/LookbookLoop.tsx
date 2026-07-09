import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";

export function LookbookLoop() {
  const [index, setIndex] = useState(1);
  const title = useStore((s) => s.settings.lookbookTitle);
  const images = useStore((s) => s.settings.lookbookImages);
  const frames = images.slice(0, 3);
  const max = Math.max(0, frames.length - 1);

  // Motor de Autoplay (Muda de frame a cada 3 segundos num loop contínuo)
  useEffect(() => {
    if (frames.length === 0) return;
    
    const timer = setInterval(() => {
      setIndex((current) => (current === max ? 0 : current + 1));
    }, 3000); // 3000 milissegundos = 3 segundos

    // Limpa o temporizador se o componente for desmontado
    return () => clearInterval(timer);
  }, [frames.length, max]);

  return (
    <section className="bg-[oklch(0.97_0.005_85)]">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl md:text-3xl">{title}</h2>
          <div className="flex items-center gap-2 text-muted-foreground">
            <button 
              onClick={() => setIndex((i) => (i === 0 ? max : i - 1))} 
              className="p-1.5 hover:text-foreground transition-colors" 
              aria-label="Anterior"
            >
              <Icon icon="ph:caret-left" className="w-4 h-4" />
            </button>
            <Icon icon="ph:play-fill" className="w-3.5 h-3.5 text-[color:var(--gold)] animate-pulse" />
            <button 
              onClick={() => setIndex((i) => (i === max ? 0 : i + 1))} 
              className="p-1.5 hover:text-foreground transition-colors" 
              aria-label="Próximo"
            >
              <Icon icon="ph:caret-right" className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-black/5 bg-neutral-100 shadow-sm">
          <div className="grid grid-cols-3 gap-1">
            {frames.map((src, i) => (
              <div 
                key={i} 
                className={`relative aspect-[3/4] overflow-hidden transition-all duration-700 ease-in-out ${i === index ? "scale-100 z-10 shadow-2xl" : "grayscale opacity-50 scale-95"}`}
              >
                <img src={src} alt={`Lookbook frame ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
                {i === index && <div className="absolute inset-4 rounded-lg border-[3px] border-white/90 pointer-events-none transition-all duration-500" />}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex-1 mx-4 h-1.5 rounded-full bg-black/5 overflow-hidden">
            <div 
              className="h-full bg-foreground transition-all duration-500 ease-out" 
              style={{ width: `${((index + 1) / Math.max(frames.length, 1)) * 100}%` }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
