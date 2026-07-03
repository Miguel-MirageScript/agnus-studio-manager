import { Icon } from "@iconify/react";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useStore } from "@/lib/store";
import type { AdminSection } from "@/components/admin/AdminSidebar";

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export function DashboardPanel({ onNavigate }: { onNavigate: (s: AdminSection) => void }) {
  const products = useStore((s) => s.products);
  const categories = useStore((s) => s.categories);
  const outOfStock = products.filter((p) => p.stock === 0 || p.tags.includes("ESGOTADO")).length;

  const chartData = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 12 }).map((_, i) => {
      const month = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
      // pseudo-deterministic pretty curve
      const base = 320 + Math.sin((i / 12) * Math.PI * 2) * 140;
      const noise = ((i * 37) % 60) - 30;
      const sales = Math.max(60, Math.round(base + noise));
      const views = sales * 7 + ((i * 53) % 200);
      return { name: MONTHS[month.getMonth()], visualizações: views, vendas: sales };
    });
  }, []);

  const recent = useMemo(() => products.slice(-5).reverse(), [products]);

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
    <div className="space-y-8">
      <header>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold)] font-semibold">
          Visão Geral
        </p>
        <h1 className="font-display text-3xl md:text-4xl mt-1">Central de Produtividade</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-xl">
          Métricas do catálogo AGNUS.1993 em tempo real, com atalhos para as operações mais frequentes.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="relative overflow-hidden rounded-2xl border border-black/10 bg-white p-5"
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

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-black/10 bg-white p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-xl">Visualizações & Vendas</h2>
              <p className="text-xs text-muted-foreground">Últimos 12 meses (dados simulados)</p>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-[10px] uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2 text-foreground/70">
                <span className="h-2 w-2 rounded-full bg-foreground" /> Views
              </span>
              <span className="flex items-center gap-2 text-foreground/70">
                <span className="h-2 w-2 rounded-full bg-[color:var(--gold)]" /> Vendas
              </span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 4, right: 8, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="gViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0a0a0a" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#0a0a0a" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#B79766" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="#B79766" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#6b6b6b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#6b6b6b" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "white",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="visualizações"
                  stroke="#0a0a0a"
                  strokeWidth={2}
                  fill="url(#gViews)"
                />
                <Area
                  type="monotone"
                  dataKey="vendas"
                  stroke="#B79766"
                  strokeWidth={2}
                  fill="url(#gSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl">Produtos Recentes</h2>
            <button
              onClick={() => onNavigate("catalogo")}
              className="text-[10px] uppercase tracking-[0.2em] text-[color:var(--gold)] hover:underline"
            >
              Ver todos
            </button>
          </div>
          <ul className="divide-y divide-black/5">
            {recent.length === 0 && (
              <li className="text-xs text-muted-foreground py-4">Nenhum produto ainda.</li>
            )}
            {recent.map((p) => (
              <li key={p.id} className="flex items-center gap-3 py-3">
                <div className="h-12 w-12 shrink-0 rounded-lg bg-neutral-100 overflow-hidden flex items-center justify-center">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="h-full w-full object-contain mix-blend-multiply" />
                  ) : (
                    <Icon icon="ph:image-duotone" className="w-5 h-5 text-black/30" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-wider truncate">{p.name || "Sem nome"}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {p.category} · Estoque {p.stock}
                  </p>
                </div>
                <span className="font-mono text-xs">R${p.price.toFixed(2).replace(".", ",")}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Ações Rápidas</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {actions.map((a) => (
            <button
              key={a.label}
              onClick={() => onNavigate(a.target)}
              className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-5 text-left transition hover:border-foreground hover:shadow-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition group-hover:bg-[color:var(--gold)]">
                <Icon icon={a.icon} className="w-5 h-5" />
              </span>
              <p className="mt-4 font-semibold">{a.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{a.hint}</p>
              <Icon
                icon="ph:arrow-up-right"
                className="absolute top-4 right-4 w-4 h-4 text-muted-foreground group-hover:text-[color:var(--gold)]"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
