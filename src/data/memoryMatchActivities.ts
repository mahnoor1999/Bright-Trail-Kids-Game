import type { MemoryCard, MemoryMatchActivityData, PatternToken } from "../types";

const apple: PatternToken = { id: "mem-apple", kind: "fruit", label: "Apple", color: "#ef5b5b", accent: "#57b36a", shape: "apple" };
const banana: PatternToken = { id: "mem-banana", kind: "fruit", label: "Banana", color: "#f9c846", accent: "#9c7422", shape: "banana" };
const circle: PatternToken = { id: "mem-circle", kind: "shape", label: "Circle", color: "#5aa9ff", shape: "circle" };
const square: PatternToken = { id: "mem-square", kind: "shape", label: "Square", color: "#ff786d", shape: "square" };
const triangle: PatternToken = { id: "mem-triangle", kind: "shape", label: "Triangle", color: "#48c9a9", shape: "triangle" };
const diamond: PatternToken = { id: "mem-diamond", kind: "shape", label: "Diamond", color: "#9b78ff", shape: "diamond" };

function pairFor(token: PatternToken, pairId: string): MemoryCard[] {
  return [
    { cardId: `${pairId}-a`, pairId, token },
    { cardId: `${pairId}-b`, pairId, token },
  ];
}

export const memoryMatchActivities: MemoryMatchActivityData[] = [
  {
    id: "memory-001",
    type: "memory-match",
    difficulty: 1,
    skill: "memory",
    title: "Fruit Match",
    prompt: "Find the matching pairs!",
    level: 1,
    cards: [...pairFor(apple, "apple"), ...pairFor(banana, "banana"), ...pairFor(circle, "circle")],
    stars: 3,
  },
  {
    id: "memory-002",
    type: "memory-match",
    difficulty: 1,
    skill: "memory",
    title: "Shape Match",
    prompt: "Find the matching pairs!",
    level: 1,
    cards: [...pairFor(circle, "circle"), ...pairFor(square, "square"), ...pairFor(triangle, "triangle")],
    stars: 3,
  },
  {
    id: "memory-003",
    type: "memory-match",
    difficulty: 2,
    skill: "memory",
    title: "Bigger Match",
    prompt: "Find the matching pairs!",
    level: 1,
    cards: [...pairFor(apple, "apple"), ...pairFor(banana, "banana"), ...pairFor(triangle, "triangle"), ...pairFor(diamond, "diamond")],
    stars: 4,
  },
  {
    id: "memory-004",
    type: "memory-match",
    difficulty: 2,
    skill: "memory",
    title: "Shapes and Fruit",
    prompt: "Find the matching pairs!",
    level: 1,
    cards: [...pairFor(square, "square"), ...pairFor(diamond, "diamond"), ...pairFor(apple, "apple"), ...pairFor(circle, "circle")],
    stars: 4,
  },
];
