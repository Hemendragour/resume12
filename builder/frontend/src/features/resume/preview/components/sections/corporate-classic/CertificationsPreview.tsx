import { useResumeStore } from "../../../../../../store/resume.store";

export default function CertificationsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume || resume.certifications.length === 0) return null;
  const certificationsSection = resume.sections.find(
    (section) => section.id === "certifications",
  );
  return (
    <section className="mt-6">
      <h2 className="border-y border-slate-700 py-1 text-center text-[12px] font-bold uppercase tracking-[0.6px] text-slate-900">
        {certificationsSection?.displayTitle?.trim() ||
          certificationsSection?.title ||
          "Certifications"}
      </h2>

      <div className="mt-3 grid grid-cols-3 gap-x-6 gap-y-2 text-[11.5px] leading-5 text-slate-700">
        {resume.certifications.map((cert, i) => (
          <span key={i} className="flex gap-2">
            <span>•</span> <span>{cert}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
