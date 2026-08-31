import { useResumeStore } from "../../../../../../store/resume.store";

export default function CertificationsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume || resume.certifications.length === 0) return null;

  const certificationsSection = resume.sections.find(
    (section) => section.id === "certifications",
  );

  return (
    <section className="mt-5">
      <h2 className="border-b border-slate-500 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-800">
        {certificationsSection?.displayTitle?.trim() ||
          certificationsSection?.title ||
          "Certifications"}
      </h2>

      <ul className="mt-2 list-disc space-y-1 pl-5 text-[11px] text-slate-700">
        {resume.certifications.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </section>
  );
}
