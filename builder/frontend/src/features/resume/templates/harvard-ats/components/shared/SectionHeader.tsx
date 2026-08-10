import { HarvardATSTheme as T } from "../theme.harvard-ats";

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="w-full">
      <h2
        className={`
          ${T.fontFamily.heading}
          ${T.fontSize.sectionTitle}
          ${T.fontWeight.bold}
          ${T.lineHeight.heading}
          ${T.colors.heading}
          uppercase tracking-[2px]
        `}
      >
        {title}
      </h2>

      <div className={T.divider.section} />
    </div>
  );
}