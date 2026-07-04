import { Icon } from "@iconify/react";

/** Converts a File to a data URL for local previews / storage. */
export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export function FieldLabel({ label }: { label: string }) {
  return (
    <label className="block text-[10px] uppercase tracking-[0.25em] font-bold text-black/50 mb-2">
      {label}
    </label>
  );
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <FieldLabel label={label} />
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full rounded-xl border border-black/15 p-3.5 text-sm font-medium outline-none focus:border-black bg-neutral-50 focus:bg-white transition resize-y"
        />
      ) : (
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-black/15 p-3.5 text-sm font-medium outline-none focus:border-black bg-neutral-50 focus:bg-white transition"
        />
      )}
    </div>
  );
}

/**
 * ImageField: file upload (data URL) + URL input, both persist to the same value.
 */
export function ImageField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <FieldLabel label={label} />
      <div className="flex gap-4 items-center">
        <label className="h-24 w-24 shrink-0 rounded-2xl border-2 border-dashed border-black/15 bg-neutral-50 overflow-hidden flex items-center justify-center relative group cursor-pointer hover:border-black/40 transition">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <Icon icon="ph:image-duotone" className="w-6 h-6 text-black/30" />
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition backdrop-blur-sm">
            <Icon icon="ph:upload-simple-bold" className="w-6 h-6 text-white" />
          </div>
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (f) onChange(await fileToDataUrl(f));
            }}
          />
        </label>
        <div className="flex-1 space-y-2">
          <p className="text-[10px] font-bold text-black/40 uppercase tracking-wider">
            URL da Imagem
          </p>
          <input
            value={value.startsWith("data:") ? "Upload local carregado" : value}
            placeholder="Cole uma URL direta..."
            onChange={(e) => {
              if (!e.target.value.startsWith("Upload")) onChange(e.target.value);
            }}
            className="w-full rounded-xl border border-black/15 p-3 text-xs outline-none focus:border-black bg-neutral-50 focus:bg-white transition"
          />
        </div>
      </div>
    </div>
  );
}

export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <FieldLabel label={label} />
      <div className="flex items-center gap-3">
        <label className="relative h-12 w-12 shrink-0 rounded-xl border-2 border-black/10 overflow-hidden cursor-pointer shadow-inner">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-[200%] h-[200%] -left-1/2 -top-1/2 cursor-pointer"
          />
        </label>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="flex-1 rounded-xl border border-black/15 p-3 text-sm font-mono outline-none focus:border-black bg-neutral-50 focus:bg-white transition uppercase"
        />
      </div>
      <p className="mt-2 text-[9px] uppercase tracking-widest text-black/40">
        Clique no quadrado para abrir o seletor de cores
      </p>
    </div>
  );
}

export function EditBadge({ label }: { label: string }) {
  return (
    <div className="absolute top-4 right-4 z-10 bg-black text-white text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-lg group-hover:bg-[color:var(--gold)] transition">
      <Icon icon="ph:pencil-simple-bold" className="w-3 h-3" />
      {label}
    </div>
  );
}
