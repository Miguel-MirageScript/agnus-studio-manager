import { useStore, type ThemeKey } from "@/lib/store";
import { renderHangtag } from "@/lib/themes";

/**
 * A etiqueta (hangtag) agora é derivada do tema global unificado.
 * Prop `theme` opcional para casos em que já se conhece o tema.
 */
export function Hangtag({
  label,
  theme,
  className: _className,
}: {
  label: string;
  theme?: ThemeKey;
  className?: string;
}) {
  const globalTheme = useStore((s) => s.settings.theme);
  const t = theme ?? globalTheme;
  return <>{renderHangtag(t, label)}</>;
}
