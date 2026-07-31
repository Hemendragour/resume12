import { Mail, Phone } from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

import { useResumeStore } from "../../../../store/resume.store";

import DynamicSectionRenderer from "../components/DynamicSectionRenderer";

import { ProfessionalModernSectionRegistry } from "../components/SectionRegistry.professional-modern";

import ProfessionalModernCustomSection from "../components/sections/professional-modern/CustomSectionPreview";

import { ProfessionalModernTheme as T } from "../components/theme.professional-modern";

export default function ProfessionalModernTemplate() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const { personalInfo } = resume;

  return (
    <div
      className={`min-h-[1123px] ${T.colors.page} ${T.spacing.page} ${T.fontFamily}`}
    >
      {/* Header */}

      <div
        className={`${T.colors.header} ${T.radius.header} px-8 py-6 flex justify-between items-start`}
      >
        {/* Left */}

        <div>
          <h1
            className={`${T.fontSize.name} font-extrabold tracking-wide ${T.colors.heading}`}
          >
            {personalInfo.fullName || "YOUR NAME"}
          </h1>

          <p
            className={`mt-1 font-semibold uppercase tracking-wide ${T.fontSize.title} ${T.colors.body}`}
          >
            {personalInfo.title || "SOFTWARE ENGINEER"}
          </p>
        </div>

        {/* Right */}

        <div
          className={`space-y-2 text-right ${T.fontSize.contact} ${T.colors.body}`}
        >
          {personalInfo.phone && (
            <div className="flex items-center justify-end gap-2">
              <Phone size={14} />

              <span>{personalInfo.phone}</span>
            </div>
          )}

          {personalInfo.email && (
            <div className="flex items-center justify-end gap-2">
              <Mail size={14} />

              <span>{personalInfo.email}</span>
            </div>
          )}

          {personalInfo.linkedIn && (
            <div className="flex items-center justify-end gap-2">
              <FaLinkedin size={14} />

              <span>{personalInfo.linkedIn}</span>
            </div>
          )}

          {personalInfo.github && (
            <div className="flex items-center justify-end gap-2">
              <FaGithub size={14} />

              <span>{personalInfo.github}</span>
            </div>
          )}
        </div>
      </div>

      {/* Resume Body */}

      <div className="mt-6">
        <DynamicSectionRenderer
          registry={ProfessionalModernSectionRegistry}
          customSectionComponent={ProfessionalModernCustomSection}
        />
      </div>
    </div>
  );
}
