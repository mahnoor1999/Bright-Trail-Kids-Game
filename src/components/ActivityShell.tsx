import type { ReactNode } from "react";
import { Celebration } from "./Celebration";
import { Mascot } from "./Mascot";
import { StarReward } from "./StarReward";
import { useSound } from "../sound/SoundProvider";

type ActivityShellProps = {
  title: string;
  prompt: string;
  stars: number;
  mascotMood: "thinking" | "proud";
  celebrating: boolean;
  celebrationMessage: string;
  starsFlying: boolean;
  onExit: () => void;
  onContinue: () => void;
  children: ReactNode;
};

export function ActivityShell({
  title,
  prompt,
  stars,
  mascotMood,
  celebrating,
  celebrationMessage,
  starsFlying,
  onExit,
  onContinue,
  children,
}: ActivityShellProps) {
  const { play, speak } = useSound();

  return (
    <section className="activity-screen screen-enter">
      <div className="activity-header">
        <button className="soft-link" type="button" onClick={() => { play("tap"); onExit(); }}>Home</button>
        <div className="difficulty-stars" aria-label={`${stars} star activity`}>
          {Array.from({ length: stars }).map((_, index) => <span key={index}>★</span>)}
        </div>
      </div>

      <div className="activity-card">
        <div className="activity-title">
          <div>
            <p className="eyebrow">{title}</p>
            <h1>{prompt}</h1>
          </div>
          <button
            className="mascot-hear-button"
            type="button"
            aria-label="Hear the question again"
            onClick={() => { play("tap"); speak(prompt); }}
          >
            <Mascot mood={mascotMood} />
            <span className="mascot-hear-badge" aria-hidden="true">🔊</span>
          </button>
        </div>

        {children}
      </div>

      <StarReward count={stars} active={starsFlying} />
      <Celebration show={celebrating} message={celebrationMessage} stars={stars} onContinue={() => { play("start"); onContinue(); }} />
    </section>
  );
}
