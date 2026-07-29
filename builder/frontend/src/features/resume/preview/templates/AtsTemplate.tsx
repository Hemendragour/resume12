import { useResumeStore } from "../../../../store/resume.store";

export default function AtsTemplate() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const { personalInfo } = resume;

  return (
    <div className="min-h-[1120px] bg-white p-10 text-[13px] text-black">

      {/* Header */}

      <div className="border-b-2 border-black pb-5">

        <h1 className="text-3xl font-bold uppercase">
          {personalInfo.fullName || "YOUR NAME"}
        </h1>

        <p className="mt-1">
          {personalInfo.title || "Professional"}
        </p>

        <div className="mt-3 flex flex-wrap gap-4 text-sm">

          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}

        </div>

      </div>

      {/* Summary */}

      <section className="mt-8">

        <h2 className="font-bold uppercase border-b pb-1">
          Professional Summary
        </h2>

        <p className="mt-3 leading-7">
          {resume.summary || "Professional Summary"}
        </p>

      </section>

      {/* Experience */}

      <section className="mt-8">

        <h2 className="font-bold uppercase border-b pb-1">
          Experience
        </h2>

        <div className="mt-4 space-y-6">

          {resume.experience.map((exp, index) => (
            <div key={index}>

              <div className="flex justify-between">

                <div>

                  <h3 className="font-bold">
                    {exp.position}
                  </h3>

                  <p>{exp.company}</p>

                </div>

                <span>

                  {exp.startDate} -

                  {exp.currentlyWorking
                    ? " Present"
                    : ` ${exp.endDate}`}

                </span>

              </div>

              <ul className="mt-2 list-disc pl-5">

                {exp.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}

              </ul>

            </div>
          ))}

        </div>

      </section>

      {/* Education */}

      <section className="mt-8">

        <h2 className="font-bold uppercase border-b pb-1">
          Education
        </h2>

        <div className="mt-4 space-y-4">

          {resume.education.map((edu, index) => (
            <div key={index}>

              <h3 className="font-bold">
                {edu.degree}
              </h3>

              <p>{edu.institution}</p>

              <p>

                {edu.startYear} -

                {edu.endYear ?? "Present"}

              </p>

            </div>
          ))}

        </div>

      </section>

      {/* Skills */}

      <section className="mt-8">
  <h2 className="font-bold uppercase border-b pb-1">
    Skills
  </h2>

  <div className="mt-3 space-y-2">
    {resume.skills.map((category, index) => (
      <p key={index}>
        <span className="font-bold">
          {category.title}:
        </span>{" "}
        {category.skills.join(", ")}
      </p>
    ))}
  </div>
</section>

    </div>
  );
}