import { useResumeStore } from "../../../../../../store/resume.store";
import { FaFileLines } from "react-icons/fa6";

import { ModernProfessionalTheme as T } from "../theme.modern-professional";
import SectionHeader from "../shared/SectionHeader";

export default function CertificationsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume || resume.certifications.length === 0) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title="Certifications"
        icon={<FaFileLines size={T.sectionHeader.badgeIconSize} />}
      />

      <ul className="mt-3 space-y-2 pl-4 list-disc">
        {resume.certifications.map((certification, index) => (
          <li
            key={index}
            className="text-[12.5px] leading-[1.6] text-slate-700"
          >
            {certification}
          </li>
        ))}
      </ul>
    </section>
  );
}
