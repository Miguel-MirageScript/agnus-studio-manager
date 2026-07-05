import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";
import { useStore, store, saveSettingsNow, useSaveStatus, type FooterLink } from "@/lib/store";
import { SaveCloudButton } from "./SaveCloudButton";

export function SettingsPanel() {
  const settings = useStore((s) => s.settings);
  const [draft, setDraft] = useState(settings);

  // Reset draft when external changes come in and no local diff
  useEffect(() => {
    setDraft(settings);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(settings),
    [draft, settings],
  );

  const save = () => {
    store.setSettings(draft);
  };

  const reset = () => setDraft(settings);

  const setLinks = (links: FooterLink[]) => setDraft({ ...draft, footerLinks: links });

  return (
    <div className="space-y-6 max-w-3xl pb-28">
      <header>
        <h1 className="font-display text-2xl md:text-3xl">Configurações Globais</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Ajuste os campos e clique em <strong>Salvar Modificações</strong> para aplicar.
        </p>
      </header>

      <div className="rounded-2xl border border-black/10 bg-white p-6 space-y-5">
        <Field
          label="Número do WhatsApp"
          icon="ri:whatsapp-line"
          hint="Somente números com DDI. Ex: 5511932212697"
          value={draft.whatsappNumber}
          onChange={(v) => setDraft({ ...draft, whatsappNumber: v })}
        />

        <div>
          <FieldLabel icon="ph:chat-teardrop-text-duotone" label="Mensagem Padrão do WhatsApp" />
          <p className="text-[11px] text-muted-foreground mb-2">
            Use <code className="px-1 rounded bg-black/5">{"{product}"}</code> para o nome e{" "}
            <code className="px-1 rounded bg-black/5">{"{link}"}</code> para o link direto do produto.
          </p>
          <textarea
            value={draft.whatsappMessage}
            onChange={(e) => setDraft({ ...draft, whatsappMessage: e.target.value })}
            rows={3}
            className="w-full rounded-xl border border-black/15 p-3 text-sm focus:border-foreground outline-none resize-none"
          />
        </div>

        <Field
          label="URL do Instagram"
          icon="ri:instagram-line"
          value={draft.instagramUrl}
          onChange={(v) => setDraft({ ...draft, instagramUrl: v })}
        />

        <Field
          label="Anúncio do Topo"
          icon="ph:megaphone-duotone"
          hint="Faixa exibida acima do cabeçalho. Deixe vazio para ocultar."
          value={draft.announcement}
          onChange={(v) => setDraft({ ...draft, announcement: v })}
        />

        <Field
          label="Título do Hero"
          icon="ph:text-aa-duotone"
          value={draft.heroTitle}
          onChange={(v) => setDraft({ ...draft, heroTitle: v })}
        />

        <Field
          label="Nome da Marca (rodapé)"
          icon="ph:copyright-duotone"
          value={draft.brandLine}
          onChange={(v) => setDraft({ ...draft, brandLine: v })}
        />

        <Field
          label="Tagline do Rodapé"
          icon="ph:quotes-duotone"
          value={draft.footerTagline}
          onChange={(v) => setDraft({ ...draft, footerTagline: v })}
        />

        <div>
          <FieldLabel icon="ph:link-duotone" label="Links Rápidos do Rodapé" />
          <div className="space-y-2">
            {draft.footerLinks.map((l, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={l.label}
                  onChange={(e) => {
                    const next = [...draft.footerLinks];
                    next[i] = { ...l, label: e.target.value };
                    setLinks(next);
                  }}
                  placeholder="Rótulo"
                  className="flex-1 rounded-xl border border-black/15 p-2.5 text-sm outline-none focus:border-foreground"
                />
                <input
                  value={l.href}
                  onChange={(e) => {
                    const next = [...draft.footerLinks];
                    next[i] = { ...l, href: e.target.value };
                    setLinks(next);
                  }}
                  placeholder="URL"
                  className="flex-1 rounded-xl border border-black/15 p-2.5 text-sm outline-none focus:border-foreground"
                />
                <button
                  onClick={() => setLinks(draft.footerLinks.filter((_, j) => j !== i))}
                  className="rounded-xl border border-black/10 p-2.5 text-black/40 hover:text-red-600 hover:border-red-200"
                >
                  <Icon icon="ph:trash-bold" className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={() => setLinks([...draft.footerLinks, { label: "Novo Link", href: "#" }])}
              className="text-[11px] font-bold uppercase tracking-widest text-foreground/60 hover:text-foreground inline-flex items-center gap-1"
            >
              <Icon icon="ph:plus-bold" className="w-3.5 h-3.5" /> Adicionar Link
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Save Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:left-72 z-40 border-t border-black/10 bg-white/95 backdrop-blur px-6 py-4 flex items-center justify-end gap-3">
        <span className={`text-xs ${dirty ? "text-amber-600" : "text-muted-foreground"} flex items-center gap-2`}>
          <Icon
            icon={dirty ? "ph:warning-circle-duotone" : "ph:check-circle-duotone"}
            className={`w-4 h-4 ${dirty ? "" : "text-emerald-600"}`}
          />
          {dirty ? "Alterações não salvas" : "Tudo salvo"}
        </span>
        <button
          onClick={reset}
          disabled={!dirty}
          className="px-4 py-2.5 text-[10px] uppercase tracking-widest font-bold text-black/50 hover:text-black rounded-xl disabled:opacity-30 transition"
        >
          Descartar
        </button>
        <button
          onClick={save}
          disabled={!dirty}
          className="rounded-xl bg-foreground text-background px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[color:var(--gold)] hover:text-foreground transition disabled:opacity-30 disabled:hover:bg-foreground disabled:hover:text-background shadow-lg flex items-center gap-2"
        >
          <Icon icon="ph:floppy-disk-duotone" className="w-4 h-4" />
          Salvar Modificações
        </button>
      </div>
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
