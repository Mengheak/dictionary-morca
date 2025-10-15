// src/lib/tts.ts
let voices: SpeechSynthesisVoice[] = [];
let voicesReady: Promise<SpeechSynthesisVoice[]> | null = null;

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (voicesReady) return voicesReady;
  voicesReady = new Promise((resolve) => {
    const init = () => {
      voices = window.speechSynthesis.getVoices();
      if (voices.length) resolve(voices);
    };
    window.speechSynthesis.onvoiceschanged = () => {
      voices = window.speechSynthesis.getVoices();
      resolve(voices);
    };
    init();
    // fallback timer in case onvoiceschanged never fires
    setTimeout(() => {
      if (!voices.length) voices = window.speechSynthesis.getVoices();
      resolve(voices);
    }, 500);
  });
  return voicesReady;
}

export async function pickVoice(preferredLangs: string[] = ['km-KH', 'km', 'en-US']) {
  const list = await loadVoices();
  for (const lang of preferredLangs) {
    const v = list.find((x) => x.lang?.toLowerCase().startsWith(lang.toLowerCase()));
    if (v) return v;
  }
  return list[0] || null;
}

export async function speakText(text: string, opts?: {
  lang?: string;
  rate?: number;   // 0.1 - 10
  pitch?: number;  // 0 - 2
  volume?: number; // 0 - 1
  voiceName?: string;
}) {
  if (!('speechSynthesis' in window)) throw new Error('SpeechSynthesis not supported');
  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = opts?.lang ?? 'km-KH';
  utter.rate = opts?.rate ?? 1.0;
  utter.pitch = opts?.pitch ?? 1.0;
  utter.volume = opts?.volume ?? 1.0;

  const list = await loadVoices();
  let voice = list.find(v => v.name === opts?.voiceName);
  if (!voice) voice = await pickVoice([utter.lang, 'km', 'en-US']);
  if (voice) utter.voice = voice;

  window.speechSynthesis.speak(utter);
  return new Promise<void>((resolve, reject) => {
    utter.onend = () => resolve();
    utter.onerror = (e) => reject(e.error || e);
  });
}

export function stopSpeak() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

export async function ttsSupported() {
  return 'speechSynthesis' in window;
}
