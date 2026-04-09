// Voice announcement helper using Web Speech API

import { supportedLanguages, type LangCode } from "./trainingData";

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function speakText(text: string, langCode: LangCode) {
  if (!("speechSynthesis" in window)) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const lang = supportedLanguages.find((l) => l.code === langCode);
  if (!lang) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang.speechLang;
  utterance.rate = 0.9;
  utterance.pitch = 1;

  // Try to find a voice matching the language
  const voices = window.speechSynthesis.getVoices();
  const matchingVoice = voices.find((v) => v.lang.startsWith(lang.speechLang.split("-")[0]));
  if (matchingVoice) utterance.voice = matchingVoice;

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
}

export function isSpeaking() {
  return "speechSynthesis" in window && window.speechSynthesis.speaking;
}
