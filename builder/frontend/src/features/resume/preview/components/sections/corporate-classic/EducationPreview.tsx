import { useResumeStore } from "../../../../../../store/resume.store";

export default function EducationPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume || resume.education.length === 0) return null;

  return (
    <section className="mt-6">
      <h2 className="border-y border-slate-700 py-1 text-center text-[12px] font-bold uppercase tracking-[0.6px] text-slate-900">
        Education
      </h2>

      <div className="mt-3 space-y-3">
        {resume.education.map((edu, index) => (
          <div key={index} className="flex justify-between gap-6">
            <div>
              <p className="text-[12px] font-bold text-slate-900">
                {edu.institution}
              </p>
              <p className="text-[11px] italic text-slate-700">
                {edu.degree}
                {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
              </p>
            </div>
            <div className="whitespace-nowrap text-right text-[11px] text-slate-600">
              <p>{edu.startYear} – {edu.current ? "Present" : edu.endYear}</p>
              {edu.location && <p>{edu.location}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}