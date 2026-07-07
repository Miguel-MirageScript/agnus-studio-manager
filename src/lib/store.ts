import { useSyncExternalStore } from "react";
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://jypmxfhaxcniztkswueb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cG14ZmhheGNuaXp0a3N3dWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MTAxMjEsImV4cCI6MjA5ODQ4NjEyMX0.zHttmS0Q1M2qIxMhsOjlf7xNDScwpLfWV0BGVtqu3nE";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface AdminProduct {
  id: string;
  title: string;
  price: number;
  category: string;
  image_url: string;
  backImage?: string; // Suporte para a segunda imagem
  stock: number;
  tags: string[];
}

export interface Settings {
  whatsappNumber: string;
  theme: string;
  // ... outras configurações
}

interface State {
  products: AdminProduct[];
  categories: string[];
  settings: Settings;
  isLoaded: boolean;
}

// Estado inicial limpo
let state: State = {
  products: [],
  categories: ["ORIGINAL A G N U S .¹⁹⁹³"],
  settings: { whatsappNumber: "5511932212697", theme: "minimalist-luxury" },
  isLoaded: false
};

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

// Força o carregamento dos produtos reais do Supabase
async function fetchAll() {
  const { data: prods } = await supabase.from("products").select("*");
  const { data: settings } = await supabase.from("site_settings").select("*").eq("id", "main_config").single();
  
  if (prods) state.products = prods;
  if (settings) state.settings = { ...state.settings, ...settings };
  
  state.isLoaded = true;
  emit();
}

// A função que resolve a sincronia: Adiciona e salva imediatamente
export const store = {
  get: () => state,
  async addProduct(p: Omit<AdminProduct, "id">) {
    const { data, error } = await supabase.from("products").insert([p]).select().single();
    if (!error && data) {
      state.products = [...state.products, data];
      emit();
    }
  },
  deleteCategory(name: string) {
    state.categories = state.categories.filter(c => c !== name);
    state.products = state.products.filter(p => p.category !== name);
    emit();
  }
};

if (typeof window !== "undefined") fetchAll();

export function useStore<T>(sel: (s: State) => T): T {
  return useSyncExternalStore((cb) => { listeners.add(cb); return () => listeners.delete(cb); }, () => sel(state), () => sel(state));
}
