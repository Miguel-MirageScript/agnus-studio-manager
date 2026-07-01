import { Icon } from "@iconify/react";

export function PlaceholderPanel({ title, icon, description }: { title: string; icon: string; description: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-black/15 bg-white p-10 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--gold)]/10">
        <Icon icon={icon} className="w-7 h-7 text-[color:var(--gold)]" />
      </div>
      <h2 className="font-display text-2xl mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground max-w-md mx-auto">{description}</p>
    </div>
  );
}
