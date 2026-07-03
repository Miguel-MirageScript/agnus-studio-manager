import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/public/Header";
import { HeroLookbook } from "@/components/public/HeroLookbook";
import { ProductCard } from "@/components/public/ProductCard";
import { QuickFilters, type FilterKey } from "@/components/public/QuickFilters";
import { LookbookLoop } from "@/components/public/LookbookLoop";
import { Footer } from "@/components/public/Footer";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [filter, setFilter] = useState<FilterKey>("todos");

  const products = useStore((s) => s.products);
  const categories = useStore((s) => s.categories);
  const announcement = useStore((s) => s.settings.announcement);
  const categoryStyle = useStore((s) => s.settings.categoryStyle);

  const filtered = useMemo(
    () => (filter === "todos" ? products : products.filter((p) => p.filters.includes(filter as any))),
    [filter, products],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const p = params.get("p");
    if (!p) return;
    const t = setTimeout(() => {
      const el = document.getElementById(`p-${p}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("ring-2", "ring-[color:var(--gold)]", "ring-offset-2");
        setTimeout(() => el.classList.remove("ring-2", "ring-[color:var(--gold)]", "ring-offset-2"), 3200);
      }
    }, 400);
    return () => clearTimeout(t);
  }, [products]);

  const categoryClass = cn(
    "text-foreground",
    categoryStyle === "serif-italic" && "font-display italic text-2xl md:text-3xl tracking-wide",
    categoryStyle === "wide-sans" && "font-display uppercase text-xl md:text-2xl tracking-[0.35em]",
    categoryStyle === "stamp" && "font-mono uppercase text-sm md:text-base tracking-[0.5em] border-y border-foreground py-2",
  );

  return (
    <div className="min-h-screen bg-background bg-grid">
      {announcement && (
        <div className="bg-foreground text-background text-center text-[10px] tracking-[0.25em] uppercase py-2 px-4 font-semibold">
          {announcement}
        </div>
      )}

      <Header />
      <HeroLookbook />

      <div className="pt-10 pb-2">
        <QuickFilters active={filter} onChange={setFilter} />
      </div>

      <div className="flex flex-col gap-14 pb-16 pt-6">
        {categories.map((category) => {
          const categoryProducts = filtered.filter((p) => p.category === category);
          if (categoryProducts.length === 0) return null;

          return (
            <section key={category} className="mx-auto w-full max-w-7xl px-5 md:px-8">
              <div className="mb-8 flex items-center gap-6">
                <span className="hidden md:block h-px w-16 bg-[color:var(--gold)]" />
                <h2 className={categoryClass}>{category}</h2>
                <div className="h-[1px] flex-1 bg-black/10" />
                <span className="text-[10px] font-mono tracking-[0.3em] text-black/40">
                  {String(categoryProducts.length).padStart(2, "0")} PEÇAS
                </span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categoryProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <LookbookLoop />
      <Footer />
    </div>
  );
}
