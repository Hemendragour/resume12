import { useResumeStore } from "../../../../store/resume.store";
import DynamicSectionRenderer from "../components/DynamicSectionRenderer";
import { CorporateClassicSectionRegistry } from "../components/SectionRegistry.corporate-classic";
import CorporateClassicCustomSection from "../components/sections/corporate-classic/CustomSectionPreview";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

export default function CorporateClassicTemplate() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  const { personalInfo } = resume;

  return (
    <div className="min-h-[1120px] bg-white px-12 py-10 text-[13px] text-slate-900">
      <div className="text-center">
        <h1 className="font-serif text-[26px] font-bold text-slate-900">
          {personalInfo.fullName || "Your Name"}
        </h1>

        {personalInfo.title && (
          <p className="mt-1 font-serif text-[14px] italic text-slate-700">
            {personalInfo.title}
          </p>
        )}

        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-slate-600">
          {personalInfo.address && (
            <span className="flex items-center gap-1">
              <MapPin size={12} /> {personalInfo.address}
            </span>
          )}
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail size={12} /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone size={12} /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.linkedIn && (
            <span className="flex items-center gap-1">
              <FaLinkedin size={12} /> {personalInfo.linkedIn}
            </span>
          )}
        </div>
      </div>

      <div className="mt-6">
        <DynamicSectionRenderer
          registry={CorporateClassicSectionRegistry}
          customSectionComponent={CorporateClassicCustomSection}
        />
      </div>
    </div>
  );
}