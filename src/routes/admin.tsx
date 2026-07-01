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

  // Verifica se a sessão já existe para evitar re-trabalho
  useEffect(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("agnus_admin_session");
      if (session) {
        window.location.href = "/admin/panel";
      }
    }
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr("");

    const cleanEmail = user.trim().toLowerCase();
    const cleanPassword = pass;

    // CREDENCIAIS FIXAS DE SEGURANÇA (Bypass local definitivo contra falhas de split de rotas)
    if (cleanEmail === "suport.agnus@gmail.com" && cleanPassword === "miguel05109321") {
      localStorage.setItem("agnus_admin_session", "bypass_active_session");
      window.location.href = "/admin/panel";
      return;
    }

    // Ofuscação Base64 para proteção contra o modo inspecionar
    const obfuscatedUrl = "aHR0cHM6Ly9qeXBteGZoYXhjbml6dGtzd3VlYi5zdXBhYmFzZS5jbw==";
    const obfuscatedKey = "ZXlKaGJHY2lPaUpTVXpJMU5pSXNJbkI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKemRYQmZZbUZ6WlNJc0luSmxaaUk2SW1wNWNHMTRabWhoZUdOdWFYWjBhM04zZFdWbklpd2ljbTlzWlNJNkltRnViMjRpTENCcFlYUWlPakUzT0RJNU1URXlNVXNfSW1WNTRDSWpMakE1T0RRNE5qRXhmUS56SHR0bVMwUTFNMnFJeE1oc09qbGY3eE5EU2N3cExmV1YwQkdWdHF1M25F";

    try {
      const response = await fetch(`${atob(obfuscatedUrl)}/auth/v1/token?grant_type=password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": atob(obfuscatedKey),
          "Authorization": `Bearer ${atob(obfuscatedKey)}`
        },
        body: JSON.stringify({
          email: cleanEmail,
          password: cleanPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.access_token) {
        localStorage.setItem("agnus_admin_session", data.access_token);
        window.location.href = "/admin/panel";
        return;
      }

      setErr("Acesso negado. Credenciais inválidas.");
    } catch (catchErr) {
      setErr("Erro de comunicação com a base de dados.");
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
          
          {err && (
            <p className="text-xs text-red-600 mb-3 bg-red-50 border border-red-200 p-2 rounded">
              {err}
            </p>
          )}
          
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
