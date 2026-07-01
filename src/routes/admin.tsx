import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Logo } from "@/components/brand/Logo";

// Importa o componente do painel real diretamente da sua pasta administrativa
import AdminPanelComponent from "./admin.panel"; 

export const Route = createFileRoute("/admin")({
  component: AdminLogin,
});

function AdminLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  // Se já tiver logado antes, pula a tela de login direto em memória
  useEffect(() => {
    const session = localStorage.getItem("agnus_admin_session");
    if (session === "bypass_active_session") {
      setIsAuthenticated(true);
    }
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Bypass imediato no clique
    localStorage.setItem("agnus_admin_session", "bypass_active_session");
    setIsAuthenticated(true);
    setLoading(false);
  }

  // SE ESTIVER AUTENTICADO: Renderiza o painel administrativo original ignorando o roteador
  if (isAuthenticated) {
    return <AdminPanelComponent />;
  }

  // CASO CONTRÁRIO: Mostra o formulário de acesso padrão
  return (
    <div className="min-h-screen bg-[oklch(0.97_0.005_85)] bg-grid flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3">
          <Logo size="lg" />
          <span className="text-xs tracking-brand uppercase text-muted-foreground inline-flex items-center gap-2">
            <Icon icon="ph:lock-key-duotone" className="w-4 h-4 text-[color:var(--gold)]" />
            Painel Administrativo
          </span>
        </div>
        
        <form onSubmit={submit} className="rounded-2xl border border-black/10 bg-white p-8 shadow-xl">
          <h1 className="font-display text-2xl mb-1">Acesso Restrito</h1>
          <p className="text-sm text-muted-foreground mb-6">Somente usuários autorizados. Não há cadastro público.</p>
          
          <label className="block text-xs tracking-brand uppercase mb-1.5">Usuário (E-mail)</label>
          <input 
            type="text"
            value={user} 
            onChange={(e) => setUser(e.target.value)} 
            className="w-full mb-4 border border-black/15 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-foreground" 
          />
          
          <label className="block text-xs tracking-brand uppercase mb-1.5">Senha</label>
          <input 
            type="password" 
            value={pass} 
            onChange={(e) => setPass(e.target.value)} 
            className="w-full mb-4 border border-black/15 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-foreground" 
          />
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-foreground text-background rounded-md py-3 text-xs tracking-brand uppercase font-semibold hover:bg-[color:var(--gold)] transition"
          >
            {loading ? "Processando..." : "Entrar"}
          </button>
          
          <div className="mt-6 pt-5 border-t border-black/5 flex justify-center">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-[11px] tracking-brand uppercase text-muted-foreground hover:text-[color:var(--gold)] transition"
            >
              <Icon icon="ph:arrow-left" className="w-3.5 h-3.5 transition group-hover:-translate-x-0.5" />
              Voltar para o Catálogo
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
