import { badges } from "../data/badges";
import { patternActivities } from "../data/patternActivities";
import type { ProgressState } from "../types";
import { ProgressPath } from "../components/ProgressPath";
import { useSound } from "../sound/SoundProvider";

type ProgressScreenProps = {
  progress: ProgressState;
  onBack: () => void;
};

export function ProgressScreen({ progress, onBack }: ProgressScreenProps) {
  const { play } = useSound();

  return (
    <section className="progress-screen screen-enter">
      <button className="soft-link" type="button" onClick={() => { play("tap"); onBack(); }}>Back</button>
      <div className="section-heading large">
        <div>
          <p className="eyebrow">Learning journey</p>
          <h1>Level {progress.currentLevel}</h1>
        </div>
        <strong>{progress.totalStars} stars</strong>
      </div>
      <ProgressPath activities={patternActivities} progress={progress} />
      <div className="badge-grid">
        {badges.map((badge) => {
          const unlocked = progress.unlockedBadges.includes(badge.id);
          return (
            <div className={`badge-card${unlocked ? " badge-on" : ""}`} key={badge.id}>
              <span style={{ backgroundColor: badge.color }}>★</span>
              <strong>{badge.name}</strong>
              <small>{badge.starsRequired}</small>
            </div>
          );
        })}
      </div>
    </section>
  );
}
