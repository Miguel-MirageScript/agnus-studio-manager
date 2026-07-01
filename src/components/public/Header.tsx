import { Icon } from "@iconify/react";
import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-black/5">
      <div className="mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 md:px-8">
        <Link to="/" className="group flex h-11 w-11 items-center justify-center rounded-full border border-black/10 transition hover:border-[color:var(--gold)]">
          <Icon icon="ph:aperture-duotone" className="w-5 h-5 text-foreground transition group-hover:text-[color:var(--gold)] group-hover:rotate-45 duration-500" />
        </Link>
        <div className="flex justify-center">
          <Logo />
        </div>
        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noreferrer"
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-black/10 transition hover:border-[color:var(--whatsapp)] hover:scale-105"
          aria-label="WhatsApp"
        >
          <Icon icon="line-md:chat-round" className="w-5 h-5 text-foreground group-hover:text-[color:var(--whatsapp)] transition" />
        </a>
      </div>
    </header>
  );
}
