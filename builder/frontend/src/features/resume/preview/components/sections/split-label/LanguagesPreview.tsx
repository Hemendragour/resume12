import { useResumeStore } from "../../../../../../store/resume.store";

export default function LanguagesPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume || resume.languages.length === 0) return null;

  return (
    <section className="grid grid-cols-4 gap-6 mt-6 pb-4 border-b border-rose-100">
      <h2 className="col-span-1 text-[12px] font-semibold text-slate-800">
        Languages
      </h2>

      <div className="space-y-1.5">
        {resume.languages.map((lang) => (
          <div key={lang.name} className="flex items-center justify-between">
            <span className="text-[10px] text-slate-600">
              {lang.name} ({lang.level})
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
