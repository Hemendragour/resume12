import { useResumeStore } from "../../../../../../store/resume.store";
import { splitLabelTheme as theme } from "../../../themes/split-label.theme";

export default function AchievementsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  const achievements = resume.achievements ?? [];
  if (!achievements.length) return null; // empty template stays empty

  const achievementsSection = resume.sections.find(
    (section) => section.id === "achievements",
  );

  return (
    <section
      className="grid grid-cols-4 gap-6"
      style={{
        marginTop: theme.section.spacing,
        paddingBottom: theme.section.divider ? "16px" : "0",
        borderBottom: theme.section.divider
          ? `1px solid ${theme.colors.muted}33`
          : "none",
      }}
    >
      <h2
        className={`col-span-1 text-[12px] font-semibold ${
          theme.section.uppercase ? "uppercase" : ""
        }`}
        style={{ color: theme.colors.text }}
      >
        {achievementsSection?.displayTitle?.trim() ||
          achievementsSection?.title ||
          "Achievements"}
      </h2>

      <div className="col-span-3">
        <ul
          className="list-disc space-y-1 pl-5 text-[11px] leading-4"
          style={{ color: theme.colors.text }}
        >
          {achievements.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
