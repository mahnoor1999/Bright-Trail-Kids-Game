import { useEffect, useMemo, useState } from "react";
import type { ActivityResult, CategoryId, ShadowMatchActivityData } from "../types";
import { ActivityShell } from "../components/ActivityShell";
import { TokenIcon } from "../components/IconTile";
import { useSound } from "../sound/SoundProvider";

type ShadowMatchScreenProps = {
  activity: ShadowMatchActivityData;
  categoryId: CategoryId;
  onAward: (result: ActivityResult) => void;
  onContinue: () => void;
  onExit: () => void;
};

const messages = ["Perfect Match!", "Sharp Eyes!", "You Found It!"];

export function ShadowMatchScreen({ activity, categoryId, onAward, onContinue, onExit }: ShadowMatchScreenProps) {
  const { play, speak } = useSound();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [incorrectId, setIncorrectId] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(1);
  const [celebrating, setCelebrating] = useState(false);
  const [starsFlying, setStarsFlying] = useState(false);
  const message = useMemo(() => messages[Math.floor(Math.random() * messages.length)], [activity.id]);
  const mascotMood = selectedId ? "proud" : "thinking";

  useEffect(() => {
    const timer = window.setTimeout(() => speak(activity.prompt), 400);
    return () => window.clearTimeout(timer);
  }, [activity.id, activity.prompt, speak]);

  function chooseOption(optionId: string) {
    if (celebrating || selectedId) {
      return;
    }

    if (optionId === activity.correctAnswer) {
      play("correct");
      setSelectedId(optionId);
      setStarsFlying(true);
      const result: ActivityResult = {
        activityId: activity.id,
        starsEarned: activity.stars,
        attempts,
        completedAt: new Date().toISOString(),
        categoryId,
        skill: activity.skill,
      };
      window.setTimeout(() => play("stars"), 260);
      window.setTimeout(() => onAward(result), 720);
      window.setTimeout(() => {
        play("celebrate");
        setCelebrating(true);
      }, 950);
      return;
    }

    play("tryAgain");
    setIncorrectId(optionId);
    setAttempts((current) => current + 1);
    window.setTimeout(() => setIncorrectId(null), 520);
  }

  return (
    <ActivityShell
      title={activity.title}
      prompt={activity.prompt}
      stars={activity.stars}
      mascotMood={mascotMood}
      celebrating={celebrating}
      celebrationMessage={message}
      starsFlying={starsFlying}
      onExit={onExit}
      onContinue={onContinue}
    >
      <div className="shadow-stage" aria-label="Shape shadow to match">
        <div className="sequence-item silhouette-tile">
          <TokenIcon token={activity.target} />
        </div>
      </div>

      <div className="visual-cue">
        <span />
        <strong>Pick one</strong>
        <span />
      </div>

      <div className="answer-grid">
        {activity.options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`answer-option ${selectedId === option.id ? "answer-correct" : incorrectId === option.id ? "answer-incorrect" : ""}`}
            disabled={Boolean(selectedId)}
            aria-label={option.label}
            onClick={() => chooseOption(option.id)}
          >
            <TokenIcon token={option} />
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
