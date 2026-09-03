import type { CSSProperties } from "react";

type StarRewardProps = {
  count: number;
  active: boolean;
};

export function StarReward({ count, active }: StarRewardProps) {
  return (
    <div className={`star-reward${active ? " star-reward-active" : ""}`} aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <span key={index} style={{ "--star-index": index } as CSSProperties}>★</span>
      ))}
    </div>
  );
}
