// Frontend client for your Node proxy (the one you just posted)
type Voice = {
  voice_id: string;
  name?: string;
  gender?: string;
  language_code?: string;
  label?: string;
};


const BASE = (import.meta.env.VITE_TTS_BASE || '').replace(/\/+$/, '');

function b64ToBlob(b64: string, mime = 'audio/mpeg') {
  const bin = atob(b64);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return new Blob([buf], { type: mime });
}

let audioEl: HTMLAudioElement | null = null;

export async function fetchKhmerVoices(): Promise<Voice[]> {
  const res = await fetch(`${BASE}/api/voices?language_code=km-KH`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error(`voices: ${res.status}`);
  const payload = await res.json();
  const list: Voice[] = Array.isArray(payload) ? payload : (payload.data ?? payload);
  return list;
}

export async function speakKhmer(text: string, voiceId: string, options?: {
  pitch?: number | 'default';
  rate?: number | 'default';
  volume?: number | 'default';
}) {
  if (!text?.trim() || !voiceId) return;

  try { audioEl?.pause(); audioEl = null; } catch {}
  
  const res = await fetch(`${BASE}/api/speak`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      text,
      voiceId,
      pitch: options?.pitch ?? 'default',
      rate : options?.rate  ?? 'default',
      volume: options?.volume ?? 'default',
    }),
  });

  if (!res.ok) throw new Error(`speak: ${res.status}`);
  const json = await res.json(); // { status, audio: "<base64>" }
  if (!json?.audio) throw new Error('No audio returned');

  const blob = b64ToBlob(json.audio, 'audio/mpeg');
  const url = URL.createObjectURL(blob);
  audioEl = new Audio(url);
  audioEl.onended = () => URL.revokeObjectURL(url);

  await audioEl.play();
}

export function stopSpeak() {
  try { audioEl?.pause(); } catch {}
  audioEl = null;
}
