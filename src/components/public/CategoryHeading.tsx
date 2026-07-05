import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * 20 radically distinct category title treatments.
 * Driven by store.settings.categoryStyle.
 */
export function CategoryHeading({ name, className }: { name: string; className?: string }) {
  const style = useStore((s) => s.settings.categoryStyle);
  const trimmed = name.trim();

  // 1 Serif Italic
  if (style === "serif-italic") {
    return (
      <h2 className={cn("font-display italic text-4xl md:text-5xl text-foreground", className)}>
        {trimmed}
      </h2>
    );
  }
  // 2 Wide Sans
  if (style === "wide-sans") {
    return (
      <h2 className={cn("font-sans font-black uppercase tracking-[0.35em] text-xl md:text-2xl text-black", className)}>
        {trimmed}
      </h2>
    );
  }
  // 3 Stamp
  if (style === "stamp") {
    return (
      <div className={cn("inline-block border-2 border-black px-4 py-1.5 rotate-[-2deg]", className)}>
        <h2 className="font-mono font-black uppercase tracking-[0.2em] text-lg text-black">
          {trimmed}
        </h2>
      </div>
    );
  }
  // 4 Vogue
  if (style === "vogue") {
    const first = trimmed.charAt(0);
    const middle = trimmed.length > 2 ? trimmed.slice(1, -1) : trimmed.slice(1);
    const last = trimmed.length > 1 ? trimmed.slice(-1) : "";
    return (
      <h2 className={cn("font-display text-4xl md:text-6xl leading-none text-foreground", className)}>
        <span className="italic">{first}</span>
        <span className="not-italic">{middle}</span>
        {last && trimmed.length > 1 && <span className="italic">{last}</span>}
      </h2>
    );
  }
  // 5 Caution Tape
  if (style === "caution") {
    return (
      <div className={cn("relative inline-block", className)}>
        <div className="bg-hazard py-2 px-1 -rotate-2 shadow-lg border-y-4 border-black">
          <div className="bg-yellow-300 px-4 py-1.5 border-y-2 border-black">
            <h2 className="font-sans font-black uppercase tracking-[0.25em] text-lg md:text-xl text-black">
              {trimmed}
            </h2>
          </div>
        </div>
      </div>
    );
  }
  // 6 Outline
  if (style === "outline") {
    return (
      <h2
        className={cn(
          "font-sans font-black uppercase tracking-tight text-4xl md:text-6xl leading-none text-transparent",
          className,
        )}
        style={{ WebkitTextStroke: "1.5px #0a0a0a" }}
      >
        {trimmed}
      </h2>
    );
  }
  // 7 Neon Sign
  if (style === "neon-sign") {
    return (
      <h2
        className={cn("font-display italic text-4xl md:text-5xl text-pink-300 animate-neon", className)}
        style={{ textShadow: "0 0 6px #f0f, 0 0 20px #f0f, 0 0 40px #0ff" }}
      >
        {trimmed}
      </h2>
    );
  }
  // 8 Extruded 3D
  if (style === "extruded-3d") {
    return (
      <h2
        className={cn("font-sans font-black uppercase text-4xl md:text-6xl text-[color:var(--gold)]", className)}
        style={{
          textShadow:
            "1px 1px 0 #b79766, 2px 2px 0 #a1855b, 3px 3px 0 #8b7350, 4px 4px 0 #756145, 5px 5px 0 #5f4f3a, 6px 6px 12px rgba(0,0,0,0.35)",
        }}
      >
        {trimmed}
      </h2>
    );
  }
  // 9 Glitch
  if (style === "glitch") {
    return (
      <div className={cn("relative inline-block", className)}>
        <h2 className="font-sans font-black uppercase text-4xl md:text-5xl text-black">{trimmed}</h2>
        <h2 aria-hidden className="absolute inset-0 font-sans font-black uppercase text-4xl md:text-5xl text-cyan-400 mix-blend-screen translate-x-[2px] translate-y-[-1px] opacity-80">
          {trimmed}
        </h2>
        <h2 aria-hidden className="absolute inset-0 font-sans font-black uppercase text-4xl md:text-5xl text-fuchsia-500 mix-blend-screen -translate-x-[2px] translate-y-[1px] opacity-80">
          {trimmed}
        </h2>
      </div>
    );
  }
  // 10 Marker
  if (style === "marker") {
    return (
      <span className={cn("inline-block relative", className)}>
        <span className="absolute inset-0 -inset-y-1 bg-yellow-300 -rotate-1 -z-10" aria-hidden />
        <h2 className="relative font-script text-4xl md:text-5xl text-black px-2">{trimmed}</h2>
      </span>
    );
  }
  // 11 Arcade Pixel
  if (style === "arcade-pixel") {
    return (
      <h2
        className={cn("font-mono font-black uppercase tracking-[0.2em] text-2xl md:text-3xl text-lime-400 bg-black inline-block px-3 py-2", className)}
        style={{
          fontFamily: "'Press Start 2P', 'Courier New', monospace",
          textShadow: "0 0 6px #0f0",
        }}
      >
        {trimmed}
      </h2>
    );
  }
  // 12 Gold Foil
  if (style === "gold-foil") {
    return (
      <h2
        className={cn("font-display italic text-4xl md:text-6xl bg-clip-text text-transparent", className)}
        style={{
          backgroundImage:
            "linear-gradient(135deg, #fceabb 0%, #d4af37 30%, #b79766 50%, #f7ef8a 70%, #b79766 100%)",
        }}
      >
        {trimmed}
      </h2>
    );
  }
  // 13 Ransom Note
  if (style === "ransom") {
    const fonts = ["font-display italic", "font-sans font-black uppercase", "font-mono uppercase", "font-script"];
    const bgs = ["bg-yellow-200", "bg-pink-300", "bg-cyan-300", "bg-white", "bg-black text-white"];
    return (
      <h2 className={cn("inline-flex flex-wrap gap-1 items-baseline text-3xl md:text-4xl", className)}>
        {trimmed.split("").map((ch, i) => (
          <span
            key={i}
            className={cn("px-1.5 py-0.5 border border-black", fonts[i % fonts.length], bgs[i % bgs.length], i % 2 === 0 ? "-rotate-3" : "rotate-3")}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </h2>
    );
  }
  // 14 Marquee
  if (style === "marquee") {
    const repeated = Array.from({ length: 6 }).map(() => trimmed).join(" · ");
    return (
      <div className={cn("overflow-hidden bg-black text-white py-3 border-y border-black", className)}>
        <div className="whitespace-nowrap animate-[marquee_18s_linear_infinite] font-mono uppercase tracking-[0.3em] text-lg">
          {repeated}
        </div>
      </div>
    );
  }
  // 15 Blur Reveal
  if (style === "blur-reveal") {
    return (
      <h2 className={cn("font-display text-4xl md:text-6xl text-black blur-[3px] hover:blur-0 transition-all duration-500 cursor-default", className)}>
        {trimmed}
      </h2>
    );
  }
  // 16 Cyber-Tech
  if (style === "cyber-tech") {
    const hex = trimmed
      .split("")
      .map((c) => c.charCodeAt(0).toString(16))
      .join("")
      .slice(0, 6);
    return (
      <h2 className={cn("font-mono uppercase text-2xl md:text-3xl text-cyan-500 tracking-widest inline-flex items-center gap-2", className)}>
        <span className="text-cyan-500/50">[</span>
        {trimmed}
        <span className="text-cyan-500/50">/ 0x{hex}]</span>
      </h2>
    );
  }
  // 17 Stencil
  if (style === "stencil") {
    return (
      <h2
        className={cn("font-black uppercase text-4xl md:text-6xl text-black tracking-widest", className)}
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 40%, #ffffff 40% 42%, transparent 42% 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        {trimmed}
      </h2>
    );
  }
  // 18 Bubblegum
  if (style === "bubblegum") {
    return (
      <h2
        className={cn("font-black text-4xl md:text-6xl text-pink-500 rounded-full inline-block px-4 py-2 bg-pink-100", className)}
        style={{
          textShadow: "2px 2px 0 #fff, 4px 4px 0 #f472b6, 6px 6px 12px rgba(244,114,182,0.4)",
        }}
      >
        {trimmed}
      </h2>
    );
  }
  // 19 Blackletter
  if (style === "blackletter") {
    return (
      <h2
        className={cn("text-4xl md:text-6xl text-black", className)}
        style={{ fontFamily: "'UnifrakturMaguntia', 'Cormorant Garamond', serif" }}
      >
        {trimmed}
      </h2>
    );
  }
  // 20 Vertical
  if (style === "vertical") {
    return (
      <h2
        className={cn("font-sans font-black uppercase tracking-[0.4em] text-lg text-black", className)}
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
      >
        {trimmed}
      </h2>
    );
  }
  // 21 Tape Emboss
  return (
    <div className={cn("inline-block bg-neutral-800 rounded-md px-4 py-2 shadow-inner", className)}>
      <h2
        className="font-mono font-black uppercase tracking-[0.3em] text-lg text-white"
        style={{ textShadow: "0 1px 0 rgba(255,255,255,0.15), 0 -1px 0 rgba(0,0,0,0.6)" }}
      >
        {trimmed}
      </h2>
    </div>
  );
}
