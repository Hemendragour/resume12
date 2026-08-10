 
import { Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { useResumeStore } from "../../../../../../store/resume.store";
import { HarvardATSTheme as T } from "../theme.harvard-ats";

export default function HeaderPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const { personalInfo } = resume;

  return (
    <header className={`${T.layout.column} w-full`}>
      {/* Name */}
      <h1
        className={`
          ${T.fontFamily.heading}
          ${T.fontSize.name}
          ${T.fontWeight.bold}
          ${T.lineHeight.heading}
          ${T.colors.heading}
          text-center uppercase tracking-wide
        `}
      >
        {personalInfo.fullName}
      </h1>

      {/* Role */}
      {personalInfo.title && (
        <h2
          className={`
            ${T.fontFamily.heading}
            ${T.fontSize.role}
            ${T.fontWeight.bold}
            ${T.colors.heading}
            text-center uppercase tracking-wide mt-1
          `}
        >
          {personalInfo.title}
        </h2>
      )}

      {/* Contact */}
      <div
        className={`
          ${T.layout.wrapCenter}
          ${T.fontSize.contact}
          ${T.colors.body}
          mt-2
          gap-3
          w-full
        `}
      >
        {personalInfo.email && (
          <span className="flex items-center gap-1 break-all">
            <Mail size={12} className="shrink-0" color={T.iconColors.body} />
            {personalInfo.email}
          </span>
        )}

        {personalInfo.email && personalInfo.phone && <span>|</span>}

        {personalInfo.phone && (
          <span className="flex items-center gap-1">
            <Phone size={12} className="shrink-0" color={T.iconColors.body} />
            {personalInfo.phone}
          </span>
        )}

        {(personalInfo.email || personalInfo.phone) && personalInfo.address && (
          <span>|</span>
        )}

        {personalInfo.address && (
          <span className="flex items-center gap-1 break-words">
            <MapPin size={12} className="shrink-0" color={T.iconColors.body} />
            {personalInfo.address}
          </span>
        )}
      </div>

      {/* Social Links */}
      <div
        className={`
          ${T.layout.wrapCenter}
          ${T.fontSize.contact}
          ${T.colors.body}
          mt-1
          gap-3
          w-full
        `}
      >
        {personalInfo.github && (
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 hover:underline break-all"
          >
            <FaGithub size={12} className="shrink-0" color={T.iconColors.body} />
            {personalInfo.github.replace(/^https?:\/\//, "")}
          </a>
        )}

        {personalInfo.github && personalInfo.linkedIn && <span>|</span>}

        {personalInfo.linkedIn && (
                <a
            href={personalInfo.linkedIn}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 hover:underline break-all"
          >
            <FaLinkedin size={12} className="shrink-0" color={T.iconColors.body} />
            {personalInfo.linkedIn.replace(/^https?:\/\//, "")}
          </a>
        )}

        {(personalInfo.github || personalInfo.linkedIn) &&
          personalInfo.portfolio && <span>|</span>}

        {personalInfo.portfolio && (
                <a
            href={personalInfo.portfolio}
            target="_blank"
            rel="noreferrer"
            className="hover:underline break-all"
          >
            {personalInfo.portfolio.replace(/^https?:\/\//, "")}
          </a>
        )}
      </div>

      {/* Divider */}
      <div className={`${T.divider.header} mt-3`} />
    </header>
  );
}