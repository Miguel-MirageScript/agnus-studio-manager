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
  const products = useStore((s) => s.products);
  const announcement = useStore((s) => s.settings.announcement);
  const filtered = useMemo(
    () => (filter === "todos" ? products : products.filter((p) => p.filters.includes(filter as any))),
    [filter, products],
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
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, 3).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <QuickFilters active={filter} onChange={setFilter} />
      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(3).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <LookbookLoop />
      <Footer />
    </div>
  );
}
