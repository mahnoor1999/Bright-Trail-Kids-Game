type ProgressBarProps = {
  value: number;
  label: string;
};

export function ProgressBar({ value, label }: ProgressBarProps) {
  const percent = Math.round(Math.max(0, Math.min(1, value)) * 100);

  return (
    <div className="progress-wrap" aria-label={`${label}: ${percent}%`}>
      <div className="progress-top">
        <span>{label}</span>
        <strong className="progress-star" aria-hidden="true">⭐</strong>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
