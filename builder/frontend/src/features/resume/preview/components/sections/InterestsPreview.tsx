import { useResumeStore } from "../../../../../store/resume.store";

export default function InterestsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  return (
    <section className="mt-8">
      <h2 className="border-b pb-2 text-lg font-bold">INTERESTS</h2>

      {resume.interests.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {resume.interests.map((interest) => (
            <span key={interest} className="rounded border px-3 py-1 text-sm">
              {interest}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-gray-500">No interests added.</p>
      )}
    </section>
  );
}
