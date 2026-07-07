import teeBlack from "@/assets/tee-black.jpg";
import teeWhite from "@/assets/tee-white.jpg";
import teeCream from "@/assets/tee-cream.jpg";

export type StatusTag =
  | "PRONTA ENTREGA"
  | "SOB ENCOMENDA"
  | "NOVO DROP"
  | "LIMITADO"
  | "ESGOTADO"
  | "PROMOÇÃO";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  /** Imagem opcional das costas / detalhe de arte. */
  backImage?: string;
  tags: StatusTag[];
  filters: ("novidades" | "mais-vendidos" | "pronta-entrega" | "limitados")[];
}

export const PRODUCTS: Product[] = [
  {
    id: "agnus-oversized-black",
    name: "AGNUS OVERSIZED TEE",
    price: 28,
    image: teeBlack,
    backImage: teeWhite,
    tags: ["PRONTA ENTREGA"],
    filters: ["pronta-entrega", "mais-vendidos"],
  },
  {
    id: "agnus-oversized-white",
    name: "AGNUS OVERSIZED TEE",
    price: 29,
    image: teeWhite,
    backImage: teeCream,
    tags: ["SOB ENCOMENDA"],
    filters: ["mais-vendidos"],
  },
  {
    id: "agnus-edition-cream",
    name: "AGNUS-EDITION DESIGN",
    price: 29,
    image: teeCream,
    tags: ["NOVO DROP", "LIMITADO"],
    filters: ["novidades", "limitados"],
  },
  {
    id: "agnus-classic-black",
    name: "AGNUS CLASSIC TEE",
    price: 26,
    image: teeBlack,
    tags: ["PROMOÇÃO"],
    filters: ["mais-vendidos"],
  },
  {
    id: "agnus-classic-white",
    name: "AGNUS CLASSIC TEE",
    price: 26,
    image: teeWhite,
    tags: ["ESGOTADO"],
    filters: [],
  },
  {
    id: "agnus-limited-cream",
    name: "AGNUS LIMITED DROP",
    price: 32,
    image: teeCream,
    backImage: teeBlack,
    tags: ["LIMITADO", "PRONTA ENTREGA"],
    filters: ["limitados", "pronta-entrega", "novidades"],
  },
];

export const WHATSAPP_NUMBER = "5511932212697";
export const WHATSAPP_LINK = (productName: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá! Gostaria de negociar a camiseta *${productName}* que vi no catálogo.`)}`;
