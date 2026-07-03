import { useSyncExternalStore } from "react";
import { PRODUCTS as SEED, type Product, type StatusTag } from "@/lib/products";
import heroImg from "@/assets/hero-lookbook.jpg";
import loopImg from "@/assets/lookbook-loop.jpg";

export type HangtagStyle =
  | "classic"
  | "ribbon"
  | "seal"
  | "metallic"
  | "side-label"
  | "minimal-float"
  | "brutalist";

export type ContainerStyle = "minimal" | "soft" | "brutalist";
export type CategoryStyle = "serif-italic" | "wide-sans" | "stamp";

export interface AdminProduct extends Product {
  category: string;
  stock: number;
  hangtag: HangtagStyle;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface Settings {
  whatsappNumber: string;
  whatsappMessage: string;
  instagramUrl: string;
  announcement: string;
  heroTitle: string;
  heroImage: string;
  lookbookTitle: string;
  lookbookImages: string[];
  footerTagline: string;
  footerLinks: FooterLink[];
  brandLine: string;
  containerStyle: ContainerStyle;
  categoryStyle: CategoryStyle;
}

interface State {
  products: AdminProduct[];
  categories: string[];
  settings: Settings;
}

const KEY = "agnus_admin_store_v1";

function seedState(): State {
  const products: AdminProduct[] = SEED.map((p, i) => ({
    ...p,
    category: i % 2 === 0 ? "Camisetas" : "Edições Limitadas",
    stock: p.tags.includes("ESGOTADO") ? 0 : 12,
    hangtag: (["classic", "ribbon", "seal"] as HangtagStyle[])[i % 3],
  }));
  return {
    products,
    categories: ["Camisetas", "Edições Limitadas", "Acessórios"],
    settings: {
      whatsappNumber: "5511932212697",
      whatsappMessage:
        "Olá! Gostaria de negociar a camiseta *{product}* que vi no catálogo. Link: {link}",
      instagramUrl: "https://instagram.com/agnus.1993",
      announcement: "FRETE GRÁTIS ACIMA DE R$ 350 — NOVO DROP.93",
      heroTitle: "LOOKBOOK.",
      heroImage: heroImg,
      lookbookTitle: "Lookbook Loop",
      lookbookImages: [loopImg, loopImg, loopImg],
      footerTagline: "Luxury Streetwear",
      footerLinks: [
        { label: "Guia de Tamanhos", href: "#" },
        { label: "Sobre a Marca", href: "#" },
        { label: "FAQ", href: "#" },
      ],
      brandLine: "AGNUS.1993",
      containerStyle: "soft",
      categoryStyle: "wide-sans",
    },
  };
}

let state: State = load();
const listeners = new Set<() => void>();

function load(): State {
  if (typeof window === "undefined") return seedState();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seedState();
    const parsed = JSON.parse(raw) as State;
    const seed = seedState();
    return {
      ...seed,
      ...parsed,
      settings: { ...seed.settings, ...parsed.settings },
    };
  } catch {
    return seedState();
  }
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useStore<T>(sel: (s: State) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => sel(state),
    () => sel(state),
  );
}

export const store = {
  get: () => state,
  setSettings(patch: Partial<Settings>) {
    state = { ...state, settings: { ...state.settings, ...patch } };
    emit();
  },
  addProduct(p: Omit<AdminProduct, "id">) {
    const id = `prod-${Date.now()}`;
    state = { ...state, products: [...state.products, { ...p, id }] };
    emit();
  },
  updateProduct(id: string, patch: Partial<AdminProduct>) {
    state = {
      ...state,
      products: state.products.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    };
    emit();
  },
  deleteProduct(id: string) {
    state = { ...state, products: state.products.filter((p) => p.id !== id) };
    emit();
  },
  addCategory(name: string) {
    if (!name.trim() || state.categories.includes(name)) return;
    state = { ...state, categories: [...state.categories, name.trim()] };
    emit();
  },
  deleteCategory(name: string) {
    state = { ...state, categories: state.categories.filter((c) => c !== name) };
    emit();
  },
  setCategories(categories: string[]) {
    state = { ...state, categories };
    emit();
  },
  setProducts(products: AdminProduct[]) {
    state = { ...state, products };
    emit();
  },
  reset() {
    state = seedState();
    emit();
  },
};

export function productLink(productId: string) {
  if (typeof window === "undefined") return `/?p=${productId}`;
  return `${window.location.origin}/?p=${productId}`;
}

export function whatsappHref(productName: string, productId?: string, s: Settings = state.settings) {
  const link = productId ? productLink(productId) : (typeof window !== "undefined" ? window.location.origin : "");
  const msg = s.whatsappMessage
    .replace(/\{product\}/g, productName)
    .replace(/\{link\}/g, link);
  return `https://wa.me/${s.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
}

export type { Product, StatusTag };
