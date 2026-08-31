import { useResumeStore } from "../../../../../../store/resume.store";

export default function AchievementsPreview() {
  const resume = useResumeStore((state) => state.resume);
  const achievements = resume?.achievements ?? [];
  if (!resume || achievements.length === 0) return null;

  const achievementsSection = resume.sections.find(
    (section) => section.id === "achievements",
  );

  return (
    <section className="mt-5">
      <h2 className="border-b border-slate-500 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-800">
        {achievementsSection?.displayTitle?.trim() ||
          achievementsSection?.title ||
          "Achievements"}
      </h2>

      <ul className="mt-2 list-disc space-y-1 pl-5 text-[11px] text-slate-700">
        {achievements.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
