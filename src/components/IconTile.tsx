import type { CategoryId, PatternToken } from "../types";

type CategoryIconProps = {
  id: CategoryId;
  color: string;
};

export function CategoryIcon({ id, color }: CategoryIconProps) {
  return (
    <svg className="category-icon" viewBox="0 0 72 72" aria-hidden="true">
      <circle cx="36" cy="36" r="31" fill={color} opacity="0.16" />
      {id === "logic" && (
        <>
          <rect x="24" y="24" width="24" height="24" fill={color} rx="8" />
          <circle cx="30" cy="30" r="3" fill="#fff" />
          <circle cx="42" cy="30" r="3" fill="#fff" />
          <path d="M29 41c5 5 11 5 16 0" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" />
        </>
      )}
      {id === "math" && (
        <>
          <path d="M23 25h26v24H23z" fill={color} rx="7" />
          <path d="M31 31v12M25 37h12M43 33v8" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        </>
      )}
      {id === "puzzles" && <path d="M25 24h15v10a5 5 0 1 0 0 8v7H25V24Zm17 0h7v25h-7v-8a5 5 0 1 1 0-7V24Z" fill={color} />}
      {id === "attention" && (
        <>
          <path d="M18 36s7-12 18-12 18 12 18 12-7 12-18 12-18-12-18-12Z" fill={color} />
          <circle cx="36" cy="36" r="8" fill="#fff" />
          <circle cx="36" cy="36" r="4" fill={color} />
        </>
      )}
      {id === "memory" && (
        <>
          <rect x="20" y="20" width="18" height="24" rx="6" fill={color} opacity="0.82" />
          <rect x="34" y="28" width="18" height="24" rx="6" fill={color} />
          <path d="M41 36h5M43.5 33.5v5" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
      {id === "shapes" && (
        <>
          <circle cx="29" cy="29" r="9" fill={color} />
          <path d="M44 21l10 18H34l10-18Z" fill={color} opacity="0.74" />
          <rect x="24" y="43" width="18" height="12" rx="4" fill={color} opacity="0.9" />
        </>
      )}
      {id === "patterns" && (
        <>
          <circle cx="22" cy="36" r="7" fill={color} />
          <rect x="33" y="29" width="14" height="14" rx="4" fill={color} opacity="0.78" />
          <circle cx="56" cy="36" r="7" fill={color} />
        </>
      )}
    </svg>
  );
}

type TokenIconProps = {
  token: PatternToken;
};

export function TokenIcon({ token }: TokenIconProps) {
  const sizeClass = token.size ? ` token-${token.size}` : "";

  return (
    <svg className={`token-icon${sizeClass}`} viewBox="0 0 96 96" aria-hidden="true">
      {token.shape === "apple" && (
        <>
          <path d="M49 25c-6-9-15-12-25-8 2 10 12 17 24 11Z" fill={token.accent} />
          <path d="M50 28c-16-10-34 0-34 22 0 20 12 34 26 28 4-2 8-2 12 0 14 6 26-8 26-28 0-22-18-32-30-22Z" fill={token.color} />
          <path d="M48 21c3 5 3 9 0 14" stroke="#704323" strokeWidth="5" strokeLinecap="round" />
        </>
      )}
      {token.shape === "banana" && (
        <>
          <path d="M23 34c12 26 33 38 52 24-10 19-43 23-59-17-2-5 3-10 7-7Z" fill={token.color} />
          <path d="M22 34c-3 1-5 4-4 7M75 58c4-1 6-4 7-8" stroke={token.accent} strokeWidth="5" strokeLinecap="round" />
        </>
      )}
      {token.shape === "circle" && <circle cx="48" cy="48" r="28" fill={token.color} />}
      {token.shape === "square" && <rect x="22" y="22" width="52" height="52" rx="12" fill={token.color} />}
      {token.shape === "triangle" && <path d="M48 18 78 72H18L48 18Z" fill={token.color} />}
      {token.shape === "diamond" && <path d="M48 15 81 48 48 81 15 48 48 15Z" fill={token.color} />}
      {token.shape === "big-dot" && <circle cx="48" cy="48" r="31" fill={token.color} />}
      {token.shape === "small-dot" && <circle cx="48" cy="48" r="17" fill={token.color} />}
      {token.shape === "star" && (
        <path
          d="M48 16 55.6 37.5 78.4 38.1 60.4 52 66.8 73.9 48 61 29.2 73.9 35.6 52 17.6 38.1 40.4 37.5Z"
          fill={token.color}
        />
      )}
      {token.shape === "heart" && (
        <path d="M48 78C20 58 10 40 22 28c9-9 22-6 26 6 4-12 17-15 26-6 12 12 2 30-26 50Z" fill={token.color} />
      )}
      {token.shape === "sun" && (
        <>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <rect key={angle} x="45" y="6" width="6" height="16" rx="3" fill={token.color} transform={`rotate(${angle} 48 48)`} />
          ))}
          <circle cx="48" cy="48" r="19" fill={token.color} />
        </>
      )}
      {token.shape === "moon" && <path d="M52 18a30 30 0 1 0 0 60a44 44 0 0 1 0-60Z" fill={token.color} />}
      {token.shape === "fish" && (
        <>
          <ellipse cx="42" cy="48" rx="24" ry="17" fill={token.color} />
          <path d="M66 41 82 32 82 64 66 55Z" fill={token.accent ?? token.color} />
          <circle cx="30" cy="44" r="3.4" fill="#26304d" />
        </>
      )}
      {token.shape === "cat" && (
        <>
          <path d="M25 30 33 46 20 46Z" fill={token.color} />
          <path d="M71 30 63 46 76 46Z" fill={token.color} />
          <circle cx="48" cy="54" r="26" fill={token.color} />
          <circle cx="39" cy="52" r="3.4" fill="#26304d" />
          <circle cx="57" cy="52" r="3.4" fill="#26304d" />
          <path d="M44 62q4 4 8 0" stroke="#26304d" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      )}
      <path className="token-shine" d="M31 31c5-6 12-9 20-9" />
    </svg>
  );
}
