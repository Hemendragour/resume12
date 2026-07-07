import { useResumeStore } from "../../../../../store/resume.store";

export default function LanguagesPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  return (
    <section className="mt-8">
      <h2 className="border-b pb-2 text-lg font-bold">LANGUAGES</h2>

      {resume.languages.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {resume.languages.map((language) => (
            <span key={language} className="rounded border px-3 py-1 text-sm">
              {language}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-gray-500">No languages added.</p>
      )}
    </section>
  );
}
