type MascotProps = {
  mood?: "happy" | "proud" | "thinking";
};

export function Mascot({ mood = "happy" }: MascotProps) {
  const mouth = mood === "thinking" ? "M42 70 Q50 66 58 70" : "M32 70 Q50 94 68 70";
  const isSmiling = mood !== "thinking";

  return (
    <svg className="mascot" viewBox="0 0 110 118" role="img" aria-label="Friendly helper">
      <path className="mascot-shadow" d="M24 105c10 8 50 8 62 0 5-3 4-9-1-11-15-7-45-7-60 0-5 2-6 8-1 11Z" />
      <path className="mascot-body" d="M21 50c0-23 15-39 35-39s35 16 35 39v26c0 19-14 31-35 31S21 95 21 76V50Z" />
      <path className="mascot-belly" d="M35 65c4-9 13-14 21-14s17 5 21 14c5 12-3 27-21 27S30 77 35 65Z" />
      <path className="mascot-leaf" d="M54 13C49 4 40 2 32 6c4 9 13 14 22 7Z" />
      {isSmiling ? (
        <>
          <ellipse className="mascot-cheek" cx="33" cy="56" rx="6" ry="4" />
          <ellipse className="mascot-cheek" cx="77" cy="56" rx="6" ry="4" />
          <path d="M35 44c2-4 6-4 8 0" stroke="#26304d" strokeWidth="3.4" strokeLinecap="round" fill="none" />
          <path d="M67 44c2-4 6-4 8 0" stroke="#26304d" strokeWidth="3.4" strokeLinecap="round" fill="none" />
        </>
      ) : null}
      <circle cx="42" cy="48" r="5" fill="#26304d" />
      <circle cx="68" cy="48" r="5" fill="#26304d" />
      <circle cx="40" cy="46" r="1.6" fill="#fff" />
      <circle cx="66" cy="46" r="1.6" fill="#fff" />
      <path className={`mascot-mouth${isSmiling ? " mascot-mouth-smile" : ""}`} d={mouth} />
      {mood === "proud" ? <path className="mascot-spark" d="M85 22l3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8Z" /> : null}
    </svg>
  );
}
