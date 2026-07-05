import { useSyncExternalStore } from "react";
import { PRODUCTS as SEED, type Product, type StatusTag } from "@/lib/products";
import heroImg from "@/assets/hero-lookbook.jpg";
import loopImg from "@/assets/lookbook-loop.jpg";
import { createClient } from '@supabase/supabase-js';

// Inicialização autônoma do cliente Supabase para garantir sincronia direta
const supabaseUrl = "https://jypmxfhaxcniztkswueb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cG14ZmhheGNuaXp0a3N3dWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MTAxMjEsImV4cCI6MjA5ODQ4NjEyMX0.zHttmS0Q1M2qIxMhsOjlf7xNDScwpLfWV0BGVtqu3nE";
const supabase = createClient(supabaseUrl, supabaseKey);

// 20 HANGTAG STYLES
export type HangtagStyle =
  | "classic" | "ribbon" | "seal" | "metallic" | "side-label" | "minimal-float" | "brutalist"
  | "woven" | "blister" | "ticket" | "led" | "dogtag" | "pvc" | "acrylic"
  | "wooden" | "care-label" | "rfid" | "holo-auth" | "velvet" | "wax-drip";

// 20 PRODUCT CARD CONTAINERS
export type ContainerStyle =
  | "minimal" | "soft" | "brutalist" | "elegant" | "neo-brutalism"
  | "cyberpunk" | "polaroid" | "glass" | "swiss" | "blueprint"
  | "neumorphism" | "synthwave" | "high-fashion" | "grunge" | "y2k"
  | "terminal" | "holographic" | "kraft" | "editorial" | "sci-fi";

// 20 CATEGORY TYPOGRAPHY STYLES
export type CategoryStyle =
  | "serif-italic" | "wide-sans" | "stamp" | "vogue" | "caution" | "outline"
  | "neon-sign" | "extruded-3d" | "glitch" | "marker" | "arcade-pixel"
  | "gold-foil" | "ransom" | "marquee" | "blur-reveal" | "cyber-tech"
  | "stencil" | "bubblegum" | "blackletter" | "vertical" | "tape-emboss";

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
  heroTextColor: string;
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
      heroTextColor: "#0a0a0a",
      lookbookTitle: "Lookbook Loop",
      lookbookImages: [loopImg, loopImg, loopImg],
      footerTagline: "Luxury Streetwear",
      footerLinks: [
        { label: "Guia de Tamanhos", href: "#" },
        { label: "Sobre a Marca", href: "#" },
        { label: "FAQ", href: "#" },
      ],
      brandLine: "AGNUS.1993",
      containerStyle: "swiss",
      categoryStyle: "vogue",
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

// Sincronização Assíncrona e Definitiva em Nuvem com Supabase
async function syncSettingsToCloud(updatedSettings: Settings) {
  try {
    await supabase.from("site_settings").upsert({
      id: "main_config",
      whatsapp_number: updatedSettings.whatsappNumber,
      whatsapp_message: updatedSettings.whatsappMessage,
      instagram_url: updatedSettings.instagramUrl,
      announcement: updatedSettings.announcement,
      hero_title: updatedSettings.heroTitle,
      hero_image: updatedSettings.heroImage,
      hero_text_color: updatedSettings.heroTextColor,
      lookbook_title: updatedSettings.lookbookTitle,
      lookbook_images: updatedSettings.lookbookImages,
      footer_tagline: updatedSettings.footerTagline,
      footer_links: updatedSettings.footerLinks,
      brand_line: updatedSettings.brandLine,
      container_style: updatedSettings.containerStyle,
      category_style: updatedSettings.categoryStyle,
      updated_at: new Date().toISOString()
    });
  } catch (err) {
    console.error("Falha ao salvar dados permanentemente no Supabase:", err);
  }
}

// Puxa as configurações reais salvas na nuvem assim que o app inicia
async function fetchSettingsFromCloud() {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", "main_config")
      .single();

    if (data && !error) {
      state.settings = {
        whatsappNumber: data.whatsapp_number || state.settings.whatsappNumber,
        whatsappMessage: data.whatsapp_message || state.settings.whatsappMessage,
        instagramUrl: data.instagram_url || state.settings.instagramUrl,
        announcement: data.announcement || state.settings.announcement,
        heroTitle: data.hero_title || state.settings.heroTitle,
        heroImage: data.hero_image || state.settings.heroImage,
        heroTextColor: data.hero_text_color || state.settings.heroTextColor,
        lookbookTitle: data.lookbook_title || state.settings.lookbookTitle,
        lookbookImages: data.lookbook_images || state.settings.lookbookImages,
        footerTagline: data.footer_tagline || state.settings.footerTagline,
        footerLinks: data.footer_links || state.settings.footerLinks,
        brandLine: data.brand_line || state.settings.brandLine,
        containerStyle: (data.container_style as ContainerStyle) || state.settings.containerStyle,
        categoryStyle: (data.category_style as CategoryStyle) || state.settings.categoryStyle,
      };
      emit();
    }
  } catch (err) {
    console.error("Erro ao resgatar configurações em nuvem:", err);
  }
}

// Dispara a busca em nuvem imediatamente
if (typeof window !== "undefined") {
  fetchSettingsFromCloud();
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
    // Dispara o salvamento em nuvem em segundo plano sem travar a interface
    syncSettingsToCloud(state.settings);
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
