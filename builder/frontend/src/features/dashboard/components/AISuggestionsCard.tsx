import { Sparkles, CheckCircle2 } from "lucide-react";

interface Props {
  suggestions: string[];
}

export default function AISuggestionsCard({ suggestions }: Props) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <Sparkles className="text-violet-600" />
        <h2 className="text-xl font-bold">AI Suggestions</h2>
      </div>

      {suggestions.length === 0 ? (
        <div className="rounded-xl bg-green-50 p-4 text-green-700">
          🎉 Great! Your resume looks complete.
        </div>
      ) : (
        <div className="space-y-3">
          {suggestions.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle2 size={18} className="text-blue-600" />
              {item}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
