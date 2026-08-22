// EditorSidebar.tsx
import SortableSectionList from "../dragdrop/SortableSectionList";
import { useState } from "react";
import { Plus } from "lucide-react";
import { LayoutTemplate, Settings } from "lucide-react";

import AddSectionModal from "../modals/AddSectionModal";
import { useResumeStore } from "../../../../store/resume.store";

interface Props {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function EditorSidebar({
  activeSection,
  onSectionChange,
}: Props) {
  const [openAddSectionModal, setOpenAddSectionModal] = useState(false);

  const addCustomSection = useResumeStore((state) => state.addCustomSection);

  const handleAddSection = (title: string) => {
    addCustomSection(title);
  };
  return (
    <aside className="w-72 bg-modal border-r border-primary/10 flex-shrink-0 overflow-y-auto">
      <div className="p-6 border-b border-primary/10">
        <h2 className="text-xl font-bold text-dark">Resume Editor</h2>

        <p className="text-sm text-primary/70 mt-1">
          Complete your resume step by step
        </p>
      </div>

      <div className="p-4">
        <SortableSectionList
          activeSection={activeSection}
          onSectionChange={onSectionChange}
        />
        <div className="mt-6 border-t border-primary/10 pt-4 space-y-2">
          <button
            onClick={() => onSectionChange("templates")}
            className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 transition ${
              activeSection === "templates"
                ? "bg-primary text-white"
                : "text-dark hover:bg-background"
            }`}
          >
            <LayoutTemplate size={20} />
            Templates
          </button>

          <button
            onClick={() => onSectionChange("settings")}
            className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 transition ${
              activeSection === "settings"
                ? "bg-primary text-white"
                : "text-dark hover:bg-background"
            }`}
          >
            <Settings size={20} />
            Settings
          </button>
        </div>
        <div className="mt-4 border-t border-primary/10 pt-4">
          <button
            onClick={() => setOpenAddSectionModal(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-accent py-3 text-primary transition hover:bg-accent/10"
          >
            <Plus size={18} />
            Add Section
          </button>
        </div>

        <AddSectionModal
          open={openAddSectionModal}
          onClose={() => setOpenAddSectionModal(false)}
          onSelect={handleAddSection}
        />
      </div>
    </aside>
  );
}
