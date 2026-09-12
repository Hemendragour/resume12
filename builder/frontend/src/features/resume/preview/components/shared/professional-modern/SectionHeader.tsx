import type { ReactNode } from "react";

import { ProfessionalModernTheme as T } from "../../theme.professional-modern";
interface SectionHeaderProps {
  title: string;
  icon: ReactNode;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className={`${T.spacing.section}`}>
      <div className="flex items-center gap-3">
        <h2
          className={`
        uppercase
        tracking-[2px]
        font-bold
        ${T.fontSize.sectionHeader}
        ${T.colors.heading}
      `}
        >
          {title}
        </h2>
      </div>
      <div className={`flex-1 border-t mt-2  ${T.colors.border}`} />
    </div>
  );
}
