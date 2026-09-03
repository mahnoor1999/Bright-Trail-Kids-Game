import type { Category } from "../data/categories";
import { useSound } from "../sound/SoundProvider";
import { CategoryIcon } from "./IconTile";

type CategoryCardProps = {
  category: Category;
  completed: number;
  total: number;
  onPlay: () => void;
};

export function CategoryCard({ category, completed, total, onPlay }: CategoryCardProps) {
  const { play } = useSound();

  function activate() {
    play(category.available ? "boing" : "tap");
    onPlay();
  }

  return (
    <div
      className="category-card"
      role="button"
      tabIndex={0}
      onClick={activate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      }}
      aria-label={`Play ${category.name}`}
    >
      <CategoryIcon id={category.id} color={category.color} />
      <span className="category-copy">
        <strong>{category.name}</strong>
        <small>{category.available ? `${completed}/${total}` : "Soon"}</small>
      </span>
    </div>
  );
}
