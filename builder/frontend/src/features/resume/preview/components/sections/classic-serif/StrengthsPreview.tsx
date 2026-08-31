import { useResumeStore } from "../../../../../../store/resume.store";

export default function StrengthsPreview() {
  const resume = useResumeStore((state) => state.resume);
  const strengths = resume?.strengths ?? [];
  if (!resume || strengths.length === 0) return null;

  const strengthsSection = resume.sections.find(
    (section) => section.id === "strengths",
  );

  return (
    <section className="mt-5">
      <h2 className="border-b-2 border-slate-800 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-900">
        {strengthsSection?.displayTitle?.trim() ||
          strengthsSection?.title ||
          "Strengths"}
      </h2>

      <div className="mt-3 space-y-2">
        {strengths.map((s, i) => (
          <div key={i}>
            <p className="text-[12.5px] font-bold text-slate-900">{s.title}</p>
            {s.description && (
              <p className="text-[11.5px] leading-5 text-slate-700">
                {s.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
