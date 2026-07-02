import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Header } from "@/components/public/Header";
import { HeroLookbook } from "@/components/public/HeroLookbook";
import { ProductCard } from "@/components/public/ProductCard";
import { QuickFilters, type FilterKey } from "@/components/public/QuickFilters";
import { LookbookLoop } from "@/components/public/LookbookLoop";
import { Footer } from "@/components/public/Footer";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const [filter, setFilter] = useState<FilterKey>("todos");
  
  // Puxamos os produtos, as categorias e o aviso do topo
  const products = useStore((s) => s.products);
  const categories = useStore((s) => s.categories);
  const announcement = useStore((s) => s.settings.announcement);

  // Aplica os filtros rápidos (ex: Novidades, Promoção)
  const filtered = useMemo(
    () => (filter === "todos" ? products : products.filter((p) => p.filters.includes(filter as any))),
    [filter, products],
  );

  return (
    <div className="min-h-screen bg-background bg-grid">
      {/* Faixa de Anúncio no Topo */}
      {announcement && (
        <div className="bg-foreground text-background text-center text-[10px] tracking-[0.25em] uppercase py-2 px-4 font-semibold">
          {announcement}
        </div>
      )}
      
      <Header />
      <HeroLookbook />
      
      {/* Filtros realocados para o topo do catálogo */}
      <div className="pt-10 pb-2">
        <QuickFilters active={filter} onChange={setFilter} />
      </div>

      {/* Catálogo fatiado dinamicamente por Categorias */}
      <div className="flex flex-col gap-12 pb-16 pt-6">
        {categories.map((category) => {
          // Pega apenas os produtos que pertencem a esta categoria específica
          const categoryProducts = filtered.filter((p) => p.category === category);

          // Se a categoria não tem nenhum produto (ou nenhum que passe no filtro), não renderiza nada
          if (categoryProducts.length === 0) return null;

          return (
            <section key={category} className="mx-auto w-full max-w-7xl px-5 md:px-8">
              {/* Título da Categoria com linha de design */}
              <div className="mb-8 flex items-center gap-4">
                <h2 className="font-display text-xl md:text-2xl uppercase tracking-[0.15em] text-foreground">
                  {category}
                </h2>
                <div className="h-[1px] flex-1 bg-black/10"></div>
              </div>

              {/* Grid de Produtos exclusivos desta categoria */}
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
