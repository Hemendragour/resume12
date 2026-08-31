import { useResumeStore } from "../../../../../../store/resume.store";

const LEVEL_TO_DOTS: Record<string, number> = {
  Native: 5,
  Fluent: 4,
  Conversational: 3,
  Basic: 2,
};

function DotIndicator({ level }: { level: string }) {
  const filled = LEVEL_TO_DOTS[level] ?? 3;

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${
            i < filled ? "bg-slate-800" : "bg-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function LanguagesPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume || resume.languages.length === 0) return null;

  return (
    <section className="mt-6">
      <h2 className="border-y border-slate-700 py-1 text-center text-[12px] font-bold uppercase tracking-[0.6px] text-slate-900">
        Languages
      </h2>

      <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2">
        {resume.languages.map((lang) => (
          <div
            key={lang.name}
            className="flex items-center justify-between text-[11.5px] text-slate-700"
          >
            <span>{lang.name}</span>
            <DotIndicator level={lang.level} />
          </div>
        ))}
      </div>
    </section>
  );
}
