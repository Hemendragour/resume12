import { useResumeStore } from "../../../../../store/resume.store";
import { useTheme } from "../../themes/ThemeProvider";

export default function LanguagesPreview() {
  const resume = useResumeStore((state) => state.resume);
  const theme = useTheme();

  if (!resume) return null;
  if (!resume.languages.length) return null;
  return (
    <section style={{ marginTop: theme.section.spacing }}>
      <h2
        className={`pb-1 text-[13px] font-bold tracking-wide ${
          theme.section.uppercase ? "uppercase" : ""
        } ${theme.section.divider ? "border-b" : ""}`}
        style={{ color: theme.colors.primary, borderColor: theme.colors.muted }}
      >
        Languages
      </h2>

      <div className="col-span-3 flex mt-3 flex-wrap gap-2">
        {resume.languages.map((lang) => (
          <span
            key={lang.name}
            className="rounded border px-2 py-0.5 text-[11px]"
            style={{
              borderColor: theme.colors.muted,
              color: theme.colors.text,
            }}
          >
            {lang.name}
          </span>
        ))}
      </div>
    </section>
  );
}
