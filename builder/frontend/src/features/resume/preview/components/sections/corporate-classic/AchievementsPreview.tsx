import { useResumeStore } from "../../../../../../store/resume.store";

export default function AchievementsPreview() {
  const resume = useResumeStore((state) => state.resume);
  const achievements = resume?.achievements ?? [];
  if (!resume || achievements.length === 0) return null;

  const achievementsSection = resume.sections.find(
    (section) => section.id === "achievements",
  );

  return (
    <section className="mt-6">
      <h2 className="border-y border-slate-700 py-1 text-center text-[12px] font-bold uppercase tracking-[0.6px] text-slate-900">
        {achievementsSection?.displayTitle?.trim() ||
          achievementsSection?.title ||
          "Achievements"}
      </h2>

      <div className="mt-3 grid grid-cols-3 gap-x-6 gap-y-2 text-[11.5px] leading-5 text-slate-700">
        {achievements.map((item, i) => (
          <span key={i} className="flex gap-2">
            <span>•</span> <span>{item}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
