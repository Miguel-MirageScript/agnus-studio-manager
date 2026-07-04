import { Icon } from "@iconify/react";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function HeroLookbook() {
  const [playing, setPlaying] = useState(true);
  const title = useStore((s) => s.settings.heroTitle);
  const heroImage = useStore((s) => s.settings.heroImage);
  const heroTextColor = useStore((s) => s.settings.heroTextColor);

  return (
    <section className="relative overflow-hidden bg-[oklch(0.96_0.005_85)]">
      <div className="relative aspect-[16/10] md:aspect-[21/9] w-full">
        <img
          src={heroImage}
          alt="AGNUS.1993 Lookbook"
          className={cn(
            "h-full w-full object-cover object-top transition-transform duration-[6000ms] ease-out",
            playing ? "scale-105" : "scale-100",
          )}
          width={1600}
          height={900}
        />

        {/* Suave gradiente para melhorar legibilidade sem escurecer demais */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <h1
            className="font-display text-[13vw] md:text-[9vw] leading-none font-bold tracking-tighter drop-shadow-lg transition-colors duration-300"
            style={{ color: heroTextColor }}
          >
            {title.replace(/\.$/, "")}
            <span className="text-[color:var(--gold)]">.</span>
          </h1>
        </div>

        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-8 flex gap-2">
          <button
            onClick={() => setPlaying(true)}
            aria-label="Play"
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/70 backdrop-blur border border-black/10 shadow-lg hover:bg-white transition-all"
          >
            <Icon icon="ph:play-fill" className="w-4 h-4 transition-colors group-hover:text-[color:var(--gold)]" style={{ color: heroTextColor }} />
          </button>
          <button
            onClick={() => setPlaying(false)}
            aria-label="Pause"
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/70 backdrop-blur border border-black/10 shadow-lg hover:bg-white transition-all"
          >
            <Icon icon="ph:pause-fill" className="w-4 h-4 transition-colors group-hover:text-[color:var(--gold)]" style={{ color: heroTextColor }} />
          </button>
        </div>
      </div>
    </section>
  );
}
