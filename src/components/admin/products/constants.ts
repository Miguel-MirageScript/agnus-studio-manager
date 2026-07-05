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
  { key: "metallic", label: "Barcode Strip", hint: "Código de barras estilo industrial" },
  { key: "side-label", label: "Kraft Luggage Tag", hint: "Etiqueta de papel kraft com fio" },
  { key: "minimal-float", label: "Neon Glow", hint: "Pílula neon cyberpunk" },
  { key: "brutalist", label: "Caution Tape", hint: "Fita amarela de aviso, inclinada" },
  { key: "woven", label: "Etiqueta de Tecido", hint: "Trama de tecido tipo bordado" },
  { key: "blister", label: "Plástico Blister", hint: "Bolha translúcida brilhante" },
  { key: "ticket", label: "Ticket Perfurado", hint: "Ingresso destacável com pontilhado" },
  { key: "led", label: "Painel LED", hint: "Texto vermelho rolando" },
  { key: "dogtag", label: "Dog Tag Metálico", hint: "Metal escovado com corrente" },
  { key: "pvc", label: "Patch PVC 3D", hint: "Borracha preta com relevo interno" },
  { key: "acrylic", label: "Acrílico Transparente", hint: "Vidro translúcido flutuante" },
  { key: "wooden", label: "Madeira Gravada", hint: "Madeira nobre com fibras" },
  { key: "care-label", label: "Etiqueta Dobrada", hint: "Rótulo de composição interna" },
  { key: "rfid", label: "Sticker RFID", hint: "Adesivo de segurança industrial" },
  { key: "holo-auth", label: "Selo Autenticidade", hint: "Círculo holográfico premium" },
  { key: "velvet", label: "Veludo Bordô", hint: "Textura aveludada nobre" },
  { key: "wax-drip", label: "Ink Drip Preto", hint: "Cápsula preta escorrendo tinta" },
];
