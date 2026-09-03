import { useEffect, useMemo, useState } from "react";
import type { ActivityResult, CategoryId, OddOneOutActivityData } from "../types";
import { ActivityShell } from "../components/ActivityShell";
import { getCharacterForCategory } from "../data/categories";
import { TokenIcon } from "../components/IconTile";
import { useSound } from "../sound/SoundProvider";

type OddOneOutScreenProps = {
  activity: OddOneOutActivityData;
  categoryId: CategoryId;
  onAward: (result: ActivityResult) => void;
  onContinue: () => void;
  onExit: () => void;
};

const messages = ["Sharp Eyes!", "You Spotted It!", "Great Looking!"];

export function OddOneOutScreen({ activity, categoryId, onAward, onContinue, onExit }: OddOneOutScreenProps) {
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

  function chooseItem(itemId: string) {
    if (celebrating || selectedId) {
      return;
    }

    if (itemId === activity.oddId) {
      play("correct");
      setSelectedId(itemId);
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
    setIncorrectId(itemId);
    setAttempts((current) => current + 1);
    window.setTimeout(() => setIncorrectId(null), 520);
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
      <div className="odd-grid" aria-label="Find the different one">
        {activity.items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`answer-option odd-item ${selectedId === item.id ? "answer-correct" : incorrectId === item.id ? "answer-incorrect" : ""}`}
            disabled={Boolean(selectedId)}
            aria-label={item.label}
            onClick={() => chooseItem(item.id)}
          >
            <TokenIcon token={item} />
          </button>
        ))}
      </div>
    </ActivityShell>
  );
}
