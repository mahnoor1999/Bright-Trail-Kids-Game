import type { OddOneOutActivityData, PatternToken } from "../types";

function dot(id: string, color: string): PatternToken {
  return { id, kind: "color", label: "Dot", color, shape: "circle" };
}

function sizedDot(id: string, size: PatternToken["size"]): PatternToken {
  return { id, kind: "size", label: size === "large" ? "Big" : "Small", color: "#37b6a7", shape: size === "large" ? "big-dot" : "small-dot", size };
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
    difficulty: 2,
    skill: "attention",
    title: "Spot the Different Shape",
    prompt: "Which one is different?",
    level: 1,
    items: [
      { id: "attn-circle-1", kind: "shape", label: "Circle", color: "#48c9a9", shape: "circle" },
      { id: "attn-circle-2", kind: "shape", label: "Circle", color: "#48c9a9", shape: "circle" },
      { id: "attn-square-1", kind: "shape", label: "Square", color: "#48c9a9", shape: "square" },
      { id: "attn-circle-3", kind: "shape", label: "Circle", color: "#48c9a9", shape: "circle" },
    ],
    oddId: "attn-square-1",
    stars: 4,
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
