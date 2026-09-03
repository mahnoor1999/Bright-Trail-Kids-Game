import type { MemoryCard, MemoryMatchActivityData, PatternToken } from "../types";

const apple: PatternToken = { id: "mem-apple", kind: "fruit", label: "Apple", color: "#ef5b5b", accent: "#57b36a", shape: "apple" };
const banana: PatternToken = { id: "mem-banana", kind: "fruit", label: "Banana", color: "#f9c846", accent: "#9c7422", shape: "banana" };
const star: PatternToken = { id: "mem-star", kind: "sky", label: "Star", color: "#ffd15c", shape: "star" };
const heart: PatternToken = { id: "mem-heart", kind: "shape", label: "Heart", color: "#ff78a8", shape: "heart" };
const sun: PatternToken = { id: "mem-sun", kind: "sky", label: "Sun", color: "#ffb238", shape: "sun" };
const moon: PatternToken = { id: "mem-moon", kind: "sky", label: "Moon", color: "#8d83f6", shape: "moon" };
const fish: PatternToken = { id: "mem-fish", kind: "animal", label: "Fish", color: "#5aa9ff", accent: "#3a7fd1", shape: "fish" };
const cat: PatternToken = { id: "mem-cat", kind: "animal", label: "Cat", color: "#f9c846", shape: "cat" };
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
    cards: [...pairFor(apple, "apple"), ...pairFor(banana, "banana"), ...pairFor(star, "star")],
    stars: 3,
  },
  {
    id: "memory-002",
    type: "memory-match",
    difficulty: 1,
    skill: "memory",
    title: "Sky Match",
    prompt: "Find the matching pairs!",
    level: 1,
    cards: [...pairFor(sun, "sun"), ...pairFor(moon, "moon"), ...pairFor(star, "star")],
    stars: 3,
  },
  {
    id: "memory-003",
    type: "memory-match",
    difficulty: 2,
    skill: "memory",
    title: "Animal Friends",
    prompt: "Find the matching pairs!",
    level: 1,
    cards: [...pairFor(cat, "cat"), ...pairFor(fish, "fish"), ...pairFor(heart, "heart"), ...pairFor(diamond, "diamond")],
    stars: 4,
  },
  {
    id: "memory-004",
    type: "memory-match",
    difficulty: 2,
    skill: "memory",
    title: "Mixed Match",
    prompt: "Find the matching pairs!",
    level: 1,
    cards: [...pairFor(apple, "apple"), ...pairFor(cat, "cat"), ...pairFor(triangle, "triangle"), ...pairFor(sun, "sun")],
    stars: 4,
  },
];
