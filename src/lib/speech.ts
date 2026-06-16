import { LanguageCode } from "../types";

const voiceMap: Record<string, string> = {
  ja: "ja-JP",
  zh: "zh-CN",
  en: "en-US",
  es: "es-ES"
};

export function speakText(languageCode: LanguageCode, text: string) {
  if (!("speechSynthesis" in window)) return false;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = voiceMap[languageCode] ?? "en-US";
  utterance.rate = 0.83;
  utterance.pitch = 1;

  const voices = window.speechSynthesis.getVoices();
  const lang = utterance.lang;
  const voice = voices.find((item) => item.lang === lang) || voices.find((item) => item.lang.startsWith(lang.slice(0, 2)));

  if (voice) utterance.voice = voice;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  return true;
}
