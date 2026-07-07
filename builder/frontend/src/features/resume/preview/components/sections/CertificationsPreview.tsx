import { useResumeStore } from "../../../../../store/resume.store";

export default function CertificationsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  return (
    <section className="mt-8">
      <h2 className="border-b pb-2 text-lg font-bold">CERTIFICATIONS</h2>

      {resume.certifications.length > 0 ? (
        <ul className="mt-3 list-disc pl-5 space-y-2">
          {resume.certifications.map((certification) => (
            <li key={certification}>{certification}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-gray-500">No certifications added.</p>
      )}
    </section>
  );
}
