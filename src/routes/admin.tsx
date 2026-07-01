import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Logo } from "@/components/brand/Logo";
import { isAdmin, signIn } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin")({
  component: AdminLogin,
});

function AdminLogin() {
  const nav = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (isAdmin()) nav({ to: "/admin/panel" });
  }, [nav]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (signIn(user, pass)) {
      nav({ to: "/admin/panel" });
    } else {
      setErr("Credenciais inválidas.");
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
          <label className="block text-xs tracking-brand uppercase mb-1.5">Usuário</label>
          <input value={user} onChange={(e) => setUser(e.target.value)} autoComplete="username"
            className="w-full mb-4 border border-black/15 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-foreground" />
          <label className="block text-xs tracking-brand uppercase mb-1.5">Senha</label>
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} autoComplete="current-password"
            className="w-full mb-4 border border-black/15 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-foreground" />
          {err && <p className="text-xs text-red-600 mb-3">{err}</p>}
          <button className="w-full bg-foreground text-background rounded-md py-3 text-xs tracking-brand uppercase font-semibold hover:bg-[color:var(--gold)] transition">
            Entrar
          </button>
          <p className="text-[10px] text-muted-foreground mt-4 text-center">
            Demo: <code className="font-mono">admin</code> / <code className="font-mono">agnus1993</code>
          </p>
        </form>
      </div>
    </div>
  );
}
