import { useResumeStore } from "../../../../../../store/resume.store";
import { splitLabelTheme as theme } from "../../../themes/split-label.theme";

export default function SummaryPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;
  if (!resume.summary?.trim()) return null;

  const summarySection = resume.sections.find((s) => s.id === "summary");
  const isSplit = theme.section.layout === "split";

  const title = (
    <h2
      className={`text-[12px] font-semibold ${theme.section.uppercase ? "uppercase" : ""}`}
      style={{ color: theme.colors.text }}
    >
      {summarySection?.displayTitle?.trim() ||
        summarySection?.title ||
        "Summary"}
    </h2>
  );

  return (
    <section
      className={isSplit ? "grid grid-cols-4 gap-6" : ""}
      style={{
        marginTop: theme.section.spacing,
        paddingBottom: theme.section.divider ? "16px" : "0",
        borderBottom: theme.section.divider
          ? `1px solid ${theme.colors.muted}33`
          : "none",
      }}
    >
      {isSplit ? <div className="col-span-1">{title}</div> : title}
      <p
        className={
          isSplit
            ? "col-span-3 text-[11px] leading-5"
            : "mt-2 text-[11px] leading-5"
        }
        style={{ color: theme.colors.text }}
      >
        {resume.summary}
      </p>
    </section>
  );
}
