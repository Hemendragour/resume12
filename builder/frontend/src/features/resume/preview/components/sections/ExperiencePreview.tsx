import { useResumeStore } from "../../../../../store/resume.store";

export default function ExperiencePreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  return (
    <section className="mt-8">
      <h2 className="border-b pb-2 text-lg font-bold">EXPERIENCE</h2>

      {resume.experience.length > 0 ? (
        <div className="mt-4 space-y-6">
          {resume.experience.map((item, index) => (
            <div key={index}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold">{item.position}</h3>

                  <p className="font-medium text-blue-600">{item.company}</p>
                </div>

                <span className="text-sm text-gray-500">
                  {item.startDate} -{" "}
                  {item.currentlyWorking ? "Present" : item.endDate}
                </span>
              </div>

             {(item.responsibilities?.length ?? 0) > 0 && (
  <ul className="mt-3 list-disc pl-5 text-gray-700">
    {item.responsibilities.map((r, i) => (
      <li key={i}>{r}</li>
    ))}
  </ul>
)}

              {item.achievements?.map((a, i) => (
  <li key={i}>{a}</li>
))}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-gray-500">No experience added.</p>
      )}
    </section>
  );
}
