import { Confetti } from "./Confetti";
import { Mascot } from "./Mascot";

type CelebrationProps = {
  show: boolean;
  message: string;
  stars: number;
  onContinue: () => void;
};

export function Celebration({ show, message, stars, onContinue }: CelebrationProps) {
  if (!show) {
    return null;
  }

  return (
    <div className="celebration" role="dialog" aria-label={message}>
      <Confetti active={show} />
      <div className="celebration-card">
        <Mascot mood="proud" />
        <h2>{message}</h2>
        <div className="earned-stars" aria-label={`${stars} stars earned`}>
          {Array.from({ length: stars }).map((_, index) => (
            <span key={index}>★</span>
          ))}
        </div>
        <button className="primary-action celebration-continue" type="button" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}
