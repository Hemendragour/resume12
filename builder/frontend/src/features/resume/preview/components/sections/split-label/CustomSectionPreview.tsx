import { useResumeStore } from "../../../../../../store/resume.store";
import { splitLabelTheme as theme } from "../../../themes/split-label.theme";

interface Props {
  sectionId: string;
}

export default function CustomSectionPreview({ sectionId }: Props) {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  const section = resume.customSections.find((item) => item.id === sectionId);
  if (!section || section.items.length === 0) return null;

  const isSplit = theme.section.layout === "split";

  const title = (
    <h2
      className={`text-[12px] font-semibold ${theme.section.uppercase ? "uppercase" : ""}`}
      style={{ color: theme.colors.text }}
    >
      {section.title}
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

      <div className={isSplit ? "col-span-3 space-y-4" : "mt-3 space-y-4"}>
        {section.items.map((item) => (
          <div key={item.id}>
            <div className="flex items-start justify-between">
              <div>
                <h3
                  className="text-[12px] font-bold"
                  style={{ color: theme.colors.secondary }}
                >
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p
                    className="text-[11px]"
                    style={{ color: theme.colors.text }}
                  >
                    {item.subtitle}
                  </p>
                )}
              </div>
              {(item.startDate || item.endDate) && (
                <span
                  className="text-[11px]"
                  style={{ color: theme.colors.muted }}
                >
                  {item.startDate}
                  {item.startDate && item.endDate ? " – " : ""}
                  {item.endDate}
                </span>
              )}
            </div>
            {item.description && (
              <p
                className="mt-1 text-[11px] leading-4"
                style={{ color: theme.colors.text }}
              >
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
