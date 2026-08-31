import { useResumeStore } from "../../../../store/resume.store";

import { ModernProfessionalTheme as T } from "./components/theme.modern-professional";

import HeaderPreview from "./components/sections/HeaderPreview";
import DynamicSectionRenderer from "./components/DynamicSectionRenderer";

export default function ModernProfessionalTemplate() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  return (
    <div
      className={`
        w-full
        h-full
        overflow-hidden
        bg-white
        ${T.fontFamily.body}
      `}
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="w-full">
        <HeaderPreview />
      </div>

      {/* =====================================================
          RESUME BODY
      ====================================================== */}

      <div
        className="
          w-full
          overflow-hidden
          px-6
          pt-5
          pb-4
        "
      >
        <div className="grid grid-cols-12 gap-6">
          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="col-span-8 min-w-0">
            <DynamicSectionRenderer side="left" />
          </div>

          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <aside
            className="
              col-span-4
              min-w-0
              border-l
              border-slate-200
              pl-5
            "
          >
            <DynamicSectionRenderer side="right" />
          </aside>
        </div>
      </div>
    </div>
  );
}
