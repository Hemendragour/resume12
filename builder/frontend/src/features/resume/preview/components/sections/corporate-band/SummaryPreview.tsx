import { useResumeStore } from "../../../../../../store/resume.store";

export default function SummaryPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume || !resume.summary?.trim()) return null;

  const summarySection = resume.sections.find(
    (section) => section.id === "summary",
  );
  return (
    <section className="mt-6">
      <h2 className="border-b border-slate-500 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-800">
        {summarySection?.displayTitle?.trim() ||
          summarySection?.title ||
          "Professional Summary"}
      </h2>
      <p className="mt-3 text-[11px] leading-4 text-slate-700 text-justify">
        {resume.summary}
      </p>
    </section>
  );
}
