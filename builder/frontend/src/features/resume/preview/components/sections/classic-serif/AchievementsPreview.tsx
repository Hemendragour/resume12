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
      <h2 className="border-b-2 border-slate-800 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-900">
        {achievementsSection?.displayTitle?.trim() ||
          achievementsSection?.title ||
          "Achievements"}
      </h2>

      <ul className="mt-3 space-y-1 pl-4 text-[11.5px] leading-5 text-slate-700">
        {achievements.map((item, i) => (
          <li key={i} className="list-disc">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
