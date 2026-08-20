// import type { Resume } from "../types/resume.types";

// interface Props {
//   resume: Resume;
// }

// export default function TechnicalThumbnail({ resume }: Props) {
//   const { personalInfo } = resume;

//   return (
//     <div className="h-44 w-32 overflow-hidden rounded bg-white shadow">
//       {/* Header */}

//       <div className="bg-primary p-2 text-center text-white">
//         <h2 className="truncate text-[8px] font-bold uppercase">
//           {personalInfo.fullName || "YOUR NAME"}
//         </h2>

//         <p className="truncate text-[6px]">
//           {personalInfo.title || "Developer"}
//         </p>
//       </div>

//       <div className="space-y-2 p-2">
//         <div className="h-[2px] rounded bg-slate-300" />

//         <div className="space-y-1">
//           <div className="h-[2px] rounded bg-slate-200" />

//           <div className="h-[2px] rounded bg-slate-200" />

//           <div className="h-[2px] rounded bg-slate-200" />
//         </div>

//         <div className="mt-3 h-[2px] rounded bg-slate-300" />

//         <div className="mt-2 space-y-1">
//           {resume.skills.slice(0, 4).map((category) => (
//             <div key={category.title} className="truncate text-[5px]">
//               <span className="font-semibold">{category.title}:</span>{" "}
//               {category.skills.join(", ")}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import type { Resume } from "../types/resume.types";

interface Props {
  resume: Resume;
}

export default function TechnicalThumbnail({ resume }: Props) {
  const { personalInfo } = resume;

  return (
    <div className="w-40 h-60 overflow-hidden rounded bg-white shadow text-black">
      {/* ================= HEADER ================= */}
      <div className="bg-primary px-2 py-2 text-center text-white">
        <h2 className="truncate text-[9px] font-bold uppercase">
          {personalInfo.fullName || "YOUR NAME"}
        </h2>

        {personalInfo.title && (
          <p className="truncate text-[6px]">{personalInfo.title}</p>
        )}

        {personalInfo.email && (
          <p className="truncate text-[5px]">{personalInfo.email}</p>
        )}

        {personalInfo.phone && (
          <p className="truncate text-[5px]">{personalInfo.phone}</p>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-2 space-y-2">
        {/* SUMMARY */}
        {resume.summary?.trim() && (
          <section>
            <SectionTitle title="Summary" />

            <p className="text-[5px] leading-tight line-clamp-3">
              {resume.summary}
            </p>
          </section>
        )}

        {/* EXPERIENCE */}
        {resume.experience.length > 0 && (
          <section>
            <SectionTitle title="Experience" />

            <div className="space-y-1">
              {resume.experience.slice(0, 2).map((item, index) => (
                <div key={index}>
                  <p className="text-[5px] font-semibold truncate">
                    {item.position}
                  </p>

                  <p className="text-[4px] text-slate-500 truncate">
                    {item.company}
                  </p>

                  <p className="text-[4px] text-slate-400 truncate">
                    {item.startDate} -{" "}
                    {item.currentlyWorking ? "Present" : item.endDate}
                  </p>

                  {item.responsibilities?.[0] && (
                    <p className="text-[4px] leading-tight line-clamp-2">
                      • {item.responsibilities[0]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EDUCATION */}
        {resume.education.length > 0 && (
          <section>
            <SectionTitle title="Education" />

            <div className="space-y-1">
              {resume.education.slice(0, 2).map((item, index) => (
                <div key={index}>
                  <p className="text-[5px] font-semibold truncate">
                    {item.degree}
                  </p>

                  <p className="text-[4px] text-slate-500 truncate">
                    {item.institution}
                  </p>

                  {item.fieldOfStudy && (
                    <p className="text-[4px] truncate">{item.fieldOfStudy}</p>
                  )}

                  <p className="text-[4px] text-slate-400 truncate">
                    {item.startYear} - {item.endYear}
                  </p>

                  {item.cgpa && <p className="text-[4px]">CGPA: {item.cgpa}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* PROJECTS */}
        {resume.projects.length > 0 && (
          <section>
            <SectionTitle title="Projects" />

            <div className="space-y-1">
              {resume.projects.slice(0, 2).map((item, index) => (
                <div key={index}>
                  <p className="text-[5px] font-semibold truncate">
                    {item.title}
                  </p>

                  {item.role && (
                    <p className="text-[4px] text-slate-500 truncate">
                      {item.role}
                    </p>
                  )}

                  <p className="text-[4px] leading-tight line-clamp-2">
                    {item.description}
                  </p>

                  {item.technologies.length > 0 && (
                    <p className="text-[4px] text-slate-500 truncate">
                      {item.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SKILLS */}
        {resume.skills.length > 0 && (
          <section>
            <SectionTitle title="Skills" />

            <div className="space-y-0.5">
              {resume.skills.slice(0, 4).map((category) => (
                <p key={category.title} className="truncate text-[5px]">
                  <span className="font-semibold">{category.title}:</span>{" "}
                  {category.skills.join(", ")}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* LANGUAGES */}
        {resume.languages.length > 0 && (
          <section>
            <SectionTitle title="Languages" />

            <p className="text-[5px] truncate">
              {resume.languages
                .map((language) => `${language.name} (${language.level})`)
                .join(", ")}
            </p>
          </section>
        )}

        {/* INTERNSHIPS */}
        {resume.internships.length > 0 && (
          <section>
            <SectionTitle title="Internships" />

            <div className="space-y-1">
              {resume.internships.slice(0, 2).map((item, index) => (
                <div key={index}>
                  <p className="text-[5px] font-semibold truncate">
                    {item.role}
                  </p>

                  <p className="text-[4px] text-slate-500 truncate">
                    {item.company}
                  </p>

                  {item.responsibilities?.[0] && (
                    <p className="text-[4px] line-clamp-2">
                      • {item.responsibilities[0]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CERTIFICATIONS */}
        {resume.certifications.length > 0 && (
          <section>
            <SectionTitle title="Certifications" />

            {resume.certifications.slice(0, 3).map((item) => (
              <p key={item} className="text-[5px] truncate">
                • {item}
              </p>
            ))}
          </section>
        )}

        {/* AWARDS */}
        {resume.awards.length > 0 && (
          <section>
            <SectionTitle title="Awards" />

            {resume.awards.slice(0, 3).map((item) => (
              <p key={item} className="text-[5px] truncate">
                • {item}
              </p>
            ))}
          </section>
        )}

        {/* INTERESTS */}
        {resume.interests.length > 0 && (
          <section>
            <SectionTitle title="Interests" />

            <p className="text-[5px] truncate">{resume.interests.join(", ")}</p>
          </section>
        )}

        {/* STRENGTHS */}
        {resume.strengths.length > 0 && (
          <section>
            <SectionTitle title="Strengths" />

            {resume.strengths.slice(0, 2).map((item) => (
              <div key={item.title}>
                <p className="text-[5px] font-semibold truncate">
                  {item.title}
                </p>

                <p className="text-[4px] line-clamp-2">{item.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* ACHIEVEMENTS */}
        {resume.achievements.length > 0 && (
          <section>
            <SectionTitle title="Achievements" />

            {resume.achievements.slice(0, 3).map((item) => (
              <p key={item} className="text-[5px] truncate">
                • {item}
              </p>
            ))}
          </section>
        )}

        {/* CUSTOM SECTIONS */}
        {resume.customSections
          .filter((section) => section.enabled)
          .map((section) => (
            <section key={section.id}>
              <SectionTitle title={section.title} />

              {section.items.slice(0, 2).map((item) => (
                <div key={item.id}>
                  <p className="text-[5px] font-semibold truncate">
                    {item.title}
                  </p>

                  {item.subtitle && (
                    <p className="text-[4px] truncate">{item.subtitle}</p>
                  )}

                  {item.description && (
                    <p className="text-[4px] line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </section>
          ))}
      </div>
    </div>
  );
}

/* ================= SECTION TITLE ================= */

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="text-[6px] font-bold uppercase border-b border-slate-300 pb-0.5 mb-1">
      {title}
    </h3>
  );
}
