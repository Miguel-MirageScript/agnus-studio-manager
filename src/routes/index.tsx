import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/public/Header";
import { HeroLookbook } from "@/components/public/HeroLookbook";
import { ProductCard } from "@/components/public/ProductCard";
import { QuickFilters, type FilterKey } from "@/components/public/QuickFilters";
import { LookbookLoop } from "@/components/public/LookbookLoop";
import { Footer } from "@/components/public/Footer";
import { CategoryHeading } from "@/components/public/CategoryHeading";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [filter, setFilter] = useState<FilterKey>("todos");

  const products = useStore((s) => s.products);
  const categories = useStore((s) => s.categories);
  const announcement = useStore((s) => s.settings.announcement);

  const filtered = useMemo(
    () => (filter === "todos" ? products : products.filter((p) => p.filters.includes(filter as any))),
    [filter, products],
  );

  // Deep-link do WhatsApp: rola até a peça e destaca com um "foco" dourado
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const p = params.get("p");
    if (!p) return;
    const t = setTimeout(() => {
      const el = document.getElementById(`p-${p}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("ring-4", "ring-[color:var(--gold)]", "ring-offset-4", "transition-all", "duration-500");
        setTimeout(() => el.classList.remove("ring-4", "ring-[color:var(--gold)]", "ring-offset-4"), 4000);
      }
    }, 400);
    return () => clearTimeout(t);
  }, [products]);

  return (
    <div className="min-h-screen bg-background bg-grid">
      {announcement && (
        <div className="bg-foreground text-background text-center text-[10px] tracking-[0.25em] uppercase py-2.5 px-4 font-bold shadow-md relative z-20">
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
                <CategoryHeading name={category} />
                <div className="h-[1px] flex-1 bg-black/10" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 whitespace-nowrap">
                  {String(categoryProducts.length).padStart(2, "0")} PEÇAS
                </span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
