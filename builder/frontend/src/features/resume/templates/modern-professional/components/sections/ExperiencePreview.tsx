import { useResumeStore } from "../../../../../../store/resume.store";
import { FaBriefcase } from "react-icons/fa6";

import { ModernProfessionalTheme as T } from "../theme.modern-professional";
import SectionHeader from "../shared/SectionHeader";
import { formatMonthYear } from "../../../../editor/utils/formatDate";

export default function ExperiencePreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume || resume.experience.length === 0) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title="Experience"
        icon={<FaBriefcase size={T.sectionHeader.badgeIconSize} />}
      />

      <div className="mt-3 space-y-6">
        {resume.experience.map((exp, index) => (
          <div
            key={index}
            className={
              index !== resume.experience.length - 1
                ? "border-b border-slate-200 pb-5"
                : ""
            }
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-6">
              {/* Left */}
              <div className="flex-1">
                <h3 className="text-[13px] font-bold text-slate-900">
                  {exp.position}
                </h3>

                <p className="mt-0.5 text-[12px] font-medium text-blue-700">
                  {exp.company}
                </p>
              </div>

              {/* Right */}
              <div className="text-right shrink-0">
                <p className="text-[11.5px] font-semibold text-slate-700">
                  {formatMonthYear(exp.startDate)} –{" "}
                  {exp.currentlyWorking
                    ? "Present"
                    : formatMonthYear(exp.endDate)}
                </p>

                {exp.location && (
                  <p className="mt-0.5 text-[11px] text-slate-500">
                    {exp.location}
                  </p>
                )}
              </div>
            </div>

            {/* Responsibilities */}
            {exp.responsibilities.length > 0 && (
              <ul className="mt-1 list-disc space-y-1 pl-4 text-[12.5px] leading-[1.6] text-slate-700">
                {exp.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            {/* Achievements */}
            {exp.achievements && exp.achievements.length > 0 && (
              <ul className="mt-2 list-disc space-y-1.5 pl-4 text-[12.5px] leading-[1.6] text-slate-700">
                {exp.achievements.map((item, i) => (
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
