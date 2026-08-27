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
      className={`
        w-full
        h-full
        overflow-hidden
        bg-white
        ${T.colors.page}
        ${T.fontFamily}
      `}
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      {/* =====================================================
    HEADER
====================================================== */}

      <div
        className={`
    ${T.colors.header}
    ${T.radius.header}
    px-8
    py-6
    flex
    justify-between
    items-start
  `}
      >
        {/* LEFT */}
        <div className="min-w-0 flex-1">
          <h1
            className={`
        ${T.fontSize.name}
        font-extrabold
        tracking-wide
        ${T.colors.heading}
      `}
          >
            {personalInfo.fullName}
          </h1>

          <p
            className={`
        mt-1
        font-semibold
        uppercase
        tracking-wide
        ${T.fontSize.title}
        ${T.colors.body}
      `}
          >
            {personalInfo.title}
          </p>

          {/* ADDRESS */}
          {personalInfo.address && (
            <div
              className={`
          mt-2
          flex
          items-center
          gap-2
          ${T.fontSize.contact}
          ${T.colors.body}
        `}
            >
              <span>{personalInfo.address}</span>
            </div>
          )}
        </div>

        {/* RIGHT — CONTACT */}
        <div
          className={`
      shrink-0
      space-y-2
      text-right
      ${T.fontSize.contact}
      ${T.colors.body}
    `}
        >
          {/* PHONE */}
          {personalInfo.phone && (
            <div className="flex items-center justify-end gap-2">
              <Phone size={14} />
              <span>{personalInfo.phone}</span>
            </div>
          )}

          {/* EMAIL */}
          {personalInfo.email && (
            <div className="flex items-center justify-end gap-2">
              <Mail size={14} />
              <span>{personalInfo.email}</span>
            </div>
          )}

          {/* LINKEDIN */}
          {personalInfo.linkedIn && (
            <div className="flex items-center justify-end gap-2">
              <FaLinkedin size={14} />

              <a
                href={
                  personalInfo.linkedIn.startsWith("http")
                    ? personalInfo.linkedIn
                    : `https://${personalInfo.linkedIn}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn
              </a>
            </div>
          )}

          {/* GITHUB */}
          {personalInfo.github && (
            <div className="flex items-center justify-end gap-2">
              <FaGithub size={14} />

              <a
                href={
                  personalInfo.github.startsWith("http")
                    ? personalInfo.github
                    : `https://${personalInfo.github}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                GitHub
              </a>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          RESUME BODY
      ====================================================== */}

      <div
        className="
          w-full
          h-[calc(100%-120px)]
          overflow-hidden
          px-8
          pt-6
        "
      >
        <DynamicSectionRenderer
          registry={ProfessionalModernSectionRegistry}
          customSectionComponent={ProfessionalModernCustomSection}
        />
      </div>
    </div>
  );
}
