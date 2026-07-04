import { store, useStore } from "@/lib/store";
import { ColorField, ImageField, TextField } from "./fields";

export function HeroEditor() {
  const settings = useStore((s) => s.settings);
  return (
    <>
      <TextField
        label="Título do Banner"
        value={settings.heroTitle}
        onChange={(v) => store.setSettings({ heroTitle: v })}
      />

      <ColorField
        label="Cor do Texto e Ícones (HEX)"
        value={settings.heroTextColor}
        onChange={(v) => store.setSettings({ heroTextColor: v })}
      />

      <ImageField
        label="Imagem de Fundo do Hero (upload ou URL)"
        value={settings.heroImage}
        onChange={(v) => store.setSettings({ heroImage: v })}
      />
    </>
  );
}
