import { useEffect, useMemo, useState } from "react";
import type { ActivityResult, CategoryId, SortSizeActivityData } from "../types";
import { ActivityShell } from "../components/ActivityShell";
import { TokenIcon } from "../components/IconTile";
import { useSound } from "../sound/SoundProvider";

type SortSizeScreenProps = {
  activity: SortSizeActivityData;
  categoryId: CategoryId;
  onAward: (result: ActivityResult) => void;
  onContinue: () => void;
  onExit: () => void;
};

const messages = ["Nicely Sorted!", "Perfect Order!", "Super Sorting!"];

export function SortSizeScreen({ activity, categoryId, onAward, onContinue, onExit }: SortSizeScreenProps) {
  const { play, speak } = useSound();
  const [sortedIds, setSortedIds] = useState<string[]>([]);
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(1);
  const [celebrating, setCelebrating] = useState(false);
  const [starsFlying, setStarsFlying] = useState(false);
  const message = useMemo(() => messages[Math.floor(Math.random() * messages.length)], [activity.id]);
  const isDone = sortedIds.length === activity.correctOrder.length;
  const mascotMood = isDone ? "proud" : "thinking";

  useEffect(() => {
    const timer = window.setTimeout(() => speak(activity.prompt), 400);
    return () => window.clearTimeout(timer);
  }, [activity.id, activity.prompt, speak]);

  function chooseItem(itemId: string) {
    if (celebrating || isDone || sortedIds.includes(itemId)) {
      return;
    }

    const nextExpectedId = activity.correctOrder[sortedIds.length];
    if (itemId === nextExpectedId) {
      play("tap");
      const nextSorted = [...sortedIds, itemId];
      setSortedIds(nextSorted);

      if (nextSorted.length === activity.correctOrder.length) {
        play("correct");
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
      }
      return;
    }

    play("tryAgain");
    setShakeId(itemId);
    setAttempts((current) => current + 1);
    window.setTimeout(() => setShakeId(null), 520);
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
      <div className="sort-target-row" aria-label="Sorted order">
        {activity.correctOrder.map((id, index) => {
          const placedToken = activity.items.find((item) => item.id === id);
          const isFilled = index < sortedIds.length;
          return (
            <div key={id} className={`sequence-item sort-slot ${isFilled ? "mystery-correct" : ""}`}>
              {isFilled && placedToken ? <TokenIcon token={placedToken} /> : <span className="sort-slot-number">{index + 1}</span>}
            </div>
          );
        })}
      </div>

      <div className="visual-cue">
        <span />
        <strong>{activity.order === "smallToBig" ? "Tap smallest to biggest" : "Tap biggest to smallest"}</strong>
        <span />
      </div>

      <div className="odd-grid sort-tray">
        {activity.items.map((item) => {
          const isPlaced = sortedIds.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              className={`answer-option odd-item ${isPlaced ? "sort-item-placed" : ""} ${shakeId === item.id ? "answer-incorrect" : ""}`}
              disabled={isPlaced || celebrating}
              aria-label={item.label}
              onClick={() => chooseItem(item.id)}
            >
              <TokenIcon token={item} />
            </button>
          );
        })}
      </div>
    </ActivityShell>
  );
}
