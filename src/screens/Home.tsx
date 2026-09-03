import { categories } from "../data/categories";
import { getActivitiesForCategory } from "../game/progression";
import type { CategoryId, ProgressState } from "../types";
import { CategoryCard } from "../components/CategoryCard";
import { MascotBackdrop } from "../components/MascotBackdrop";

type HomeProps = {
  progress: ProgressState;
  onPlay: (categoryId: CategoryId) => void;
};

export function Home({ progress, onPlay }: HomeProps) {
  const dailyDone = Math.min(Object.keys(progress.completedActivities).length, 3);

  return (
    <section className="home-screen screen-enter">
      <MascotBackdrop />
      <div className="daily-strip">
        <div>
          <strong>Daily goal</strong>
          <span>{dailyDone}/3 activities</span>
        </div>
        <div className="goal-dots" aria-hidden="true">
          {[0, 1, 2].map((dot) => (
            <span key={dot} className={dot < dailyDone ? "goal-on" : ""} />
          ))}
        </div>
      </div>

      <div className="section-heading">
        <h2>Learning</h2>
        <span>{Object.keys(progress.completedActivities).length} done</span>
      </div>
      <div className="category-grid">
        {categories.map((category) => {
          const total = getActivitiesForCategory(category.id).length;
          const completed = getActivitiesForCategory(category.id).filter((activity) => progress.completedActivities[activity.id]).length;
          return (
            <CategoryCard
              key={category.id}
              category={category}
              completed={completed}
              total={total}
              onPlay={() => onPlay(category.id)}
            />
          );
        })}
      </div>
    </section>
  );
}
