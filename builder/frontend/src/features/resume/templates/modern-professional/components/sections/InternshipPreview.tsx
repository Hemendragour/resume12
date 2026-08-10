import { useResumeStore } from "../../../../../../store/resume.store";
import { FaUserGraduate } from "react-icons/fa6";

import { ModernProfessionalTheme as T } from "../theme.modern-professional";
import SectionHeader from "../shared/SectionHeader";

export default function InternshipPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume || resume.internships.length === 0) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title="Internships"
        icon={<FaUserGraduate size={T.sectionHeader.badgeIconSize} />}
      />

      <div className="mt-3 space-y-6">
        {resume.internships.map((internship, index) => (
          <div
            key={index}
            className="border-b border-slate-200 pb-5 last:border-b-0"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-5">
              <div>
                <h3 className="text-[13px] font-bold text-slate-900">
                  {internship.role}
                </h3>

                <p className="mt-0.5 text-[12px] font-medium text-blue-700">
                  {internship.company}
                </p>
              </div>

              <div className="text-right shrink-0">
                <p className="text-[11.5px] font-semibold text-slate-700">
                  {internship.startDate} –{" "}
                  {internship.currentlyInterning
                    ? "Present"
                    : internship.endDate}
                </p>
              </div>
            </div>

            {/* Responsibilities */}
            {internship.responsibilities.length > 0 && (
              <ul className="mt-3 list-disc space-y-1.5 pl-4 text-[12.5px] leading-[1.6] text-slate-700">
                {internship.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            {/* Achievements */}
            {internship.achievements.length > 0 && (
              <ul className="mt-2 list-disc space-y-1.5 pl-4 text-[12.5px] leading-[1.6] text-slate-700">
                {internship.achievements.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
