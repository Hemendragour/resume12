import { useResumeStore } from "../../../../../../store/resume.store";
import { FaGraduationCap } from "react-icons/fa6";

import { ModernProfessionalTheme as T } from "../theme.modern-professional";
import SectionHeader from "../shared/SectionHeader";

export default function EducationPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume || resume.education.length === 0) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title="Education"
        icon={<FaGraduationCap size={T.sectionHeader.badgeIconSize} />}
      />

      <div className="mt-3 space-y-5">
        {resume.education.map((edu, index) => (
          <div
            key={index}
            className={
              index !== resume.education.length - 1
                ? "border-b border-slate-200 pb-4"
                : ""
            }
          >
            {/* Degree */}
            <h3 className="text-[13px] font-bold text-slate-900">
              {edu.degree}
              {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
            </h3>

            {/* Institution */}
            <p className="mt-1 text-[12px] font-semibold text-blue-700">
              {edu.institution}
            </p>

            {/* Location */}
            {edu.location && (
              <p className="mt-0.5 text-[11px] text-slate-500">
                {edu.location}
              </p>
            )}

            {/* Duration */}
            <p className="mt-1.5 text-[11.5px] text-slate-700">
              {edu.startYear} – {edu.current ? "Present" : edu.endYear}
            </p>

            {/* CGPA */}
            {edu.cgpa && (
              <p className="mt-1 text-[11.5px] text-slate-700">
                <span className="font-semibold">CGPA:</span> {edu.cgpa}
              </p>
            )}

            {/* Coursework */}
            {edu.coursework && (
              <p className="mt-1.5 text-[11px] text-slate-500">
                {edu.coursework}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
