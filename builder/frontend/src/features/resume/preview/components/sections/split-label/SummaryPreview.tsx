import { useResumeStore } from "../../../../../../store/resume.store";

export default function SummaryPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  return (
    <section className="grid grid-cols-4 gap-6 mt-6 pb-4 border-b border-rose-100">
      <h2 className="col-span-1 text-[12px] font-semibold text-slate-800">
        Summary
      </h2>
      <p className="col-span-3 text-[11px] leading-5 text-slate-700">
        {resume.summary?.trim()
          ? resume.summary
          : "Write a concise professional summary highlighting your experience, technical expertise, and career goals."}
      </p>
    </section>
  );
}