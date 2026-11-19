import { useState, useRef } from "react";
import { Volume2, Square } from "lucide-react";

export type AudioMode =
  | "speech-normal"      // Web Speech API, normal speed
  | "speech-slow"        // Web Speech API, slow (0.7x)
  | "speech-very-slow"   // Web Speech API, very slow (0.5x)
  | "google-tts"         // Google Translate TTS (unofficial)
  | "speech-high-pitch"; // Web Speech API, higher pitch

interface Props {
  text: string;
  mode: AudioMode;
  size?: "sm" | "md";
}

export function AudioButton({ text, mode, size = "md" }: Props) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setPlaying(false);
  };

  const play = () => {
    stop();
    setPlaying(true);

    if (mode === "google-tts") {
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
        text
      )}&tl=zh-CN&client=tw-ob`;
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => setPlaying(false);
      audio.onerror = () => setPlaying(false);
      audio.play().catch(() => setPlaying(false));
      return;
    }

    // Web Speech API variants
    if (!window.speechSynthesis) {
      setPlaying(false);
      return;
    }

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "zh-CN";

    switch (mode) {
      case "speech-slow":
        utter.rate = 0.7;
        break;
      case "speech-very-slow":
        utter.rate = 0.5;
        break;
      case "speech-high-pitch":
        utter.rate = 0.9;
        utter.pitch = 1.3;
        break;
      default:
        utter.rate = 1;
    }

    // Try to pick a Chinese voice if available
    const voices = window.speechSynthesis.getVoices();
    const zhVoice = voices.find((v) => v.lang.startsWith("zh"));
    if (zhVoice) utter.voice = zhVoice;

    utter.onend = () => setPlaying(false);
    utter.onerror = () => setPlaying(false);
    utterRef.current = utter;
    window.speechSynthesis.speak(utter);
  };

  const iconSize = size === "sm" ? "size-4" : "size-5";

  return (
    <button
      onClick={playing ? stop : play}
      className={`inline-flex items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 ${
        size === "sm" ? "size-7" : "size-9"
      }`}
      title={playing ? "Остановить" : "Произнести"}
      aria-label={playing ? "Остановить" : "Произнести"}
    >
      {playing ? <Square className={iconSize} /> : <Volume2 className={iconSize} />}
    </button>
  );
}
