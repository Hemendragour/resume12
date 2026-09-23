import { Sparkles, CheckCircle2 } from "lucide-react";

interface Props {
  suggestions: string[];
}

export default function AISuggestionsCard({ suggestions }: Props) {
  return (
    <section className="rounded-2xl border border-primary/10 bg-card p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-3 sm:mb-5">
        <Sparkles className="text-accent" />
        <h2 className="text-lg font-bold text-dark sm:text-xl">
          AI Suggestions
        </h2>
      </div>

      {suggestions.length === 0 ? (
        <div className="rounded-xl bg-success/10 p-4 text-sm text-success sm:text-base">
          🎉 Great! Your resume looks complete.
        </div>
      ) : (
        <div className="space-y-3">
          {suggestions.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 text-sm text-dark sm:text-base"
            >
              <CheckCircle2
                size={18}
                className="mt-0.5 shrink-0 text-info"
              />
              {item}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
