import { useResumeStore } from "../../../../../../store/resume.store";

export default function InterestsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  return (
    <section className="grid grid-cols-4 gap-6 mt-6 pb-4 border-b border-rose-100">
      <h2 className="col-span-1 text-[12px] font-semibold text-slate-800">
        Interests
      </h2>
      <div className="col-span-3">
        {resume.interests.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {resume.interests.map((i) => (
              <span key={i} className="rounded border border-rose-200 px-2 py-0.5 text-[11px] text-slate-700">
                {i}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-[11px] text-slate-400">No interests added.</p>
        )}
      </div>
    </section>
  );
}