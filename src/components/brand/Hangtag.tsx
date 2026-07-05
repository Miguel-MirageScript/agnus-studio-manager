import { Icon } from "@iconify/react";
import type { HangtagStyle } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * 20 radically distinct hangtag styles.
 * All positioned absolutely over the product image.
 */
export function Hangtag({
  style,
  label,
  className,
}: {
  style: HangtagStyle;
  label: string;
  className?: string;
}) {
  if (!label) return null;

  // 1 Leather Patch
  if (style === "classic") {
    return (
      <div className={cn("absolute bottom-4 left-4 z-10", className)}>
        <div
          className="relative px-4 py-2 rounded-md shadow-lg"
          style={{
            background: "linear-gradient(135deg, #6b3a1e 0%, #4a2612 100%)",
            boxShadow: "inset 0 1px 2px rgba(255,220,180,0.25), 0 4px 10px rgba(0,0,0,0.35)",
          }}
        >
          <span className="absolute inset-1 rounded-[3px] border border-dashed border-[#f4d9a8]/60 pointer-events-none" />
          <span className="relative text-[9px] font-black tracking-[0.25em] uppercase text-[#f4d9a8]">
            {label}
          </span>
        </div>
      </div>
    );
  }

  // 2 Wax Seal
  if (style === "ribbon") {
    return (
      <div className={cn("absolute top-4 right-4 z-10", className)}>
        <div
          className="relative h-16 w-16 rounded-full flex items-center justify-center text-center rotate-[-8deg]"
          style={{
            background: "radial-gradient(circle at 30% 25%, #c53030 0%, #7a0f0f 70%, #4a0505 100%)",
            boxShadow: "inset -3px -4px 8px rgba(0,0,0,0.5), inset 3px 3px 6px rgba(255,120,120,0.3), 0 6px 14px rgba(0,0,0,0.35)",
          }}
        >
          <span className="text-[7px] font-black tracking-[0.15em] uppercase text-[#f4d5a0] leading-tight px-1 drop-shadow">
            {label}
          </span>
        </div>
      </div>
    );
  }

  // 3 Holographic Sticker
  if (style === "seal") {
    return (
      <div className={cn("absolute top-4 left-4 z-10", className)}>
        <div className="relative overflow-hidden bg-holo animate-holo rounded-full px-4 py-2 shadow-[0_4px_20px_rgba(255,0,204,0.35)] ring-2 ring-white/70">
          <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/30 to-white/0 pointer-events-none" />
          <span className="relative text-[9px] font-black tracking-[0.25em] uppercase text-white mix-blend-difference">
            {label}
          </span>
        </div>
      </div>
    );
  }

  // 4 Barcode Strip
  if (style === "metallic") {
    return (
      <div className={cn("absolute bottom-4 right-4 z-10", className)}>
        <div className="bg-white border border-black/20 px-2 py-1.5 rounded-sm shadow-md">
          <div className="h-6 w-24 bg-barcode" />
          <div className="mt-1 flex items-center justify-between font-mono text-[7px] tracking-[0.15em] uppercase text-black">
            <span>AGN</span>
            <span className="font-black truncate max-w-[70px]">{label}</span>
            <span>93</span>
          </div>
        </div>
      </div>
    );
  }

  // 5 Kraft Luggage Tag
  if (style === "side-label") {
    return (
      <div className={cn("absolute top-3 right-3 z-10 flex flex-col items-center", className)}>
        <span className="block h-4 w-px bg-neutral-500" />
        <div
          className="relative bg-kraft px-3 py-2 shadow-md border border-black/20"
          style={{ clipPath: "polygon(50% 0, 100% 20%, 100% 100%, 0 100%, 0 20%)" }}
        >
          <span className="absolute top-[3px] left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-neutral-900/70 border border-black/40" />
          <p className="pt-2 text-[8px] font-black tracking-[0.2em] uppercase text-neutral-900">
            {label}
          </p>
        </div>
      </div>
    );
  }

  // 6 Neon Glow Pill
  if (style === "minimal-float") {
    return (
      <div className={cn("absolute top-4 left-4 z-10", className)}>
        <div
          className="bg-black/85 border border-fuchsia-400 rounded-full px-3.5 py-1.5"
          style={{ boxShadow: "0 0 6px #f0f, 0 0 16px rgba(255,0,255,0.5), inset 0 0 6px rgba(255,0,255,0.3)" }}
        >
          <span className="font-mono text-[9px] font-bold tracking-[0.3em] uppercase text-fuchsia-100 animate-neon">
            {label}
          </span>
        </div>
      </div>
    );
  }

  // 7 Caution Tape
  if (style === "brutalist") {
    return (
      <div className={cn("absolute top-6 -left-2 z-10", className)}>
        <div className="bg-hazard px-4 py-1.5 -rotate-6 shadow-lg border-y-2 border-black">
          <div className="bg-yellow-300 px-2 py-0.5 border-2 border-black">
            <span className="flex items-center gap-1 text-[10px] font-black tracking-[0.2em] uppercase text-black">
              <Icon icon="ph:warning-fill" className="w-3 h-3" />
              {label}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 8 Woven Fabric
  if (style === "woven") {
    return (
      <div className={cn("absolute top-4 left-4 z-10", className)}>
        <div
          className="px-3 py-2 rounded-sm border border-black/60 shadow"
          style={{
            backgroundColor: "#efe6d2",
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.09) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(0,0,0,0.09) 0 1px, transparent 1px 3px)",
          }}
        >
          <span className="text-[9px] font-black uppercase tracking-[0.25em] text-neutral-900 font-mono">
            {label}
          </span>
        </div>
      </div>
    );
  }

  // 9 Plastic Blister
  if (style === "blister") {
    return (
      <div className={cn("absolute top-4 right-4 z-10", className)}>
        <div
          className="rounded-full px-4 py-2 border border-white/70"
          style={{
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.9) 0%, rgba(240,240,255,0.7) 40%, rgba(200,220,240,0.6) 100%)",
            boxShadow:
              "inset 0 2px 6px rgba(255,255,255,0.9), inset 0 -3px 6px rgba(0,0,0,0.1), 0 4px 14px rgba(0,0,0,0.15)",
          }}
        >
          <span className="text-[9px] font-black uppercase tracking-widest text-neutral-700">{label}</span>
        </div>
      </div>
    );
  }

  // 10 Perforated Ticket Stub
  if (style === "ticket") {
    return (
      <div className={cn("absolute top-4 left-4 z-10", className)}>
        <div
          className="flex items-stretch bg-[#fdf3e0] border border-black/40 shadow-md"
          style={{ filter: "drop-shadow(0 3px 5px rgba(0,0,0,0.2))" }}
        >
          <div className="px-3 py-1.5">
            <span className="font-mono text-[9px] font-black uppercase tracking-widest text-black">
              {label}
            </span>
          </div>
          <div
            className="border-l border-dashed border-black/60 px-2 py-1.5 flex items-center"
          >
            <span className="font-mono text-[8px] text-black/60">#93</span>
          </div>
        </div>
      </div>
    );
  }

  // 11 Scrolling LED Badge
  if (style === "led") {
    return (
      <div className={cn("absolute top-4 right-4 z-10 overflow-hidden bg-black border border-red-600 rounded-sm px-2 py-1 w-28", className)}>
        <div className="whitespace-nowrap animate-[marquee_6s_linear_infinite] font-mono text-[9px] font-black uppercase tracking-widest text-red-500" style={{ textShadow: "0 0 4px #ef4444" }}>
          ★ {label} ★ {label} ★
        </div>
      </div>
    );
  }

  // 12 Metallic Dog Tag
  if (style === "dogtag") {
    return (
      <div className={cn("absolute top-3 right-3 z-10 flex flex-col items-center", className)}>
        <span className="block h-3 w-px bg-neutral-500" />
        <div
          className="rounded-md px-3 py-1.5 border border-neutral-500"
          style={{
            background: "linear-gradient(180deg, #f0f0f5 0%, #b0b0b8 50%, #d5d5db 100%)",
            boxShadow: "inset 0 1px 2px rgba(255,255,255,0.9), 0 3px 8px rgba(0,0,0,0.3)",
          }}
        >
          <span className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-neutral-800">
            {label}
          </span>
        </div>
      </div>
    );
  }

  // 13 Rubber PVC Patch
  if (style === "pvc") {
    return (
      <div className={cn("absolute bottom-4 left-4 z-10", className)}>
        <div
          className="rounded-lg px-3 py-2 border-2 border-black"
          style={{
            background: "linear-gradient(135deg, #1a1a1a 0%, #333 100%)",
            boxShadow:
              "inset 0 2px 3px rgba(255,255,255,0.15), inset 0 -2px 3px rgba(0,0,0,0.5), 0 3px 8px rgba(0,0,0,0.35)",
          }}
        >
          <span className="text-[9px] font-black uppercase tracking-widest text-white">{label}</span>
        </div>
      </div>
    );
  }

  // 14 Transparent Acrylic
  if (style === "acrylic") {
    return (
      <div className={cn("absolute top-4 left-4 z-10", className)}>
        <div
          className="rounded-md px-3 py-1.5 backdrop-blur-md border border-white/70"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.1))",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          }}
        >
          <span className="text-[9px] font-black uppercase tracking-widest text-white drop-shadow">
            {label}
          </span>
        </div>
      </div>
    );
  }

  // 15 Wooden Engraved
  if (style === "wooden") {
    return (
      <div className={cn("absolute bottom-4 right-4 z-10", className)}>
        <div
          className="rounded-md px-3 py-2 border border-[#5a3a1e]"
          style={{
            backgroundColor: "#8b5a2b",
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(0,0,0,0.08) 0 1px, transparent 1px 6px), repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 15px)",
            boxShadow: "inset 0 0 8px rgba(0,0,0,0.4), 0 3px 8px rgba(0,0,0,0.3)",
          }}
        >
          <span className="font-serif text-[10px] font-black uppercase tracking-widest text-[#f4d9a8]">
            {label}
          </span>
        </div>
      </div>
    );
  }

  // 16 Folded Care Label
  if (style === "care-label") {
    return (
      <div className={cn("absolute top-0 left-6 z-10", className)}>
        <div
          className="bg-white border-x border-b border-black/30 px-2 py-1 shadow-sm"
          style={{ clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)" }}
        >
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-black block">
            AGNUS.93
          </span>
          <span className="font-mono text-[9px] font-black uppercase tracking-widest text-black block">
            {label}
          </span>
        </div>
      </div>
    );
  }

  // 17 RFID Security Sticker
  if (style === "rfid") {
    return (
      <div className={cn("absolute top-4 right-4 z-10", className)}>
        <div className="flex items-center gap-1.5 bg-white border border-black/30 rounded-sm px-2 py-1 shadow-sm">
          <div className="relative h-4 w-4">
            <span className="absolute inset-0 rounded-full border-2 border-black/70" />
            <span className="absolute inset-0.5 rounded-full border border-black/50" />
            <span className="absolute inset-[5px] rounded-full bg-black/70" />
          </div>
          <div>
            <span className="block font-mono text-[7px] uppercase text-black/60 tracking-widest">RFID</span>
            <span className="block font-mono text-[8px] font-black uppercase text-black tracking-widest">
              {label}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 18 Holographic Authenticity Seal
  if (style === "holo-auth") {
    return (
      <div className={cn("absolute top-4 right-4 z-10", className)}>
        <div
          className="relative rounded-full h-14 w-14 flex items-center justify-center overflow-hidden bg-holo animate-holo border-2 border-white/80 shadow-[0_6px_20px_rgba(0,255,255,0.35)]"
        >
          <div className="absolute inset-1 rounded-full border border-white/60" />
          <span className="relative text-center text-[7px] font-black uppercase tracking-[0.15em] leading-tight text-white mix-blend-difference px-1">
            AUTH<br />{label}
          </span>
        </div>
      </div>
    );
  }

  // 19 Velvet Texture
  if (style === "velvet") {
    return (
      <div className={cn("absolute top-4 left-4 z-10", className)}>
        <div
          className="rounded-md px-3 py-1.5 border border-[#3a0a1a]"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, #8b0f3c 0%, #520620 70%, #2a0410 100%)",
            boxShadow:
              "inset 0 4px 12px rgba(255,255,255,0.15), inset 0 -6px 12px rgba(0,0,0,0.5), 0 3px 10px rgba(0,0,0,0.3)",
          }}
        >
          <span className="font-serif italic text-[10px] font-black uppercase tracking-widest text-[#f4d9a8]">
            {label}
          </span>
        </div>
      </div>
    );
  }

  // 20 Wax Drip Ink
  return (
    <div className={cn("absolute top-3 left-3 z-10", className)}>
      <div
        className="relative bg-black text-white rounded-full px-4 py-2 rotate-[-4deg]"
        style={{ boxShadow: "0 6px 14px rgba(0,0,0,0.35)" }}
      >
        <span className="font-display italic text-[10px] font-black uppercase tracking-widest">
          {label}
        </span>
        <span
          className="absolute -bottom-1.5 left-4 h-3 w-3 bg-black rounded-full"
          aria-hidden
        />
        <span
          className="absolute -bottom-3 left-6 h-2 w-2 bg-black rounded-full"
          aria-hidden
        />
      </div>
    </div>
  );
}
