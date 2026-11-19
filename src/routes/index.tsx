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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              HSK {level}
            </p>
            <h1 className="mt-1 text-4xl font-semibold tracking-tight text-slate-900">
              Тренер китайского
            </h1>
            <p className="mt-2 max-w-md text-slate-500">
              Слова уровней HSK 1 и HSK 2. Переключатели скрывают иероглифы, пиньинь или перевод.
            </p>
          </div>
          <VisibilityToggles />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setLevel(1)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                level === 1
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              HSK 1 · {hsk1Words.length}
            </button>
            <button
              onClick={() => setLevel(2)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                level === 2
                  ? "bg-slate-900 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              HSK 2 · {hsk2Words.length}
            </button>
          </div>
          <span className="text-sm text-slate-500">нажмите на слово, чтобы увидеть примеры</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {words.map((word) => (
            <Link
              key={word.id}
              to="/word/$wordId"
              params={{ wordId: word.id }}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow"
            >
              <div className="flex items-baseline justify-between gap-3">
                {showHanzi && (
                  <span className="hanzi text-3xl font-medium tracking-wide text-slate-900">
                    {word.hanzi}
                  </span>
                )}
                {showPinyin && (
                  <span className="text-sm text-slate-400 group-hover:text-slate-500">
                    {word.pinyin}
                  </span>
                )}
              </div>
              {showTranslation && (
                <p className="mt-2 text-slate-600">{word.translations.ru}</p>
              )}
              {!showHanzi && !showPinyin && !showTranslation && (
                <p className="text-sm italic text-slate-400">скрыто</p>
              )}
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-400">
        HSK 1 · 300 слов · HSK 2 · {hsk2Words.length} слов
      </footer>
    </div>
  );
}
