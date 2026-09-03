import type { Category } from "../data/categories";
import { useSound } from "../sound/SoundProvider";
import { CategoryIcon } from "./IconTile";

type CategoryCardProps = {
  category: Category;
  completed: number;
  total: number;
  onSelect: () => void;
};

export function CategoryCard({ category, completed, total, onSelect }: CategoryCardProps) {
  const { play } = useSound();

  return (
    <button className="category-card" onClick={() => { play(category.available ? "start" : "tap"); onSelect(); }} type="button" aria-label={`${category.name} category`}>
      <CategoryIcon id={category.id} color={category.color} />
      <span className="category-copy">
        <strong>{category.name}</strong>
        <small>{category.available ? `${completed}/${total}` : "Soon"}</small>
      </span>
      <span className="category-arrow" aria-hidden="true">&rsaquo;</span>
    </button>
  );
}
