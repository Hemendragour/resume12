import { useResumeStore } from "../../../../../../store/resume.store";

export default function SkillsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  return (
    <section className="mt-5">
      <h2 className="border-b border-slate-500 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-800">
        Skills
      </h2>

      {resume.skills.length === 0 ? (
        <p className="mt-3 text-[11px] text-slate-500">No skills added.</p>
      ) : (
        <div className="mt-3 space-y-1">
          {resume.skills.map((category, index) => (
            <p key={index} className="text-[11px] leading-4 text-slate-700">
              <span className="font-semibold">{category.title}:</span>{" "}
              {category.skills.join(", ")}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
