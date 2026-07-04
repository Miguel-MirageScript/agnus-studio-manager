import { Icon } from "@iconify/react";
import { useState } from "react";
import { Hangtag } from "@/components/brand/Hangtag";
import type { AdminProduct } from "@/lib/store";
import type { StatusTag } from "@/lib/products";
import { cn } from "@/lib/utils";
import { STATUS_OPTIONS, HANGTAG_OPTIONS } from "./constants";

export type Draft = Omit<AdminProduct, "id"> & { id?: string };

export const emptyDraft = (category: string): Draft => ({
  name: "",
  price: 0,
  image: "",
  tags: ["PRONTA ENTREGA"],
  filters: ["novidades"],
  category,
  stock: 10,
  hangtag: "classic",
});

export function ProductEditor({
  draft,
  categories,
  loading,
  onChange,
  onCancel,
  onSave,
}: {
  draft: Draft;
  categories: string[];
  loading: boolean;
  onChange: (d: Draft) => void;
  onCancel: () => void;
  onSave: (file: File | null) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(draft.image);

  const toggleTag = (t: StatusTag) => {
    onChange({
      ...draft,
      tags: draft.tags.includes(t) ? draft.tags.filter((x) => x !== t) : [...draft.tags, t],
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onCancel}>
      <div
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5 sticky top-0 bg-white/95 backdrop-blur z-10">
          <h3 className="font-display text-xl flex items-center gap-2">
            <Icon icon="ph:t-shirt-duotone" className="text-[color:var(--gold)] w-6 h-6" />
            {draft.id ? "Editar Produto" : "Novo Drop"}
          </h3>
          <button onClick={onCancel} className="p-2 rounded-full text-black/40 hover:bg-black/5 hover:text-black transition">
            <Icon icon="ph:x-bold" className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <Label>Imagem do Produto</Label>
            <div className="relative w-full h-56 rounded-2xl border-2 border-dashed border-black/15 bg-neutral-50 flex flex-col items-center justify-center cursor-pointer hover:border-black/40 hover:bg-neutral-100 transition group overflow-hidden">
              {preview ? (
                <img src={preview} alt="Preview" className="h-full w-full object-contain p-4 mix-blend-multiply" />
              ) : (
                <div className="flex flex-col items-center text-black/40 gap-2">
                  <Icon icon="ph:cloud-arrow-up-duotone" className="w-10 h-10 text-[color:var(--gold)]" />
                  <span className="font-bold text-xs uppercase tracking-widest text-black/60">Upload de Mockup</span>
                  <span className="text-[10px]">Toque para selecionar da galeria</span>
                </div>
              )}

              {(preview || draft.tags.length > 0) && (
                <Hangtag style={draft.hangtag} label={draft.tags[0] ?? "AGNUS.93"} />
              )}

              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Nome do Produto" value={draft.name} disabled={loading} onChange={(v) => onChange({ ...draft, name: v })} />
            <Field
              label="Preço (R$)"
              type="number"
              value={String(draft.price)}
              disabled={loading}
              onChange={(v) => onChange({ ...draft, price: parseFloat(v) || 0 })}
            />
            <div>
              <Label>Categoria</Label>
              <select
                value={draft.category}
                disabled={loading}
                onChange={(e) => onChange({ ...draft, category: e.target.value })}
                className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm font-medium bg-white outline-none focus:border-black transition"
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <Field
              label="Estoque"
              type="number"
              value={String(draft.stock)}
              disabled={loading}
              onChange={(v) => onChange({ ...draft, stock: parseInt(v) || 0 })}
            />
          </div>

          <div>
            <Label>Status Tags (Filtros)</Label>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((t) => {
                const on = draft.tags.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    disabled={loading}
                    onClick={() => toggleTag(t)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                      on
                        ? "border-black bg-black text-white shadow-md"
                        : "border-black/15 text-black/50 hover:border-black/40 hover:text-black",
                    )}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <Label>Estilo da Etiqueta no Card</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {HANGTAG_OPTIONS.map((h) => {
                const selected = draft.hangtag === h.key;
                return (
                  <button
                    key={h.key}
                    type="button"
                    disabled={loading}
                    onClick={() => onChange({ ...draft, hangtag: h.key })}
                    className={cn(
                      "relative rounded-2xl border-2 p-4 text-left transition-all bg-[#F7F4EF]",
                      selected ? "border-[color:var(--gold)] shadow-lg scale-[1.02]" : "border-black/5 hover:border-black/20",
                    )}
                  >
                    <div className="relative h-24 rounded-xl overflow-hidden bg-white flex items-center justify-center border border-black/5 shadow-inner">
                      {preview ? (
                        <img src={preview} alt="" className="h-full object-contain p-2 mix-blend-multiply" />
                      ) : (
                        <div className="text-[9px] text-black/20 font-bold uppercase tracking-widest">Sem Arte</div>
                      )}
                      <Hangtag style={h.key} label={draft.tags[0] ?? "AGNUS.93"} />
                    </div>
                    <div className="mt-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-black">{h.label}</p>
                      <p className="text-[9px] text-black/50 mt-1">{h.hint}</p>
                    </div>
                    {selected && (
                      <Icon
                        icon="ph:check-circle-fill"
                        className="absolute top-2 right-2 w-5 h-5 text-[color:var(--gold)]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-black/5 px-6 py-5 flex justify-end gap-3 sticky bottom-0 bg-white/95 backdrop-blur rounded-b-3xl">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="px-5 py-3 text-[10px] uppercase tracking-widest font-bold text-black/50 hover:text-black hover:bg-black/5 rounded-xl transition disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => onSave(file)}
            className="rounded-xl bg-black text-white px-8 py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-[color:var(--gold)] transition shadow-lg flex items-center gap-2 disabled:opacity-70"
          >
            {loading && <Icon icon="line-md:loading-twotone-loop" className="w-4 h-4" />}
            {loading ? "Processando..." : "Salvar Produto"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-black/40 mb-2">{children}</p>;
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-foreground transition disabled:opacity-50"
      />
    </div>
  );
}
