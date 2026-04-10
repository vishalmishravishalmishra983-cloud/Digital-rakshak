// Voice announcement helper using Web Speech API
// Fixed for PWA/Capacitor app context where gesture context is required

import { supportedLanguages, type LangCode } from "./trainingData";

let currentUtterance: SpeechSynthesisUtterance | null = null;
let cachedVoices: SpeechSynthesisVoice[] = [];

// Pre-load voices (they load async in many browsers/apps)
function loadVoices() {
  if (!("speechSynthesis" in window)) return;
  cachedVoices = window.speechSynthesis.getVoices();
  if (cachedVoices.length === 0) {
    window.speechSynthesis.addEventListener("voiceschanged", () => {
      cachedVoices = window.speechSynthesis.getVoices();
    }, { once: true });
  }
}

// Initialize voices on module load
if (typeof window !== "undefined") {
  loadVoices();
}

/**
 * Creates a pre-initialized utterance in the current gesture context.
 * Call this synchronously inside a click/tap handler BEFORE any async work.
 */
export function createUtteranceInGesture(langCode: LangCode): SpeechSynthesisUtterance | null {
  if (!("speechSynthesis" in window)) return null;

  const lang = supportedLanguages.find((l) => l.code === langCode);
  if (!lang) return null;

  // Create utterance immediately in gesture context
  const utterance = new SpeechSynthesisUtterance("");
  utterance.lang = lang.speechLang;
  utterance.rate = 0.9;
  utterance.pitch = 1;

  // Try to find a matching voice
  if (cachedVoices.length === 0) {
    cachedVoices = window.speechSynthesis.getVoices();
  }
  const matchingVoice = cachedVoices.find((v) => v.lang.startsWith(lang.speechLang.split("-")[0]));
  if (matchingVoice) utterance.voice = matchingVoice;

  return utterance;
}

/**
 * Speak text using Web Speech API.
 * For app/PWA contexts, pass a pre-created utterance from createUtteranceInGesture().
 */
export function speakText(text: string, langCode: LangCode, preCreatedUtterance?: SpeechSynthesisUtterance | null) {
  if (!("speechSynthesis" in window)) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  let utterance: SpeechSynthesisUtterance;

  if (preCreatedUtterance) {
    // Use pre-created utterance (preserves gesture context in apps)
    utterance = preCreatedUtterance;
    utterance.text = text;
  } else {
    // Fallback: create new utterance (works in regular browser)
    const lang = supportedLanguages.find((l) => l.code === langCode);
    if (!lang) return;

    utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang.speechLang;
    utterance.rate = 0.9;
    utterance.pitch = 1;

    if (cachedVoices.length === 0) {
      cachedVoices = window.speechSynthesis.getVoices();
    }
    const matchingVoice = cachedVoices.find((v) => v.lang.startsWith(lang.speechLang.split("-")[0]));
    if (matchingVoice) utterance.voice = matchingVoice;
  }

  currentUtterance = utterance;

  // Workaround: Some mobile browsers need a small resume trick
  window.speechSynthesis.speak(utterance);

  // Android Chrome bug: speech pauses after ~15s, keep it alive
  const keepAlive = setInterval(() => {
    if (!window.speechSynthesis.speaking) {
      clearInterval(keepAlive);
      return;
    }
    window.speechSynthesis.pause();
    window.speechSynthesis.resume();
  }, 10000);

  utterance.onend = () => clearInterval(keepAlive);
  utterance.onerror = () => clearInterval(keepAlive);
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
