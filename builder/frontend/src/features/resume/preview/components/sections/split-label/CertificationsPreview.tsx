import { useResumeStore } from "../../../../../../store/resume.store";
import { splitLabelTheme as theme } from "../../../themes/split-label.theme";

export default function CertificationsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;
  if (!resume.certifications.length) return null;

  const certificationsSection = resume.sections.find(
    (s) => s.id === "certifications",
  );
  const isSplit = theme.section.layout === "split";

  const title = (
    <h2
      className={`text-[12px] font-semibold ${theme.section.uppercase ? "uppercase" : ""}`}
      style={{ color: theme.colors.text }}
    >
      {certificationsSection?.displayTitle?.trim() ||
        certificationsSection?.title ||
        "Certifications"}
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
      <div className={isSplit ? "col-span-3" : "mt-3"}>
        <ul className="space-y-1 text-[11px]" style={{ color: theme.colors.text }}>
          {resume.certifications.map((c) => (
            <li key={c} className="flex gap-2">
              <span className="shrink-0">•</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
