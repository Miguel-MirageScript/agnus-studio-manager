import { Icon } from "@iconify/react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-[oklch(0.98_0.005_85)]">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
        <div className="grid gap-10 md:grid-cols-4 items-start">
          <div className="md:col-span-1">
            <Logo size="md" />
          </div>
          <a href="https://instagram.com/agnus.1993" target="_blank" rel="noreferrer" className="group flex items-start gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 group-hover:border-[color:var(--gold)] transition">
              <Icon icon="ri:instagram-line" className="w-5 h-5 group-hover:text-[color:var(--gold)]" />
            </span>
            <span className="text-sm">
              <span className="block text-foreground font-medium">@agnus.1993</span>
              <span className="text-muted-foreground text-xs">Instagram</span>
            </span>
          </a>
          <a href="https://wa.me/5511932212697" target="_blank" rel="noreferrer" className="group flex items-start gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 group-hover:border-[color:var(--whatsapp)] transition">
              <Icon icon="logos:whatsapp-icon" className="w-5 h-5" />
            </span>
            <span className="text-sm">
              <span className="block text-foreground font-medium">Atendimento</span>
              <span className="text-muted-foreground text-xs">WhatsApp</span>
            </span>
          </a>
          <div>
            <h4 className="text-sm font-semibold mb-3">Links Rápidos</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Guia de Tamanhos</a></li>
              <li><a href="#" className="hover:text-foreground">Sobre a Marca</a></li>
              <li><a href="#" className="hover:text-foreground">FAQ</a></li>
              <li><Link to="/admin" className="hover:text-[color:var(--gold)] inline-flex items-center gap-1"><Icon icon="ph:lock-key" className="w-3 h-3" /> Admin</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col-reverse md:flex-row items-center justify-between gap-4 border-t border-black/5 pt-6">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} AGNUS.1993 — Luxury Streetwear</p>
          <p className="font-display italic text-lg">Made by <span className="font-bold not-italic">Agnus.1993</span></p>
        </div>
      </div>
    </footer>
  );
}
