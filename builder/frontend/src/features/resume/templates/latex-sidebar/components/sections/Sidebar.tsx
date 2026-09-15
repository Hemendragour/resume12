import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { useResumeStore } from "../../../../../../store/resume.store";
import { LatexSidebarTheme as T } from "../theme.latex-sidebar";

export default function Sidebar() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const { personalInfo } = resume;
  const skillCategories = resume.skills ?? [];
  const languages = resume.languages ?? [];
  const certifications = resume.certifications ?? [];

  return (
    <aside
      className={`${T.sidebar.width} ${T.sidebar.bg} ${T.sidebar.border} ${T.sidebar.padding}`}
    >
      <div className={T.sidebar.gap}>
        {/* ── Personal Info ─────────────────────────────── */}
        <div>
          <h3
            className={`${T.fontSize.sidebarLabel} ${T.fontWeight.bold} ${T.colors.sidebarHeading} ${T.divider.sidebarSection} uppercase tracking-[1.5px]`}
          >
            Personal Info
          </h3>

          <div className="space-y-2 mt-2">
            {personalInfo.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                className={`flex items-start gap-2 ${T.fontSize.sidebarBody} ${T.colors.sidebarText} hover:underline break-all`}
              >
                <Mail size={11} className="shrink-0 mt-0.5" color={T.iconColors.sidebar} />
                {personalInfo.email}
              </a>
            )}

            {personalInfo.phone && (
              <p
                className={`flex items-start gap-2 ${T.fontSize.sidebarBody} ${T.colors.sidebarText}`}
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                <Phone size={11} className="shrink-0 mt-0.5" color={T.iconColors.sidebar} />
                {personalInfo.phone}
              </p>
            )}

            {personalInfo.address && (
              <p
                className={`flex items-start gap-2 ${T.fontSize.sidebarBody} ${T.colors.sidebarText}`}
              >
                <MapPin size={11} className="shrink-0 mt-0.5" color={T.iconColors.sidebar} />
                {personalInfo.address}
              </p>
            )}

            {personalInfo.linkedIn && (
              <a
                href={personalInfo.linkedIn}
                target="_blank"
                rel="noreferrer"
                className={`flex items-start gap-2 ${T.fontSize.sidebarBody} ${T.links.default}`}
              >
                <FaLinkedin size={11} className="shrink-0 mt-0.5" color={T.iconColors.sidebar} />
                LinkedIn
              </a>
            )}

            {personalInfo.github && (
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className={`flex items-start gap-2 ${T.fontSize.sidebarBody} ${T.links.default}`}
              >
                <FaGithub size={11} className="shrink-0 mt-0.5" color={T.iconColors.sidebar} />
                GitHub
              </a>
            )}

            {personalInfo.portfolio && (
              <a
                href={personalInfo.portfolio}
                target="_blank"
                rel="noreferrer"
                className={`flex items-start gap-2 ${T.fontSize.sidebarBody} ${T.links.default}`}
              >
                <Globe size={11} className="shrink-0 mt-0.5" color={T.iconColors.sidebar} />
                {personalInfo.portfolio.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>
        </div>

        {/* ── Skills ──────────────────────────────────────── */}
        {skillCategories.length > 0 && (
          <div>
            <h3
              className={`${T.fontSize.sidebarLabel} ${T.fontWeight.bold} ${T.colors.sidebarHeading} ${T.divider.sidebarSection} uppercase tracking-[1.5px]`}
            >
              Skills
            </h3>

            <div className="space-y-2 mt-2">
              {skillCategories.map((category, index) => (
                <div key={index}>
                  {category.title && (
                    <p
                      className={`${T.fontSize.sidebarSmall} ${T.fontWeight.semibold} ${T.colors.sidebarHeading} mb-1`}
                    >
                      {category.title}
                    </p>
                  )}
                  <div>
                    {category.skills.map((skill, i) => (
                      <span key={i} className={T.skills.tag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Languages ───────────────────────────────────── */}
        {languages.length > 0 && (
          <div>
            <h3
              className={`${T.fontSize.sidebarLabel} ${T.fontWeight.bold} ${T.colors.sidebarHeading} ${T.divider.sidebarSection} uppercase tracking-[1.5px]`}
            >
              Languages
            </h3>

            <div className="space-y-1.5 mt-2">
              {languages.map((lang, index) => (
                <div key={index} className={T.languages.row}>
                  <span className={T.languages.name}>{lang.name}</span>
                  {lang.level && (
                    <span className={T.languages.level}>{lang.level}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Certificates ────────────────────────────────── */}
        {certifications.length > 0 && (
          <div>
            <h3
              className={`${T.fontSize.sidebarLabel} ${T.fontWeight.bold} ${T.colors.sidebarHeading} ${T.divider.sidebarSection} uppercase tracking-[1.5px]`}
            >
              Certificates
            </h3>

            <ul className="space-y-1.5 mt-2">
              {certifications.map((cert, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-2 ${T.fontSize.sidebarBody} ${T.colors.sidebarText}`}
                >
                  <span className="mt-[4px] w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0 inline-block" />
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}
