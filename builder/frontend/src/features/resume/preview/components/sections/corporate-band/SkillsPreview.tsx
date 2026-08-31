import { useResumeStore } from "../../../../../../store/resume.store";

export default function SkillsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  const categories = resume.skills.filter((cat) => cat.skills.length > 0);
  if (categories.length === 0) return null;

  const skillsSection = resume.sections.find(
    (section) => section.id === "skills",
  );
  return (
    <section className="mt-5">
      <h2 className="border-b border-slate-500 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-800">
        {skillsSection?.displayTitle?.trim() ||
          skillsSection?.title ||
          "Skills"}
      </h2>

      <div className="mt-3 space-y-1">
        {categories.map((category, index) => (
          <p key={index} className="text-[11px] leading-4 text-slate-700">
            <span className="font-semibold">{category.title}:</span>{" "}
            {category.skills.join(", ")}
          </p>
        ))}
      </div>
    </section>
  );
}
