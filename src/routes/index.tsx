import { createFileRoute, Link } from "@tanstack/react-router";
import { hsk1Words, hsk2Words } from "@/lib/data";
import { VisibilityToggles } from "@/components/VisibilityToggles";
import { useVisibility } from "@/lib/store";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { showHanzi, showPinyin, showTranslation } = useVisibility();
  const [level, setLevel] = useState<1 | 2>(1);
  const words = level === 1 ? hsk1Words : hsk2Words;

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">HSK {level}</p>
            <h1 className="mt-1 text-4xl font-semibold tracking-tight text-slate-900">Тренер китайского</h1>
            <p className="mt-2 max-w-md text-slate-500">Слова уровней HSK 1 и HSK 2.</p>
          </div>
          <VisibilityToggles />
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-6 flex gap-2">
          <button onClick={() => setLevel(1)} className={level===1?"bg-slate-900 text-white rounded-full px-4 py-1.5 text-sm":"border rounded-full px-4 py-1.5 text-sm"}>HSK 1 · {hsk1Words.length}</button>
          <button onClick={() => setLevel(2)} className={level===2?"bg-slate-900 text-white rounded-full px-4 py-1.5 text-sm":"border rounded-full px-4 py-1.5 text-sm"}>HSK 2 · {hsk2Words.length}</button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {words.map((word) => (
            <Link key={word.id} to="/word/$wordId" params={{ wordId: word.id }} className="rounded-2xl border bg-white p-5 shadow-sm">
              <span className="hanzi text-3xl">{word.hanzi}</span>
              <p className="mt-2 text-slate-600">{word.translations.ru}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
