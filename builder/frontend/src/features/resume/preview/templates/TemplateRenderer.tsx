import { useResumeStore } from "../../../../store/resume.store";

import TechnicalDeveloperTemplate from "./TechnicalDeveloperTemplate";
import ModernTemplate from "./ModernTemplate";
import MinimalTemplate from "./MinimalTemplate";
import ExecutiveTemplate from "./ExecutiveTemplate";
import StudentTemplate from "./StudentTemplate";
import AtsTemplate from "./AtsTemplate";

export default function TemplateRenderer() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  switch (resume.templateId) {
    case "modern-professional":
      return <ModernTemplate />;

    case "minimal-clean":
      return <MinimalTemplate />;

    case "executive":
      return <ExecutiveTemplate />;

    case "student":
      return <StudentTemplate />;

    case "ats":
      return <AtsTemplate />;

    default:
      return <TechnicalDeveloperTemplate />;
  }
}
