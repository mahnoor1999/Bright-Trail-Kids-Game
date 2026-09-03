import { useEffect, useMemo, useState } from "react";
import type { ActivityResult, CategoryId, CountTapActivityData } from "../types";
import { ActivityShell } from "../components/ActivityShell";
import { getCharacterForCategory } from "../data/categories";
import { TokenIcon } from "../components/IconTile";
import { useSound } from "../sound/SoundProvider";

type CountTapScreenProps = {
  activity: CountTapActivityData;
  categoryId: CategoryId;
  onAward: (result: ActivityResult) => void;
  onContinue: () => void;
  onExit: () => void;
};

const messages = ["Nice Counting!", "You Counted It!", "Math Star!"];

export function CountTapScreen({ activity, categoryId, onAward, onContinue, onExit }: CountTapScreenProps) {
  const { play, speak } = useSound();
  const [selected, setSelected] = useState<number | null>(null);
  const [incorrect, setIncorrect] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(1);
  const [celebrating, setCelebrating] = useState(false);
  const [starsFlying, setStarsFlying] = useState(false);
  const message = useMemo(() => messages[Math.floor(Math.random() * messages.length)], [activity.id]);
  const mascotMood = selected !== null ? "proud" : "thinking";

  useEffect(() => {
    const timer = window.setTimeout(() => speak(activity.prompt), 400);
    return () => window.clearTimeout(timer);
  }, [activity.id, activity.prompt, speak]);

  function chooseNumber(value: number) {
    if (celebrating || selected !== null) {
      return;
    }

    if (value === activity.count) {
      play("correct");
      setSelected(value);
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
    setIncorrect(value);
    setAttempts((current) => current + 1);
    window.setTimeout(() => setIncorrect(null), 520);
  }

  return (
    <ActivityShell
      title={activity.title}
      prompt={activity.prompt}
      stars={activity.stars}
      mascotMood={mascotMood}
      character={getCharacterForCategory(categoryId)}
      celebrating={celebrating}
      celebrationMessage={message}
      starsFlying={starsFlying}
      onExit={onExit}
      onContinue={onContinue}
    >
      <div className="count-display" aria-label={`${activity.count} items to count`}>
        {Array.from({ length: activity.count }).map((_, index) => (
          <div className="count-item" key={index}>
            <TokenIcon token={activity.item} />
          </div>
        ))}
      </div>

      <div className="visual-cue">
        <span />
        <strong>Tap the number</strong>
        <span />
      </div>

      <div className="answer-grid count-options">
        {activity.options.map((value) => (
          <button
            key={value}
            type="button"
            className={`answer-option count-option ${selected === value ? "answer-correct" : incorrect === value ? "answer-incorrect" : ""}`}
            disabled={selected !== null}
            aria-label={`${value}`}
            onClick={() => chooseNumber(value)}
          >
            {value}
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
