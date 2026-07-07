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
  
  // 1. Lendo o sinal de carregamento da nuvem (Supabase)
  const isLoaded = useStore((s) => s.isLoaded);

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

  // =============== TELA DE CARREGAMENTO ANIMADA E LUXUOSA ===============
  if (!isLoaded) {
    return (
      <div className="fixed inset-0 z-[100] bg-[#FDFBF7] flex flex-col items-center justify-center transition-opacity duration-1000">
        <div className="flex flex-col items-center gap-8 animate-in fade-in zoom-in-95 duration-1000 ease-out">
          
          {/* Tipografia refinada A G N U S .¹⁹⁹³ */}
          <h1 className="font-display text-2xl md:text-4xl tracking-[0.4em] text-foreground flex items-start drop-shadow-sm">
            A G N U S .
            <sup className="text-[10px] md:text-sm text-[color:var(--gold)] mt-2 md:mt-3 ml-1 font-black tracking-widest">
              1993
            </sup>
          </h1>
          
          {/* Linha de progresso dourada elegante e pulsante */}
          <div className="relative h-[2px] w-32 overflow-hidden bg-black/5 rounded-full">
            <div className="absolute inset-y-0 left-0 w-full bg-[color:var(--gold)] animate-[pulse_1.5s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
          </div>
          
        </div>
      </div>
    );
  }
  // ========================================================================

  return (
    <div className="min-h-screen bg-background bg-grid animate-in fade-in duration-1000">
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
