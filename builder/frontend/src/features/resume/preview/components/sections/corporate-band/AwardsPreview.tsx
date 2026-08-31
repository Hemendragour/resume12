import { useResumeStore } from "../../../../../../store/resume.store";

export default function AwardsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume || resume.awards.length === 0) return null;

  return (
    <section className="mt-5">
      <h2 className="border-b border-slate-500 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-800">
        Awards
      </h2>

      <ul className="mt-2 list-disc space-y-1 pl-5 text-[11px] text-slate-700">
        {resume.awards.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>
    </section>
  );
}
