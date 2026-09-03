import { categories } from "../data/categories";
import { getAccuracy } from "../game/progression";
import { useSound } from "../sound/SoundProvider";
import type { ProgressState } from "../types";

type ParentDashboardProps = {
  progress: ProgressState;
  onBack: () => void;
  onReset: () => void;
};

export function ParentDashboard({ progress, onBack, onReset }: ParentDashboardProps) {
  const { play, childName, setChildName } = useSound();
  const results = Object.values(progress.completedActivities);
  const practiced = new Set(results.map((result) => result.categoryId));
  const strongSkills = results.length > 0 ? "Pattern recognition" : "Start the first activity";
  const practice = results.some((result) => result.attempts > 1) ? "Slower visual comparison" : "New pattern families";

  return (
    <section className="parent-screen screen-enter">
      <button className="soft-link parent-back" type="button" onClick={() => { play("tap"); onBack(); }}>Back</button>
      <div className="parent-header">
        <p className="eyebrow">Parent dashboard</p>
        <h1>Learning Snapshot</h1>
      </div>
      <div className="child-name-panel">
        <label htmlFor="child-name-input">Child&apos;s name</label>
        <input
          id="child-name-input"
          type="text"
          value={childName}
          maxLength={24}
          placeholder="e.g. Mia"
          onChange={(event) => setChildName(event.target.value)}
        />
        <span>We&apos;ll say &ldquo;Very good, {childName.trim() || "..."}!&rdquo; when they get one right.</span>
      </div>
      <div className="parent-metrics">
        <Metric label="Activities" value={results.length.toString()} />
        <Metric label="Stars" value={progress.totalStars.toString()} />
        <Metric label="Accuracy" value={`${getAccuracy(progress)}%`} />
        <Metric label="Level" value={progress.currentLevel.toString()} />
      </div>
      <div className="parent-panels">
        <div>
          <h2>Categories Practiced</h2>
          <div className="parent-tags">
            {categories.map((category) => (
              <span key={category.id} className={practiced.has(category.id) ? "tag-on" : ""}>{category.shortName}</span>
            ))}
          </div>
        </div>
        <div>
          <h2>Skill Notes</h2>
          <p><strong>Strong:</strong> {strongSkills}</p>
          <p><strong>Practice:</strong> {practice}</p>
        </div>
      </div>
      <button className="reset-button" type="button" onClick={() => { play("reset"); onReset(); }}>Reset local progress</button>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
