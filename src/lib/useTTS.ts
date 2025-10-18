import { useCallback, useEffect, useRef, useState } from 'react';
import {
  speakText,
  stopSpeak,
  ttsSupported,
  listVoices,
  hasKhmerVoice,
  enableTTS,
  speakWordSmart,
  getVoiceInfo,
  khmerToPhonetic,
  findKhmerVoice,
} from './tts';

export interface TTSWord {
  term: string;
  meaning?: string;
  phonetic?: string;
}

export interface TTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  lang?: string;
}

export interface UseTTSReturn {
  supported: boolean;
  speaking: boolean;
  error: string | null;
  khmerAvailable: boolean | null;
  initialized: boolean;
  voiceCount: number | null;
  
  initialize: () => void;
  speak: (text: string, opts?: TTSOptions) => Promise<void>;
  speakWord: (word: TTSWord, opts?: Omit<TTSOptions, 'lang'>) => Promise<void>;
  stop: () => void;
  clearError: () => void;
  getPhonetic: (khmer: string) => string;
}

export function useTTS(defaultLang = 'km-KH'): UseTTSReturn {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [khmerAvailable, setKhmerAvailable] = useState<boolean | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [voiceCount, setVoiceCount] = useState<number | null>(null);
  
  const cancelRef = useRef(false);
  const speakTimeoutRef = useRef(null);

  // Initialization effect
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const isSupported = await ttsSupported();
        if (!mounted) return;
        setSupported(isSupported);

        if (!isSupported || !('speechSynthesis' in window)) {
          setKhmerAvailable(false);
          return;
        }

        const voices = await listVoices();
        if (mounted) setVoiceCount(voices.length);

        const hasKhmer = await hasKhmerVoice();
        if (mounted) setKhmerAvailable(hasKhmer);
      } catch (e) {
        if (mounted) {
          console.error('TTS initialization error:', e);
          setSupported(false);
          setKhmerAvailable(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // Initialize TTS (requires user gesture)
  const initialize = useCallback(() => {
    if (initialized || !supported) return;

    enableTTS();
    setInitialized(true);
  }, [initialized, supported]);

  // Speak text with enhanced error handling
  const speak = useCallback(
    async (text: string, opts?: TTSOptions): Promise<void> => {
      if (!supported || !text?.trim()) return;

      if (!initialized) {
        setError('TTS not initialized. Click to enable.');
        return;
      }

      if (speaking) {
        setError('Already speaking. Wait or stop current speech.');
        return;
      }

      cancelRef.current = false;
      setSpeaking(true);
      setError(null);

      // Clear any pending timeout
      if (speakTimeoutRef.current) clearTimeout(speakTimeoutRef.current);

      try {
        const khmerVoice = await findKhmerVoice();
        const lang = opts?.lang || defaultLang;

        await speakText(text, {
          lang,
          rate: opts?.rate ?? 0.85,
          pitch: opts?.pitch ?? 1.0,
          volume: opts?.volume ?? 1.0,
          onNoKhmerVoice: (fallback) => {
            console.warn(
              'Khmer voice unavailable, using:',
              fallback?.name || 'system default'
            );
          },
        });
      } catch (e) {
        if (!cancelRef.current) {
          const msg = e instanceof Error ? e.message : String(e);
          setError(msg);
          console.error('TTS Error:', msg);
        }
      } finally {
        if (!cancelRef.current) {
          setSpeaking(false);
        }
      }
    },
    [supported, initialized, speaking, defaultLang]
  );

  // Speak word with smart fallback
  const speakWord = useCallback(
    async (word: TTSWord, opts?: Omit<TTSOptions, 'lang'>): Promise<void> => {
      if (!supported || !word?.term?.trim()) return;

      if (!initialized) {
        setError('TTS not initialized. Click to enable.');
        return;
      }

      if (speaking) {
        setError('Already speaking. Wait or stop current speech.');
        return;
      }

      cancelRef.current = false;
      setSpeaking(true);
      setError(null);

      if (speakTimeoutRef.current) clearTimeout(speakTimeoutRef.current);

      try {
        await speakWordSmart(
          {
            term: word.term,
            meaning: word.meaning,
            phonetic: word.phonetic,
          },
          {
            rate: opts?.rate ?? 0.85,
            pitch: opts?.pitch ?? 1.0,
            volume: opts?.volume ?? 1.0,
            preferMeaning: false,
          }
        );
      } catch (e) {
        if (!cancelRef.current) {
          const msg = e instanceof Error ? e.message : String(e);
          setError(msg);
          console.error('TTS Word Error:', msg);
        }
      } finally {
        if (!cancelRef.current) {
          setSpeaking(false);
        }
      }
    },
    [supported, initialized, speaking]
  );

  // Stop speaking
  const stop = useCallback(() => {
    cancelRef.current = true;
    stopSpeak();
    if (speakTimeoutRef.current) clearTimeout(speakTimeoutRef.current);
    setSpeaking(false);
  }, []);

  // Clear error message
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Get phonetic representation
  const getPhonetic = useCallback((khmer: string): string => {
    return khmerToPhonetic(khmer);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (speakTimeoutRef.current) clearTimeout(speakTimeoutRef.current);
      cancelRef.current = true;
      stopSpeak();
    };
  }, []);

  return {
    supported,
    speaking,
    error,
    khmerAvailable,
    initialized,
    voiceCount,
    initialize,
    speak,
    speakWord,
    stop,
    clearError,
    getPhonetic,
  };
}