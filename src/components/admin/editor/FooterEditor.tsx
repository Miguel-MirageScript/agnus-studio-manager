import { Icon } from "@iconify/react";
import { store, useStore, type FooterLink } from "@/lib/store";
import { FieldLabel, TextField } from "./fields";

export function FooterEditor() {
  const settings = useStore((s) => s.settings);
  return (
    <>
      <TextField
        label="Nome da Marca"
        value={settings.brandLine}
        onChange={(v) => store.setSettings({ brandLine: v })}
      />
      <TextField
        label="Tagline (Subtítulo)"
        value={settings.footerTagline}
        onChange={(v) => store.setSettings({ footerTagline: v })}
      />
      <TextField
        label="URL do Instagram"
        value={settings.instagramUrl}
        onChange={(v) => store.setSettings({ instagramUrl: v })}
      />
      <TextField
        label="WhatsApp"
        value={settings.whatsappNumber}
        onChange={(v) => store.setSettings({ whatsappNumber: v })}
      />

      <div className="pt-4 border-t border-black/5">
        <FieldLabel label="Links Rápidos (Menus)" />
        <div className="space-y-3">
          {settings.footerLinks.map((l, i) => (
            <div key={i} className="flex gap-2">
              <input
                value={l.label}
                onChange={(e) => {
                  const next: FooterLink[] = [...settings.footerLinks];
                  next[i] = { ...l, label: e.target.value };
                  store.setSettings({ footerLinks: next });
                }}
                placeholder="Nome do Link"
                className="flex-1 rounded-xl border border-black/15 px-3 py-2.5 text-xs outline-none focus:border-black bg-neutral-50 focus:bg-white transition"
              />
              <input
                value={l.href}
                onChange={(e) => {
                  const next: FooterLink[] = [...settings.footerLinks];
                  next[i] = { ...l, href: e.target.value };
                  store.setSettings({ footerLinks: next });
                }}
                placeholder="URL (#)"
                className="w-1/3 rounded-xl border border-black/15 px-3 py-2.5 text-xs outline-none focus:border-black bg-neutral-50 focus:bg-white transition"
              />
              <button
                onClick={() =>
                  store.setSettings({
                    footerLinks: settings.footerLinks.filter((_, j) => j !== i),
                  })
                }
                className="rounded-xl border border-red-100 bg-red-50 p-2.5 text-red-600 hover:bg-red-600 hover:text-white transition"
              >
                <Icon icon="ph:trash-bold" className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              store.setSettings({
                footerLinks: [...settings.footerLinks, { label: "Novo Link", href: "#" }],
              })
            }
            className="w-full mt-2 rounded-xl border border-dashed border-black/20 py-3 text-[10px] font-bold uppercase tracking-widest text-black/50 hover:bg-black/5 hover:text-black transition inline-flex items-center justify-center gap-2"
          >
            <Icon icon="ph:plus-bold" className="w-3 h-3" /> Adicionar Link
          </button>
        </div>
      </div>
    </>
  );
}
