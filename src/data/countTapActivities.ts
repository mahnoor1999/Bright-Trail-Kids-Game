import type { CountTapActivityData, PatternToken } from "../types";

const apple: PatternToken = { id: "count-apple", kind: "fruit", label: "Apple", color: "#ef5b5b", accent: "#57b36a", shape: "apple" };
const banana: PatternToken = { id: "count-banana", kind: "fruit", label: "Banana", color: "#f9c846", accent: "#9c7422", shape: "banana" };
const circle: PatternToken = { id: "count-circle", kind: "shape", label: "Circle", color: "#5aa9ff", shape: "circle" };
const triangle: PatternToken = { id: "count-triangle", kind: "shape", label: "Triangle", color: "#48c9a9", shape: "triangle" };

export const countTapActivities: CountTapActivityData[] = [
  {
    id: "count-001",
    type: "count-tap",
    difficulty: 1,
    skill: "counting",
    title: "Count the Apples",
    prompt: "How many do you see?",
    level: 1,
    item: apple,
    count: 2,
    options: [1, 2, 3],
    stars: 3,
  },
  {
    id: "count-002",
    type: "count-tap",
    difficulty: 1,
    skill: "counting",
    title: "Count the Bananas",
    prompt: "How many do you see?",
    level: 1,
    item: banana,
    count: 3,
    options: [2, 3, 4],
    stars: 3,
  },
  {
    id: "count-003",
    type: "count-tap",
    difficulty: 2,
    skill: "counting",
    title: "Count the Circles",
    prompt: "How many do you see?",
    level: 1,
    item: circle,
    count: 4,
    options: [3, 4, 5],
    stars: 4,
  },
  {
    id: "count-004",
    type: "count-tap",
    difficulty: 3,
    skill: "counting",
    title: "Count the Triangles",
    prompt: "How many do you see?",
    level: 1,
    item: triangle,
    count: 5,
    options: [4, 5, 6],
    stars: 5,
  },
];
