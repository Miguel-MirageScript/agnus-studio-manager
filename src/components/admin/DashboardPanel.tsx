import { Icon } from "@iconify/react";
import { useStore } from "@/lib/store";
import type { AdminSection } from "@/components/admin/AdminSidebar";

export function DashboardPanel({ onNavigate }: { onNavigate: (s: AdminSection) => void }) {
  const products = useStore((s) => s.products);
  const categories = useStore((s) => s.categories);
  const outOfStock = products.filter((p) => p.stock === 0 || p.tags.includes("ESGOTADO")).length;

  const stats = [
    { label: "Total de Produtos", value: products.length, icon: "ph:t-shirt-duotone" },
    { label: "Fora de Estoque", value: outOfStock, icon: "ph:package-duotone" },
    { label: "Categorias Ativas", value: categories.length, icon: "ph:squares-four-duotone" },
  ];

  const actions: { label: string; icon: string; target: AdminSection; hint: string }[] = [
    { label: "Adicionar Produto", icon: "ph:plus-circle-duotone", target: "catalogo", hint: "Cadastrar novo drop" },
    { label: "Editar Visual do Site", icon: "ph:magic-wand-duotone", target: "editor", hint: "Modo tela cheia" },
    { label: "Gerenciar Configurações", icon: "ph:gear-six-duotone", target: "config", hint: "WhatsApp, Instagram, avisos" },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-2xl md:text-3xl">Central de Produtividade</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Visão rápida do catálogo AGNUS.93 e atalhos para as principais operações.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-black/10 bg-white p-5 flex items-start justify-between"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{s.label}</p>
              <p className="mt-3 font-display text-4xl">{s.value}</p>
            </div>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--gold)]/10 text-[color:var(--gold)]">
              <Icon icon={s.icon} className="w-6 h-6" />
            </span>
          </div>
        ))}
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
