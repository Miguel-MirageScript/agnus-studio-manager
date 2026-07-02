import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, Component, type ReactNode } from "react";
import { Icon } from "@iconify/react";
import { AdminSidebar, type AdminSection } from "@/components/admin/AdminSidebar";
import { VisualEditor } from "@/components/admin/VisualEditor";
import { ProductManager } from "@/components/admin/ProductManager";
import { DashboardPanel } from "@/components/admin/DashboardPanel";
import { SettingsPanel } from "@/components/admin/SettingsPanel";

export const Route = createFileRoute("/admin/panel")({
  component: AdminPanel,
});

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error: string }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: "" };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error: error?.message || "Erro desconhecido" };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50/50 border border-red-200 rounded-xl p-6 m-2">
          <div className="flex items-center gap-2 text-red-600 font-bold mb-2">
            <Icon icon="ph:warning-duotone" className="w-5 h-5" />
            Falha no Módulo Interno
          </div>
          <p className="text-xs font-mono text-red-600 bg-red-100 p-3 rounded-md overflow-x-auto">
            {this.state.error}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

function AdminPanel() {
  const nav = useNavigate();
  const [section, setSection] = useState<AdminSection>("visao");
  const [editorFullscreen, setEditorFullscreen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
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

  function handleSectionChange(s: AdminSection) {
    setSection(s);
    if (s === "editor") setEditorFullscreen(true);
  }

  if (!ready) return null;

  if (editorFullscreen) {
    return (
      <ErrorBoundary>
        <VisualEditor onExit={() => setEditorFullscreen(false)} />
      </ErrorBoundary>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4EF] bg-grid">
      <div className="mx-auto flex max-w-[1400px]">
        <AdminSidebar active={section} onChange={handleSectionChange} onLogout={handleSignOut} />
        <main className="flex-1 min-w-0 p-5 md:p-8">
          <div className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Icon icon="ph:lock-key-duotone" className="w-4 h-4 text-[color:var(--gold)]" />
            <span className="tracking-brand uppercase">Painel Administrativo Oculto</span>
          </div>

          <ErrorBoundary key={section}>
            {section === "visao" && <DashboardPanel onNavigate={handleSectionChange} />}
            {section === "catalogo" && <ProductManager />}
            {section === "config" && <SettingsPanel />}
            {section === "editor" && (
              <button
                onClick={() => setEditorFullscreen(true)}
                className="rounded-2xl border border-dashed border-black/20 bg-white p-8 w-full text-left hover:border-foreground"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background">
                    <Icon icon="ph:magic-wand-duotone" className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="font-semibold">Abrir Editor Visual em Tela Cheia</p>
                    <p className="text-xs text-muted-foreground">Toque em qualquer seção do site para editar.</p>
                  </div>
                </div>
              </button>
            )}
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}
