// // import { useResumeStore } from "../../../../../store/resume.store";

// // export default function ProjectsPreview() {
// //   const resume = useResumeStore((state) => state.resume);

// //   if (!resume) return null;

// //   return (
// //     <section className="mt-8">
// //       <h2 className="border-b pb-2 text-lg font-bold">PROJECTS</h2>

// //       {resume.projects.length > 0 ? (
// //         <div className="mt-4 space-y-6">
// //           {resume.projects.map((project, index) => (
// //             <div key={index}>
// //               <h3 className="font-semibold">{project.title}</h3>

// //               <p className="mt-1 text-gray-700">{project.description}</p>

// //               <div className="mt-2 flex flex-wrap gap-2">
// //                 {project.technologies.map((tech) => (
// //                   <span key={tech} className="rounded border px-2 py-1 text-xs">
// //                     {tech}
// //                   </span>
// //                 ))}
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       ) : (
// //         <p className="mt-3 text-gray-500">No projects added.</p>
// //       )}
// //     </section>
// //   );
// // }

// import { ExternalLink, Globe } from "lucide-react";
// import { useResumeStore } from "../../../../../store/resume.store";
// // import Github from "lucide-react";

// export default function ProjectsPreview() {
//   const resume = useResumeStore((state) => state.resume);

//   if (!resume || resume.projects.length === 0) return null;

//   return (
//     <section className="mt-7">
//       <h2 className="border-b border-gray-700 pb-1 text-[17px] font-bold tracking-wide uppercase">
//         Projects
//       </h2>

//       <div className="mt-4 space-y-6">
//         {resume.projects.map((project, index) => {
//           const bullets = project.description
//             .split("\n")
//             .map((item) => item.replace(/^•\s*/, "").trim())
//             .filter(Boolean);

//           return (
//             <div key={index}>
//               {/* Header */}
//               <div className="flex items-start justify-between">
//                 <h3 className="text-[15px] font-semibold">{project.title}</h3>
//               </div>

//               {/* Description */}
//               <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] leading-6 text-gray-700">
//                 {bullets.map((item, i) => (
//                   <li key={i}>{item}</li>
//                 ))}
//               </ul>

//               {/* Technologies */}
//               {project.technologies.length > 0 && (
//                 <div className="mt-3 flex flex-wrap gap-2">
//                   {project.technologies.map((tech) => (
//                     <span
//                       key={tech}
//                       className="rounded border border-gray-300 bg-gray-50 px-2 py-1 text-[11px]"
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
//               )}

//               {/* Links */}
//               <div className="mt-3 flex flex-wrap gap-5 text-[12px]">
//                 {project.github && (
//                   <div className="flex items-center gap-1">
//                     <Globe size={14} />
//                     <span className="break-all">{project.github}</span>
//                   </div>
//                 )}

//                 {project.link && (
//                   <div className="flex items-center gap-1">
//                     <ExternalLink size={14} />
//                     <span className="break-all">{project.link}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

// import { useResumeStore } from "../../../../../store/resume.store";

// export default function ProjectsPreview() {
//   const resume = useResumeStore((state) => state.resume);

//   if (!resume || resume.projects.length === 0) return null;

//   return (
//     <section className="mt-7">
//       <h2 className="border-b border-gray-700 pb-1 text-[17px] font-bold tracking-wide uppercase">
//         Projects
//       </h2>

//       <div className="mt-4 space-y-6">
//         {resume.projects.map((project, index) => {
//           const bullets = project.description
//             .split("\n")
//             .map((item) => item.replace(/^•\s*/, "").trim())
//             .filter(Boolean);

//           return (
//             <div key={index}>
//               {/* Header with Title + Links */}
//               <div className="flex items-start justify-between gap-4">
//                 <h3 className="text-[15px] font-semibold">
//                   {project.title}
//                 </h3>

//                 <div className="flex items-center gap-3 whitespace-nowrap text-[12px]">
//                   {project.link && (
//                     <a
//                       href={project.link}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="font-medium text-blue-600 hover:underline"
//                     >
//                       Live Demo
//                     </a>
//                   )}

//                   {project.github && (
//                     <a
//                       href={project.github}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="font-medium text-blue-600 hover:underline"
//                     >
//                       GitHub
//                     </a>
//                   )}
//                 </div>
//               </div>

//               {/* Description */}
//               <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] leading-6 text-gray-700">
//                 {bullets.map((item, i) => (
//                   <li key={i}>{item}</li>
//                 ))}
//               </ul>

//               {/* Technologies */}
//               {project.technologies.length > 0 && (
//                 <div className="mt-3 flex flex-wrap gap-2">
//                   {project.technologies.map((tech) => (
//                     <span
//                       key={tech}
//                       className="rounded border border-gray-300 bg-gray-50 px-2 py-1 text-[11px]"
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

import { useResumeStore } from "../../../../../store/resume.store";

export default function ProjectsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume || resume.projects.length === 0) return null;

  return (
    <section className="mt-7">
      <h2 className="border-b border-gray-700 pb-1 text-[17px] font-bold tracking-wide uppercase">
        Projects
      </h2>

      <div className="mt-4 space-y-6">
        {resume.projects.map((project, index) => {
          const bullets = project.description
            .split("\n")
            .map((item) => item.replace(/^•\s*/, "").trim())
            .filter(Boolean);

          return (
            <div key={index} className="space-y-2">
              {/* Header: Title + Role + Dates */}
              <div className="flex items-start justify-between">
                <div className="leading-tight">
  <h3 className="text-[15px] font-bold leading-none">
    {project.title}
  </h3>

  {project.role && (
    <p className="mt-0 text-[12px] text-gray-500 leading-none">
      {project.role}
    </p>
  )}
</div>

                <div className="flex flex-col items-end gap-1">
                  <p className="text-[12px] text-gray-500">
                    {project.startDate}
                    {project.currentlyWorking
                      ? " - Present"
                      : project.endDate
                        ? ` - ${project.endDate}`
                        : ""}
                  </p>

                  <div className="flex gap-3 text-[12px]">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Live Demo
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Technologies */}
              {project.technologies.length > 0 && (
                <p className="mt-1 text-[12px] font-medium text-gray-600">
                  {project.technologies.join(" • ")}
                </p>
              )}

              {/* Description as Bullets */}
              {bullets.length > 0 && (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] leading-6 text-gray-700">
                  {bullets.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}

              {/* Links
              {(project.link || project.github) && (
                <div className="mt-3 flex justify-end gap-4 text-[12px]">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      Live Demo
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )} */}
            </div>
          );
        })}
      </div>
    </section>
  );
}
