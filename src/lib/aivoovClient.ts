// src/lib/aivoovClient.ts
type Voice = {
  voice_id: string;
  name: string;
  gender: 'Male' | 'Female';
  language_code: string;
  label: string;
};

function b64ToBlob(b64: string, mime = 'audio/mpeg') {
  const bin = atob(b64);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return new Blob([buf], { type: mime });
}

export async function getKhmerVoices(): Promise<Voice[]> {
  const r = await fetch('/api/aivoov/voices?language_code=km-KH', { credentials: 'include' });
  if (!r.ok) throw new Error('voices ' + r.status);
  const payload = await r.json();
  return Array.isArray(payload) ? payload : payload.data ?? [];
}

export async function speakKhmer(text: string, voiceId: string) {
  const r = await fetch('/api/aivoov/speak', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ text, voiceId })
  });
  if (!r.ok) throw new Error('speak ' + r.status);
  const json = await r.json(); 
  if (!json?.audio) throw new Error('No audio in response');
  const url = URL.createObjectURL(b64ToBlob(json.audio));
  const audio = new Audio(url);
  await audio.play();
  audio.onended = () => URL.revokeObjectURL(url);
}
