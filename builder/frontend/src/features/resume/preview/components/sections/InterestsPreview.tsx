import { useResumeStore } from "../../../../../store/resume.store";
import { useTheme } from "../../themes/ThemeProvider";

export default function InterestsPreview() {
  const resume = useResumeStore((state) => state.resume);
  const theme = useTheme();

  if (!resume) return null;
  if (!resume.interests.length) return null;
  return (
    <section style={{ marginTop: theme.section.spacing }}>
      <h2
        className={`pb-1 text-[13px] font-bold tracking-wide ${
          theme.section.uppercase ? "uppercase" : ""
        } ${theme.section.divider ? "border-b" : ""}`}
        style={{ color: theme.colors.primary, borderColor: theme.colors.muted }}
      >
        Interests
      </h2>

      {resume.interests.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {resume.interests.map((interest) => (
            <span
              key={interest}
              className="rounded border px-2 py-0.5 text-[11px]"
              style={{
                borderColor: theme.colors.muted,
                color: theme.colors.text,
              }}
            >
              {interest}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-[11px]" style={{ color: theme.colors.muted }}>
          No interests added.
        </p>
      )}
    </section>
  );
}
