import { useEffect, useMemo, useState } from "react";
import type { ActivityResult, CategoryId, MemoryMatchActivityData } from "../types";
import { ActivityShell } from "../components/ActivityShell";
import { getCharacterForCategory } from "../data/categories";
import { TokenIcon } from "../components/IconTile";
import { useSound } from "../sound/SoundProvider";

type MemoryMatchScreenProps = {
  activity: MemoryMatchActivityData;
  categoryId: CategoryId;
  onAward: (result: ActivityResult) => void;
  onContinue: () => void;
  onExit: () => void;
};

const messages = ["Great Memory!", "You Matched It!", "Super Remembering!"];

function shuffle<T>(list: T[]): T[] {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function MemoryMatchScreen({ activity, categoryId, onAward, onContinue, onExit }: MemoryMatchScreenProps) {
  const { play, speak } = useSound();
  const cards = useMemo(() => shuffle(activity.cards), [activity.id, activity.cards]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const [attempts, setAttempts] = useState(1);
  const [celebrating, setCelebrating] = useState(false);
  const [starsFlying, setStarsFlying] = useState(false);
  const [locked, setLocked] = useState(false);
  const message = useMemo(() => messages[Math.floor(Math.random() * messages.length)], [activity.id]);
  const totalPairs = activity.cards.length / 2;
  const isDone = matchedPairIds.length === totalPairs;
  const mascotMood = isDone ? "proud" : "thinking";

  useEffect(() => {
    const timer = window.setTimeout(() => speak(activity.prompt), 400);
    return () => window.clearTimeout(timer);
  }, [activity.id, activity.prompt, speak]);

  function flipCard(cardId: string) {
    if (celebrating || locked || flippedIds.includes(cardId)) {
      return;
    }
    const card = cards.find((c) => c.cardId === cardId);
    if (!card || matchedPairIds.includes(card.pairId)) {
      return;
    }

    play("tap");
    const nextFlipped = [...flippedIds, cardId];
    setFlippedIds(nextFlipped);

    if (nextFlipped.length === 2) {
      setLocked(true);
      const [firstId, secondId] = nextFlipped;
      const first = cards.find((c) => c.cardId === firstId);
      const second = cards.find((c) => c.cardId === secondId);

      if (first && second && first.pairId === second.pairId) {
        window.setTimeout(() => {
          play("correct");
          const nextMatched = [...matchedPairIds, first.pairId];
          setMatchedPairIds(nextMatched);
          setFlippedIds([]);
          setLocked(false);

          if (nextMatched.length === totalPairs) {
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
        }, 380);
      } else {
        window.setTimeout(() => {
          play("tryAgain");
          setWrongIds(nextFlipped);
          setAttempts((current) => current + 1);
        }, 280);
        window.setTimeout(() => {
          setFlippedIds([]);
          setWrongIds([]);
          setLocked(false);
        }, 900);
      }
    }
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
      <div className="memory-grid" aria-label="Memory match cards">
        {cards.map((card) => {
          const isFlipped = flippedIds.includes(card.cardId) || matchedPairIds.includes(card.pairId);
          const isWrong = wrongIds.includes(card.cardId);
          const isMatched = matchedPairIds.includes(card.pairId);
          return (
            <button
              key={card.cardId}
              type="button"
              className={`memory-card ${isFlipped ? "memory-card-flipped" : ""} ${isWrong ? "answer-incorrect" : ""} ${isMatched ? "memory-card-matched" : ""}`}
              disabled={isMatched || celebrating}
              aria-label={isFlipped ? card.token.label : "Hidden card"}
              onClick={() => flipCard(card.cardId)}
            >
              {isFlipped ? <TokenIcon token={card.token} /> : <span className="memory-card-back">?</span>}
            </button>
          );
        })}
      </div>
    </ActivityShell>
  );
}
