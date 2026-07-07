import { Icon } from "@iconify/react";
import { useState } from "react";
import { Hangtag } from "@/components/brand/Hangtag";
import type { AdminProduct } from "@/lib/store";
import type { StatusTag } from "@/lib/products";
import { cn } from "@/lib/utils";
import { STATUS_OPTIONS } from "./constants";

export type Draft = Omit<AdminProduct, "id"> & { id?: string };

export const emptyDraft = (category: string): Draft => ({
  name: "",
  price: 0,
  image: "",
  backImage: "",
  tags: ["PRONTA ENTREGA"],
  filters: ["novidades"],
  category,
  stock: 10,
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
  onSave: (file: File | null, backFile: File | null) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(draft.image);
  const [backPreview, setBackPreview] = useState<string>(draft.backImage ?? "");

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

  const handleBackFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setBackFile(selectedFile);
      setBackPreview(URL.createObjectURL(selectedFile));
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Imagem Principal (Frente)</Label>
              <div className="relative w-full h-52 rounded-2xl border-2 border-dashed border-black/15 bg-neutral-50 flex flex-col items-center justify-center cursor-pointer hover:border-black/40 hover:bg-neutral-100 transition group overflow-hidden">
                {preview ? (
                  <img src={preview} alt="Frente" className="h-full w-full object-contain p-4 mix-blend-multiply" />
                ) : (
                  <div className="flex flex-col items-center text-black/40 gap-2">
                    <Icon icon="ph:cloud-arrow-up-duotone" className="w-9 h-9 text-[color:var(--gold)]" />
                    <span className="font-bold text-[10px] uppercase tracking-widest text-black/60">Upload Frente</span>
                  </div>
                )}
                {preview && <Hangtag label={draft.tags[0] ?? "AGNUS.93"} />}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <Label>Imagem Adicional (Costas/Arte)</Label>
              <div className="relative w-full h-52 rounded-2xl border-2 border-dashed border-black/15 bg-neutral-50 flex flex-col items-center justify-center cursor-pointer hover:border-black/40 hover:bg-neutral-100 transition group overflow-hidden">
                {backPreview ? (
                  <img src={backPreview} alt="Costas / Arte" className="h-full w-full object-contain p-4 mix-blend-multiply" />
                ) : (
                  <div className="flex flex-col items-center text-black/40 gap-2">
                    <Icon icon="ph:image-square-duotone" className="w-9 h-9 text-[color:var(--gold)]" />
                    <span className="font-bold text-[10px] uppercase tracking-widest text-black/60">Upload Costas</span>
                    <span className="text-[9px] text-black/40 text-center px-3">Opcional — habilita o carrossel no cartão</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleBackFileChange}
                  disabled={loading}
                />
                {backPreview && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setBackFile(null);
                      setBackPreview("");
                      onChange({ ...draft, backImage: "" });
                    }}
                    className="absolute top-2 right-2 z-10 bg-white/90 border border-black/10 rounded-full p-1.5 text-black/60 hover:text-red-600 hover:border-red-300 transition"
                    aria-label="Remover imagem adicional"
                  >
                    <Icon icon="ph:trash-bold" className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
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

          <div className="rounded-2xl bg-[#F9F6F0] border border-[color:var(--gold)]/30 px-4 py-3 flex items-start gap-3">
            <Icon icon="ph:info-duotone" className="w-5 h-5 text-[color:var(--gold)] shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-black">Etiqueta do Cartão</p>
              <p className="text-[10px] text-black/60 mt-1">
                O estilo da etiqueta é definido pelo Tema Global no Editor Visual. Alterar o tema atualiza todas as peças ao mesmo tempo.
              </p>
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
            onClick={() => onSave(file, backFile)}
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
