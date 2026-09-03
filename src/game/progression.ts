import { attentionActivities } from "../data/attentionActivities";
import { badges } from "../data/badges";
import { countTapActivities } from "../data/countTapActivities";
import { memoryMatchActivities } from "../data/memoryMatchActivities";
import { patternActivities } from "../data/patternActivities";
import { puzzleActivities } from "../data/puzzleActivities";
import { shapeActivities } from "../data/shapeActivities";
import type { Activity, ActivityResult, CategoryId, ProgressState } from "../types";

export const initialProgress: ProgressState = {
  totalStars: 0,
  currentLevel: 1,
  completedActivities: {},
  unlockedBadges: [],
};

const activitiesByCategory: Partial<Record<CategoryId, Activity[]>> = {
  logic: patternActivities,
  patterns: patternActivities,
  shapes: shapeActivities,
  attention: attentionActivities,
  memory: memoryMatchActivities,
  math: countTapActivities,
  puzzles: puzzleActivities,
};

export function getActivitiesForCategory(categoryId: CategoryId): Activity[] {
  return activitiesByCategory[categoryId] ?? [];
}

export function getNextActivity(progress: ProgressState, categoryId: CategoryId): Activity | undefined {
  return getActivitiesForCategory(categoryId).find((activity) => !progress.completedActivities[activity.id]);
}

export function isLevelComplete(progress: ProgressState, categoryId: CategoryId): boolean {
  const activities = getActivitiesForCategory(categoryId);
  return activities.length > 0 && activities.every((activity) => progress.completedActivities[activity.id]);
}

export function getLevelProgress(progress: ProgressState, categoryId: CategoryId): number {
  const activities = getActivitiesForCategory(categoryId);
  if (activities.length === 0) {
    return 0;
  }
  const completed = activities.filter((activity) => progress.completedActivities[activity.id]).length;
  return completed / activities.length;
}

export function applyActivityResult(progress: ProgressState, result: ActivityResult): ProgressState {
  if (progress.completedActivities[result.activityId]) {
    return progress;
  }

  const totalStars = progress.totalStars + result.starsEarned;
  const unlockedBadges = badges
    .filter((badge) => totalStars >= badge.starsRequired)
    .map((badge) => badge.id);

  const nextCompleted = {
    ...progress.completedActivities,
    [result.activityId]: result,
  };

  return {
    ...progress,
    totalStars,
    completedActivities: nextCompleted,
    unlockedBadges,
    currentLevel: isLevelComplete({ ...progress, completedActivities: nextCompleted }, result.categoryId)
      ? 2
      : progress.currentLevel,
  };
}

export function getAccuracy(progress: ProgressState): number {
  const results = Object.values(progress.completedActivities);
  if (results.length === 0) {
    return 100;
  }

  const correctFirstTry = results.filter((result) => result.attempts === 1).length;
  return Math.round((correctFirstTry / results.length) * 100);
}
