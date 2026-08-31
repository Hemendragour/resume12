import { useResumeStore } from "../../../../../../store/resume.store";
import { formatMonthYear } from "../../../../editor/utils/formatDate";

export default function InternshipPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume || resume.internships.length === 0) return null;

  return (
    <section className="mt-5">
      <h2 className="border-b-2 border-slate-800 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-900">
        Internships
      </h2>

      <div className="mt-3 space-y-3">
        {resume.internships.map((intern, index) => (
          <div key={index}>
            <div className="flex items-baseline justify-between">
              <p className="text-[12.5px] text-slate-900">
                <span className="font-bold">{intern.company}</span>
                {intern.role && <span className="italic">, {intern.role}</span>}
              </p>
              <span className="text-[11.5px] text-slate-600">
                {formatMonthYear(intern.startDate)} –{" "}
                {intern.currentlyInterning
                  ? "Present"
                  : formatMonthYear(intern.endDate)}
              </span>
            </div>

            {intern.responsibilities.length > 0 && (
              <ul className="mt-1 space-y-0.5 pl-4 text-[11.5px] leading-5 text-slate-700">
                {intern.responsibilities.map((item, i) => (
                  <li key={i} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {intern.achievements?.length ? (
              <ul className="mt-1 space-y-0.5 pl-4 text-[11.5px] leading-5 text-slate-700">
                {intern.achievements.map((item, i) => (
                  <li key={i} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
