import { useResumeStore } from "../../../../../../store/resume.store";

export default function CertificationsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;
  const certificationsSection = resume.sections.find(
    (section) => section.id === "certifications",
  );

  return (
    <section className="grid grid-cols-4 gap-6 mt-6 pb-4 border-b border-rose-100">
      <h2 className="col-span-1 text-[12px] font-semibold text-slate-800">
        {certificationsSection?.displayTitle?.trim() ||
          certificationsSection?.title ||
          "Certifications"}
      </h2>
      <div className="col-span-3">
        {resume.certifications.length > 0 ? (
          <ul className="list-disc space-y-1 pl-5 text-[11px] text-slate-700">
            {resume.certifications.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        ) : (
          <p className="text-[11px] text-slate-400">No certifications added.</p>
        )}
      </div>
    </section>
  );
}
