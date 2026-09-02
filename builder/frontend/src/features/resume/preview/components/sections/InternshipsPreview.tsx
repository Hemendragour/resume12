import { useResumeStore } from "../../../../../store/resume.store";
import { formatMonthYear } from "../../../editor/utils/formatDate";
import { useTheme } from "../../themes/ThemeProvider";

export default function InternshipsPreview() {
  const resume = useResumeStore((state) => state.resume);
  const theme = useTheme();

  if (!resume) return null;
  if (!resume.internships?.length) return null;

  return (
    <section style={{ marginTop: theme.section.spacing }}>
      <h2
        className={`pb-1 text-[13px] font-bold tracking-wide ${
          theme.section.uppercase ? "uppercase" : ""
        } ${theme.section.divider ? "border-b" : ""}`}
        style={{ color: theme.colors.primary, borderColor: theme.colors.muted }}
      >
        Internships
      </h2>

      <div className="mt-3 space-y-4">
        {resume.internships.map((item, index) => (
          <div key={index}>
            <div className="flex items-start justify-between">
              <div>
                <h3
                  className="text-[12px] font-bold"
                  style={{ color: theme.colors.secondary }}
                >
                  {item.company}
                </h3>
                <p
                  className="text-[11px] italic"
                  style={{ color: theme.colors.text }}
                >
                  {item.role}
                </p>
              </div>

              <span
                className="text-[11px]"
                style={{ color: theme.colors.muted }}
              >
                {formatMonthYear(item.startDate)}
                {item.startDate && (item.endDate || item.currentlyInterning)
                  ? " - "
                  : ""}
                {item.currentlyInterning
                  ? "Present"
                  : formatMonthYear(item.endDate)}
              </span>
            </div>

            {item.responsibilities?.length > 0 && (
              <ul
                className="mt-1 list-disc pl-5 text-[11px] leading-4"
                style={{ color: theme.colors.text }}
              >
                {item.responsibilities.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}

            {item.achievements?.length > 0 && (
              <ul
                className="mt-1 list-disc pl-5 text-[11px] leading-4"
                style={{ color: theme.colors.text }}
              >
                {item.achievements.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
