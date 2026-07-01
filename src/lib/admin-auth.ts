const KEY = "agnus_admin_session";

// Verifica se existe um token do Supabase salvo na sessão do navegador
export function isAdmin(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(KEY) !== null;
}

// Remove o token ao sair
export function signOut() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(KEY);
  }
}
