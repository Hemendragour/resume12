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
    <aside className="w-72 bg-modal border-r border-primary/10 flex-shrink-0 overflow-y-auto">
      <div className="p-6 border-b border-primary/10">
        <h2 className="text-xl font-bold text-dark">Cover Letter Editor</h2>

        <p className="text-sm text-primary/70 mt-1">
          Fill in your letter, section by section
        </p>
      </div>

      <div className="p-4 space-y-2">
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onSectionChange(section.id)}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-primary text-white"
                  : "text-dark hover:bg-background"
              }`}
            >
              <Icon size={20} />
              {section.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
