import { useResumeStore } from "../../../../../../store/resume.store";

export default function LanguagesPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  return (
    <section className="mt-5">
      <h2 className="border-b border-slate-500 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-800">
        Languages
      </h2>

      {resume.languages.length > 0 ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {resume.languages.map((l) => (
            <span
              key={l.name}
              className="rounded border border-slate-400 px-2 py-0.5 text-[11px] text-slate-700"
            >
              {l.name}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-[11px] text-slate-500">No languages added.</p>
      )}
    </section>
  );
}