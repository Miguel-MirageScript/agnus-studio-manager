import { store, useStore } from "@/lib/store";
import { TextField } from "./fields";

export function AnnounceEditor() {
  const value = useStore((s) => s.settings.announcement);
  return (
    <TextField
      label="Texto do Anúncio (Faixa do Topo)"
      value={value}
      onChange={(v) => store.setSettings({ announcement: v })}
    />
  );
}
