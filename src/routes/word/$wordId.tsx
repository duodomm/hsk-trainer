import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { hsk1Words, hsk2Words, getExamplesForWord } from "@/lib/data";
import { VisibilityToggles } from "@/components/VisibilityToggles";
import { StrokeOrder } from "@/components/StrokeOrder";
import { AudioButton, AudioMode } from "@/components/AudioButton";
import { useVisibility } from "@/lib/store";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/word/$wordId")({
  component: WordPage,
});

const TEST_STROKE_WORDS = new Set(["爱", "八", "爸爸"]);

// Тестовые варианты озвучки: группы по 3 слова
const AUDIO_TEST_GROUPS: { words: string[]; mode: AudioMode; label: string }[] = [
  { words: ["爱", "八", "爸爸"], mode: "speech-normal", label: "Speech API (нормальная скорость)" },
  { words: ["吧", "白天", "百"], mode: "speech-slow", label: "Speech API (медленная 0.7×)" },
  { words: ["半", "包子", "杯子"], mode: "speech-very-slow", label: "Speech API (очень медленная 0.5×)" },
  { words: ["本", "边", "病"], mode: "google-tts", label: "Google TTS" },
  { words: ["不", "不客气", "不要"], mode: "speech-high-pitch", label: "Speech API (высокий тон)" },
];

function getAudioMode(wordId: string): { mode: AudioMode; label: string } | null {
  const group = AUDIO_TEST_GROUPS.find((g) => g.words.includes(wordId));
  return group ? { mode: group.mode, label: group.label } : null;
}

function WordPage() {
  const { wordId } = Route.useParams();
  const word = [...hsk1Words, ...hsk2Words].find((w) => w.id === wordId);
  const examples = word ? getExamplesForWord(word.id) : [];
  const { showHanzi, showPinyin, showTranslation } = useVisibility();
  const navigate = useNavigate();

  const PAGE_SIZE = 5;
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(examples.length / PAGE_SIZE));
  const pageExamples = examples.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  if (!word) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-slate-500">Слово не найдено.</p>
        <Link to="/" className="mt-4 inline-block text-slate-900 underline">
          Назад к списку
        </Link>
      </main>
    );
  }

  const showStrokeOrder = TEST_STROKE_WORDS.has(word.id);
  const audioInfo = getAudioMode(word.id);
  const characters = word.hanzi.split("");

  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() => navigate({ to: "/" })}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="size-4" />
            Все слова
          </button>
          <VisibilityToggles />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3">
            {showHanzi && (
              <h1 className="hanzi text-6xl font-medium tracking-wide text-slate-900">{word.hanzi}</h1>
            )}
            {audioInfo && (
              <AudioButton text={word.hanzi} mode={audioInfo.mode} />
            )}
          </div>
          {showPinyin && <p className="mt-3 text-xl text-slate-500">{word.pinyin}</p>}
          {showTranslation && (
            <p className="mt-2 text-lg text-slate-700">{word.translations.ru}</p>
          )}

          {audioInfo && (
            <p className="mt-3 text-xs text-slate-400">Аудио (тест): {audioInfo.label}</p>
          )}

          {showStrokeOrder && (
            <div className="mt-8">
              <p className="mb-3 text-sm font-medium text-slate-400">Порядок черт (тест)</p>
              <div className="flex flex-wrap items-start justify-center gap-6">
                {characters.map((char, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <StrokeOrder character={char} size={120} />
                    <span className="mt-1 text-xs text-slate-400">{char}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mb-6 text-center text-sm text-slate-500">
          {examples.length} примеров
        </div>

        <div className="space-y-4">
          {pageExamples.length === 0 && (
            <p className="rounded-2xl border border-dashed border-slate-200 bg-white py-12 text-center text-slate-400">
              Примеров пока нет
            </p>
          )}
          {pageExamples.map((ex) => (
            <article
              key={ex.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  {showHanzi && (
                    <p className="hanzi text-xl leading-relaxed text-slate-900">{ex.hanzi}</p>
                  )}
                  {showPinyin && <p className="mt-1 text-slate-500">{ex.pinyin}</p>}
                  {showTranslation && (
                    <p className="mt-2 text-slate-700">{ex.translations.ru}</p>
                  )}
                  {ex.maxLevel > 1 && (
                    <p className="mt-3 text-xs text-amber-600">содержит слова уровня {ex.maxLevel}</p>
                  )}
                </div>
                {audioInfo && (
                  <AudioButton text={ex.hanzi} mode={audioInfo.mode} size="sm" />
                )}
              </div>
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
              Назад
            </button>
            <span className="text-sm text-slate-500">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm disabled:opacity-40"
            >
              Вперёд
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
