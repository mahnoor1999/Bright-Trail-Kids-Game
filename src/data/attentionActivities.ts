import type { OddOneOutActivityData, PatternToken } from "../types";

function dot(id: string, color: string): PatternToken {
  return { id, kind: "color", label: "Dot", color, shape: "circle" };
}

function sizedDot(id: string, size: PatternToken["size"]): PatternToken {
  return { id, kind: "size", label: size === "large" ? "Big" : "Small", color: "#37b6a7", shape: size === "large" ? "big-dot" : "small-dot", size };
}

function animal(id: string, shape: "cat" | "fish", color: string): PatternToken {
  return { id, kind: "animal", label: shape === "cat" ? "Cat" : "Fish", color, shape };
}

function sky(id: string, shape: "star" | "heart" | "sun" | "moon", color: string): PatternToken {
  return { id, kind: "sky", label: shape, color, shape };
}

export const attentionActivities: OddOneOutActivityData[] = [
  {
    id: "attention-001",
    type: "odd-one-out",
    difficulty: 1,
    skill: "attention",
    title: "Find the Different Color",
    prompt: "Which one is different?",
    level: 1,
    items: [
      dot("attn-yellow-1", "#ffd15c"),
      dot("attn-yellow-2", "#ffd15c"),
      dot("attn-blue-1", "#54a4ff"),
      dot("attn-yellow-3", "#ffd15c"),
    ],
    oddId: "attn-blue-1",
    stars: 3,
  },
  {
    id: "attention-002",
    type: "odd-one-out",
    difficulty: 1,
    skill: "attention",
    title: "Spot the Different Animal",
    prompt: "Which one is different?",
    level: 1,
    items: [
      animal("attn-cat-1", "cat", "#f9c846"),
      animal("attn-cat-2", "cat", "#f9c846"),
      animal("attn-fish-1", "fish", "#5aa9ff"),
      animal("attn-cat-3", "cat", "#f9c846"),
    ],
    oddId: "attn-fish-1",
    stars: 3,
  },
  {
    id: "attention-003",
    type: "odd-one-out",
    difficulty: 2,
    skill: "attention",
    title: "Big or Small?",
    prompt: "Which one is different?",
    level: 1,
    items: [
      sizedDot("attn-small-1", "small"),
      sizedDot("attn-small-2", "small"),
      sizedDot("attn-big-1", "large"),
      sizedDot("attn-small-3", "small"),
    ],
    oddId: "attn-big-1",
    stars: 4,
  },
  {
    id: "attention-004",
    type: "odd-one-out",
    difficulty: 2,
    skill: "attention",
    title: "Star or Heart?",
    prompt: "Which one is different?",
    level: 1,
    items: [
      sky("attn-star-1", "star", "#ffd15c"),
      sky("attn-heart-1", "heart", "#ff78a8"),
      sky("attn-star-2", "star", "#ffd15c"),
      sky("attn-star-3", "star", "#ffd15c"),
    ],
    oddId: "attn-heart-1",
    stars: 4,
  },
  {
    id: "attention-005",
    type: "odd-one-out",
    difficulty: 3,
    skill: "attention",
    title: "Sun or Moon?",
    prompt: "Which one is different?",
    level: 1,
    items: [
      sky("attn-sun-1", "sun", "#ffb238"),
      sky("attn-sun-2", "sun", "#ffb238"),
      sky("attn-moon-1", "moon", "#8d83f6"),
      sky("attn-sun-3", "sun", "#ffb238"),
      sky("attn-sun-4", "sun", "#ffb238"),
    ],
    oddId: "attn-moon-1",
    stars: 5,
  },
  {
    id: "attention-006",
    type: "odd-one-out",
    difficulty: 3,
    skill: "attention",
    title: "Which One is Different?",
    prompt: "Which one is different?",
    level: 1,
    items: [
      dot("attn-pink-1", "#ff78a8"),
      dot("attn-pink-2", "#ff78a8"),
      dot("attn-sky-1", "#54a4ff"),
      dot("attn-pink-3", "#ff78a8"),
      dot("attn-pink-4", "#ff78a8"),
    ],
    oddId: "attn-sky-1",
    stars: 5,
  },
];
