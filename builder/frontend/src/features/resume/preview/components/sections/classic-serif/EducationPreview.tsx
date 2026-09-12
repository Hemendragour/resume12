import { useResumeStore } from "../../../../../../store/resume.store";

export default function EducationPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume || resume.education.length === 0) return null;

  const educationSection = resume.sections.find(
    (section) => section.id === "education",
  );

  return (
    <section className="mt-5">
      <h2 className="border-b-2 border-slate-800 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-900">
        {educationSection?.displayTitle?.trim() ||
          educationSection?.title ||
          "Education"}
      </h2>

      <div className="mt-3 space-y-3">
        {resume.education.map((edu, index) => (
          <div key={index}>
            {/* Row 1: Institution + Degree on left, Years on right */}
            <div className="flex items-baseline justify-between">
              <p className="text-[12.5px] text-slate-900">
                <span className="font-bold">{edu.institution}</span>
                {edu.degree && <span className="italic">, {edu.degree}</span>}
              </p>
              <span className="text-[11.5px] text-slate-600 shrink-0">
                {edu.startYear} – {edu.current ? "Present" : edu.endYear}
              </span>
            </div>

            {/* Row 2: Degree/Field on left, CGPA on right */}
            <div className="flex items-baseline justify-between mt-0.5">
              <p className="text-[11px] italic text-slate-700">
                {edu.degree}
                {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
              </p>
              {edu.cgpa && (
                <span className="text-[11px] text-slate-700 shrink-0">
                  CGPA: {edu.cgpa}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
