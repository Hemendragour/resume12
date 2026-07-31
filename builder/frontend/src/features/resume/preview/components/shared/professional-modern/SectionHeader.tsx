import type { ReactNode } from "react";

import { PeachModernTheme as T } from "../../theme.peach-modern";

interface SectionHeaderProps {
  title: string;
  icon: ReactNode;
}

export default function SectionHeader({ title, icon }: SectionHeaderProps) {
  return (
    <div className={`${T.spacing.section}`}>
      <div className="flex items-center gap-3">
        <div
          className={`
        w-8
        h-8
        shrink-0
        flex
        items-center
        justify-center
        ${T.colors.iconBackground}
        ${T.colors.icon}
        ${T.radius.icon}
      `}
        >
          {icon}
        </div>

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
      <div className={`flex-1 border-t mt-3  ${T.colors.border}`} />
    </div>
  );
}
