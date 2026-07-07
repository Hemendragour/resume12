import { useResumeStore } from "../../../../../store/resume.store";

export default function SummaryPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  return (
    <section className="mt-8">
      <h2 className="font-bold text-lg border-b pb-2">
        PROFESSIONAL SUMMARY
      </h2>

      <p className="mt-3 text-gray-700">
        {resume.summary || "Write your professional summary..."}
      </p>
    </section>
  );
}