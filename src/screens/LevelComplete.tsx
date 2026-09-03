import { useEffect } from "react";
import { Mascot } from "../components/Mascot";
import { ProgressPath } from "../components/ProgressPath";
import { useSound } from "../sound/SoundProvider";
import type { Activity, ProgressState } from "../types";

type LevelCompleteProps = {
  activities: Activity[];
  progress: ProgressState;
  onHome: () => void;
};

export function LevelComplete({ activities, progress, onHome }: LevelCompleteProps) {
  const { play } = useSound();

  useEffect(() => {
    play("complete");
  }, [play]);

  return (
    <section className="level-complete screen-enter">
      <div className="burst" aria-hidden="true" />
      <Mascot mood="proud" character="monkey" />
      <p className="eyebrow">Level complete</p>
      <h1>You finished the first trail!</h1>
      <div className="big-stars" aria-label="Celebration stars">★★★★★</div>
      <ProgressPath activities={activities} progress={progress} />
      <button className="primary-action" type="button" onClick={() => { play("tap"); onHome(); }}>Home</button>
    </section>
  );
}
