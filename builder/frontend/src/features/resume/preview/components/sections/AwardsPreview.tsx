import { useResumeStore } from "../../../../../store/resume.store";

export default function AwardsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  return (
    <section className="mt-8">
      <h2 className="border-b pb-2 text-lg font-bold">AWARDS</h2>

      {resume.awards.length > 0 ? (
        <ul className="mt-3 list-disc pl-5 space-y-2">
          {resume.awards.map((award) => (
            <li key={award}>{award}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-gray-500">No awards added.</p>
      )}
    </section>
  );
}
