import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, Component, ReactNode } from "react";
import { Icon } from "@iconify/react";
import { AdminSidebar, type AdminSection } from "@/components/admin/AdminSidebar";
import { VisualEditor } from "@/components/admin/VisualEditor";
import { ProductManager } from "@/components/admin/ProductManager";
import { PlaceholderPanel } from "@/components/admin/PlaceholderPanel";

export const Route = createFileRoute("/admin/panel")({
  component: AdminPanel,
});

// ESCUDO DE PROTEÇÃO: Impede que um erro no banco de dados quebre a tela branca inteira
class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean, error: string}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false, error: "" };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error: error.message || "Erro desconhecido" };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50/50 border border-red-200 rounded-xl p-6 m-2">
          <div className="flex items-center gap-2 text-red-600 font-bold mb-2">
            <Icon icon="ph:warning-duotone" className="w-5 h-5" />
            Falha no Módulo Interno
          </div>
          <p className="text-sm text-red-800 mb-4">
            O painel carregou com sucesso, mas esta aba tentou acessar o banco de dados e falhou (provavelmente por falta das chaves do Supabase na Cloudflare).
          </p>
          <p className="text-xs font-mono text-red-600 bg-red-100 p-3 rounded-md overflow-x-auto">
            Detalhe técnico: {this.state.error}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

function AdminPanel() {
  const nav = useNavigate();
  // Mudamos o padrão para "visao" para garantir que a tela abra sem crashar
  const [section, setSection] = useState<AdminSection>("visao");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Verificação de segurança local e blindada
    const session = localStorage.getItem("agnus_admin_session");
    if (!session) {
      nav({ to: "/admin" });
    } else {
      setReady(true);
    }
  }, [nav]);

  function handleSignOut() {
    localStorage.removeItem("agnus_admin_session");
    nav({ to: "/admin" });
  }

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.005_85)] bg-grid">
      <div className="mx-auto flex max-w-[1400px]">
        <AdminSidebar
          active={section}
          onChange={setSection}
          onLogout={handleSignOut}
        />
        <main className="flex-1 min-w-0 p-5 md:p-8">
          <div className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Icon icon="ph:lock-key-duotone" className="w-4 h-4 text-[color:var(--gold)]" />
            <span className="tracking-brand uppercase">Painel Administrativo Oculto</span>
          </div>
          
          {/* O escudo envolve as abas. Se uma quebrar, o menu continua intacto. */}
          <ErrorBoundary key={section}>
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
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
