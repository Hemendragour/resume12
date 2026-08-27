import { useResumeStore } from "../../../../../../store/resume.store";
import { splitLabelTheme as theme } from "../../../themes/split-label.theme";

export default function StrengthsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  const strengths = resume.strengths ?? [];
  if (!strengths.length) return null; // empty template stays empty

  const strengthsSection = resume.sections.find(
    (section) => section.id === "strengths",
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
        {strengthsSection?.displayTitle?.trim() ||
          strengthsSection?.title ||
          "Strengths"}
      </h2>

      <div className="col-span-3 space-y-2">
        {strengths.map((s, i) => (
          <div key={i}>
            <p
              className="text-[11px] font-bold"
              style={{ color: theme.colors.secondary }}
            >
              {s.title}
            </p>
            {s.description && (
              <p
                className="text-[11px] leading-4"
                style={{ color: theme.colors.text }}
              >
                {s.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
