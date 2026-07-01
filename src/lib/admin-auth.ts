// Client-side gate. Replace with Lovable Cloud auth for production.
// Demo credentials: admin / agnus1993
const KEY = "agnus_admin_session";
export const ADMIN_USER = "admin";
export const ADMIN_PASS = "agnus1993";

export function isAdmin(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(KEY) === "ok";
}
export function signIn(user: string, pass: string): boolean {
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    window.sessionStorage.setItem(KEY, "ok");
    return true;
  }
  return false;
}
export function signOut() {
  window.sessionStorage.removeItem(KEY);
}
