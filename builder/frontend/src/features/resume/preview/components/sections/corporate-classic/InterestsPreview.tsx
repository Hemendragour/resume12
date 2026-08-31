import { useResumeStore } from "../../../../../../store/resume.store";

export default function InterestsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume || resume.interests.length === 0) return null;

  const interestsSection = resume.sections.find(
    (section) => section.id === "interests",
  );

  return (
    <section className="mt-6">
      <h2 className="border-y border-slate-700 py-1 text-center text-[12px] font-bold uppercase tracking-[0.6px] text-slate-900">
        {interestsSection?.displayTitle?.trim() ||
          interestsSection?.title ||
          "Interests"}
      </h2>

      <div className="mt-3 grid grid-cols-3 gap-x-6 gap-y-1.5 text-[11.5px] text-slate-700">
        {resume.interests.map((interest, i) => (
          <span key={i} className="flex items-center gap-2">
            <span>•</span> {interest}
          </span>
        ))}
      </div>
    </section>
  );
}
