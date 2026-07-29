 

import { useResumeStore } from "../../../../store/resume.store";

import { ResumeTemplatesMap } from "./index";

export default function TemplateRenderer() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const Template =
    ResumeTemplatesMap[resume.templateId as keyof typeof ResumeTemplatesMap] ||
    ResumeTemplatesMap["technical-developer"];

  return <Template />;
}
