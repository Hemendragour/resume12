interface ProgressBarProps {
  current: number;
  answered: number;
  total: number;
}

export default function ProgressBar({
  current,
  answered,
  total,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.round((answered / total) * 100));

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs font-medium text-nav-text sm:text-sm">
        <span>
          Question {Math.min(current, total)} / {total}
        </span>
        <span>{percentage}%</span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-border-popup">
        <div
          className="h-full rounded-full bg-btn transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
