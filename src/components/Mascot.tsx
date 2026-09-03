export type MascotCharacter = "blob" | "fox" | "cat" | "ghost" | "monkey";

type MascotProps = {
  mood?: "happy" | "proud" | "thinking";
  character?: MascotCharacter;
};

const bodyByCharacter: Record<MascotCharacter, string> = {
  blob: "M21 50c0-23 15-39 35-39s35 16 35 39v26c0 19-14 31-35 31S21 95 21 76V50Z",
  fox: "M21 54c0-24 15-40 35-40s35 16 35 40v22c0 19-14 31-35 31S21 95 21 76V54Z",
  cat: "M20 58c0-25 13-42 34-42s34 17 34 42v18c0 20-14 32-34 32S20 96 20 76V58Z",
  ghost:
    "M21 50c0-23 15-39 35-39s35 16 35 39v40c0 3-3 5-6 3l-6-4-6 5c-2 2-5 2-7 0l-6-5-6 5c-2 2-5 2-7 0l-6-5-6 4c-3 2-6 0-6-3V50Z",
  monkey: "M22 56c0-25 13-42 33-42s33 17 33 42v20c0 19-14 30-33 30S22 95 22 76V56Z",
};

const bellyByCharacter: Partial<Record<MascotCharacter, string>> = {
  blob: "M35 65c4-9 13-14 21-14s17 5 21 14c5 12-3 27-21 27S30 77 35 65Z",
  fox: "M37 68c3-7 9-10 15-10s12 3 15 10c4 10-2 21-15 21S33 78 37 68Z",
  cat: "M36 70c3-7 9-11 16-11s13 4 16 11c4 10-2 20-16 20S32 80 36 70Z",
  monkey: "M37 70c3-7 9-10 15-10s12 3 15 10c4 10-2 21-15 21S33 80 37 70Z",
};

const colorByCharacter: Record<MascotCharacter, { body: string; belly: string; accent: string; cheek: string }> = {
  blob: { body: "#86d4c0", belly: "#fff1c6", accent: "#67bd62", cheek: "#ff9fb2" },
  fox: { body: "#f6934b", belly: "#fff6ea", accent: "#e9762b", cheek: "#ff9fb2" },
  cat: { body: "#f9c846", belly: "#fff9ea", accent: "#e0ac2c", cheek: "#ff9fb2" },
  ghost: { body: "#d9d3ff", belly: "#d9d3ff", accent: "#b6acf5", cheek: "#c9a8ff" },
  monkey: { body: "#b5793c", belly: "#f2dfc0", accent: "#8f5c28", cheek: "#ff9fb2" },
};

export function Mascot({ mood = "happy", character = "blob" }: MascotProps) {
  const mouth = mood === "thinking" ? "M42 70 Q50 66 58 70" : "M32 70 Q50 94 68 70";
  const isSmiling = mood !== "thinking";
  const colors = colorByCharacter[character];
  const belly = bellyByCharacter[character];

  return (
    <svg className="mascot" viewBox="0 0 110 118" role="img" aria-label="Friendly helper">
      <path className="mascot-shadow" d="M24 105c10 8 50 8 62 0 5-3 4-9-1-11-15-7-45-7-60 0-5 2-6 8-1 11Z" />

      {character === "fox" && (
        <>
          <path d="M20 30 4 4 38 20Z" fill={colors.body} />
          <path d="M90 30 106 4 72 20Z" fill={colors.body} />
        </>
      )}
      {character === "cat" && (
        <>
          <path d="M24 26 12 2 42 18Z" fill={colors.body} />
          <path d="M86 26 98 2 68 18Z" fill={colors.body} />
        </>
      )}
      {character === "monkey" && (
        <>
          <circle cx="14" cy="52" r="14" fill={colors.body} />
          <circle cx="96" cy="52" r="14" fill={colors.body} />
          <circle cx="14" cy="52" r="7" fill={colors.belly} />
          <circle cx="96" cy="52" r="7" fill={colors.belly} />
        </>
      )}

      <path fill={colors.body} d={bodyByCharacter[character]} />
      {belly ? <path fill={colors.belly} d={belly} /> : null}
      {character === "blob" && <path className="mascot-leaf" d="M54 13C49 4 40 2 32 6c4 9 13 14 22 7Z" fill={colors.accent} />}
      {character === "fox" && <path d="M16 22 6 8l16 6Z" fill="#fff" opacity="0.7" />}
      {character === "monkey" && <path d="M40 20c3-8 12-11 20-8-3 8-12 11-20 8Z" fill={colors.accent} opacity="0.5" />}

      {isSmiling ? (
        <>
          <ellipse cx="33" cy="56" rx="6" ry="4" fill={colors.cheek} opacity="0.55" />
          <ellipse cx="77" cy="56" rx="6" ry="4" fill={colors.cheek} opacity="0.55" />
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
