import { useVisibility } from "@/lib/store";
import { Eye, EyeOff } from "lucide-react";

export function VisibilityToggles() {
  const { showHanzi, showPinyin, showTranslation, toggleHanzi, togglePinyin, toggleTranslation } =
    useVisibility();

  const Item = ({
    active,
    onClick,
    label,
  }: {
    active: boolean;
    onClick: () => void;
    label: string;
  }) => (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "bg-slate-900 text-white"
          : "bg-white text-slate-500 ring-1 ring-slate-200 hover:bg-slate-50"
      }`}
    >
      {active ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
      {label}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-xs font-medium uppercase tracking-wider text-slate-400">
        Показывать
      </span>
      <Item active={showHanzi} onClick={toggleHanzi} label="Иероглифы" />
      <Item active={showPinyin} onClick={togglePinyin} label="Пиньинь" />
      <Item active={showTranslation} onClick={toggleTranslation} label="Перевод" />
    </div>
  );
}
