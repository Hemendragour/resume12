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
    <aside className="hidden lg:flex h-full w-52 xl:w-64 bg-modal border-r border-primary/10 shrink-0 flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-primary/10 shrink-0">
        <p className="text-[11px] font-bold uppercase tracking-widest text-primary/50">
          Sections
        </p>
      </div>

      <div className="flex-1 min-h-0">
        <SectionNavList
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />
      </div>
    </aside>
  );
}
