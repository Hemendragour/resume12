import { useResumeStore } from "../../../../../../store/resume.store";
import { LatexSidebarTheme as T } from "../theme.latex-sidebar";

export default function NameHeader() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const { personalInfo } = resume;

  return (
    <div className={T.nameHeader.container}>
      <h1 className={T.nameHeader.name}>{personalInfo.fullName}</h1>
      {personalInfo.title && (
        <p className={T.nameHeader.title}>{personalInfo.title}</p>
      )}
    </div>
  );
}
