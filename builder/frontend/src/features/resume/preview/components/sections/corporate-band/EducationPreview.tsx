import { useResumeStore } from "../../../../../../store/resume.store";

export default function EducationPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume || resume.education.length === 0) return null;

  const educationSection = resume.sections.find(
    (section) => section.id === "education",
  );

  return (
    <section className="mt-5">
      <h2 className="border-b border-slate-500 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-800">
        {educationSection?.displayTitle?.trim() ||
          educationSection?.title ||
          "Education"}
      </h2>

      <div className="mt-0.5 space-y-5">
        {resume.education.map((edu, index) => (
          <div key={index}>
            <div className="flex justify-between">
              <h3 className="text-[12px] font-bold text-slate-900">
                {edu.institution}
              </h3>
              <span className="text-[11px] text-slate-600">
                {edu.startYear} – {edu.current ? "Present" : `${edu.endYear}`}
              </span>
            </div>

            <div className="flex justify-between">
              <p className="text-[11px] italic text-slate-700">
                {edu.degree}
                {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
              </p>
              {edu.cgpa && (
                <span className="text-[11px] text-slate-700">
                  CGPA: {edu.cgpa}
                </span>
              )}
            </div>

            {edu.coursework && (
              <p className="mt-1 text-[11px] text-slate-700">
                <span className="font-semibold">Relevant Coursework:</span>{" "}
                {edu.coursework}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
