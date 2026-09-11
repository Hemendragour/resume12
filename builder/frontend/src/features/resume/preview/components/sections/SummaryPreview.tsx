import { useResumeStore } from "../../../../../store/resume.store";
import { useTheme } from "../../themes/ThemeProvider";

export default function SummaryPreview() {
  const resume = useResumeStore((state) => state.resume);
  const theme = useTheme();

  if (!resume) return null;
  if (!resume.summary?.trim()) return null;
  const isSplit = theme.section.layout === "split";

  const title = (
    <h2
      className={`pb-1 text-[13px] font-bold tracking-wide ${
        theme.section.uppercase ? "uppercase" : ""
      } ${theme.section.divider ? "border-b" : ""}`}
      style={{ color: theme.colors.primary, borderColor: theme.colors.muted }}
    >
      Summary
    </h2>
  );

  const content = (
    <p className="text-[11px] leading-5" style={{ color: theme.colors.text }}>
      {resume.summary?.trim()
        ? resume.summary
        : "Write a concise professional summary highlighting your experience, technical expertise, and career goals."}
    </p>
  );

  return (
    <section style={{ marginTop: theme.section.spacing }}>
      {isSplit ? (
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">{title}</div>
          <div className="col-span-3">{content}</div>
        </div>
      ) : (
        <>
          {title}
          <div className="mt-2">{content}</div>
        </>
      )}
    </section>
  );
}
