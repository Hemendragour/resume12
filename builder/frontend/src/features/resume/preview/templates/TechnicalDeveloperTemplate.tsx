import { useResumeStore } from "../../../../store/resume.store";
import DynamicSectionRenderer from "../components/DynamicSectionRenderer";

export default function TechnicalDeveloperTemplate() {
  console.log("Technical Template Rendered");
  const resume = useResumeStore((state) => state.resume);

  if (!resume) {
    return null;
  }

  

  return (
    <div className="bg-white min-h-[1120px] p-10 text-[13px]">
      
      <DynamicSectionRenderer />

       
    </div>
  );
}
