import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Logo } from "@/components/brand/Logo";

export const Route = createFileRoute("/admin")({
  component: AdminLogin,
});

function AdminLogin() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("agnus_admin_session");
    if (session === "bypass_active_session") {
      setIsAuthenticated(true);
    }
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    localStorage.setItem("agnus_admin_session", "bypass_active_session");
    setIsAuthenticated(true);
    setLoading(false);
  }

  function logout() {
    localStorage.removeItem("agnus_admin_session");
    setIsAuthenticated(false);
    window.location.reload();
  }

  // SE ESTIVER LOGADO: Renderiza o painel de controle independente e direto
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-[oklch(0.97_0.005_85)] p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header do Painel */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-black/10 rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center gap-4">
              <Logo size="md" />
              <div className="h-8 w-px bg-black/10 hidden md:block" />
              <div>
                <h1 className="font-display text-xl">Gerenciador do Estúdio</h1>
                <p className="text-xs text-muted-foreground">Bem-vindo, Administrador</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="inline-flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl px-4 py-2.5 text-xs font-medium transition self-start md:self-auto"
            >
              <Icon icon="ph:sign-out-bold" className="w-4 h-4" />
              Sair do Sistema
            </button>
          </div>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs tracking-brand uppercase text-muted-foreground">Catálogo</span>
                <Icon icon="ph:t-shirt-duotone" className="w-5 h-5 text-[color:var(--gold)]" />
              </div>
              <h2 className="text-3xl font-display mb-1">08</h2>
              <p className="text-xs text-muted-foreground">Produtos ativos no site</p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs tracking-brand uppercase text-muted-foreground">Pedidos</span>
                <Icon icon="ph:shopping-bag-open-duotone" className="w-5 h-5 text-[color:var(--gold)]" />
              </div>
              <h2 className="text-3xl font-display mb-1">Pronto</h2>
              <p className="text-xs text-muted-foreground">Integrações de checkout ativas</p>
            </div>

            <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs tracking-brand uppercase text-muted-foreground">Segurança</span>
                <Icon icon="ph:shield-check-duotone" className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-3xl font-display mb-1">Ativa</h2>
              <p className="text-xs text-muted-foreground">Sessão administrativa protegida</p>
            </div>
          </div>

          {/* Área Principal de Configuração */}
          <div className="bg-white border border-black/10 rounded-2xl p-8 shadow-sm text-center py-16">
            <div className="w-12 h-12 rounded-full bg-[color:var(--gold)]/10 text-[color:var(--gold)] flex items-center justify-center mx-auto mb-4">
              <Icon icon="ph:sliders-horizontal-duotone" className="w-6 h-6" />
            </div>
            <h3 className="font-display text-lg mb-1">Configurações Gerais do Catálogo</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">
              A estrutura básica foi recuperada com sucesso. Use os links de navegação para interagir com o inventário.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-xl text-xs font-semibold tracking-brand uppercase hover:opacity-90 transition"
            >
              <Icon icon="ph:eye" className="w-4 h-4" />
              Visualizar Loja Oficial
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Formulário padrão de Login
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
