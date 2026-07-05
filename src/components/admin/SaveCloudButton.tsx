import { Icon } from "@iconify/react";
import { saveSettingsNow, useSaveStatus } from "@/lib/store";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  label?: string;
  compact?: boolean;
}

export function SaveCloudButton({ className, label = "Salvar Mudanças", compact }: Props) {
  const status = useSaveStatus();
  const saving = status === "saving";
  const saved = status === "saved";
  const error = status === "error";

  const onClick = async () => {
    try {
      await saveSettingsNow();
    } catch {
      /* status already reflected */
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={saving}
      className={cn(
        "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] transition-all shadow-lg",
        saved
          ? "bg-emerald-600 text-white"
          : error
          ? "bg-red-600 text-white"
          : "bg-foreground text-background hover:bg-[color:var(--gold)] hover:text-foreground",
        saving && "opacity-70 cursor-wait",
        compact && "px-3 py-2 text-[9px]",
        className,
      )}
    >
      {saving ? (
        <Icon icon="ph:circle-notch-bold" className="w-4 h-4 animate-spin" />
      ) : saved ? (
        <Icon icon="ph:cloud-check-duotone" className="w-4 h-4" />
      ) : error ? (
        <Icon icon="ph:cloud-warning-duotone" className="w-4 h-4" />
      ) : (
        <Icon icon="ph:cloud-arrow-up-duotone" className="w-4 h-4" />
      )}
      {saving ? "Salvando..." : saved ? "Salvo na Nuvem" : error ? "Erro — Tentar de novo" : label}
    </button>
  );
}
