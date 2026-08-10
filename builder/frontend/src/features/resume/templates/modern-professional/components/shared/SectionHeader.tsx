import type { ReactNode } from "react";
import { ModernProfessionalTheme as T } from "../theme.modern-professional";

interface SectionHeaderProps {
  title: string;
  icon?: ReactNode;
}

export default function SectionHeader({ title, icon }: SectionHeaderProps) {
  return (
    <div className={T.spacing.section}>
      <div className="flex items-center gap-3 mb-3">
        {icon ? (
          // Icon badge (new style — matches reference image)
          <div className={T.sectionHeader.badge}>{icon}</div>
        ) : (
          // Fallback: accent line (old style, for sections not yet updated)
          <div className="w-1 h-6 rounded-full bg-blue-600" />
        )}

        {/* Title */}
        <h2
          className={
            icon
              ? T.sectionHeader.title
              : `
                ${T.fontFamily.heading}
                ${T.fontSize.sectionTitle}
                ${T.fontWeight.bold}
                ${T.colors.heading}
                uppercase
                tracking-[0.15em]
              `
          }
        >
          {title}
        </h2>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-200 w-full" />
    </div>
  );
}
