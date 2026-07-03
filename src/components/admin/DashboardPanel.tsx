import { Icon } from "@iconify/react";
import { useMemo } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useStore } from "@/lib/store";
import type { AdminSection } from "@/components/admin/AdminSidebar";

const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

// Tooltip Personalizado e Premium para mostrar a Conversão
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const acessos = payload[0]?.value || 0;
    const whatsapp = payload[1]?.value || 0;
    const taxa = acessos > 0 ? ((whatsapp / acessos) * 100).toFixed(1) : "0.0";

    return (
      <div className="bg-white border border-black/10 p-4 rounded-2xl shadow-xl min-w-[160px]">
        <p className="font-bold text-[10px] uppercase tracking-widest text-black/40 mb-3">{label}</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-6">
            <span className="text-xs text-black/60 flex items-center gap-2">
              <div className="w-2 h-2 rounded-sm bg-neutral-200"></div>
              Acessos
            </span>
            <span className="font-mono font-bold text-black">{acessos}</span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="text-xs text-[color:var(--gold)] font-bold flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[color:var(--gold)]"></div>
              WhatsApp
            </span>
            <span className="font-mono font-bold text-[color:var(--gold)]">{whatsapp}</span>
          </div>
          <div className="h-[1px] w-full bg-black/5 my-2" />
          <div className="flex items-center justify-between gap-6">
            <span className="text-[10px] text-black/40 uppercase tracking-widest">Conversão</span>
            <span className="font-mono text-xs font-bold text-black">{taxa}%</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function DashboardPanel({ onNavigate }: { onNavigate: (s: AdminSection) => void }) {
  const products = useStore((s) => s.products);
  const categories = useStore((s) => s.categories);
  const outOfStock = products.filter((p) => p.stock === 0 || p.tags.includes("ESGOTADO")).length;

  const chartData = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 12 }).map((_, i) => {
      const month = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
      const baseAcessos = 1200 + Math.sin((i / 12) * Math.PI * 2) * 500;
      const noise = ((i * 37) % 200) - 100;
      const acessos = Math.max(300, Math.round(baseAcessos + noise));
      
      const conversionRate = 0.08 + (((i * 13) % 7) / 100);
      const whatsapp = Math.round(acessos * conversionRate);
      
      return { name: MONTHS[month.getMonth()], acessos, whatsapp };
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
    <div className="space-y-8 pb-20">
      <header>
        <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--gold)] font-semibold">
          Visão Geral
        </p>
        <h1 className="font-display text-3xl md:text-4xl mt-1">Central de Produtividade</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-xl">
          Métricas do catálogo em tempo real, com atalhos para as operações mais frequentes.
        </p>
      </header>

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

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-xl">Engajamento & Leads</h2>
              <p className="text-xs text-muted-foreground mt-1">Acessos ao catálogo vs. Contatos via WhatsApp</p>
            </div>
            <div className="hidden sm:flex items-center gap-5 text-[10px] uppercase tracking-[0.2em] font-bold">
              <span className="flex items-center gap-2 text-black/40">
                <span className="h-2.5 w-2.5 rounded-sm bg-neutral-200" /> Acessos
              </span>
              <span className="flex items-center gap-2 text-[color:var(--gold)]">
                <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--gold)]" /> WhatsApp
              </span>
            </div>
          </div>
          
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
                
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10, fill: "#a3a3a3", fontWeight: 600 }} 
                  axisLine={false} 
                  tickLine={false} 
                  dy={10} 
                />
                
                {/* Eixo Esquerdo (Acessos) */}
                <YAxis 
                  yAxisId="left" 
                  tick={{ fontSize: 10, fill: "#a3a3a3", fontWeight: 600 }} 
                  axisLine={false} 
                  tickLine={false} 
                  dx={-10}
                />
                
                {/* Eixo Direito Invisível (WhatsApp) - Permite que a linha escale livremente */}
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  hide={true} 
                />
                
                <Tooltip 
                  content={<CustomTooltip />} 
                  cursor={{ fill: 'rgba(0,0,0,0.03)' }} 
                />
                
                {/* Barras Minimalistas ao fundo */}
                <Bar 
                  yAxisId="left" 
                  dataKey="acessos" 
                  fill="#f2f2f2" 
                  radius={[6, 6, 0, 0]} 
                  maxBarSize={45} 
                />
                
                {/* Linha Dourada em destaque na frente */}
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="whatsapp" 
                  stroke="var(--gold, #B79766)" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "#fff", stroke: "var(--gold, #B79766)", strokeWidth: 2 }} 
                  activeDot={{ r: 6, fill: "var(--gold, #B79766)", stroke: "#fff", strokeWidth: 2 }} 
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

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
                  <div className="h-14 w-14 shrink-0 rounded-xl border border-black/5 bg-[#F7F4EF] overflow-hidden flex items-center justify-center transition group-hover:border-[color:var(--gold)]">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="h-full w-full object-contain p-2 mix-blend-multiply" />
                    ) : (
                      <Icon icon="ph:t-shirt-duotone" className="w-6 h-6 text-black/20" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider truncate text-foreground">{p.name || "Sem nome"}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                      {p.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="block font-mono text-xs font-bold">R${p.price.toFixed(2).replace(".", ",")}</span>
                    <span className="block text-[9px] uppercase tracking-widest text-black/40 mt-1">Estoque: {p.stock}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

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
