import type { CSSProperties } from "react";

const pieces = ["🎉", "⭐", "🎈", "✨", "🌟", "🎊"];

export function Confetti({ active }: { active: boolean }) {
  if (!active) {
    return null;
  }

  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, index) => (
        <span
          key={index}
          className="confetti-piece"
          style={{
            "--confetti-left": `${(index * 53) % 100}%`,
            "--confetti-delay": `${(index % 6) * 90}ms`,
            "--confetti-duration": `${1400 + (index % 5) * 180}ms`,
          } as CSSProperties}
        >
          {pieces[index % pieces.length]}
        </span>
      ))}
    </div>
  );
}
