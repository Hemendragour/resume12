import { useResumeStore } from "../../../../../../store/resume.store";
import { ExecutiveSidebarTheme as T } from "../theme.executive-sidebar";

export default function NameBar() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const { personalInfo } = resume;

  return (
    <div className={T.nameBar.container}>
      <h1 className={T.nameBar.name}>{personalInfo.fullName}</h1>

      {personalInfo.title && (
        <p className={T.nameBar.profession}>{personalInfo.title}</p>
      )}
    </div>
  );
}
