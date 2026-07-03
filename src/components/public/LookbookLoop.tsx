import { Icon } from "@iconify/react";
import { useState } from "react";
import { useStore } from "@/lib/store";

export function LookbookLoop() {
  const [index, setIndex] = useState(1);
  const title = useStore((s) => s.settings.lookbookTitle);
  const images = useStore((s) => s.settings.lookbookImages);
  const frames = images.slice(0, 3);
  const max = Math.max(0, frames.length - 1);

  return (
    <section className="bg-[oklch(0.97_0.005_85)]">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl md:text-3xl">{title}</h2>
          <div className="flex items-center gap-2 text-muted-foreground">
            <button onClick={() => setIndex((i) => Math.max(0, i - 1))} className="p-1.5 hover:text-foreground" aria-label="Anterior">
              <Icon icon="ph:caret-left" className="w-4 h-4" />
            </button>
            <Icon icon="ph:play-fill" className="w-3.5 h-3.5 text-[color:var(--gold)]" />
            <button onClick={() => setIndex((i) => Math.min(max, i + 1))} className="p-1.5 hover:text-foreground" aria-label="Próximo">
              <Icon icon="ph:caret-right" className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl border border-black/5 bg-neutral-100">
          <div className="grid grid-cols-3 gap-1">
            {frames.map((src, i) => (
              <div key={i} className={`relative aspect-[3/4] overflow-hidden transition ${i === index ? "" : "grayscale opacity-70"}`}>
                <img src={src} alt="Lookbook frame" loading="lazy" className="h-full w-full object-cover" />
                {i === index && <div className="absolute inset-4 rounded-lg border-2 border-white/80 pointer-events-none" />}
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-3 rounded-full bg-white/70 backdrop-blur px-5 py-2">
              <span className="font-display tracking-widest text-lg">AGNUS</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow">
                <Icon icon="ph:play-fill" className="w-4 h-4 text-foreground" />
              </span>
              <span className="font-display tracking-widest text-lg">LOOP.93</span>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex-1 mx-4 h-1 rounded-full bg-black/5 overflow-hidden">
            <div className="h-full bg-foreground transition-all" style={{ width: `${((index + 1) / Math.max(frames.length, 1)) * 100}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
