import { useResumeStore } from "../../../../store/resume.store";

import { LatexSidebarTheme as T } from "./components/theme.latex-sidebar";

import Sidebar from "./components/sections/Sidebar";
import NameHeader from "./components/sections/NameHeader";
import DynamicSectionRenderer from "./components/DynamicSectionRenderer";

export default function LatexSidebarTemplate() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  return (
    <div className={T.page.container}>
      {/* Light sidebar — personal info, skills, languages, certificates */}
      <Sidebar />

      {/* White main panel */}
      <div className={T.main.width}>
        <div className={T.main.padding}>
          {/* Name + title header with bottom rule */}
          <NameHeader />

          {/* All other sections rendered in order */}
          <DynamicSectionRenderer />
        </div>
      </div>
    </div>
  );
}
