import { useResumeStore } from "../../../../store/resume.store";

import { ExecutiveSidebarTheme as T } from "./components/theme.executive-sidebar";

import Sidebar from "./components/sections/Sidebar";
import NameBar from "./components/sections/NameBar";
import DynamicSectionRenderer from "./components/DynamicSectionRenderer";

export default function ExecutiveSidebarTemplate() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  return (
    <div className={T.page.container}>
      <Sidebar />

      <div className={T.main.width}>
        {/* Only Name + Profession get the navy highlight */}
        <NameBar />

        <div className={T.main.padding}>
          <DynamicSectionRenderer />
        </div>
      </div>
    </div>
  );
}
