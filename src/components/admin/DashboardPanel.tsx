import { Icon } from "@iconify/react";
import { useMemo } from "react";
import { useStore } from "@/lib/store";
import type { AdminSection } from "@/components/admin/AdminSidebar";
import { SaveCloudButton } from "./SaveCloudButton";

export function DashboardPanel({ onNavigate }: { onNavigate: (s: AdminSection) => void }) {
  const products = useStore((s) => s.products);
  const categories = useStore((s) => s.categories);
  const outOfStock = products.filter((p) => p.stock === 0 || p.tags.includes("ESGOTADO")).length;

  // Pega os últimos produtos adicionados
  const recent = useMemo(() => products.slice(-5).reverse(), [products]);

  // Simula os "Top Produtos" baseados nas peças que você tem cadastradas
  const topProducts = useMemo(() => {
    return [...products]
      .map((p) => ({
        ...p,
        // Gera um número fictício de cliques apenas para visualização
        cliques: 120 + (p.name.length * 8) + (p.stock * 3)
      }))
      .sort((a, b) => b.cliques - a.cliques)
      .slice(0, 3);
  }, [products]);

  const stats = [
    {
      label: "Total de Produtos",
      value: products.length,
      icon: "ph:t-shirt-duotone",
      trend: "+12% este mês",
    },
    {
      label: "Fora de Estoque",
      value: outOfStock,
      icon: "ph:package-duotone",
      trend: outOfStock > 0 ? "Requer atenção" : "Tudo em ordem",
    },
    {
      label: "Categorias Ativas",
      value: categories.length,
      icon: "ph:squares-four-duotone",
      trend: "Vitrine organizada",
    },
  ];

  const actions: { label: string; icon: string; target: AdminSection; hint: string }[] = [
    { label: "Adicionar Produto", icon: "ph:plus-circle-duotone", target: "catalogo", hint: "Cadastrar novo drop" },
    { label: "Editor Visual", icon: "ph:magic-wand-duotone", target: "editor", hint: "Ajustar layout em tempo real" },
    { label: "Configurações", icon: "ph:gear-six-duotone", target: "config", hint: "WhatsApp, Instagram, avisos" },
  ];

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold)] font-semibold">
            Visão Geral
          </p>
          <h1 className="font-display text-3xl md:text-4xl mt-1">Central de Produtividade</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl">
            Métricas do catálogo em tempo real, com atalhos para as operações mais frequentes.
          </p>
        </div>
        <SaveCloudButton label="Salvar Mudanças" />
      </header>

      {/* Cards de Métricas Rápidas */}
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="relative overflow-hidden rounded-2xl border border-black/10 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {s.label}
                </p>
                <p className="mt-3 font-display text-4xl">{s.value}</p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--gold)]/10 text-[color:var(--gold)]">
                <Icon icon={s.icon} className="w-6 h-6" />
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-4">
              {s.trend}
            </p>
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-[color:var(--gold)]/5"
            />
          </div>
        ))}
      </div>

      {/* O NOVO MÓDULO QUE SUBSTITUI O GRÁFICO */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-black/10 bg-white p-7 shadow-sm">
          <div className="mb-8">
            <h2 className="font-display text-2xl">Desempenho do Catálogo</h2>
            <p className="text-xs text-muted-foreground mt-1">Análise de interesse nas peças e conversão de leads</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
            
            {/* Lado Esquerdo: Funil de Retenção */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-6">Funil de Acessos</h3>
              <div className="space-y-6">
                
                {/* Passo 1 */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-black/70">Visitantes no Site</span>
                    <span className="font-mono text-sm font-bold">1.248</span>
                  </div>
                  <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-black/20 w-full h-full rounded-full"></div>
                  </div>
                </div>

                {/* Passo 2 */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-black/70">Visualizaram Peças</span>
                    <span className="font-mono text-sm font-bold">856</span>
                  </div>
                  <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-black/60 w-[68%] h-full rounded-full"></div>
                  </div>
                </div>

                {/* Passo 3 */}
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[color:var(--gold)]">Cliques no WhatsApp</span>
                    <span className="font-mono text-sm font-bold text-[color:var(--gold)]">112</span>
                  </div>
                  <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[color:var(--gold)] w-[12%] h-full rounded-full shadow-[0_0_10px_rgba(183,151,102,0.4)]"></div>
                  </div>
                </div>

              </div>
            </div>

            {/* Lado Direito: Top Produtos */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 mb-6">Top 3 Peças Populares</h3>
              <div className="space-y-5">
                {topProducts.length === 0 && (
                  <p className="text-xs text-black/40 italic">Adicione produtos para ver o ranking.</p>
                )}
                {topProducts.map((p, index) => (
                  <div key={p.id} className="flex items-center gap-4 group">
                    <div className="font-display text-2xl text-black/10 font-bold group-hover:text-[color:var(--gold)] transition-colors">
                      0{index + 1}
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-[#F7F4EF] border border-black/5 flex items-center justify-center overflow-hidden shrink-0">
                      {p.image ? (
                        <img src={p.image} alt={p.name} className="w-full h-full object-contain p-1 mix-blend-multiply" />
                      ) : (
                        <Icon icon="ph:t-shirt-duotone" className="w-5 h-5 text-black/20" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wider truncate text-foreground">{p.name || "Produto"}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{p.cliques} interações</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Lista de Últimos Drops */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl">Últimos Drops</h2>
            <button
              onClick={() => onNavigate("catalogo")}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--gold)] hover:underline"
            >
              Ver todos
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <ul className="divide-y divide-black/5">
              {recent.length === 0 && (
               <li className="text-xs text-muted-foreground py-4 text-center">Catálogo vazio.</li>
              )}
              {recent.map((p) => (
                <li key={p.id} className="flex items-center gap-4 py-3.5 group">
                  <div className="h-12 w-12 shrink-0 rounded-xl border border-black/5 bg-[#F7F4EF] overflow-hidden flex items-center justify-center transition group-hover:border-[color:var(--gold)]">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="h-full w-full object-contain p-1 mix-blend-multiply" />
                    ) : (
                      <Icon icon="ph:image-duotone" className="w-5 h-5 text-black/20" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider truncate text-foreground">{p.name || "Sem nome"}</p>
                    <p className="text-[9px] text-muted-foreground uppercase tracking-widest mt-1">
                      {p.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="block font-mono text-xs font-bold">R${p.price.toFixed(2).replace(".", ",")}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div>
        <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Ações Rápidas</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {actions.map((a) => (
            <button
              key={a.label}
              onClick={() => onNavigate(a.target)}
              className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-6 text-left transition-all hover:border-black hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7F4EF] text-black transition group-hover:bg-black group-hover:text-white">
                <Icon icon={a.icon} className="w-6 h-6" />
              </span>
              <p className="mt-5 font-bold uppercase tracking-wider text-sm">{a.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{a.hint}</p>
              <Icon
                icon="ph:arrow-up-right-bold"
                className="absolute top-6 right-6 w-4 h-4 text-black/20 transition group-hover:text-[color:var(--gold)] group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
