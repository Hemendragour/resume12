import { useResumeStore } from "../../../../../../store/resume.store";

export default function InterestsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume || resume.interests.length === 0) return null;

  const interestsSection = resume.sections.find(
    (section) => section.id === "interests",
  );

  return (
    <section className="mt-5">
      <h2 className="border-b-2 border-slate-800 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-900">
        {interestsSection?.displayTitle?.trim() ||
          interestsSection?.title ||
          "Interests"}
      </h2>

      <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-[11.5px] text-slate-700">
        {resume.interests.map((interest, i) => (
          <span key={i} className="flex items-center gap-2">
            <span>{interest}</span>
            {i !== resume.interests.length - 1 && (
              <span className="text-slate-300">|</span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
