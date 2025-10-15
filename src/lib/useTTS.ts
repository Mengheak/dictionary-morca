// src/lib/useTTS.ts
import { useCallback, useEffect, useRef, useState } from 'react';
import { speakText, stopSpeak, ttsSupported } from './tts';

export function useTTS(defaultLang = 'km-KH') {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cancelRef = useRef(false);

  useEffect(() => { 
    ttsSupported().then(setSupported); 
    
    // Debug: Log available voices
    if ('speechSynthesis' in window) {
      setTimeout(() => {
        const voices = window.speechSynthesis.getVoices();
        console.log('Available voices:', voices.map(v => ({
          name: v.name,
          lang: v.lang,
          default: v.default
        })));
        
        const khmerVoice = voices.find(v => v.lang.startsWith('km'));
        console.log('Khmer voice found:', khmerVoice ? khmerVoice.name : 'NONE');
      }, 1000);
    }
  }, []);

  const speak = useCallback(async (text: string, lang = defaultLang) => {
    if (!supported || !text?.trim()) return;
    
    cancelRef.current = false;
    setSpeaking(true);
    setError(null);
    
    try {
      console.log('Attempting to speak:', text, 'with lang:', lang);
      await speakText(text, { lang });
      console.log('Speech completed');
    } catch (e) {
      console.error('Speech error:', e);
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      if (!cancelRef.current) setSpeaking(false);
    }
  }, [supported, defaultLang]);

  const stop = useCallback(() => {
    cancelRef.current = true;
    stopSpeak();
    setSpeaking(false);
  }, []);

  return { supported, speaking, speak, stop, error };
}