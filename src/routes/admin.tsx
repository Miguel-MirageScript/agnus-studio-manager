import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Logo } from "@/components/brand/Logo";

export const Route = createFileRoute("/admin")({
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Função para adicionar logs na tela em tempo real
  const addLog = (message: string) => {
    setDebugLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  useEffect(() => {
    addLog("Componente inicializado. Verificando localStorage...");
    const session = localStorage.getItem("agnus_admin_session");
    if (session) {
      addLog(`Sessão encontrada: "${session}". Tentando redirecionar...`);
      try {
        navigate({ to: "/admin/panel" });
        addLog("Chamada do navigate({ to: '/admin/panel' }) executada.");
      } catch (err: any) {
        addLog(`Erro no redirecionamento automático: ${err?.message || err}`);
      }
    } else {
      addLog("Nenhuma sessão ativa encontrada.");
    }
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    addLog("Botão ENTRAR clicado. Iniciando submit...");

    try {
      addLog("Gravando 'bypass_active_session' no localStorage...");
      localStorage.setItem("agnus_admin_session", "bypass_active_session");
      addLog("localStorage gravado com sucesso.");

      addLog("Disparando navegação para '/admin/panel'...");
      
      // Tentativa oficial pelo roteador
      await navigate({ to: "/admin/panel" });
      addLog("Navegação concluída sem travar no catch.");

    } catch (err: any) {
      addLog(`💥 Erro capturado no submit: ${err?.message || JSON.stringify(err)}`);
    } finally {
      setLoading(false);
    }
  }

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
        
        <form onSubmit={submit} className="rounded-2xl border border-black/10 bg-white p-8 shadow-xl mb-6">
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
        </form>

        {/* PAINEL DE LOGS VISÍVEL DIRETAMENTE NA TELA */}
        <div className="w-full bg-neutral-900 text-green-400 font-mono text-[11px] p-4 rounded-xl shadow-inner max-h-60 overflow-y-auto border border-neutral-800">
          <div className="text-white font-bold border-b border-neutral-700 pb-1 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Console de Diagnóstico de Rota
          </div>
          {debugLogs.length === 0 ? (
            <span className="text-neutral-500">Nenhum log gerado ainda...</span>
          ) : (
            debugLogs.map((log, index) => (
              <div key={index} className="mb-1 whitespace-pre-wrap leading-relaxed">{log}</div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
