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

      <div className="mt-3 space-y-2">
        {resume.education.map((edu, index) => (
          <div key={index} className="flex items-baseline justify-between">
            <p className="text-[12.5px] text-slate-900">
              <span className="font-bold">{edu.institution}</span>
              {edu.degree && <span className="italic">, {edu.degree}</span>}
            </p>
            <span className="text-[11.5px] text-slate-600">
              {edu.startYear} – {edu.current ? "Present" : edu.endYear}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
