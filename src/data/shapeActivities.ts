import type { PatternToken, SortSizeActivityData } from "../types";

function circle(id: string, size: PatternToken["size"]): PatternToken {
  return { id, kind: "shape", label: `${size} circle`, color: "#5aa9ff", shape: "circle", size };
}
function square(id: string, size: PatternToken["size"]): PatternToken {
  return { id, kind: "shape", label: `${size} square`, color: "#ff786d", shape: "square", size };
}
function triangle(id: string, size: PatternToken["size"]): PatternToken {
  return { id, kind: "shape", label: `${size} triangle`, color: "#48c9a9", shape: "triangle", size };
}
function diamond(id: string, size: PatternToken["size"]): PatternToken {
  return { id, kind: "shape", label: `${size} diamond`, color: "#9b78ff", shape: "diamond", size };
}

export const shapeActivities: SortSizeActivityData[] = [
  {
    id: "shape-001",
    type: "sort-size",
    difficulty: 1,
    skill: "sorting",
    title: "Small to Big Circles",
    prompt: "Tap smallest to biggest!",
    level: 1,
    order: "smallToBig",
    items: [circle("shape-circle-l", "large"), circle("shape-circle-s", "small"), circle("shape-circle-m", "medium")],
    correctOrder: ["shape-circle-s", "shape-circle-m", "shape-circle-l"],
    stars: 3,
  },
  {
    id: "shape-002",
    type: "sort-size",
    difficulty: 2,
    skill: "sorting",
    title: "Square Sizes",
    prompt: "Tap smallest to biggest!",
    level: 1,
    order: "smallToBig",
    items: [square("shape-square-m", "medium"), square("shape-square-l", "large"), square("shape-square-s", "small")],
    correctOrder: ["shape-square-s", "shape-square-m", "shape-square-l"],
    stars: 4,
  },
  {
    id: "shape-003",
    type: "sort-size",
    difficulty: 2,
    skill: "sorting",
    title: "Triangle Sizes",
    prompt: "Tap biggest to smallest!",
    level: 1,
    order: "bigToSmall",
    items: [triangle("shape-triangle-s", "small"), triangle("shape-triangle-m", "medium"), triangle("shape-triangle-l", "large")],
    correctOrder: ["shape-triangle-l", "shape-triangle-m", "shape-triangle-s"],
    stars: 4,
  },
  {
    id: "shape-004",
    type: "sort-size",
    difficulty: 3,
    skill: "sorting",
    title: "Diamond Sizes",
    prompt: "Tap smallest to biggest!",
    level: 1,
    order: "smallToBig",
    items: [diamond("shape-diamond-l", "large"), diamond("shape-diamond-s", "small"), diamond("shape-diamond-m", "medium")],
    correctOrder: ["shape-diamond-s", "shape-diamond-m", "shape-diamond-l"],
    stars: 5,
  },
];
