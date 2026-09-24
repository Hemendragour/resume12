// CoverLetterEditorSidebar.tsx
import { UserRound, AlignLeft, PenLine } from "lucide-react";

export type CoverLetterSection = "header" | "body" | "closing";

interface SectionConfig {
  id: CoverLetterSection;
  label: string;
  icon: typeof UserRound;
}

const sections: SectionConfig[] = [
  { id: "header", label: "Header & Greeting", icon: UserRound },
  { id: "body", label: "Letter Body", icon: AlignLeft },
  { id: "closing", label: "Closing", icon: PenLine },
];

interface Props {
  activeSection: CoverLetterSection;
  onSectionChange: (section: CoverLetterSection) => void;
}

export default function CoverLetterEditorSidebar({
  activeSection,
  onSectionChange,
}: Props) {
  return (
    <aside className="hidden lg:flex w-56 xl:w-64 bg-modal border-r border-primary/10 flex-shrink-0 flex-col overflow-hidden">
      {/* Header label */}
      <div className="px-4 py-3 border-b border-primary/10">
        <p className="text-[11px] font-bold uppercase tracking-widest text-primary/50">
          Sections
        </p>
      </div>

      {/* Section list */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSectionChange(section.id)}
              className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "text-dark/70 hover:bg-card hover:text-dark"
              }`}
            >
              <Icon size={15} className="shrink-0" />
              {section.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
