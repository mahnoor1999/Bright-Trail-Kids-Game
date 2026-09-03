import { categories } from "../data/categories";
import { getActivitiesForCategory, getLevelProgress, getNextActivity } from "../game/progression";
import type { CategoryId, ProgressState } from "../types";
import { CategoryCard } from "../components/CategoryCard";
import { Mascot } from "../components/Mascot";
import { ProgressBar } from "../components/ProgressBar";
import { StarCounter } from "../components/StarCounter";
import { useSound } from "../sound/SoundProvider";

type HomeProps = {
  progress: ProgressState;
  onCategory: (categoryId: CategoryId) => void;
  onContinue: () => void;
};

export function Home({ progress, onCategory, onContinue }: HomeProps) {
  const { play } = useSound();
  const next = getNextActivity(progress, "logic");
  const dailyDone = Math.min(Object.keys(progress.completedActivities).length, 3);

  return (
    <section className="home-screen screen-enter">
      <div className="hero-panel">
        <div className="avatar-card">
          <div className="child-avatar" aria-label="Child avatar">
            <span />
          </div>
          <div>
            <p className="eyebrow">Ready to play?</p>
            <h1>Let&apos;s Learn!</h1>
          </div>
        </div>
        <div className="hero-mascot">
          <Mascot />
        </div>
        <div className="hero-stats">
          <StarCounter stars={progress.totalStars} />
          <div className="level-pill">Level {progress.currentLevel}</div>
        </div>
        <ProgressBar value={getLevelProgress(progress, "logic")} label="Trail progress" />
        <button className="primary-action continue-action" type="button" onClick={() => { play("start"); onContinue(); }} disabled={!next}>
          Continue Learning
        </button>
      </div>

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
              onSelect={() => onCategory(category.id)}
            />
          );
        })}
      </div>
    </section>
  );
}
