import { Icon } from "@iconify/react";
import { useStore, store } from "@/lib/store";

export function SettingsPanel() {
  const settings = useStore((s) => s.settings);

  return (
    <div className="space-y-6 max-w-2xl">
      <header>
        <h1 className="font-display text-2xl md:text-3xl">Configurações Globais</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Variáveis usadas em todo o site. Alterações refletem instantaneamente no preview.
        </p>
      </header>

      <div className="rounded-2xl border border-black/10 bg-white p-6 space-y-5">
        <Field
          label="Número do WhatsApp"
          icon="ri:whatsapp-line"
          hint="Somente números com DDI. Ex: 5511932212697"
          value={settings.whatsappNumber}
          onChange={(v) => store.setSettings({ whatsappNumber: v })}
        />

        <div>
          <FieldLabel icon="ph:chat-teardrop-text-duotone" label="Mensagem Padrão do WhatsApp" />
          <p className="text-[11px] text-muted-foreground mb-2">
            Use <code className="px-1 rounded bg-black/5">{"{product}"}</code> para inserir o nome do produto.
          </p>
          <textarea
            value={settings.whatsappMessage}
            onChange={(e) => store.setSettings({ whatsappMessage: e.target.value })}
            rows={3}
            className="w-full rounded-xl border border-black/15 p-3 text-sm focus:border-foreground outline-none resize-none"
          />
        </div>

        <Field
          label="URL do Instagram"
          icon="ri:instagram-line"
          value={settings.instagramUrl}
          onChange={(v) => store.setSettings({ instagramUrl: v })}
        />

        <Field
          label="Anúncio do Topo"
          icon="ph:megaphone-duotone"
          hint="Faixa exibida acima do cabeçalho. Deixe vazio para ocultar."
          value={settings.announcement}
          onChange={(v) => store.setSettings({ announcement: v })}
        />

        <Field
          label="Título do Hero"
          icon="ph:text-aa-duotone"
          value={settings.heroTitle}
          onChange={(v) => store.setSettings({ heroTitle: v })}
        />
      </div>

      <p className="text-xs text-muted-foreground flex items-center gap-2">
        <Icon icon="ph:check-circle-duotone" className="w-4 h-4 text-emerald-600" />
        Salvo automaticamente no dispositivo.
      </p>
    </div>
  );
}

function FieldLabel({ label, icon }: { label: string; icon: string }) {
  return (
    <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-foreground/70 mb-2">
      <Icon icon={icon} className="w-3.5 h-3.5 text-[color:var(--gold)]" />
      {label}
    </label>
  );
}

function Field({
  label,
  icon,
  value,
  onChange,
  hint,
}: {
  label: string;
  icon: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <div>
      <FieldLabel label={label} icon={icon} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-black/15 p-3 text-sm focus:border-foreground outline-none"
      />
      {hint && <p className="text-[11px] text-muted-foreground mt-1.5">{hint}</p>}
    </div>
  );
}
