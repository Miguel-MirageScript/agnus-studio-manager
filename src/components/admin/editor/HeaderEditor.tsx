import { store, useStore } from "@/lib/store";
import { TextField } from "./fields";

export function HeaderEditor() {
  const settings = useStore((s) => s.settings);
  return (
    <>
      <TextField
        label="Nome da Marca (Cabeçalho)"
        value={settings.brandLine}
        onChange={(v) => store.setSettings({ brandLine: v })}
      />
      <TextField
        label="URL do Instagram"
        value={settings.instagramUrl}
        onChange={(v) => store.setSettings({ instagramUrl: v })}
      />
      <TextField
        label="Número do WhatsApp"
        value={settings.whatsappNumber}
        onChange={(v) => store.setSettings({ whatsappNumber: v })}
      />
      <TextField
        label="Anúncio do Topo"
        value={settings.announcement}
        onChange={(v) => store.setSettings({ announcement: v })}
      />
    </>
  );
}
