import { useResumeStore } from "../../../../../../store/resume.store";
import { splitLabelTheme as theme } from "../../../themes/split-label.theme";

export default function AwardsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  const awards = resume.awards ?? [];
  if (!awards.length) return null; // empty template stays empty

  const awardsSection = resume.sections.find(
    (section) => section.id === "awards",
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
        {awardsSection?.displayTitle?.trim() ||
          awardsSection?.title ||
          "Awards"}
      </h2>

      <div className="col-span-3">
        <ul
          className="space-y-1 text-[11px] leading-4"
          style={{ color: theme.colors.text }}
        >
          {awards.map((award, i) => (
            <li key={i} className="flex gap-2">
              <span className="shrink-0">•</span>
              <span>{award}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
