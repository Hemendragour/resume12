// EditorSidebar.tsx
//
// Desktop-only sections rail. Hidden below `lg` — on mobile/tablet
// the same section list is shown as a full-screen overlay from
// ResumeEditorPage instead (see SectionNavList).
import SectionNavList from "./SectionNavList";

interface Props {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function EditorSidebar({
  activeSection,
  onSectionChange,
}: Props) {
  return (
    <aside className="hidden lg:flex w-52 xl:w-64 bg-modal border-r border-primary/10 flex-shrink-0 flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-primary/10">
        <p className="text-[11px] font-bold uppercase tracking-widest text-primary/50">
          Sections
        </p>
      </div>

      <SectionNavList
        activeSection={activeSection}
        onSectionChange={onSectionChange}
      />
    </aside>
  );
}
