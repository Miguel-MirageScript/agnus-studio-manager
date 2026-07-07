import { useStore } from "@/lib/store";
import { renderCategoryHeading } from "@/lib/themes";

/**
 * Título de categoria — renderizado pelo tema global unificado.
 */
export function CategoryHeading({ name, className }: { name: string; className?: string }) {
  const theme = useStore((s) => s.settings.theme);
  return <>{renderCategoryHeading(theme, name, className)}</>;
}
