import { useCallback, useEffect, useState } from 'react';
import { fetchKhmerVoices, speakKhmer, stopSpeak } from './tts';

export function useTTS() {
  const [voices, setVoices] = useState<{ id: string; label: string }[]>([]);
  const [voiceId, setVoiceId] = useState<string>('');
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // load once
  useEffect(() => {
    (async () => {
      try {
        const v = await fetchKhmerVoices();
        const list = v.map(x => ({
          id: x.voice_id,
          label: x.label || `${x.name} (${x.language_code})`,
        }));
        setVoices(list);
        const saved = localStorage.getItem('kmVoice');
        setVoiceId(saved && list.some(l => l.id === saved) ? saved : (list[0]?.id ?? ''));
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    })();
  }, []);

  const chooseVoice = useCallback((id: string) => {
    setVoiceId(id);
    localStorage.setItem('kmVoice', id);
  }, []);

  const speak = useCallback(async (text: string) => {
    if (!text?.trim() || !voiceId) return;
    setSpeaking(true); setError(null);
    try {
      await speakKhmer(text, voiceId);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSpeaking(false);
    }
  }, [voiceId]);

  const stop = useCallback(() => {
    stopSpeak();
    setSpeaking(false);
  }, []);

  return { voices, voiceId, chooseVoice, speak, stop, speaking, error };
}
