import { useResumeStore } from "../../../../../store/resume.store";

export default function EducationPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  return (
    <section className="mt-8">
      <h2 className="border-b pb-2 text-lg font-bold">EDUCATION</h2>

      {resume.education.length > 0 ? (
        <div className="mt-4 space-y-5">
          {resume.education.map((item, index) => (
            <div key={index}>
              <h3 className="font-semibold">{item.degree}</h3>

              <p className="text-blue-600">{item.institution}</p>

              <p className="text-gray-600">{item.fieldOfStudy}</p>

              <p className="text-sm text-gray-500">
                {item.startYear} - {item.endYear}
              </p>

              {item.cgpa && <p className="text-sm">CGPA : {item.cgpa}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-gray-500">No education added.</p>
      )}
    </section>
  );
}
