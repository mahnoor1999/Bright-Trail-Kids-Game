import type { BelongsTogetherActivityData, PatternToken, ShadowMatchActivityData } from "../types";

const apple: PatternToken = { id: "puzzle-apple", kind: "fruit", label: "Apple", color: "#ef5b5b", accent: "#57b36a", shape: "apple" };
const banana: PatternToken = { id: "puzzle-banana", kind: "fruit", label: "Banana", color: "#f9c846", accent: "#9c7422", shape: "banana" };
const circle: PatternToken = { id: "puzzle-circle", kind: "shape", label: "Circle", color: "#5aa9ff", shape: "circle" };
const square: PatternToken = { id: "puzzle-square", kind: "shape", label: "Square", color: "#ff786d", shape: "square" };
const triangle: PatternToken = { id: "puzzle-triangle", kind: "shape", label: "Triangle", color: "#48c9a9", shape: "triangle" };
const diamond: PatternToken = { id: "puzzle-diamond", kind: "shape", label: "Diamond", color: "#9b78ff", shape: "diamond" };
const star: PatternToken = { id: "puzzle-star", kind: "sky", label: "Star", color: "#ffd15c", shape: "star" };
const heart: PatternToken = { id: "puzzle-heart", kind: "shape", label: "Heart", color: "#ff78a8", shape: "heart" };
const cat: PatternToken = { id: "puzzle-cat", kind: "animal", label: "Cat", color: "#f9c846", shape: "cat" };
const fish: PatternToken = { id: "puzzle-fish", kind: "animal", label: "Fish", color: "#5aa9ff", accent: "#3a7fd1", shape: "fish" };
const sun: PatternToken = { id: "puzzle-sun", kind: "sky", label: "Sun", color: "#ffb238", shape: "sun" };
const moon: PatternToken = { id: "puzzle-moon", kind: "sky", label: "Moon", color: "#8d83f6", shape: "moon" };

export const shadowMatchActivities: ShadowMatchActivityData[] = [
  {
    id: "shadow-001",
    type: "shadow-match",
    difficulty: 1,
    skill: "visual-matching",
    title: "Shadow Match",
    prompt: "Which one matches the shadow?",
    level: 1,
    target: apple,
    options: [banana, apple, triangle],
    correctAnswer: "puzzle-apple",
    stars: 3,
  },
  {
    id: "shadow-002",
    type: "shadow-match",
    difficulty: 2,
    skill: "visual-matching",
    title: "Shadow Match",
    prompt: "Which one matches the shadow?",
    level: 1,
    target: diamond,
    options: [square, circle, diamond],
    correctAnswer: "puzzle-diamond",
    stars: 4,
  },
  {
    id: "shadow-003",
    type: "shadow-match",
    difficulty: 2,
    skill: "visual-matching",
    title: "Shadow Match",
    prompt: "Which one matches the shadow?",
    level: 1,
    target: cat,
    options: [fish, star, cat],
    correctAnswer: "puzzle-cat",
    stars: 4,
  },
  {
    id: "shadow-004",
    type: "shadow-match",
    difficulty: 3,
    skill: "visual-matching",
    title: "Shadow Match",
    prompt: "Which one matches the shadow?",
    level: 1,
    target: moon,
    options: [sun, moon, heart],
    correctAnswer: "puzzle-moon",
    stars: 5,
  },
];

export const belongsTogetherActivities: BelongsTogetherActivityData[] = [
  {
    id: "belongs-001",
    type: "belongs-together",
    difficulty: 1,
    skill: "categorization",
    title: "What Goes Together?",
    prompt: "Which one goes with this?",
    level: 1,
    anchor: apple,
    options: [triangle, banana, diamond],
    correctAnswer: "puzzle-banana",
    stars: 3,
  },
  {
    id: "belongs-002",
    type: "belongs-together",
    difficulty: 2,
    skill: "categorization",
    title: "What Goes Together?",
    prompt: "Which one goes with this?",
    level: 1,
    anchor: triangle,
    options: [banana, apple, square],
    correctAnswer: "puzzle-square",
    stars: 4,
  },
  {
    id: "belongs-003",
    type: "belongs-together",
    difficulty: 2,
    skill: "categorization",
    title: "What Goes Together?",
    prompt: "Which one goes with this?",
    level: 1,
    anchor: cat,
    options: [star, square, fish],
    correctAnswer: "puzzle-fish",
    stars: 4,
  },
  {
    id: "belongs-004",
    type: "belongs-together",
    difficulty: 3,
    skill: "categorization",
    title: "What Goes Together?",
    prompt: "Which one goes with this?",
    level: 1,
    anchor: sun,
    options: [banana, triangle, moon],
    correctAnswer: "puzzle-moon",
    stars: 5,
  },
];

export const puzzleActivities = [...shadowMatchActivities, ...belongsTogetherActivities];
