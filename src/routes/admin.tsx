import { createFileRoute, Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Logo } from "@/components/brand/Logo";

export const Route = createFileRoute("/admin")({
  component: AdminGuard,
});

function AdminGuard() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Verifica se a URL atual é a do painel para saber se deve renderizar o filho
  const isPanel = location.pathname.includes("/admin/panel");
  
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [authOk, setAuthOk] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("agnus_admin_session");
    if (token) {
      setAuthOk(true);
      // Se tiver token mas estiver apenas na tela /admin, empurra pro painel internamente
      if (!isPanel) {
        navigate({ to: "/admin/panel" as any, replace: true });
      }
    } else {
      setAuthOk(false);
    }
  }, [isPanel, navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr("");

    const email = user.trim();
    const password = pass;
    const supabaseUrl = "https://jypmxfhaxcniztkswueb.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cG14ZmhheGNuaXp0a3N3dWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MTAxMjEsImV4cCI6MjA5ODQ4NjEyMX0.zHttmS0Q1M2qIxMhsOjlf7xNDScwpLfWV0BGVtqu3nE";

    try {
      const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.access_token) {
        localStorage.setItem("agnus_admin_session", data.access_token);
        setAuthOk(true);
        // Navegação suave do TanStack, sem recarregar a página (acaba com a tela piscando)
        navigate({ to: "/admin/panel" as any });
      } else {
        setErr(data.error_description || "Credenciais recusadas pelo banco de dados.");
      }
    } catch (error) {
      setErr("Falha de conexão com o servidor do Supabase.");
    } finally {
      setLoading(false);
    }
  }

  // A MÁGICA ACONTECE AQUI:
  // Se está autenticado e a URL for do painel, ele renderiza o arquivo admin.panel.tsx através do Outlet!
  if (authOk && isPanel) {
    return <Outlet />;
  }

  // Caso contrário, mostra o formulário normalmente
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
          <p className="text-sm text-muted-foreground mb-6">Autenticação oficial via Supabase.</p>
          
          <label className="block text-xs tracking-brand uppercase mb-1.5">Usuário (E-mail)</label>
          <input 
            type="email"
            value={user} 
            onChange={(e) => setUser(e.target.value)} 
            placeholder="seu-email@gmail.com"
            disabled={loading}
            className="w-full mb-4 border border-black/15 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-foreground" 
          />
          
          <label className="block text-xs tracking-brand uppercase mb-1.5">Senha</label>
          <input 
            type="password" 
            value={pass} 
            onChange={(e) => setPass(e.target.value)} 
            disabled={loading}
            className="w-full mb-4 border border-black/15 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-foreground" 
          />
          
          {err && (
            <p className="text-xs text-red-600 mb-3 bg-red-50 border border-red-200 p-2 rounded">
              {err}
            </p>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-foreground text-background rounded-md py-3 text-xs tracking-brand uppercase font-semibold hover:bg-[color:var(--gold)] transition"
          >
            {loading ? "Autenticando..." : "Entrar"}
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
