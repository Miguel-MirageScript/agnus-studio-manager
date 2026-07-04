import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * 3 radically distinct category title treatments.
 * Driven by store.settings.categoryStyle.
 */
export function CategoryHeading({ name, className }: { name: string; className?: string }) {
  const style = useStore((s) => s.settings.categoryStyle);
  const trimmed = name.trim();

  // 1. VOGUE: oversized serif, italicize only first + last letter
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

  // 2. CAUTION TAPE: hazard tape wrapping
  if (style === "caution") {
    return (
      <div className={cn("relative", className)}>
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

  // 3. GIANT OUTLINE: transparent text with stroke
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
