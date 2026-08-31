import { useResumeStore } from "../../../../../../store/resume.store";

export default function InterestsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume || resume.interests.length === 0) return null;

  return (
    <section className="mt-5">
      <h2 className="border-b border-slate-500 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-800">
        Interests
      </h2>

      <div className="mt-2 flex flex-wrap gap-2">
        {resume.interests.map((i) => (
          <span
            key={i}
            className="rounded border border-slate-400 px-2 py-0.5 text-[11px] text-slate-700"
          >
            {i}
          </span>
        ))}
      </div>
    </section>
  );
}
