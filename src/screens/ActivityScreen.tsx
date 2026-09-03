import { useEffect, useMemo, useState } from "react";
import type { ActivityResult, CategoryId, PatternActivityData } from "../types";
import { ActivityShell } from "../components/ActivityShell";
import { getCharacterForCategory } from "../data/categories";
import { AnswerOption } from "../components/AnswerOption";
import { TokenIcon } from "../components/IconTile";
import { useSound } from "../sound/SoundProvider";

type ActivityScreenProps = {
  activity: PatternActivityData;
  categoryId: CategoryId;
  onAward: (result: ActivityResult) => void;
  onContinue: () => void;
  onExit: () => void;
};

const messages = ["Great Job!", "Fantastic!", "Super!"];

export function ActivityScreen({ activity, categoryId, onAward, onContinue, onExit }: ActivityScreenProps) {
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

  function chooseAnswer(answerId: string) {
    if (celebrating || selectedId) {
      return;
    }

    if (answerId === activity.correctAnswer) {
      play("correct");
      setSelectedId(answerId);
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
    setIncorrectId(answerId);
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
      <div className="sequence-row" aria-label="Pattern sequence">
        {activity.sequence.map((token, index) => (
          <div className={`sequence-item ${selectedId === activity.correctAnswer && index === activity.sequence.length - 1 ? "sequence-pop" : ""}`} key={`${token.id}-${index}`}>
            <TokenIcon token={token} />
          </div>
        ))}
        <div className={`sequence-item mystery ${selectedId ? "mystery-correct" : ""} ${incorrectId ? "mystery-nudge" : ""}`}>
          {selectedId ? <TokenIcon token={activity.options.find((option) => option.id === selectedId) ?? activity.options[0]} /> : <span>?</span>}
        </div>
      </div>

      <div className="visual-cue">
        <span />
        <strong>Pick one</strong>
        <span />
      </div>

      <div className="answer-grid">
        {activity.options.map((option) => (
          <AnswerOption
            key={option.id}
            token={option}
            state={selectedId === option.id ? "correct" : incorrectId === option.id ? "incorrect" : "idle"}
            disabled={Boolean(selectedId)}
            onChoose={() => chooseAnswer(option.id)}
          />
        ))}
      </div>
    </ActivityShell>
  );
}
