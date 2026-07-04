import { store, useStore } from "@/lib/store";
import { FieldLabel, ImageField, TextField } from "./fields";

export function LookbookEditor() {
  const settings = useStore((s) => s.settings);
  return (
    <>
      <TextField
        label="Título do Lookbook"
        value={settings.lookbookTitle}
        onChange={(v) => store.setSettings({ lookbookTitle: v })}
      />
      <div className="space-y-4 pt-2">
        <FieldLabel label="Fotos do Carrossel" />
        {[0, 1, 2].map((i) => (
          <ImageField
            key={i}
            label={`Frame ${i + 1}`}
            value={settings.lookbookImages[i] ?? ""}
            onChange={(v) => {
              const next = [...settings.lookbookImages];
              next[i] = v;
              store.setSettings({ lookbookImages: next });
            }}
          />
        ))}
      </div>
    </>
  );
}
