import type { ReactNode } from "react";
import { useSound } from "../sound/SoundProvider";
import { SoundToggle } from "./SoundToggle";
import { StarCounter } from "./StarCounter";

type AppShellProps = {
  stars: number;
  children: ReactNode;
  onHome: () => void;
  onProgress: () => void;
  onParent: () => void;
};

export function AppShell({ stars, children, onHome, onProgress, onParent }: AppShellProps) {
  const { play } = useSound();

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand-button" type="button" onClick={() => { play("tap"); onHome(); }} aria-label="Home">
          <span className="brand-mark">bt</span>
          <span>Bright Trail</span>
        </button>
        <div className="top-actions">
          <SoundToggle />
          <button className="icon-button" type="button" onClick={() => { play("tap"); onProgress(); }} aria-label="Progress">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 18c4-7 10-4 14-12" /><path d="M15 6h4v4" /></svg>
          </button>
          <StarCounter stars={stars} compact />
          <button className="icon-button parent-button" type="button" onClick={() => { play("tap"); onParent(); }} aria-label="Parent dashboard">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.4" /><path d="M5 20c1.5-4.5 5-6 7-6s5.5 1.5 7 6" /></svg>
          </button>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
