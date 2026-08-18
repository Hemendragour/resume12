import { useResumeStore } from "../../../../../../store/resume.store";

export default function SkillsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;
  const skillsSection = resume.sections.find(
    (section) => section.id === "skills",
  );
  return (
    <section className="grid grid-cols-4 gap-6 mt-6 pb-4 border-b border-rose-100">
      <h2 className="col-span-1 text-[12px] font-semibold text-slate-800">
        {skillsSection?.displayTitle?.trim() ||
          skillsSection?.title ||
          "Relevant Skills"}
      </h2>

      <div className="col-span-3">
        {resume.skills.length === 0 ? (
          <p className="text-[11px] text-slate-400">No skills added.</p>
        ) : (
          <div className="space-y-3">
            {resume.skills.map((category, index) => (
              <div key={index}>
                <p className="text-[11px] font-semibold uppercase text-rose-700">
                  {category.title}
                </p>
                <p className="text-[11px] leading-4 text-slate-700 mt-0.5">
                  {category.skills.join(", ")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
