import { Icon } from "@iconify/react";
import { useState } from "react";
import heroImg from "@/assets/hero-lookbook.jpg";

export function HeroLookbook() {
  const [playing, setPlaying] = useState(true);
  return (
    <section className="relative overflow-hidden bg-[oklch(0.96_0.005_85)]">
      <div className="relative aspect-[16/10] md:aspect-[21/9] w-full">
        <img
          src={heroImg}
          alt="AGNUS.1993 Lookbook 93"
          className={`h-full w-full object-cover object-top transition-transform duration-[6000ms] ease-out ${playing ? "scale-105" : "scale-100"}`}
          width={1600}
          height={900}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <h1 className="font-display text-[13vw] md:text-[9vw] leading-none font-bold tracking-tighter text-foreground">
            LOOKBOOK<span className="text-[color:var(--gold)]">.</span>
          </h1>
        </div>
        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-8 flex gap-2">
          <button
            onClick={() => setPlaying(true)}
            aria-label="Play"
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur border border-black/10 hover:bg-white transition"
          >
            <Icon icon="ph:play-fill" className="w-4 h-4 text-foreground group-hover:text-[color:var(--gold)]" />
          </button>
          <button
            onClick={() => setPlaying(false)}
            aria-label="Pause"
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur border border-black/10 hover:bg-white transition"
          >
            <Icon icon="ph:pause-fill" className="w-4 h-4 text-foreground group-hover:text-[color:var(--gold)]" />
          </button>
        </div>
      </div>
    </section>
  );
}
