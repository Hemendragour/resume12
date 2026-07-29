import { useResumeStore } from "../../../../../../store/resume.store";

export default function InternshipPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;

  return (
    <section className="grid grid-cols-4 gap-6 mt-6 pb-4 border-b border-rose-100">
      <h2 className="col-span-1 text-[12px] font-semibold text-slate-800">
        Internships
      </h2>

      <div className="col-span-3">
        {resume.internships.length === 0 ? (
          <p className="text-[11px] text-slate-400">No internships added.</p>
        ) : (
          <div className="space-y-4">
            {resume.internships.map((intern, index) => (
              <div key={index}>
                <div className="flex items-start justify-between">
                  <h3 className="text-[12px] font-bold text-rose-700">
                    {intern.role}
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    {intern.startDate} –{" "}
                    {intern.currentlyInterning ? "Present" : intern.endDate}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">{intern.company}</p>

                {intern.responsibilities.length > 0 && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[11px] leading-4 text-slate-700">
                    {intern.responsibilities.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
                {intern.achievements?.length ? (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[11px] leading-4 text-slate-700">
                    {intern.achievements.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
