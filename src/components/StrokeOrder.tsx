import { useEffect, useRef, useState } from "react";
import HanziWriter from "hanzi-writer";

interface StrokeOrderProps {
  character: string;
  size?: number;
}

export function StrokeOrder({ character, size = 140 }: StrokeOrderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<HanziWriter | null>(null);
  const [mode, setMode] = useState<"animation" | "quiz">("animation");
  const [quizStatus, setQuizStatus] = useState<string>("");

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";
    setQuizStatus("");

    const writer = HanziWriter.create(containerRef.current, character, {
      width: size,
      height: size,
      padding: 8,
      showOutline: true,
      showCharacter: mode === "animation",
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 300,
      strokeColor: "#1e293b",
      outlineColor: "#cbd5e1",
      radicalColor: "#64748b",
      drawingColor: "#0f172a",
      highlightColor: "#3b82f6",
    });

    writerRef.current = writer;

    if (mode === "animation") {
      writer.animateCharacter();
    } else {
      writer.quiz({
        showOutline: true,
        showHintAfterMisses: 2,
        onMistake: (data) => {
          setQuizStatus(`Ошибка на черте ${data.strokeNum + 1}`);
        },
        onCorrectStroke: (data) => {
          setQuizStatus(`Черта ${data.strokeNum + 1} верная`);
        },
        onComplete: (summary) => {
          setQuizStatus(
            summary.totalMistakes === 0
              ? "Отлично! Без ошибок"
              : `Готово! Ошибок: ${summary.totalMistakes}`
          );
        },
      });
    }

    return () => {
      writerRef.current = null;
    };
  }, [character, size, mode]);

  const replay = () => {
    if (mode === "animation") {
      writerRef.current?.animateCharacter();
    } else {
      // Restart quiz by switching mode briefly or recreating
      setMode("animation");
      setTimeout(() => setMode("quiz"), 50);
    }
  };

  const startQuiz = () => setMode("quiz");
  const backToAnimation = () => setMode("animation");

  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      <div
        ref={containerRef}
        className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
        style={{ width: size + 32, height: size + 32 }}
      />

      {quizStatus && mode === "quiz" && (
        <p className="text-sm text-slate-600">{quizStatus}</p>
      )}

      <div className="flex flex-wrap items-center justify-center gap-2">
        {mode === "animation" ? (
          <>
            <button
              onClick={replay}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 hover:bg-slate-50"
            >
              Показать ещё раз
            </button>
            <button
              onClick={startQuiz}
              className="rounded-full bg-slate-900 px-3 py-1 text-sm text-white hover:bg-slate-800"
            >
              Попробовать написать самому
            </button>
          </>
        ) : (
          <>
            <button
              onClick={replay}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 hover:bg-slate-50"
            >
              Начать заново
            </button>
            <button
              onClick={backToAnimation}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 hover:bg-slate-50"
            >
              Вернуться к анимации
            </button>
          </>
        )}
      </div>
    </div>
  );
}
