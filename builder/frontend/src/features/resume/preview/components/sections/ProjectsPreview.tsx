// // import { useResumeStore } from "../../../../../store/resume.store";
// // import { useTheme } from "../../themes/ThemeProvider";
// // import SectionTitle from "../shared/SectionTitle";
// // // import SectionTitle from "../../shared/SectionTitle";
// // import ResumeSection from "../shared/ResumeSection";

// // export default function ProjectsPreview() {
// //   const theme = useTheme();

// //   console.log(theme);
// //   const resume = useResumeStore((state) => state.resume);

// //   if (!resume || resume.projects.length === 0) return null;

// //   return (
// //     <ResumeSection title="Projects">
// //       <SectionTitle title="Projects" />
// //       <div className="mt-4 space-y-6">
// //         {resume.projects.map((project, index) => {
// //           const bullets = project.description
// //             .split("\n")
// //             .map((item) => item.replace(/^•\s*/, "").trim())
// //             .filter(Boolean);

// //           return (
// //             <div key={index} className="space-y-2">
// //               {/* Header: Title + Role + Dates */}
// //               <div className="flex items-start justify-between">
// //                 <div className="leading-tight">
// //                   <h3 className="text-[15px] font-bold leading-none">
// //                     {project.title}
// //                   </h3>

// //                   {project.role && (
// //                     <p className="mt-0 text-[12px] text-gray-500 leading-none">
// //                       {project.role}
// //                     </p>
// //                   )}
// //                 </div>

// //                 <div className="flex flex-col items-end gap-1">
// //                   <p className="text-[12px] text-gray-500">
// //                     {project.startDate}
// //                     {project.currentlyWorking
// //                       ? " - Present"
// //                       : project.endDate
// //                         ? ` - ${project.endDate}`
// //                         : ""}
// //                   </p>

// //                   <div className="flex gap-3 text-[12px]">
// //                     {project.link && (
// //                       <a
// //                         href={project.link}
// //                         target="_blank"
// //                         rel="noreferrer"
// //                         className="font-medium text-blue-600 hover:underline"
// //                       >
// //                         Live Demo
// //                       </a>
// //                     )}

// //                     {project.github && (
// //                       <a
// //                         href={project.github}
// //                         target="_blank"
// //                         rel="noreferrer"
// //                         className="font-medium text-blue-600 hover:underline"
// //                       >
// //                         GitHub
// //                       </a>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Technologies */}
// //               {project.technologies.length > 0 && (
// //                 <p className="mt-1 text-[12px] font-medium text-gray-600">
// //                   {project.technologies.join(" • ")}
// //                 </p>
// //               )}

// //               {/* Description as Bullets */}
// //               {bullets.length > 0 && (
// //                 <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] leading-6 text-gray-700">
// //                   {bullets.map((item, i) => (
// //                     <li key={i}>{item}</li>
// //                   ))}
// //                 </ul>
// //               )}

// //               {/* Links
// //               {(project.link || project.github) && (
// //                 <div className="mt-3 flex justify-end gap-4 text-[12px]">
// //                   {project.link && (
// //                     <a
// //                       href={project.link}
// //                       target="_blank"
// //                       rel="noreferrer"
// //                       className="font-medium text-blue-600 hover:underline"
// //                     >
// //                       Live Demo
// //                     </a>
// //                   )}

// //                   {project.github && (
// //                     <a
// //                       href={project.github}
// //                       target="_blank"
// //                       rel="noreferrer"
// //                       className="font-medium text-blue-600 hover:underline"
// //                     >
// //                       GitHub
// //                     </a>
// //                   )}
// //                 </div>
// //               )} */}
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </ResumeSection>
// //   );
// // }

// import { useResumeStore } from "../../../../../store/resume.store";
// import { useTheme } from "../../themes/ThemeProvider";
// import DateRange from "../shared/DateRange";
// import ResumeSection from "../shared/ResumeSection";

// export default function ProjectsPreview() {
//   const theme = useTheme();
//   const resume = useResumeStore((state) => state.resume);

//   if (!resume || resume.projects.length === 0) return null;

//   return (
//     <ResumeSection title="Projects">
//       <div className="mt-4 space-y-6">
//         {resume.projects.map((project, index) => {
//           const bullets = project.description
//             .split("\n")
//             .map((item) => item.replace(/^•\s*/, "").trim())
//             .filter(Boolean);

//           return (
//             <div key={index} className="space-y-1">
//               {/* Header: Title + Role + Dates */}
//               <div className="flex items-start justify-between">
//                 <div className="leading-tight">
//                   <h3 className="text-[14px] font-bold text-slate-900 leading-none">
//                     {project.title}
//                   </h3>

//                   {project.role && (
//                     <p className="mt-0.5 text-[12px] italic text-slate-600 leading-none">
//                       {project.role}
//                     </p>
//                   )}
//                 </div>

//                 <div className="flex flex-col items-end gap-1">
//                   <DateRange
//   start={project.startDate}
//   end={project.endDate}
//   current={project.currentlyWorking}
// />

//                   <div className="mt-0.5 flex gap-3 text-[11px]">
//                     {project.link && (
//                       <a
//                         href={project.link}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="font-semibold text-slate-700 hover:underline"
//                       >
//                         Live Demo
//                       </a>
//                     )}

//                     {project.github && (
//                       <a
//                         href={project.github}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="font-semibold text-slate-700 hover:underline"
//                       >
//                         GitHub
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Technologies */}
//               {project.technologies.length > 0 && (
//                 <p className="text-[11px] text-slate-600">
//                   {project.technologies.join(" • ")}
//                 </p>
//               )}

//               {/* Description as Bullets */}
//               {bullets.length > 0 && (
//                 <ul className="mt-2 list-disc space-y-1 pl-5 text-[12px] leading-5 text-slate-700">
//                   {bullets.map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               )}

//               {/* Separator */}
//               {index !== resume.projects.length - 1 && (
//                 <div className="mt-5 border-b border-slate-200" />
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </ResumeSection>
//   );
// }

// import { useResumeStore } from "../../../../../store/resume.store";
// import { useTheme } from "../../themes/ThemeProvider";

// import ResumeSection from "../shared/ResumeSection";
// import SectionTitle from "../shared/SectionTitle";
// import DateRange from "../shared/DateRange";

// export default function ProjectsPreview() {
//   const resume = useResumeStore((state) => state.resume);
//   const theme = useTheme();

//   if (!resume || resume.projects.length === 0) return null;

//   return (
//     <ResumeSection>
//       <SectionTitle title="Projects" />

//       <div className="space-y-6">
//         {resume.projects.map((project, index) => {
//           const bullets = project.description
//             .split("\n")
//             .map((item) => item.replace(/^•\s*/, "").trim())
//             .filter(Boolean);

//           return (
//             <div key={index}>
//               {/* Header */}

//               <div className="flex items-start justify-between">
//                 <div>
//                   <h3 className="text-[15px] font-bold">{project.title}</h3>

//                   {project.role && (
//                     <p className="italic text-[12px] text-slate-600">
//                       {project.role}
//                     </p>
//                   )}
//                 </div>

//                 {theme.projects.dateRight && (
//                   <DateRange
//                     start={project.startDate}
//                     end={project.endDate}
//                     current={project.currentlyWorking}
//                   />
//                 )}
//               </div>

//               {/* Links */}

//               {theme.projects.linksBelowDate &&
//                 (project.link || project.github) && (
//                   <div className="mt-1 flex justify-end gap-4 text-[11px]">
//                     {project.link && (
//                       <a
//                         href={project.link}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="font-medium hover:underline"
//                       >
//                         Live Demo
//                       </a>
//                     )}

//                     {project.github && (
//                       <a
//                         href={project.github}
//                         target="_blank"
//                         rel="noreferrer"
//                         className="font-medium hover:underline"
//                       >
//                         GitHub
//                       </a>
//                     )}
//                   </div>
//                 )}

//               {/* Tech */}

//               {theme.projects.technologiesInline &&
//                 project.technologies.length > 0 && (
//                   <p className="mt-2 text-[11px] text-slate-600">
//                     {project.technologies.join(" • ")}
//                   </p>
//                 )}

//               {/* Description */}

//               {theme.projects.bullets && bullets.length > 0 && (
//                 <ul className="mt-3 list-disc space-y-1 pl-5 text-[12px]">
//                   {bullets.map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               )}

//               {index !== resume.projects.length - 1 && (
//                 <div className="mt-5 border-b" />
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </ResumeSection>
//   );
// }

// import { useResumeStore } from "../../../../../store/resume.store";
// import { useTheme } from "../../themes/ThemeProvider";

// import ResumeSection from "../shared/ResumeSection";
// import SectionTitle from "../shared/SectionTitle";
// import DateRange from "../shared/DateRange";

// export default function ProjectsPreview() {
//   const resume = useResumeStore((state) => state.resume);
//   const theme = useTheme();

//   if (!resume || resume.projects.length === 0) return null;

//   return (
//     <ResumeSection>
//       <SectionTitle title="Projects" />

//       <div className="space-y-4">
//         {resume.projects.map((project, index) => {
//           const bullets = project.description
//             .split("\n")
//             .map((item) => item.replace(/^•\s*/, "").trim())
//             .filter(Boolean);
//           resume.projects.forEach((project) => {
//             console.log("Preview Github:", JSON.stringify(project.github));
//             console.log("Preview Link:", JSON.stringify(project.link));
//           });
//           return (
//             <div key={index}>
//               {/* Header: Title/Role on left, Date + Links grouped on right */}
//               <div className="flex items-start justify-between gap-4">
//                 <div>
//                   <h3 className="text-[15px] font-bold leading-0.5">
//                     {project.title}
//                   </h3>

//                   {project.role && (
//                     <p className="italic text-[12px] text-slate-600 leading-tight">
//                       {project.role}
//                     </p>
//                   )}
//                 </div>

//                 {/* Right column: date on top, links right below it, tightly spaced */}
//                 <div className="flex flex-col items-end shrink-0">
//                   {theme.projects.dateRight && (
//                     <DateRange
//                       start={project.startDate}
//                       end={project.endDate}
//                       current={project.currentlyWorking}
//                     />
//                   )}

//                   {(project.link || project.github) && (
//                     <div className="mt-1 flex gap-3 text-[11px] whitespace-nowrap">
//                       {project.link && (
//                         <a
//                           href={project.link}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="font-medium hover:underline"
//                         >
//                           Live Demo
//                         </a>
//                       )}

//                       {project.github && (
//                         <a
//                           href={project.github}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="font-medium hover:underline"
//                         >
//                           GitHub
//                         </a>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Tech */}
//               {theme.projects.technologiesInline &&
//                 project.technologies.length > 0 && (
//                   <p className="mt-2 text-[11px] text-slate-600">
//                     {project.technologies.join(" • ")}
//                   </p>
//                 )}

//               {/* Description */}
//               {theme.projects.bullets && bullets.length > 0 && (
//                 <ul className="mt-[-3px] list-disc space-y-1 pl-5 text-[12px] leading-4">
//                   {bullets.map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               )}

//               {index !== resume.projects.length - 1 && (
//                 <div className="mt-5 border-b" />
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </ResumeSection>
//   );
// }

// import { useResumeStore } from "../../../../../store/resume.store";
// import { useTheme } from "../../themes/ThemeProvider";

// import ResumeSection from "../shared/ResumeSection";
// import SectionTitle from "../shared/SectionTitle";
// import DateRange from "../shared/DateRange";

// export default function ProjectsPreview() {
//   const resume = useResumeStore((state) => state.resume);
//   const theme = useTheme();

//   if (!resume || resume.projects.length === 0) return null;

//   return (
//     <ResumeSection>
//       <SectionTitle title="Projects" />

//       <div className="space-y-5">
//         {resume.projects.map((project, index) => {
//           const bullets = project.description
//             .split("\n")
//             .map((item) => item.replace(/^•\s*/, "").trim())
//             .filter(Boolean);

//           return (
//             <div key={index}>
//               {/* Header: Title/Role on left, Date + Links grouped on right */}
//               <div className="flex items-start justify-between gap-4">
//                 <div>
//                   <h3 className="text-[15px] font-bold leading-tight">
//                     {project.title}
//                   </h3>

//                   {project.role && (
//                     <p className="mt-1 italic text-[12px] text-slate-600 leading-tight">
//                       {project.role}
//                     </p>
//                   )}
//                 </div>

//                 {/* Right column: date on top, links right below it, tightly spaced */}
//                 <div className="flex flex-col items-end shrink-0">
//                   {theme.projects.dateRight && (
//                     <DateRange
//                       start={project.startDate}
//                       end={project.endDate}
//                       current={project.currentlyWorking}
//                     />
//                   )}

//                   {(project.link || project.github) && (
//                     <div className="mt-1 flex gap-3 text-[11px] whitespace-nowrap">
//                       {project.link && (

//                           href={project.link}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="font-medium hover:underline"
//                         >
//                           Live Demo
//                         </a>
//                       )}

//                       {project.github && (

//                           href={project.github}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="font-medium hover:underline"
//                         >
//                           GitHub
//                         </a>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Tech */}
//               {theme.projects.technologiesInline &&
//                 project.technologies.length > 0 && (
//                   <p className="mt-2 text-[11px] text-slate-600">
//                     {project.technologies.join(" • ")}
//                   </p>
//                 )}

//               {/* Description */}
//               {theme.projects.bullets && bullets.length > 0 && (
//                 <ul className="mt-2 list-disc space-y-1 pl-5 text-[12px] leading-5">
//                   {bullets.map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </ResumeSection>
//   );
// }
import { useResumeStore } from "../../../../../store/resume.store";
import { useTheme } from "../../themes/ThemeProvider";

export default function ProjectsPreview() {
  const resume = useResumeStore((state) => state.resume);
  const theme = useTheme();

  if (!resume || resume.projects.length === 0) return null;

  return (
    <section style={{ marginTop: theme.section.spacing }}>
      <h2
        className={`pb-1 text-[13px] font-bold tracking-wide ${
          theme.section.uppercase ? "uppercase" : ""
        } ${theme.section.divider ? "border-b" : ""}`}
        style={{ color: theme.colors.primary, borderColor: theme.colors.muted }}
      >
        Projects
      </h2>

      <div className="mt-2 space-y-4">
        {resume.projects.map((project, index) => {
          const bullets = project.description
            .split("\n")
            .map((item) => item.replace(/^•\s*/, "").trim())
            .filter(Boolean);

          return (
            <div key={index} className="break-inside-avoid">
              <div className="flex items-start justify-between gap-4">
                <h3
                  className="text-[12px] font-bold leading-tight"
                  style={{ color: theme.colors.secondary }}
                >
                  {project.title}
                </h3>

                <div className="flex flex-col items-end shrink-0">
                  {theme.projects.dateRight && (
                    <span className="text-[11px]" style={{ color: theme.colors.muted }}>
                      {project.startDate} –{" "}
                      {project.currentlyWorking ? "Present" : project.endDate}
                    </span>
                  )}

                  {(project.link || project.github) && (
                    <div className="mt-1.5 flex gap-3 text-[11px] whitespace-nowrap">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium hover:underline"
                          style={{ color: theme.colors.primary }}
                        >
                          Live Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium hover:underline"
                          style={{ color: theme.colors.primary }}
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {theme.projects.technologiesInline && project.technologies?.length > 0 && (
                <p className="mt-1 text-[11px]" style={{ color: theme.colors.muted }}>
                  {project.technologies.join(" • ")}
                </p>
              )}

              {theme.projects.bullets && bullets.length > 0 && (
                <ul
                  className="mt-2 list-disc space-y-1 pl-5 text-[11px] leading-4"
                  style={{ color: theme.colors.text }}
                >
                  {bullets.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
