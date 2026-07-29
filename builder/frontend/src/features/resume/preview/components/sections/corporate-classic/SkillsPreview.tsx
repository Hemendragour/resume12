import { useResumeStore } from "../../../../../../store/resume.store";

export default function SkillsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  const allSkills = resume.skills.flatMap((cat) => cat.skills);
  if (allSkills.length === 0) return null;

  return (
    <section className="mt-6">
      <h2 className="border-y border-slate-700 py-1 text-center text-[12px] font-bold uppercase tracking-[0.6px] text-slate-900">
        Skills
      </h2>

      <div className="mt-3 grid grid-cols-3 gap-x-6 gap-y-1.5 text-[11.5px] text-slate-700">
        {allSkills.map((skill, i) => (
          <span key={i} className="flex items-center gap-2">
            <span>•</span> {skill}
          </span>
        ))}
      </div>
    </section>
  );
}