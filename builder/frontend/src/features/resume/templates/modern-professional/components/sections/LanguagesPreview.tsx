import { useResumeStore } from "../../../../../../store/resume.store";
import { FaGlobe } from "react-icons/fa6";

import { ModernProfessionalTheme as T } from "../theme.modern-professional";
import SectionHeader from "../shared/SectionHeader";

export default function LanguagesPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume || resume.languages.length === 0) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title="Languages"
        icon={<FaGlobe size={T.sectionHeader.badgeIconSize} />}
      />

      <ul className="mt-3 space-y-2 pl-4 list-disc">
        {resume.languages.map((language, index) => (
          <li
            key={index}
            className="text-[12.5px] leading-[1.6] text-slate-700"
          >
            <span className="font-semibold text-slate-900">
              {language.name}
            </span>
          
          </li>
        ))}
      </ul>
    </section>
  );
}
