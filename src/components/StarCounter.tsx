import { useEffect, useRef, useState } from "react";

type StarCounterProps = {
  stars: number;
  compact?: boolean;
};

export function StarCounter({ stars, compact = false }: StarCounterProps) {
  const previous = useRef(stars);
  const [bumping, setBumping] = useState(false);

  useEffect(() => {
    if (stars > previous.current) {
      setBumping(true);
      const timer = window.setTimeout(() => setBumping(false), 500);
      previous.current = stars;
      return () => window.clearTimeout(timer);
    }
    previous.current = stars;
  }, [stars]);

  return (
    <div className={`star-counter${compact ? " star-counter-compact" : ""}${bumping ? " star-counter-bump" : ""}`} data-star-counter>
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <path d="m20 3 5.2 10.6 11.7 1.7-8.5 8.2 2 11.6L20 29.7 9.6 35.1l2-11.6-8.5-8.2 11.7-1.7L20 3Z" />
      </svg>
      <span>{stars}</span>
    </div>
  );
}
