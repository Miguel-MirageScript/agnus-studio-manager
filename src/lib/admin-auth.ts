const KEY = "agnus_admin_session";

// As tuas credenciais reais e definitivas
export const ADMIN_USER = "suport.agnus@gmail.com";
export const ADMIN_PASS = "miguel05109321";

export function isAdmin(): boolean {
  if (typeof window === "undefined") return false;
  // Agora lê do localStorage para ser compatível com a nossa tela de login
  return window.localStorage.getItem(KEY) !== null;
}

export function signIn(user: string, pass: string): boolean {
  const cleanUser = user.trim().toLowerCase();
  
  if (cleanUser === ADMIN_USER && pass === ADMIN_PASS) {
    window.localStorage.setItem(KEY, "bypass_active_session");
    return true;
  }
  return false;
}

export function signOut() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(KEY);
  }
}
