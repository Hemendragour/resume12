import { LatexATSPhotoTheme as T } from "../theme.latex-ats-photo";

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
          [font-variant:small-caps] tracking-wide
        `}
      >
        {title}
      </h2>

      <div className={T.divider.section} />
    </div>
  );
}
