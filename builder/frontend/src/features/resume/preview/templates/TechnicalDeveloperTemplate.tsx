import { useResumeStore } from "../../../../store/resume.store";
import DynamicSectionRenderer from "../components/DynamicSectionRenderer";
import ResumeHeader from "../components/shared/ResumeHeader";
import ThemeProvider from "../themes/ThemeProvider";
import { technicalTheme } from "../themes/technical.theme";
import { SectionRegistry } from "../components/SectionRegistry";
import CustomSectionPreview from "../components/sections/CustomSectionPreview";

export default function TechnicalDeveloperTemplate() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) {
    return null;
  }

  return (
    <ThemeProvider theme={technicalTheme}>
      <div className="bg-white min-h-[1120px] p-10 text-[13px]">
        <ResumeHeader />

        <DynamicSectionRenderer
          registry={SectionRegistry}
          customSectionComponent={CustomSectionPreview}
        />
      </div>
    </ThemeProvider>
  );
}