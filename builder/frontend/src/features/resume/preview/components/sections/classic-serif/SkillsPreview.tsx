import { useResumeStore } from "../../../../../../store/resume.store";

export default function SkillsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const allSkills = resume.skills
    .flatMap((category) => category.skills)
    .filter((skill) => skill.trim() !== "");

  const skillsSection = resume.sections.find(
    (section) => section.id === "skills",
  );
  if (allSkills.length === 0) return null;
  return (
    <section className="mt-6">
      <h2 className="mb-2 border-b border-slate-700 pb-1 text-[13px] font-bold uppercase tracking-[0.6px] text-black">
        {skillsSection?.displayTitle?.trim() ||
          skillsSection?.title ||
          "Skills"}
      </h2>

      <p className="text-[11.5px] leading-[1.6] text-slate-800">
        {allSkills.map((skill, index) => (
          <span key={index}>
            <span>{skill}</span>
            {index !== allSkills.length - 1 && (
              <span className="mx-2 text-slate-400">|</span>
            )}
          </span>
        ))}
      </p>
    </section>
  );
}
