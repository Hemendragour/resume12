interface Props {
  score: number;
}

export default function ATSScoreCard({ score }: Props) {
  const color =
    score >= 80 ? "bg-green-500" : score >= 60 ? "bg-yellow-500" : "bg-red-500";

  const status =
    score >= 90
      ? "Excellent"
      : score >= 75
        ? "Good"
        : score >= 60
          ? "Average"
          : "Needs Improvement";

  return (
    <div className="rounded-2xl border bg-white p-2 ">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">ATS Score</h2>

        <span className="text-3xl font-bold">{score}/100</span>
      </div>

      <div className="mt-5 h-2 rounded-full bg-slate-200">
        <div
          className={`${color} h-3 rounded-full transition-all duration-500`}
          style={{
            width: `${score}%`,
          }}
        />
      </div>
      <p className="mt-2 text-sm text-gray-500">{status}</p>
    </div>
  );
}
