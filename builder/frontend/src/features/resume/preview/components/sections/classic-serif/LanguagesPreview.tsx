import { useResumeStore } from "../../../../../../store/resume.store";

export default function LanguagesPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume || resume.languages.length === 0) return null;

  return (
    <section className="mt-5">
      <h2 className="border-b-2 border-slate-800 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-900">
        Languages
      </h2>

      <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-[11.5px] text-slate-700">
        {resume.languages.map((lang, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="font-bold">{lang.name}</span>
            {lang.level && <span>({lang.level})</span>}
            {i !== resume.languages.length - 1 && (
              <span className="text-slate-300">|</span>
            )}
          </span>
        ))}
      </div>
    </section>
  );
}