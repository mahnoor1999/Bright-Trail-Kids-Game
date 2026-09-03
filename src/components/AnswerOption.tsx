import type { PatternToken } from "../types";
import { TokenIcon } from "./IconTile";

type AnswerOptionProps = {
  token: PatternToken;
  state: "idle" | "correct" | "incorrect";
  disabled: boolean;
  onChoose: () => void;
};

export function AnswerOption({ token, state, disabled, onChoose }: AnswerOptionProps) {
  return (
    <button
      className={`answer-option answer-${state}`}
      type="button"
      onClick={onChoose}
      disabled={disabled}
      aria-label={token.label}
    >
      <TokenIcon token={token} />
    </button>
  );
}
