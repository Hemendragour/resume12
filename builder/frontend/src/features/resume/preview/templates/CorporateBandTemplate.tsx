import { useResumeStore } from "../../../../store/resume.store";
import DynamicSectionRenderer from "../components/DynamicSectionRenderer";
import ContactLinks from "../components/shared/ContactLinks";
import CorporateBandCustomSection from "../components/sections/corporate-band/CustomSectionPreview";
import { CorporateBandSectionRegistry } from "../components/SectionRegistry.corporate-band";

export default function CorporateBandTemplate() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const { personalInfo } = resume;

  return (
    <div className="min-h-[1120px] bg-white text-[13px] text-black">
      <div className="px-10 py-6 text-center ">
        <h1 className="text-2xl font-bold uppercase tracking-wide">
          {personalInfo.fullName}
        </h1>

        {personalInfo.title && (
          <p className="mt-1 text-[12px] ">{personalInfo.title}</p>
        )}

        <div className="mt-2 text-[11px] ">
          <ContactLinks />
        </div>
      </div>

      <div className="p-10">
        <DynamicSectionRenderer
          registry={CorporateBandSectionRegistry}
          customSectionComponent={CorporateBandCustomSection}
        />
      </div>
    </div>
  );
}
