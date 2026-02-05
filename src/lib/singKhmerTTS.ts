
type Dict = Record<string, string>;

const VOW_IPA: Dict = {
  "aa": "aː",
  "ii": "iː",
  "uu": "uː",
  "oe": "ɤː",   // Khmer 'oe' ~ /ɤ/ (long-ish)
  "ue": "ɯə",   // ឿ ~ /ɯə/
  "ua": "uə",
  "ia": "iə",
  "ae": "ae",
  "ai": "aj",
  "ao": "aw",   // fallback
  "ao̞": "aw",
  "aŏ": "aw",
  "aô": "aw",
  "aǒ": "aw",
  "aó": "aw",
  "aò": "aw",
  "aõ": "aw",
  "aö": "aw",
  "aö̞": "aw",
  "aö̆": "aw",
  "aö̂": "aw",
  "aö̌": "aw",
  "aö́": "aw",
  "aö̀": "aw",
  "aö̃": "aw",
  "aö̈": "aw",

  "e": "e",
  "o": "o",
  "a": "a",
  "i": "i",
  "u": "u",
};

const CONS_IPA: Dict = {
  "kh": "kʰ",
  "chh": "t͡ɕʰ",
  "ch": "t͡ɕ",
  "nh": "ɲ",
  "ng": "ŋ",
  "ph": "pʰ",
  "th": "tʰ",

  "k": "k",
  "g": "ɡ",    // if you ever use 'g' in translit
  "c": "t͡ɕ",  // sometimes used
  "j": "d͡ʑ",  // sometimes used
  "d": "d",
  "t": "t",
  "b": "b",
  "p": "p",
  "m": "m",
  "n": "n",
  "y": "j",
  "r": "r",
  "l": "l",
  "v": "ʋ",
  "w": "w",
  "s": "s",
  "h": "h",
  "’": "ʔ",
  "'": "ʔ",
};

const PUNCT_IPA: Dict = { "-": ".", " ": " " };

function greedyReplace(str: string, table: Dict): { out: string; rest: string } {
  let bestKey = "";
  for (const k of Object.keys(table)) {
    if (!k) continue;
    if (str.startsWith(k) && k.length > bestKey.length) bestKey = k;
  }
  if (bestKey) return { out: table[bestKey], rest: str.slice(bestKey.length) };
  return { out: "", rest: str };
}

function segmentSing(s: string) {
  return s.normalize("NFC").trim().replace(/\s+/g, " ").split(" ");
}

export function singToIPA(sing: string): string {
  const ipaWords: string[] = [];
  for (const word of segmentSing(sing)) {
    let w = word.toLowerCase();
    let ipa = "";
    while (w.length) {
      const p = greedyReplace(w, PUNCT_IPA);
      if (p.out) { ipa += p.out; w = p.rest; continue; }

      const c = greedyReplace(w, CONS_IPA);
      if (c.out) {
        ipa += c.out;
        w = c.rest;

        const v = greedyReplace(w, VOW_IPA);
        if (v.out) { ipa += v.out; w = v.rest; }
        continue;
      }

      const v2 = greedyReplace(w, VOW_IPA);
      if (v2.out) { ipa += v2.out; w = v2.rest; continue; }

      ipa += w[0];
      w = w.slice(1);
    }
    ipaWords.push(ipa);
  }
  return ipaWords.join(" ");
}

export function buildSingKhmerSSML(singKhmer: string, opts?: { rate?: string; pitch?: string; voice?: string }) {
  const ipa = singToIPA(singKhmer);
  const voice = opts?.voice ?? "en-US-AriaNeural"; // or another EN voice that supports IPA
  const rate = opts?.rate ?? "0%";
  const pitch = opts?.pitch ?? "0%";

  return `
<speak version="1.0" xml:lang="en-US">
  <voice name="${voice}">
    <prosody rate="${rate}" pitch="${pitch}">
      <phoneme alphabet="ipa" ph="${ipa}">${singKhmer}</phoneme>
    </prosody>
  </voice>
</speak>`.trim();
}

