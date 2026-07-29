import { useResumeStore } from "../../../../store/resume.store";
import DynamicSectionRenderer from "../components/DynamicSectionRenderer";
import { SplitLabelSectionRegistry } from "../components/SectionRegistry.split-label";
import SplitLabelCustomSection from "../components/sections/split-label/CustomSectionPreview";
import { Phone, Mail } from "lucide-react";

export default function SplitLabelTemplate() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  const { personalInfo } = resume;

  return (
    <div className="min-h-[1120px] bg-white text-[13px] text-black">
      {/* Header with pink gradient */}
      <div
        className="text-center px-10 py-8"
        style={{
          background: "linear-gradient(to bottom, #fce7ef, #ffffff)",
        }}
      >
        <h1 className="text-3xl font-bold text-slate-900">
          {personalInfo.fullName || "YOUR NAME"}
        </h1>

        {personalInfo.title && (
          <p className="mt-1 text-[14px] font-bold text-teal-700">
            {personalInfo.title}
          </p>
        )}

        <div className="mt-4 flex flex-wrap justify-center gap-3 text-[11px]">
          {personalInfo.address && (
            <span className="flex items-center gap-1.5 rounded-full border border-slate-300 px-3 py-1 text-slate-700">
              {personalInfo.address}
            </span>
          )}
          {personalInfo.email && (
            <span className="flex items-center gap-1.5 rounded-full border border-slate-300 px-3 py-1 text-slate-700">
              <Mail size={12} /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5 rounded-full border border-slate-300 px-3 py-1 text-slate-700">
              <Phone size={12} /> {personalInfo.phone}
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-10 py-6">
        <DynamicSectionRenderer
          registry={SplitLabelSectionRegistry}
          customSectionComponent={SplitLabelCustomSection}
        />
      </div>
    </div>
  );
}