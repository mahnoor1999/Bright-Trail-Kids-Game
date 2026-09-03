import { initialProgress } from "./progression";
import type { ProgressState } from "../types";

const STORAGE_KEY = "bright-trail-progress-v1";

function isProgressState(value: unknown): value is ProgressState {
  if (!value || typeof value !== "object") {
    return false;
  }

  const state = value as Partial<ProgressState>;
  return (
    typeof state.totalStars === "number" &&
    typeof state.currentLevel === "number" &&
    typeof state.completedActivities === "object" &&
    Array.isArray(state.unlockedBadges)
  );
}

export function loadProgress(): ProgressState {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return initialProgress;
    }

    const parsed = JSON.parse(stored) as unknown;
    return isProgressState(parsed) ? parsed : initialProgress;
  } catch {
    return initialProgress;
  }
}

export function saveProgress(progress: ProgressState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Local progress is nice-to-have; the game remains playable if storage is blocked.
  }
}

export function resetProgress(): void {
  window.localStorage.removeItem(STORAGE_KEY);
}

const CHILD_NAME_KEY = "bright-trail-child-name-v1";

export function loadChildName(): string {
  try {
    return window.localStorage.getItem(CHILD_NAME_KEY) ?? "";
  } catch {
    return "";
  }
}

export function saveChildName(name: string): void {
  try {
    window.localStorage.setItem(CHILD_NAME_KEY, name);
  } catch {
    // Personalization is nice-to-have; the game remains playable if storage is blocked.
  }
}
