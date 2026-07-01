import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { AdminSidebar, type AdminSection } from "@/components/admin/AdminSidebar";
import { VisualEditor } from "@/components/admin/VisualEditor";
import { ProductManager } from "@/components/admin/ProductManager";
import { PlaceholderPanel } from "@/components/admin/PlaceholderPanel";
import { isAdmin, signOut } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin/panel")({
  component: AdminPanel,
});

function AdminPanel() {
  const nav = useNavigate();
  const [section, setSection] = useState<AdminSection>("editor");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAdmin()) {
      nav({ to: "/admin" });
    } else {
      setReady(true);
    }
  }, [nav]);

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.005_85)] bg-grid">
      <div className="mx-auto flex max-w-[1400px]">
        <AdminSidebar
          active={section}
          onChange={setSection}
          onLogout={() => { signOut(); nav({ to: "/admin" }); }}
        />
        <main className="flex-1 min-w-0 p-5 md:p-8">
          <div className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Icon icon="ph:lock-key-duotone" className="w-4 h-4 text-[color:var(--gold)]" />
            <span className="tracking-brand uppercase">Painel Administrativo Oculto</span>
          </div>
          {section === "editor" && <VisualEditor />}
          {section === "catalogo" && <ProductManager />}
          {section === "visao" && (
            <PlaceholderPanel
              title="Visão Geral"
              icon="ph:chart-line-up-duotone"
              description="Dashboards de vendas, alcance e performance de coleções da AGNUS.1993."
            />
          )}
          {section === "midia" && (
            <PlaceholderPanel
              title="Biblioteca de Mídia"
              icon="ph:image-square-duotone"
              description="Gerencie imagens, GIFs e vídeos usados no lookbook e nos drops da marca."
            />
          )}
          {section === "config" && (
            <PlaceholderPanel
              title="Configurações"
              icon="ph:gear-six-duotone"
              description="Preferências gerais do painel, integrações e segurança da conta administrativa."
            />
          )}
        </main>
      </div>
    </div>
  );
}
