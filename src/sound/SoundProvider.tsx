import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { loadChildName, saveChildName } from "../game/storage";

type SoundName = "tap" | "start" | "correct" | "tryAgain" | "stars" | "celebrate" | "complete" | "reset" | "boing" | "giggle";

type SoundContextValue = {
  enabled: boolean;
  toggleEnabled: () => void;
  play: (name: SoundName) => void;
  speak: (text: string) => void;
  childName: string;
  setChildName: (name: string) => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);

type Note = {
  frequency: number;
  start: number;
  duration: number;
  type?: OscillatorType;
  gain?: number;
  sweepTo?: number;
};

const cueMap: Record<SoundName, Note[]> = {
  tap: [{ frequency: 420, start: 0, duration: 0.07, type: "sine", gain: 0.09 }],
  start: [
    { frequency: 392, start: 0, duration: 0.09, type: "triangle", gain: 0.1 },
    { frequency: 523.25, start: 0.07, duration: 0.13, type: "triangle", gain: 0.11 },
  ],
  correct: [
    { frequency: 523.25, start: 0, duration: 0.11, type: "triangle", gain: 0.14 },
    { frequency: 659.25, start: 0.09, duration: 0.13, type: "triangle", gain: 0.14 },
    { frequency: 783.99, start: 0.19, duration: 0.18, type: "triangle", gain: 0.13 },
  ],
  tryAgain: [
    { frequency: 246.94, start: 0, duration: 0.09, type: "sine", gain: 0.08 },
    { frequency: 220, start: 0.08, duration: 0.11, type: "sine", gain: 0.065 },
  ],
  stars: [
    { frequency: 783.99, start: 0, duration: 0.09, type: "sine", gain: 0.11 },
    { frequency: 987.77, start: 0.08, duration: 0.09, type: "sine", gain: 0.11 },
    { frequency: 1174.66, start: 0.16, duration: 0.13, type: "sine", gain: 0.09 },
  ],
  celebrate: [
    { frequency: 523.25, start: 0, duration: 0.1, type: "triangle", gain: 0.13 },
    { frequency: 659.25, start: 0.08, duration: 0.1, type: "triangle", gain: 0.13 },
    { frequency: 783.99, start: 0.16, duration: 0.12, type: "triangle", gain: 0.13 },
    { frequency: 1046.5, start: 0.28, duration: 0.24, type: "triangle", gain: 0.12 },
    { frequency: 1318.51, start: 0.5, duration: 0.2, type: "triangle", gain: 0.1 },
    { frequency: 720, start: 0.78, duration: 0.07, type: "square", gain: 0.09 },
    { frequency: 330, start: 0.86, duration: 0.07, type: "square", gain: 0.09 },
    { frequency: 720, start: 0.94, duration: 0.07, type: "square", gain: 0.09 },
    { frequency: 330, start: 1.02, duration: 0.09, type: "square", gain: 0.09 },
  ],
  complete: [
    { frequency: 392, start: 0, duration: 0.11, type: "triangle", gain: 0.13 },
    { frequency: 523.25, start: 0.1, duration: 0.11, type: "triangle", gain: 0.13 },
    { frequency: 659.25, start: 0.2, duration: 0.13, type: "triangle", gain: 0.13 },
    { frequency: 783.99, start: 0.34, duration: 0.15, type: "triangle", gain: 0.12 },
    { frequency: 1046.5, start: 0.5, duration: 0.32, type: "triangle", gain: 0.11 },
  ],
  reset: [{ frequency: 196, start: 0, duration: 0.13, type: "sine", gain: 0.07 }],
  boing: [
    { frequency: 520, sweepTo: 140, start: 0, duration: 0.16, type: "sine", gain: 0.16 },
    { frequency: 160, sweepTo: 400, start: 0.15, duration: 0.12, type: "sine", gain: 0.12 },
  ],
  giggle: [
    { frequency: 520, start: 0, duration: 0.05, type: "triangle", gain: 0.1 },
    { frequency: 620, start: 0.07, duration: 0.05, type: "triangle", gain: 0.1 },
    { frequency: 740, start: 0.14, duration: 0.07, type: "triangle", gain: 0.1 },
  ],
};

// Chrome silently drops speech if the SpeechSynthesisUtterance is garbage-collected
// before it finishes, so a module-level reference keeps it alive while speaking.
let activeUtterance: SpeechSynthesisUtterance | null = null;
let cachedVoice: SpeechSynthesisVoice | null = null;

function pickVoice(synth: SpeechSynthesis): SpeechSynthesisVoice | null {
  if (cachedVoice) {
    return cachedVoice;
  }
  const voices = synth.getVoices();
  if (voices.length === 0) {
    return null;
  }

  const english = voices.filter((voice) => /en/i.test(voice.lang));
  const pool = english.length > 0 ? english : voices;

  // Remote (network) voices like "Google US English" fail silently when a browser's
  // network request to the TTS service is blocked (ad blockers, offline, proxies) —
  // prefer a voice the OS ships locally so speech doesn't depend on that request.
  cachedVoice =
    pool.find((voice) => voice.localService && /female|samantha|victoria|zira|karen|moira|fiona/i.test(voice.name)) ??
    pool.find((voice) => voice.localService) ??
    pool[0];
  return cachedVoice;
}

function speakUtterance(synth: SpeechSynthesis, text: string, options?: { pitch?: number; rate?: number }, isRetry?: boolean) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = options?.pitch ?? 1.15;
  utterance.rate = options?.rate ?? 0.95;
  utterance.volume = 1;
  if (!isRetry) {
    const voice = pickVoice(synth);
    if (voice) {
      utterance.voice = voice;
    }
  }
  utterance.onerror = () => {
    // A remote voice can fail after being picked (network blocked mid-flight);
    // fall back once to the browser's untouched default voice instead of staying silent.
    if (!isRetry) {
      cachedVoice = null;
      utterance.onerror = null;
      speakUtterance(synth, text, options, true);
    }
  };
  activeUtterance = utterance;

  synth.resume();
  if (synth.speaking || synth.pending) {
    synth.cancel();
  }
  window.setTimeout(() => synth.speak(utterance), 30);
}

function speakAloud(text: string, options?: { pitch?: number; rate?: number }) {
  const synth = window.speechSynthesis;
  if (!synth) {
    return;
  }

  // Voices load asynchronously in some browsers; if the list isn't ready yet,
  // speak() silently no-ops instead of queuing, so wait for it once.
  if (synth.getVoices().length === 0) {
    const onVoices = () => {
      synth.removeEventListener("voiceschanged", onVoices);
      speakUtterance(synth, text, options);
    };
    synth.addEventListener("voiceschanged", onVoices);
    window.setTimeout(onVoices, 300);
    return;
  }

  speakUtterance(synth, text, options);
}

const celebratePhrases = ["Yay!", "Woohoo!", "Amazing!", "You did it!", "Super job!", "High five!"];
const celebrateNamedPhrases = ["Very good, {name}!", "Great job, {name}!", "Yay, {name}!", "Well done, {name}!", "{name}, you did it!"];
const completePhrases = ["Yay! You finished the whole trail!", "Woohoo! You're a superstar!", "Amazing job, you did it all!"];
const completeNamedPhrases = ["Very good, {name}! You finished the whole trail!", "{name}, you're a superstar!", "Amazing job, {name}! You did it all!"];
const tryAgainPhrases = ["Oh no! Try again!", "Oops! Try again!", "Almost! One more try!", "Uh oh! Try again!"];

function randomOf(list: string[]) {
  return list[Math.floor(Math.random() * list.length)];
}

function personalize(list: string[], namedList: string[], childName: string) {
  const trimmed = childName.trim();
  if (!trimmed) {
    return randomOf(list);
  }
  return randomOf(namedList).replace("{name}", trimmed);
}

const cheerBuilders: Partial<Record<SoundName, (childName: string) => string>> = {
  celebrate: (childName) => personalize(celebratePhrases, celebrateNamedPhrases, childName),
  complete: (childName) => personalize(completePhrases, completeNamedPhrases, childName),
  tryAgain: () => randomOf(tryAgainPhrases),
};

export function SoundProvider({ children }: { children: ReactNode }) {
  const contextRef = useRef<AudioContext | null>(null);
  const [enabled, setEnabled] = useState(true);
  const [childName, setChildNameState] = useState(() => loadChildName());

  function setChildName(name: string) {
    setChildNameState(name);
    saveChildName(name);
  }

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) {
      return;
    }

    // Some browsers only allow the very first speak() call if it happens inside
    // a user gesture; priming a silent utterance on first tap unlocks the rest.
    function unlock() {
      synth.getVoices();
      const primer = new SpeechSynthesisUtterance(" ");
      primer.volume = 0;
      synth.speak(primer);
      document.removeEventListener("pointerdown", unlock);
    }

    document.addEventListener("pointerdown", unlock, { once: true });
    return () => document.removeEventListener("pointerdown", unlock);
  }, []);

  const value = useMemo<SoundContextValue>(() => {
    function getContext() {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        return null;
      }

      if (!contextRef.current) {
        contextRef.current = new AudioContextClass();
      }

      if (contextRef.current.state === "suspended") {
        void contextRef.current.resume();
      }

      return contextRef.current;
    }

    function play(name: SoundName) {
      if (!enabled) {
        return;
      }

      const audioContext = getContext();
      if (!audioContext) {
        return;
      }

      const master = audioContext.createGain();
      master.gain.setValueAtTime(0.85, audioContext.currentTime);
      master.connect(audioContext.destination);

      const buildCheer = cheerBuilders[name];
      if (buildCheer) {
        speakAloud(buildCheer(childName), { pitch: 1.5, rate: 1.05 });
      }

      cueMap[name].forEach((note) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const startsAt = audioContext.currentTime + note.start;
        const endsAt = startsAt + note.duration;

        oscillator.type = note.type ?? "sine";
        oscillator.frequency.setValueAtTime(note.frequency, startsAt);
        if (note.sweepTo) {
          oscillator.frequency.exponentialRampToValueAtTime(note.sweepTo, endsAt);
        }
        gain.gain.setValueAtTime(0.0001, startsAt);
        gain.gain.exponentialRampToValueAtTime(note.gain ?? 0.05, startsAt + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, endsAt);
        oscillator.connect(gain);
        gain.connect(master);
        oscillator.start(startsAt);
        oscillator.stop(endsAt + 0.015);
      });
    }

    return {
      enabled,
      toggleEnabled: () => setEnabled((current) => !current),
      play,
      speak: (text: string) => {
        if (enabled) {
          speakAloud(text);
        }
      },
      childName,
      setChildName,
    };
  }, [enabled, childName]);

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used inside SoundProvider");
  }

  return context;
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}
