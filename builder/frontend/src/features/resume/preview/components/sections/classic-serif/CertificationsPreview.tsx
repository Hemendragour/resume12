import { useResumeStore } from "../../../../../../store/resume.store";

export default function CertificationsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const certifications = resume.certifications.filter(
    (cert) => cert.trim() !== ""
  );

  if (certifications.length === 0) return null;

  return (
    <section className="mt-6">
      <h2 className="mb-2 border-b border-slate-700 pb-1 text-[13px] font-bold uppercase tracking-[0.6px] text-black">
        Certificates
      </h2>

      <p className="text-[11.5px] leading-[1.6] text-slate-800">
        {certifications.map((cert, index) => (
          <span key={index}>
            {cert}
            {index !== certifications.length - 1 && (
              <span className="mx-2 text-slate-400">|</span>
            )}
          </span>
        ))}
      </p>
    </section>
  );
}