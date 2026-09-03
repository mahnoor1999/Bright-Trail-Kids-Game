import { useEffect, useMemo, useState } from "react";
import { AppShell } from "./components/AppShell";
import { applyActivityResult, getActivitiesForCategory, getNextActivity, isLevelComplete } from "./game/progression";
import { loadProgress, resetProgress, saveProgress } from "./game/storage";
import { ActivityScreen } from "./screens/ActivityScreen";
import { BelongsTogetherScreen } from "./screens/BelongsTogetherScreen";
import { CategorySelection } from "./screens/CategorySelection";
import { CountTapScreen } from "./screens/CountTapScreen";
import { Home } from "./screens/Home";
import { LevelComplete } from "./screens/LevelComplete";
import { MemoryMatchScreen } from "./screens/MemoryMatchScreen";
import { OddOneOutScreen } from "./screens/OddOneOutScreen";
import { ParentDashboard } from "./screens/ParentDashboard";
import { ProgressScreen } from "./screens/ProgressScreen";
import { ShadowMatchScreen } from "./screens/ShadowMatchScreen";
import { SortSizeScreen } from "./screens/SortSizeScreen";
import type { ActivityResult, CategoryId, ProgressState, Screen } from "./types";

export function App() {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("logic");
  const [activeActivityId, setActiveActivityId] = useState<string | null>(null);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const activeActivity = useMemo(() => {
    const activities = getActivitiesForCategory(selectedCategory);
    return activities.find((activity) => activity.id === activeActivityId);
  }, [activeActivityId, selectedCategory]);

  function startCategory(categoryId: CategoryId) {
    setSelectedCategory(categoryId);
    const next = getNextActivity(progress, categoryId);
    if (next) {
      setActiveActivityId(next.id);
      setScreen("activity");
      return;
    }
    setScreen("categories");
  }

  function awardActivity(result: ActivityResult) {
    const nextProgress = applyActivityResult(progress, result);
    setProgress(nextProgress);
  }

  function continueAfterActivity() {
    if (isLevelComplete(progress, selectedCategory)) {
      setScreen("level-complete");
      return;
    }

    const next = getNextActivity(progress, selectedCategory);
    setActiveActivityId(next?.id ?? null);
    setScreen(next ? "activity" : "home");
  }

  function resetAllProgress() {
    resetProgress();
    const fresh = loadProgress();
    setProgress(fresh);
    setActiveActivityId(null);
    setScreen("home");
  }

  return (
    <AppShell
      stars={progress.totalStars}
      onHome={() => setScreen("home")}
      onProgress={() => setScreen("progress")}
      onParent={() => setScreen("parent")}
    >
      {screen === "home" && (
        <Home progress={progress} onPlay={startCategory} />
      )}
      {screen === "categories" && (
        <CategorySelection
          progress={progress}
          selectedCategory={selectedCategory}
          onBack={() => setScreen("home")}
          onStart={startCategory}
        />
      )}
      {screen === "activity" && activeActivity && activeActivity.type === "pattern" && (
        <ActivityScreen
          key={activeActivity.id}
          activity={activeActivity}
          categoryId={selectedCategory}
          onAward={awardActivity}
          onContinue={continueAfterActivity}
          onExit={() => setScreen("home")}
        />
      )}
      {screen === "activity" && activeActivity && activeActivity.type === "odd-one-out" && (
        <OddOneOutScreen
          key={activeActivity.id}
          activity={activeActivity}
          categoryId={selectedCategory}
          onAward={awardActivity}
          onContinue={continueAfterActivity}
          onExit={() => setScreen("home")}
        />
      )}
      {screen === "activity" && activeActivity && activeActivity.type === "sort-size" && (
        <SortSizeScreen
          key={activeActivity.id}
          activity={activeActivity}
          categoryId={selectedCategory}
          onAward={awardActivity}
          onContinue={continueAfterActivity}
          onExit={() => setScreen("home")}
        />
      )}
      {screen === "activity" && activeActivity && activeActivity.type === "memory-match" && (
        <MemoryMatchScreen
          key={activeActivity.id}
          activity={activeActivity}
          categoryId={selectedCategory}
          onAward={awardActivity}
          onContinue={continueAfterActivity}
          onExit={() => setScreen("home")}
        />
      )}
      {screen === "activity" && activeActivity && activeActivity.type === "count-tap" && (
        <CountTapScreen
          key={activeActivity.id}
          activity={activeActivity}
          categoryId={selectedCategory}
          onAward={awardActivity}
          onContinue={continueAfterActivity}
          onExit={() => setScreen("home")}
        />
      )}
      {screen === "activity" && activeActivity && activeActivity.type === "shadow-match" && (
        <ShadowMatchScreen
          key={activeActivity.id}
          activity={activeActivity}
          categoryId={selectedCategory}
          onAward={awardActivity}
          onContinue={continueAfterActivity}
          onExit={() => setScreen("home")}
        />
      )}
      {screen === "activity" && activeActivity && activeActivity.type === "belongs-together" && (
        <BelongsTogetherScreen
          key={activeActivity.id}
          activity={activeActivity}
          categoryId={selectedCategory}
          onAward={awardActivity}
          onContinue={continueAfterActivity}
          onExit={() => setScreen("home")}
        />
      )}
      {screen === "activity" && !activeActivity && (
        <Home progress={progress} onPlay={startCategory} />
      )}
      {screen === "level-complete" && (
        <LevelComplete
          activities={getActivitiesForCategory(selectedCategory)}
          progress={progress}
          onHome={() => setScreen("home")}
        />
      )}
      {screen === "progress" && <ProgressScreen progress={progress} onBack={() => setScreen("home")} />}
      {screen === "parent" && <ParentDashboard progress={progress} onBack={() => setScreen("home")} onReset={resetAllProgress} />}
    </AppShell>
  );
}
