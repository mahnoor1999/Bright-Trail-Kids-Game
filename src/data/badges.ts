export type Badge = {
  id: string;
  starsRequired: number;
  name: string;
  color: string;
};

export const badges: Badge[] = [
  { id: "spark", starsRequired: 10, name: "Spark", color: "#ffd166" },
  { id: "bloom", starsRequired: 25, name: "Bloom", color: "#70d6ff" },
  { id: "kite", starsRequired: 50, name: "Kite", color: "#ff70a6" },
  { id: "moon", starsRequired: 100, name: "Moon", color: "#9b8cff" },
  { id: "rocket", starsRequired: 250, name: "Rocket", color: "#52d273" },
  { id: "crown", starsRequired: 500, name: "Crown", color: "#ffad3d" },
];
