import { Icon } from "@iconify/react";
import { useStore } from "@/lib/store";

export function Header() {
  const settings = useStore((s) => s.settings);

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-black/5">
      <div className="mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 md:px-8">
        {/* Botão Instagram Dinâmico */}
        <a
          href={settings.instagramUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-black/10 transition hover:border-[color:var(--gold)] hover:scale-105"
        >
          <Icon icon="ri:instagram-line" className="w-5 h-5 text-foreground transition group-hover:text-[color:var(--gold)]" />
        </a>

        {/* Nome da Marca Dinâmico */}
        <div className="flex justify-center">
          <h1 className="font-display text-lg font-bold uppercase tracking-[0.2em] text-foreground">
            {settings.brandLine}
          </h1>
        </div>

        {/* Botão WhatsApp Dinâmico */}
        <a
          href={`https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}`}
          target="_blank"
          rel="noreferrer"
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-black/10 transition hover:border-[#25D366] hover:scale-105"
          aria-label="WhatsApp"
        >
          <Icon icon="ri:whatsapp-line" className="w-5 h-5 text-foreground group-hover:text-[#25D366] transition" />
        </a>
      </div>
    </header>
  );
}
