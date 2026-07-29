import { useResumeStore } from "../../../../../../store/resume.store";

export default function LanguagesPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume || resume.languages.length === 0) return null;

  return (
    <section className="grid grid-cols-4 gap-6 mt-6 pb-4 border-b border-rose-100">
      <h2 className="col-span-1 text-[12px] font-semibold text-slate-800">
        Languages
      </h2>

      <div className="col-span-3 flex flex-wrap gap-2">
        {resume.languages.map((lang) => (
          <span
            key={lang.name}
            className="rounded-full border border-rose-200 px-3 py-1 text-[11px] text-slate-700"
          >
            {lang.name}
          </span>
        ))}
      </div>
    </section>
  );
}