import { CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react";

interface Props {
  strengths: string[];
  weaknesses: string[];
}

export default function ATSStrengthsWeaknesses({
  strengths,
  weaknesses,
}: Props) {
  return (
    <section className="rounded-2xl border border-primary/10 bg-card p-6 shadow-sm">
      {/* Header */}
      <div className="border-b border-primary/10 pb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-bold text-dark">Strengths & Key Areas to Address</h2>
        </div>
        <p className="mt-1 text-xs text-primary/70">
          Executive summary of resume highlights and high-impact areas for improvement.
        </p>
      </div>

      {/* Two columns layout */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Strengths List */}
        <div className="rounded-xl border border-success/20 bg-background p-5">
          <div className="flex items-center gap-2 border-b border-primary/10 pb-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/20 text-success">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-dark">
              Resume Strengths ({strengths.length})
            </h3>
          </div>

          <div className="mt-4">
            {strengths.length === 0 ? (
              <p className="text-xs text-primary/50">
                No major strengths identified in the analysis.
              </p>
            ) : (
              <ul className="space-y-3">
                {strengths.map((strength, idx) => (
                  <li
                    key={`str-${idx}`}
                    className="flex items-start gap-2.5 text-xs text-primary/80 leading-relaxed"
                  >
                    <span className="mt-0.5 text-success font-bold">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Weaknesses / Areas to Improve List */}
        <div className="rounded-xl border border-warning/25 bg-background p-5">
          <div className="flex items-center gap-2 border-b border-primary/10 pb-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-warning/20 text-warning">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-bold text-dark">
              Areas to Improve ({weaknesses.length})
            </h3>
          </div>

          <div className="mt-4">
            {weaknesses.length === 0 ? (
              <div className="flex items-center gap-2 text-xs font-semibold text-success">
                <CheckCircle2 className="h-4 w-4" />
                <span>No major weaknesses or structural gaps detected.</span>
              </div>
            ) : (
              <ul className="space-y-3">
                {weaknesses.map((weakness, idx) => (
                  <li
                    key={`wk-${idx}`}
                    className="flex items-start gap-2.5 text-xs text-primary/80 leading-relaxed"
                  >
                    <span className="mt-0.5 text-warning font-bold">!</span>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
