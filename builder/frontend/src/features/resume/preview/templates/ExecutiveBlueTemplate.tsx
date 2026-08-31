import { useResumeStore } from "../../../../store/resume.store";
import DynamicSectionRenderer from "../components/DynamicSectionRenderer";
import { ExecutiveBlueSectionRegistry } from "../components/SectionRegistry.executive-blue";
import ExecutiveBlueCustomSection from "../components/sections/executive-blue/CustomSectionPreview";
import { ExecutiveBlueTheme as T } from "../components/theme.executive-blue";
import { MapPin, Mail, Phone } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

function withProtocol(url: string) {
  return url.startsWith("http") ? url : `https://${url}`;
}

export default function ExecutiveBlueTemplate() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  const { personalInfo } = resume;

  return (
    <div
      className={`min-h-[1120px] bg-white px-12 py-10 ${T.fontFamily} ${T.colors.body}`}
    >
      {/* Header */}
      <div className="text-center">
        <h1
          className={`${T.fontSize.name} font-bold tracking-wide ${T.colors.heading}`}
        >
          {personalInfo.fullName}
        </h1>

        <div
          className={`mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 ${T.fontSize.contact} ${T.colors.muted}`}
        >
          {personalInfo.address && (
            <span className="flex items-center gap-1">
              <MapPin size={11} /> {personalInfo.address}
            </span>
          )}
          {personalInfo.email && (
            <>
              <span>|</span>
              <span className="flex items-center gap-1">
                <Mail size={11} /> {personalInfo.email}
              </span>
            </>
          )}
          {personalInfo.phone && (
            <>
              <span>|</span>
              <span className="flex items-center gap-1">
                <Phone size={11} /> {personalInfo.phone}
              </span>
            </>
          )}
          {personalInfo.github && (
            <>
              <span>|</span>
              <a
                href={withProtocol(personalInfo.github)}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1 hover:underline`}
              >
                <FaGithub size={11} /> GitHub
              </a>
            </>
          )}
          {personalInfo.linkedIn && (
            <>
              <span>|</span>
              <a
                href={withProtocol(personalInfo.linkedIn)}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1 hover:underline`}
              >
                <FaLinkedin size={11} /> LinkedIn
              </a>
            </>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="mt-6">
        <DynamicSectionRenderer
          registry={ExecutiveBlueSectionRegistry}
          customSectionComponent={ExecutiveBlueCustomSection}
        />
      </div>
    </div>
  );
}
