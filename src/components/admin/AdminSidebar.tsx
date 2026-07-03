import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";

export type AdminSection = "visao" | "catalogo" | "editor" | "config";

const ITEMS: { key: AdminSection; label: string; icon: string }[] = [
  { key: "visao", label: "Visão Geral", icon: "ph:chart-line-up-duotone" },
  { key: "catalogo", label: "Catálogo de Produtos", icon: "ph:t-shirt-duotone" },
  { key: "editor", label: "Editor Visual do Site", icon: "ph:squares-four-duotone" },
  { key: "config", label: "Configurações", icon: "ph:gear-six-duotone" },
];

export function AdminSidebar({
  active,
  onChange,
  onLogout,
}: {
  active: AdminSection;
  onChange: (s: AdminSection) => void;
  onLogout: () => void;
}) {
  return (
    <aside className="hidden md:flex md:w-64 lg:w-72 shrink-0 flex-col border-r border-black/5 bg-white p-5">
      <div className="mb-8 px-2">
        <Logo size="sm" />
      </div>
      <nav className="flex-1 space-y-1">
        {ITEMS.map((i) => {
          const isActive = active === i.key;
          return (
            <button
              key={i.key}
              onClick={() => onChange(i.key)}
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-foreground text-background shadow-md"
                  : "text-foreground hover:bg-black/5",
              )}
            >
              <Icon
                icon={i.icon}
                className={cn(
                  "w-5 h-5 shrink-0 transition",
                  isActive
                    ? "text-[color:var(--gold)]"
                    : "text-foreground/70 group-hover:text-[color:var(--gold)]",
                )}
              />
              <span className="truncate">{i.label}</span>
              {isActive && (
                <Icon icon="ph:dot-outline-fill" className="ml-auto w-4 h-4 text-[color:var(--gold)]" />
              )}
            </button>
          );
        })}
      </nav>

      <a
        href="/"
        target="_blank"
        rel="noreferrer"
        className="mt-6 flex items-center justify-between gap-2 rounded-xl bg-[color:var(--gold)]/10 border border-[color:var(--gold)]/30 px-3 py-2.5 text-[11px] uppercase tracking-[0.2em] font-semibold text-foreground hover:bg-[color:var(--gold)]/20 transition"
      >
        <span className="flex items-center gap-2">
          <Icon icon="ph:eye-duotone" className="w-4 h-4 text-[color:var(--gold)]" />
          Ver Catálogo
        </span>
        <Icon icon="ph:arrow-up-right-bold" className="w-3.5 h-3.5" />
      </a>

      <button
        onClick={onLogout}
        className="mt-2 flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs uppercase tracking-brand text-muted-foreground hover:text-foreground border border-transparent hover:border-black/10 transition"
      >
        <Icon icon="ph:sign-out" className="w-4 h-4" />
        Sair
      </button>
    </aside>
  );
}
