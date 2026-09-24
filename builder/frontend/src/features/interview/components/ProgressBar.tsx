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
      <div className="mb-1 flex items-center justify-between text-xs font-medium text-primary/70 sm:text-sm">
        <span>
          Question {Math.min(current, total)} / {total}
        </span>
        <span>{percentage}%</span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-primary/10">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
