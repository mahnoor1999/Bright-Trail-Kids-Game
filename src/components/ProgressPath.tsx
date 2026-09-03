import type { Activity, ProgressState } from "../types";

type ProgressPathProps = {
  activities: Activity[];
  progress: ProgressState;
  activeId?: string;
  onSelect?: (activityId: string) => void;
};

export function ProgressPath({ activities, progress, activeId, onSelect }: ProgressPathProps) {
  const completedCount = activities.filter((activity) => progress.completedActivities[activity.id]).length;

  return (
    <div className="path" aria-label="Learning path">
      {activities.map((activity, index) => {
        const result = progress.completedActivities[activity.id];
        const isCurrent = activeId ? activity.id === activeId : index === completedCount;
        const locked = !result && !isCurrent;

        return (
          <button
            className={`path-node${result ? " path-done" : ""}${isCurrent ? " path-current" : ""}${locked ? " path-locked" : ""}`}
            key={activity.id}
            type="button"
            disabled={locked || !onSelect}
            onClick={() => onSelect?.(activity.id)}
            aria-label={`${activity.title}${result ? `, ${result.starsEarned} stars` : locked ? ", locked" : ", next"}`}
          >
            <span className="node-dot">{result ? "★".repeat(result.starsEarned) : locked ? "•" : "▶"}</span>
            <small>{index + 1}</small>
          </button>
        );
      })}
      <div className={`path-finish${completedCount === activities.length ? " path-finish-on" : ""}`}>
        <span>★</span>
        <strong>Level</strong>
      </div>
    </div>
  );
}
