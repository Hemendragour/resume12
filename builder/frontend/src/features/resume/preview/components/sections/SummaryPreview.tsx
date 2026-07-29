 

import { useResumeStore } from "../../../../../store/resume.store";
import { useTheme } from "../../themes/ThemeProvider";

export default function SummaryPreview() {
  const resume = useResumeStore((state) => state.resume);
  const theme = useTheme();

  if (!resume) return null;

  const isSplit = theme.section.layout === "split";

  const title = (
    <h2
      className={`text-[12px] font-semibold tracking-wide ${
        theme.section.uppercase ? "uppercase" : ""
      }`}
      style={{ color: theme.colors.text }}
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
    <section
      className={isSplit ? "grid grid-cols-4 gap-6" : ""}
      style={{
        marginTop: theme.section.spacing,
        paddingBottom: theme.section.divider ? "16px" : "0",
        borderBottom: theme.section.divider ? `1px solid #e5e7eb` : "none",
      }}
    >
      {isSplit ? (
        <>
          <div className="col-span-1">{title}</div>
          <div className="col-span-3">{content}</div>
        </>
      ) : (
        <>
          <div
            className={`pb-1 ${theme.section.divider ? "border-b" : ""}`}
            style={{ borderColor: theme.colors.muted }}
          >
            {title}
          </div>
          <div className="mt-3">{content}</div>
        </>
      )}
    </section>
  );
}
