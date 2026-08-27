import { useResumeStore } from "../../../../../../store/resume.store";
import { splitLabelTheme as theme } from "../../../themes/split-label.theme";

export default function InterestsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;
  if (!resume.interests.length) return null;

  const isSplit = theme.section.layout === "split";

  const title = (
    <h2
      className={`text-[12px] font-semibold ${theme.section.uppercase ? "uppercase" : ""}`}
      style={{ color: theme.colors.text }}
    >
      Interests
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
        <div className="flex flex-wrap gap-2">
          {resume.interests.map((i) => (
            <span
              key={i}
              className="rounded border px-2 py-0.5 text-[11px]"
              style={{
                borderColor: theme.colors.muted,
                color: theme.colors.text,
              }}
            >
              {i}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
