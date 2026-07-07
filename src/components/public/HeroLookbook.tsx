import { useStore } from "@/lib/store";

export function HeroLookbook() {
  const title = useStore((s) => s.settings.heroTitle);
  const heroImage = useStore((s) => s.settings.heroImage);
  const heroTextColor = useStore((s) => s.settings.heroTextColor);

  return (
    <section className="relative overflow-hidden bg-[oklch(0.96_0.005_85)]">
      <div className="relative aspect-[16/10] md:aspect-[21/9] w-full">
        <img
          src={heroImage}
          alt="AGNUS.1993 Lookbook"
          className="h-full w-full object-cover object-top scale-105"
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
      </div>
    </section>
  );
}
