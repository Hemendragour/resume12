import { useResumeStore } from "../../../../../../store/resume.store";

export default function EducationPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;
  const educationSection = resume.sections.find(
    (section) => section.id === "education",
  );
  return (
    <section className="grid grid-cols-4 gap-6 mt-6 pb-4 border-b border-rose-100">
      <h2 className="col-span-1 text-[12px] font-semibold text-slate-800">
        {educationSection?.displayTitle?.trim() ||
          educationSection?.title ||
          "Education"}
      </h2>

      <div className="col-span-3">
        {resume.education.length === 0 ? (
          <p className="text-[11px] text-slate-400">No education added.</p>
        ) : (
          <div className="space-y-3">
            {resume.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <h3 className="text-[12px] font-bold text-rose-700">
                    {edu.institution}
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    {edu.startMonth} {edu.startYear} –{" "}
                    {edu.current ? "Present" : `${edu.endMonth} ${edu.endYear}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <p className="text-[11px] text-slate-600">
                    {edu.degree}
                    {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                  </p>
                  {edu.cgpa && (
                    <span className="text-[11px] text-slate-600">
                      CGPA: {edu.cgpa}
                    </span>
                  )}
                </div>
                {edu.coursework && (
                  <p className="mt-1 text-[11px] text-slate-600">
                    <span className="font-semibold">Relevant Coursework:</span>{" "}
                    {edu.coursework}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
