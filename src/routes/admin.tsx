import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Logo } from "@/components/brand/Logo";

export const Route = createFileRoute("/admin")({
  component: AdminLogin,
});

function AdminLogin() {
  const nav = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("agnus_admin_session");
    if (session) {
      nav({ to: "/admin/panel" });
    }
  }, [nav]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr("");

    // Ajuste estrito de limpeza para evitar espaços invisíveis
    const cleanEmail = user.trim().toLowerCase();
    const cleanPassword = pass;

    const supabaseUrl = "https://jypmxfhaxcniztkswueb.supabase.co";
    const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cG14ZmhheGNuaXp0a3N3dWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NTA5MDQsImV4cCI6MjA2NzEyNjkwNH0.0-p1vH-XU3Y7I5h_g_Z5H_v_X_g_Z_g_Z_g_Z_g_Z_g"; 

    try {
      // Endpoint unificado da API GoTrue do Supabase
      const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseAnonKey,
          "Authorization": `Bearer ${supabaseAnonKey}`
        },
        body: JSON.stringify({
          email: cleanEmail,
          password: cleanPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        // Se falhar, tentamos o endpoint alternativo de signin direto
        const fallbackResponse = await fetch(`${supabaseUrl}/auth/v1/signin/user_password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": supabaseAnonKey,
          },
          body: JSON.stringify({
            email: cleanEmail,
            password: cleanPassword,
          }),
        });
        
        const fallbackData = await fallbackResponse.json();
        
        if (!fallbackResponse.ok || fallbackData.error) {
          setErr("Credenciais inválidas no sistema.");
          return;
        }
        
        if (fallbackData.access_token) {
          localStorage.setItem("agnus_admin_session", fallbackData.access_token);
          nav({ to: "/admin/panel" });
          return;
        }
      }

      if (data.access_token) {
        localStorage.setItem("agnus_admin_session", data.access_token);
        nav({ to: "/admin/panel" });
      }
    } catch (catchErr) {
      setErr("Erro de conexão com o Supabase.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[oklch(0.97_0.005_85)] bg-grid flex items-center justify-center px-4">
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
            type="email"
            value={user} 
            onChange={(e) => setUser(e.target.value)} 
            autoComplete="username"
            placeholder="seu-email@gmail.com"
            disabled={loading}
            className="w-full mb-4 border border-black/15 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-foreground" 
          />
          
          <label className="block text-xs tracking-brand uppercase mb-1.5">Senha</label>
          <input 
            type="password" 
            value={pass} 
            onChange={(e) => setPass(e.target.value)} 
            autoComplete="current-password"
            disabled={loading}
            className="w-full mb-4 border border-black/15 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-foreground" 
          />
          
          {err && <p className="text-xs text-red-600 mb-3">{err}</p>}
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-foreground text-background rounded-md py-3 text-xs tracking-brand uppercase font-semibold hover:bg-[color:var(--gold)] transition disabled:opacity-50"
          >
            {loading ? "Carregando..." : "Entrar"}
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
