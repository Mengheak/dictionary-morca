import { splitKCC } from "./km-text";

let voices: SpeechSynthesisVoice[] = [];
let voicesReady: Promise<SpeechSynthesisVoice[]> | null = null;
let userInteracted = false;

// -- init --
function initializeTTS() {
  if (userInteracted || !("speechSynthesis" in window)) return;
  const dummy = new SpeechSynthesisUtterance("");
  dummy.volume = 0;
  window.speechSynthesis.speak(dummy);
  userInteracted = true;
}

if (typeof window !== "undefined") {
  ["click", "touchstart", "keydown"].forEach((ev) =>
    document.addEventListener(ev, initializeTTS, { once: true, passive: true })
  );
}

// -- voices with reliability check --
function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  if (voicesReady) return voicesReady;
  voicesReady = new Promise((resolve) => {
    const resolveNow = () => {
      voices = window.speechSynthesis.getVoices().filter((v) => v.voiceURI);
      if (voices.length) resolve(voices);
    };
    window.speechSynthesis.onvoiceschanged = resolveNow;
    resolveNow();
    setTimeout(resolveNow, 100);
    setTimeout(resolveNow, 500);
    setTimeout(resolveNow, 1500);
    setTimeout(() => resolve(voices), 2500);
  });
  return voicesReady;
}

export async function listVoices() {
  await loadVoices();
  return voices.slice();
}

export async function findKhmerVoice(): Promise<SpeechSynthesisVoice | null> {
  const list = await loadVoices();
  
  // Exact match: km-KH, km-kh
  const exact = list.find(
    (v) => v.lang?.toLowerCase() === "km-kh" && v.localService
  );
  if (exact) return exact;

  // Khmer language variants
  const kmVariant = list.find(
    (v) => v.lang?.toLowerCase().startsWith("km") && v.localService
  );
  if (kmVariant) return kmVariant;

  // Fallback: named Khmer voices
  const named = list.find((v) =>
    /sreymom|piseth|khmer|cambodia|google.*khmer/i.test(
      `${v.name} ${v.lang}`
    )
  );
  if (named) return named;

  return null;
}

export async function pickVoice(
  preferred: string[] = ["km-KH", "km", "en-US", "en-GB"]
): Promise<SpeechSynthesisVoice | null> {
  const list = await loadVoices();
  for (const lang of preferred) {
    const v = list.find((x) =>
      x.lang?.toLowerCase().startsWith(lang.toLowerCase())
    );
    if (v) return v;
  }
  return list[0] || null;
}

// -- core speak with enhanced options --
export async function speakText(
  text: string,
  opts?: {
    lang?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
    voiceName?: string;
    onNoKhmerVoice?: (fallbackVoice: SpeechSynthesisVoice | null) => void;
    usePhonetic?: boolean;
  }
) {
  if (!("speechSynthesis" in window))
    throw new Error("SpeechSynthesis not supported");
  if (!text?.trim()) return;
  if (!userInteracted)
    throw new Error("Speech requires user interaction. Click to enable TTS.");

  window.speechSynthesis.cancel();
  await new Promise((r) => setTimeout(r, 50));

  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = opts?.rate ?? 0.85;
  utter.pitch = opts?.pitch ?? 1.0;
  utter.volume = opts?.volume ?? 1.0;

  const list = await loadVoices();
  let voice: SpeechSynthesisVoice | null = null;

  // Try to use specified voice
  if (opts?.voiceName) {
    voice = list.find((v) => v.name === opts.voiceName) || null;
  }

  // Try Khmer voice
  if (!voice) voice = await findKhmerVoice();

  // Fallback if no Khmer voice available
  if (!voice || !voice.lang?.toLowerCase().startsWith("km")) {
    opts?.onNoKhmerVoice?.(voice);
    voice = await pickVoice(["en-US", "en-GB", "en"]);
  }

  if (voice) {
    utter.voice = voice;
    utter.lang = voice.lang || opts?.lang || "km-KH";
  } else {
    utter.lang = opts?.lang || "km-KH";
  }

  return new Promise<void>((resolve, reject) => {
    let done = false;
    const timeoutDuration = Math.max(3000, (text.length / 5) * 1000);

    utter.onend = () => {
      if (!done) {
        done = true;
        resolve();
      }
    };

    utter.onerror = (e: SpeechSynthesisErrorEvent) => {
      if (!done) {
        done = true;
        const msg = e.error || "unknown";
        if (msg === "canceled") resolve();
        else reject(new Error(`Speech synthesis failed: ${msg}`));
      }
    };

    try {
      window.speechSynthesis.speak(utter);
      setTimeout(() => {
        if (!done) {
          done = true;
          resolve();
        }
      }, timeoutDuration);
    } catch (e) {
      if (!done) {
        done = true;
        reject(e);
      }
    }
  });
}

export function stopSpeak() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

export async function ttsSupported(): Promise<boolean> {
  return "speechSynthesis" in window;
}

export async function hasKhmerVoice(): Promise<boolean> {
  return !!(await findKhmerVoice());
}

export function enableTTS() {
  initializeTTS();
}

// -- improved phonetic conversion with better pronunciation --
const VOW_PHONETIC: Record<string, string> = {
  "ាា": "aa",
 " ា": "ah",
 " ិ": "i",
 " ី": "ee",
 " ឹ": "eu",
 " ឺ": "uh",
 " ុ": "u",
 " ូ": "oo",
 " ួ": "ua",
 " ើ": "ae",
 " ឿ": "ueae",
 " ោ": "o",
 " ៅ": "ao",
 " ៀ": "ia",
 " េ": "e",
 " ៉": "ae",
 " ៊": "ia",
};

const CONS_PHONETIC: Record<string, string> = {
  ក: "ko",
  ខ: "kho",
  គ: "go",
  ឃ: "kho",
  ង: "ngo",
  ច: "cho",
  ឆ: "chho",
  ជ: "jo",
  ឈ: "chho",
  ញ: "nyo",
  ដ: "do",
  ឋ: "tho",
  ឌ: "do",
  ឍ: "tho",
  ណ: "no",
  ত: "to",
  ថ: "tho",
  ទ: "do",
  ធ: "tho",
  ន: "no",
  ប: "bo",
  ផ: "pho",
  ព: "po",
  ភ: "pho",
  ម: "mo",
  យ: "yo",
  រ: "ro",
  ល: "lo",
  វ: "vo",
  ស: "so",
  ហ: "ho",
  អ: "o",
  ឡ: "lo",
};

function greedy(table: Record<string, string>, s: string) {
  let best = "";
  for (const k of Object.keys(table).sort((a, b) => b.length - a.length)) {
    if (k && s.startsWith(k) && k.length > best.length) best = k;
  }
  return best
    ? { out: table[best], rest: s.slice(best.length) }
    : { out: "", rest: s };
}

export function khmerToPhonetic(khmer: string): string {
  if (!khmer?.trim()) return "";

  const kccs = splitKCC(khmer.normalize("NFC"));
  const phonemes: string[] = [];

  for (let raw of kccs) {
    let s = raw.trim();
    if (!s || /^[\s.,;:!?។ៃ។ា់័់់់់့့့့့०့०့०့००့့့့့့့०့့့့့့့့०့့့့့့့့့့့०့့०့့့့့့००့့့့့့့့့့့့့့့့့००့့့့့०့့့့့့့့့့့့့००့့့့့့့့့့့့့့့့့့့့०့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့०့့့့့့့့့့့०့့့့့့့့့့့့့့့့့့့့०့့့့့००့့००့့့००့့့့००့့့့့့့့့့့့့့့့०့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့०့့့့့့့့့့့့့့့့့့့့့०့့့०့့့့့့့့့့့့့့०့०့့့०့့့့့့့့့့့့့့့့့့့०့့့့့့့့့့့့့့့့့့့့့့့०့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့့०့့့့့့့့့့०့့့့့့့့့့့့့့့့့့့့့።]/
    .test(s)
  ) {
      continue;
    }

    let out = "";
    let i = 0;

    // Process each character
    while (i < s.length) {
      const c = greedy(CONS_PHONETIC, s.slice(i));
      if (c.out) {
        out += c.out;
        i += s.slice(i).length - c.rest.length;
        continue;
      }

      const v = greedy(VOW_PHONETIC, s.slice(i));
      if (v.out) {
        out += v.out;
        i += s.slice(i).length - v.rest.length;
        continue;
      }

      out += s[i];
      i++;
    }

    if (out) phonemes.push(out);
  }

  return phonemes.join(" ").replace(/\s{2,}/g, " ").trim();
}

// -- smart word speaking --
export async function speakWordSmart(
  word: {
    term: string;
    meaning?: string;
    phonetic?: string;
  },
  opts?: {
    rate?: number;
    pitch?: number;
    volume?: number;
    preferMeaning?: boolean;
  }
) {
  const km = await findKhmerVoice();
  
  if (km && km.lang?.toLowerCase().startsWith("km")) {
    const text =
      opts?.preferMeaning && word.meaning
        ? `${word.term}។ ${word.meaning}`
        : word.term;
    return speakText(text, {
      rate: opts?.rate ?? 0.8,
      pitch: 1.0,
      volume: 1.0,
      voiceName: km.name,
    });
  }

  // Fallback: use phonetic
  const phonetic = word.phonetic || khmerToPhonetic(word.term);
  return speakText(phonetic, {
    lang: "en-US",
    rate: opts?.rate ?? 0.85,
    pitch: opts?.pitch ?? 1.0,
    volume: opts?.volume ?? 1.0,
  });
}

// -- utility functions --
export async function getVoiceInfo() {
  await loadVoices();
  const km = await findKhmerVoice();
  return {
    totalVoices: voices.length,
    khmerVoice: km
      ? { name: km.name, lang: km.lang, localService: km.localService }
      : null,
    availableLangs: [...new Set(voices.map((v) => v.lang))].sort(),
    userInteracted,
    khmerSupported: !!km,
  };
}

// -- batch speaking with proper timing --
export async function speakWordsSequentially(
  words: Array<{ term: string; meaning?: string; phonetic?: string }>,
  opts?: { delay?: number; rate?: number; pitch?: number; volume?: number }
) {
  const delay = opts?.delay ?? 800;
  for (const word of words) {
    await speakWordSmart(word, {
      rate: opts?.rate,
      pitch: opts?.pitch,
      volume: opts?.volume,
    });
    await new Promise((r) => setTimeout(r, delay));
  }
}