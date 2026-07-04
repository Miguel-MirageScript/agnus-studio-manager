import { Icon } from "@iconify/react";
import type { HangtagStyle } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * 7 radically distinct hangtag styles. Each key preserves its identifier
 * from the store for backwards compatibility, but the visual is redesigned.
 *
 * classic       → Leather patch with dashed stitching
 * ribbon        → Wax seal (deep red circular)
 * seal          → Holographic animated gradient sticker
 * metallic      → Real barcode strip with SKU text
 * side-label    → Kraft paper luggage tag with twine hole
 * minimal-float → Neon glowing pill (cyberpunk)
 * brutalist     → Yellow caution / duct tape strip, rotated
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

  // 1. LEATHER PATCH (classic)
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

  // 2. WAX SEAL (ribbon)
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

  // 3. HOLOGRAPHIC STICKER (seal)
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

  // 4. BARCODE STRIP (metallic)
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

  // 5. KRAFT PAPER LUGGAGE TAG (side-label)
  if (style === "side-label") {
    return (
      <div className={cn("absolute top-3 right-3 z-10 flex flex-col items-center", className)}>
        <span className="block h-4 w-px bg-neutral-500" />
        <div className="relative bg-kraft px-3 py-2 shadow-md border border-black/20"
          style={{
            clipPath: "polygon(50% 0, 100% 20%, 100% 100%, 0 100%, 0 20%)",
          }}
        >
          <span className="absolute top-[3px] left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-neutral-900/70 border border-black/40" />
          <p className="pt-2 text-[8px] font-black tracking-[0.2em] uppercase text-neutral-900">
            {label}
          </p>
        </div>
      </div>
    );
  }

  // 6. NEON GLOW PILL (minimal-float)
  if (style === "minimal-float") {
    return (
      <div className={cn("absolute top-4 left-4 z-10", className)}>
        <div
          className="bg-black/85 border border-fuchsia-400 rounded-full px-3.5 py-1.5"
          style={{
            boxShadow: "0 0 6px #f0f, 0 0 16px rgba(255,0,255,0.5), inset 0 0 6px rgba(255,0,255,0.3)",
          }}
        >
          <span className="font-mono text-[9px] font-bold tracking-[0.3em] uppercase text-fuchsia-100 animate-neon">
            {label}
          </span>
        </div>
      </div>
    );
  }

  // 7. CAUTION TAPE (brutalist)
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
