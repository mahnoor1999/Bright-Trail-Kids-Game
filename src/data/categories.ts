import type { CategoryId } from "../types";

export type Category = {
  id: CategoryId;
  name: string;
  shortName: string;
  description: string;
  color: string;
  available: boolean;
};

export const categories: Category[] = [
  { id: "logic", name: "Logic", shortName: "Logic", description: "Patterns and smart choices", color: "#7b7ff0", available: true },
  { id: "math", name: "Math", shortName: "Math", description: "Count and compare", color: "#22a8a0", available: true },
  { id: "puzzles", name: "Puzzles", shortName: "Puzzles", description: "Picture challenges", color: "#ff9f43", available: true },
  { id: "attention", name: "Attention", shortName: "Look", description: "Spot the odd one out", color: "#f15d7a", available: true },
  { id: "memory", name: "Memory", shortName: "Memory", description: "Flip and find matches", color: "#6fbc5f", available: true },
  { id: "shapes", name: "Shapes", shortName: "Shapes", description: "Sort small to big", color: "#4d9de0", available: true },
  { id: "patterns", name: "Patterns", shortName: "Patterns", description: "What comes next?", color: "#b76ee8", available: true },
];
