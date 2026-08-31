import { useResumeStore } from "../../../../../store/resume.store";
import { useTheme } from "../../themes/ThemeProvider";

export default function CertificationsPreview() {
  const resume = useResumeStore((state) => state.resume);
  const theme = useTheme();

  if (!resume) return null;
  if (!resume.certifications.length) return null;
  return (
    <section style={{ marginTop: theme.section.spacing }}>
      <h2
        className={`pb-1 text-[13px] font-bold tracking-wide ${
          theme.section.uppercase ? "uppercase" : ""
        } ${theme.section.divider ? "border-b" : ""}`}
        style={{ color: theme.colors.primary, borderColor: theme.colors.muted }}
      >
        Certifications
      </h2>

      {resume.certifications.length > 0 ? (
        <ul
          className="mt-2 list-disc space-y-1 pl-5 text-[11px]"
          style={{ color: theme.colors.text }}
        >
          {resume.certifications.map((certification) => (
            <li key={certification}>{certification}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-[11px]" style={{ color: theme.colors.muted }}>
          No certifications added.
        </p>
      )}
    </section>
  );
}
