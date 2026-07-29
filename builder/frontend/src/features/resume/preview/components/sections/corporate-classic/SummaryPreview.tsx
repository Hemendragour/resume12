import { useResumeStore } from "../../../../../../store/resume.store";

export default function SummaryPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume || !resume.summary) return null;

  return (
    <section className="mt-5">
      <h2 className="border-y border-slate-700 py-1 text-center text-[12px] font-bold uppercase tracking-[0.6px] text-slate-900">
        Summary
      </h2>
      <p className="mt-3 text-[11.5px] leading-5 text-slate-700">
        {resume.summary}
      </p>
    </section>
  );
}