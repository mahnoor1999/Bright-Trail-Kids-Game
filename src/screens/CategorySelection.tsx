import { categories } from "../data/categories";
import { getActivitiesForCategory, getNextActivity } from "../game/progression";
import type { CategoryId, ProgressState } from "../types";
import { CategoryCard } from "../components/CategoryCard";
import { ProgressPath } from "../components/ProgressPath";
import { useSound } from "../sound/SoundProvider";

type CategorySelectionProps = {
  progress: ProgressState;
  selectedCategory: CategoryId;
  onBack: () => void;
  onStart: (categoryId: CategoryId) => void;
};

export function CategorySelection({ progress, selectedCategory, onBack, onStart }: CategorySelectionProps) {
  const { play } = useSound();
  const activeCategory = categories.find((category) => category.id === selectedCategory) ?? categories[0];
  const activities = getActivitiesForCategory(activeCategory.id);
  const nextActivity = getNextActivity(progress, activeCategory.id);

  return (
    <section className="category-screen screen-enter">
      <button className="soft-link" type="button" onClick={() => { play("tap"); onBack(); }}>Back</button>
      <div className="category-hero">
        <p className="eyebrow">Choose a trail</p>
        <h1>{activeCategory.name}</h1>
        <p>{activeCategory.description}</p>
      </div>

      {activities.length > 0 ? (
        <div className="activity-start-panel">
          <ProgressPath activities={activities} progress={progress} activeId={nextActivity?.id} />
          <button className="primary-action" type="button" onClick={() => { play("start"); onStart(activeCategory.id); }} disabled={!nextActivity}>
            Start
          </button>
        </div>
      ) : (
        <div className="coming-soon">
          <strong>Coming soon</strong>
          <span>This trail is warming up.</span>
        </div>
      )}

      <div className="category-grid compact">
        {categories.map((category) => {
          const total = getActivitiesForCategory(category.id).length;
          const completed = getActivitiesForCategory(category.id).filter((activity) => progress.completedActivities[activity.id]).length;
          return (
            <CategoryCard
              key={category.id}
              category={category}
              completed={completed}
              total={total}
              onSelect={() => onStart(category.id)}
            />
          );
        })}
      </div>
    </section>
  );
}
