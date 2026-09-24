import SortableSectionList from "../dragdrop/SortableSectionList";
import { useState } from "react";
import { Plus, LayoutTemplate, Settings } from "lucide-react";
import AddSectionModal from "../modals/AddSectionModal";
import { useResumeStore } from "../../../../store/resume.store";

interface Props {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function SectionNavList({
  activeSection,
  onSectionChange,
}: Props) {
  const [openAddSectionModal, setOpenAddSectionModal] = useState(false);
  const addCustomSection = useResumeStore((state) => state.addCustomSection);

  const handleAddSection = (title: string) => {
    addCustomSection(title);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Section list */}
      <div className="flex-1 min-h-0 overflow-y-auto px-2 py-3">
        <SortableSectionList
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />

        {/* Utility section nav */}
        <div className="mt-4 border-t border-primary/10 pt-3 space-y-0.5">
          <button
            onClick={() => onSectionChange("templates")}
            className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
              activeSection === "templates"
                ? "bg-primary text-white shadow-sm"
                : "text-dark/70 hover:bg-card hover:text-dark"
            }`}
          >
            <LayoutTemplate size={15} className="shrink-0" />
            Templates
          </button>

          <button
            onClick={() => onSectionChange("settings")}
            className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
              activeSection === "settings"
                ? "bg-primary text-white shadow-sm"
                : "text-dark/70 hover:bg-card hover:text-dark"
            }`}
          >
            <Settings size={15} className="shrink-0" />
            Settings
          </button>
        </div>
      </div>

      {/* Add section button */}
      <div className="shrink-0 px-3 py-3 border-t border-primary/10 bg-modal">
        <button
          onClick={() => setOpenAddSectionModal(true)}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-accent/60 py-2 text-xs font-semibold text-primary/70 transition hover:border-accent hover:bg-accent/10 hover:text-dark"
        >
          <Plus size={14} />
          Add Section
        </button>
      </div>

      <AddSectionModal
        open={openAddSectionModal}
        onClose={() => setOpenAddSectionModal(false)}
        onSelect={handleAddSection}
      />
    </div>
  );
}
