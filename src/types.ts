export type CategoryId =
  | "logic"
  | "math"
  | "puzzles"
  | "attention"
  | "memory"
  | "shapes"
  | "patterns";

export type ActivityType = "pattern" | "odd-one-out" | "sort-size" | "memory-match" | "count-tap" | "shadow-match" | "belongs-together";

export type PatternToken = {
  id: string;
  kind: "fruit" | "shape" | "size" | "color" | "animal" | "sky";
  label: string;
  color: string;
  accent?: string;
  shape:
    | "apple"
    | "banana"
    | "circle"
    | "square"
    | "triangle"
    | "diamond"
    | "big-dot"
    | "small-dot"
    | "star"
    | "heart"
    | "sun"
    | "moon"
    | "fish"
    | "cat";
  size?: "small" | "medium" | "large";
};

export type PatternActivityData = {
  id: string;
  type: "pattern";
  difficulty: 1 | 2 | 3;
  skill: "pattern-recognition";
  title: string;
  prompt: string;
  level: number;
  sequence: PatternToken[];
  options: PatternToken[];
  correctAnswer: string;
  stars: 3 | 4 | 5;
};

export type OddOneOutActivityData = {
  id: string;
  type: "odd-one-out";
  difficulty: 1 | 2 | 3;
  skill: "attention";
  title: string;
  prompt: string;
  level: number;
  items: PatternToken[];
  oddId: string;
  stars: 3 | 4 | 5;
};

export type SortSizeActivityData = {
  id: string;
  type: "sort-size";
  difficulty: 1 | 2 | 3;
  skill: "sorting";
  title: string;
  prompt: string;
  level: number;
  order: "smallToBig" | "bigToSmall";
  items: PatternToken[];
  correctOrder: string[];
  stars: 3 | 4 | 5;
};

export type MemoryCard = {
  cardId: string;
  pairId: string;
  token: PatternToken;
};

export type MemoryMatchActivityData = {
  id: string;
  type: "memory-match";
  difficulty: 1 | 2 | 3;
  skill: "memory";
  title: string;
  prompt: string;
  level: number;
  cards: MemoryCard[];
  stars: 3 | 4 | 5;
};

export type CountTapActivityData = {
  id: string;
  type: "count-tap";
  difficulty: 1 | 2 | 3;
  skill: "counting";
  title: string;
  prompt: string;
  level: number;
  item: PatternToken;
  count: number;
  options: number[];
  stars: 3 | 4 | 5;
};

export type ShadowMatchActivityData = {
  id: string;
  type: "shadow-match";
  difficulty: 1 | 2 | 3;
  skill: "visual-matching";
  title: string;
  prompt: string;
  level: number;
  target: PatternToken;
  options: PatternToken[];
  correctAnswer: string;
  stars: 3 | 4 | 5;
};

export type BelongsTogetherActivityData = {
  id: string;
  type: "belongs-together";
  difficulty: 1 | 2 | 3;
  skill: "categorization";
  title: string;
  prompt: string;
  level: number;
  anchor: PatternToken;
  options: PatternToken[];
  correctAnswer: string;
  stars: 3 | 4 | 5;
};

export type Activity =
  | PatternActivityData
  | OddOneOutActivityData
  | SortSizeActivityData
  | MemoryMatchActivityData
  | CountTapActivityData
  | ShadowMatchActivityData
  | BelongsTogetherActivityData;

export type ActivityResult = {
  activityId: string;
  starsEarned: number;
  attempts: number;
  completedAt: string;
  categoryId: CategoryId;
  skill: string;
};

export type ProgressState = {
  totalStars: number;
  currentLevel: number;
  completedActivities: Record<string, ActivityResult>;
  unlockedBadges: string[];
};

export type Screen = "home" | "categories" | "activity" | "level-complete" | "progress" | "parent";
