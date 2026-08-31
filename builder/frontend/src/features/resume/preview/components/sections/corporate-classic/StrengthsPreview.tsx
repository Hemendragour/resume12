import { useResumeStore } from "../../../../../../store/resume.store";

export default function StrengthsPreview() {
  const resume = useResumeStore((state) => state.resume);
  const strengths = resume?.strengths ?? [];
  if (!resume || strengths.length === 0) return null;

  const strengthsSection = resume.sections.find(
    (section) => section.id === "strengths",
  );

  return (
    <section className="mt-6">
      <h2 className="border-y border-slate-700 py-1 text-center text-[12px] font-bold uppercase tracking-[0.6px] text-slate-900">
        {strengthsSection?.displayTitle?.trim() ||
          strengthsSection?.title ||
          "Strengths"}
      </h2>

      <div className="mt-3 space-y-2">
        {strengths.map((s, i) => (
          <div key={i}>
            <p className="text-[12px] font-bold text-slate-900">{s.title}</p>
            {s.description && (
              <p className="text-[11px] leading-5 text-slate-700">
                {s.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
