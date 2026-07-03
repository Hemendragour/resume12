import { useResumeStore } from "../../../../store/resume.store";

export default function TechnicalDeveloperTemplate() {
  console.log("Technical Template Rendered");
  const resume = useResumeStore((state) => state.resume);

  if (!resume) {
    return null;
  }

  const { personalInfo } = resume;

  return (
    <div className="bg-white min-h-[1120px] p-10 text-[13px]">
      {/* Header */}

      <div className="text-center border-b pb-5">
        <h1 className="text-3xl font-bold uppercase">
          {personalInfo.fullName || "Your Name"}
        </h1>

        <p className="text-blue-600 font-medium mt-2">
          {personalInfo.title || "Professional Title"}
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-4 text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}

          {personalInfo.phone && <span>{personalInfo.phone}</span>}

          {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}

          {personalInfo.github && <span>{personalInfo.github}</span>}
        </div>
      </div>

      {/* Summary */}

      <section className="mt-8">
        <h2 className="font-bold text-lg border-b pb-2">
          PROFESSIONAL SUMMARY
        </h2>

        <p className="mt-3 text-gray-700">
          {resume.summary || "Write your professional summary..."}
        </p>
      </section>

      {/* Skills */}

      <section className="mt-8">
        <h2 className="font-bold text-lg border-b pb-2">SKILLS</h2>

        <div className="flex flex-wrap gap-2 mt-3">
          {resume.skills.length > 0 ? (
            resume.skills.map((skill) => (
              <span
                key={skill}
                className="border px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-500">No skills added.</p>
          )}
        </div>
      </section>

      {/* Experience */}

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

               {/* Responsibilities */}
{ (item.responsibilities?.length ?? 0) > 0 && (
  <ul className="mt-3 list-disc pl-5 text-gray-700">
    {item.responsibilities!.map((responsibility, i) => (
      <li key={i}>{responsibility}</li>
    ))}
  </ul>
)}

{/* Achievements */}
{ (item.achievements?.length ?? 0) > 0 && (
  <ul className="mt-3 list-disc pl-5 text-gray-700">
    {item.achievements!.map((achievement, i) => (
      <li key={i}>{achievement}</li>
    ))}
  </ul>
)}
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-gray-500">No experience added.</p>
        )}
      </section>
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

      <section className="mt-8">
        <h2 className="border-b pb-2 text-lg font-bold">PROJECTS</h2>

        {resume.projects.length > 0 ? (
          <div className="mt-4 space-y-6">
            {resume.projects.map((project, index) => (
              <div key={index}>
                <h3 className="font-semibold">{project.title}</h3>

                <p className="mt-1 text-gray-700">{project.description}</p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border px-2 py-1 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-gray-500">No projects added.</p>
        )}
      </section>

      <section className="mt-8">
        <h2 className="border-b pb-2 text-lg font-bold">LANGUAGES</h2>

        {resume.languages.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {resume.languages.map((language) => (
              <span key={language} className="rounded border px-3 py-1 text-sm">
                {language}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-gray-500">No languages added.</p>
        )}
      </section>

      <section className="mt-8">
        <h2 className="border-b pb-2 text-lg font-bold">CERTIFICATIONS</h2>

        {resume.certifications.length > 0 ? (
          <ul className="mt-3 list-disc pl-5 space-y-2">
            {resume.certifications.map((certification) => (
              <li key={certification}>{certification}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-gray-500">No certifications added.</p>
        )}
      </section>

      <section className="mt-8">
        <h2 className="border-b pb-2 text-lg font-bold">AWARDS</h2>

        <ul className="mt-3 list-disc pl-5">
          {resume.awards.map((award) => (
            <li key={award}>{award}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="border-b pb-2 text-lg font-bold">INTERESTS</h2>

        {resume.interests.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {resume.interests.map((interest) => (
              <span key={interest} className="rounded border px-3 py-1 text-sm">
                {interest}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-gray-500">No interests added.</p>
        )}
      </section>
    </div>
  );
}
