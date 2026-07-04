import type { HangtagStyle } from "@/lib/store";
import type { StatusTag } from "@/lib/products";

export const STATUS_OPTIONS: StatusTag[] = [
  "PRONTA ENTREGA",
  "SOB ENCOMENDA",
  "NOVO DROP",
  "LIMITADO",
  "PROMOÇÃO",
  "ESGOTADO",
];

export const HANGTAG_OPTIONS: { key: HangtagStyle; label: string; hint: string }[] = [
  { key: "classic", label: "Leather Patch", hint: "Etiqueta de couro com costura tracejada" },
  { key: "ribbon", label: "Wax Seal", hint: "Selo de cera vermelho envelhecido" },
  { key: "seal", label: "Holográfico", hint: "Adesivo com gradiente animado" },
  { key: "metallic", label: "Barcode Strip", hint: "Código de barras estilo etiqueta industrial" },
  { key: "side-label", label: "Kraft Luggage Tag", hint: "Etiqueta de papel kraft com fio" },
  { key: "minimal-float", label: "Neon Glow", hint: "Pílula neon cyberpunk" },
  { key: "brutalist", label: "Caution Tape", hint: "Fita amarela de aviso, inclinada" },
];
