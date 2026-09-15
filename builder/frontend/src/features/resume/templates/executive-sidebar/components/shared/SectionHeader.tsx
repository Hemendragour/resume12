import { ExecutiveSidebarTheme as T } from "../theme.executive-sidebar";

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <h2
      className={`
        ${T.fontSize.sectionTitle}
        ${T.fontWeight.bold}
        ${T.colors.heading}
        ${T.divider.section}
        uppercase tracking-[1.5px]
      `}
    >
      {title}
    </h2>
  );
}
