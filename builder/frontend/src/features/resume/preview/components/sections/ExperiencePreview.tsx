// import { useResumeStore } from "../../../../../store/resume.store";

// export default function ExperiencePreview() {
//   const resume = useResumeStore((state) => state.resume);

//   if (!resume) return null;

//   return (
//     <section className="mt-5">
//       {/* Heading */}
//       <h2 className="border-b border-slate-500 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-800">
//         Experience
//       </h2>

//       {resume.experience.length === 0 ? (
//         <p className="mt-3 text-[11px] text-slate-500">No experience added.</p>
//       ) : (
//         <div className="mt-0.5 space-y-2">
//           {resume.experience.map((exp, index) => (
//             <div key={index}>
//               {/* Role + Date */}
//               <div className="flex items-start justify-between">
//                 <h3 className="text-[12px] font-bold text-slate-900">
//                   {exp.position}
//                 </h3>

//                 <span className="text-[11px] text-slate-600">
//                   {exp.startDate} -{" "}
//                   {exp.currentlyWorking ? "Present" : exp.endDate}
//                 </span>
//               </div>

//               {/* Company */}
//               <p className="text-[11px] italic text-slate-600 mt-[-5px]">
//                 {exp.company}
//               </p>

//               {/* Responsibilities */}
//               {exp.responsibilities.length > 0 && (
//                 <ul className="mt-2 list-disc space-y-1 pl-5 text-[11px] leading-4 text-slate-700">
//                   {exp.responsibilities.map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               )}

//               {/* Achievements */}
//               {exp.achievements?.length ? (
//                 <ul className="mt-2 list-disc space-y-1 pl-5 text-[11px] leading-4 text-slate-700">
//                   {exp.achievements.map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               ) : null}
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// import { useResumeStore } from "../../../../../store/resume.store";
// import { useTheme } from "../../themes/ThemeProvider";

// export default function ExperiencePreview() {
//   const resume = useResumeStore((state) => state.resume);
//   const theme = useTheme();

//   if (!resume) return null;

//   return (
//     <section style={{ marginTop: theme.section.spacing }}>
//       <h2
//         className={`pb-1 text-[13px] font-bold tracking-wide ${
//           theme.section.uppercase ? "uppercase" : ""
//         } ${theme.section.divider ? "border-b" : ""}`}
//         style={{ color: theme.colors.primary, borderColor: theme.colors.muted }}
//       >
//         Experience
//       </h2>

//       {resume.experience.length === 0 ? (
//         <p className="mt-3 text-[11px]" style={{ color: theme.colors.muted }}>
//           No experience added.
//         </p>
//       ) : (
//         <div className="mt-2 space-y-3">
//           {resume.experience.map((exp, index) => (
//             <div key={index}>
//               <div className="flex items-start justify-between">
//                 <h3
//                   className="text-[12px] font-bold"
//                   style={{ color: theme.colors.secondary }}
//                 >
//                   {theme.experience.companyLeft
//                     ? `${exp.company}${exp.position ? " - " + exp.position : ""}`
//                     : exp.position}
//                 </h3>

//                 {theme.experience.dateRight && (
//                   <span
//                     className="text-[11px]"
//                     style={{ color: theme.colors.muted }}
//                   >
//                     {exp.startDate} -{" "}
//                     {exp.currentlyWorking ? "Present" : exp.endDate}
//                   </span>
//                 )}
//               </div>

//               {!theme.experience.companyLeft && (
//                 <p
//                   className={`text-[11px] ${theme.experience.roleItalic ? "italic" : ""}`}
//                   style={{ color: theme.colors.text }}
//                 >
//                   {exp.company}
//                 </p>
//               )}

//               {theme.experience.bullets && exp.responsibilities.length > 0 && (
//                 <ul
//                   className="mt-2 list-disc space-y-1 pl-5 text-[11px] leading-4"
//                   style={{ color: theme.colors.text }}
//                 >
//                   {exp.responsibilities.map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               )}

//               {theme.experience.bullets && exp.achievements?.length ? (
//                 <ul
//                   className="mt-2 list-disc space-y-1 pl-5 text-[11px] leading-4"
//                   style={{ color: theme.colors.text }}
//                 >
//                   {exp.achievements.map((item, i) => (
//                     <li key={i}>{item}</li>
//                   ))}
//                 </ul>
//               ) : null}
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }



import { useResumeStore } from "../../../../../store/resume.store";
import { useTheme } from "../../themes/ThemeProvider";

export default function ExperiencePreview() {
  const resume = useResumeStore((state) => state.resume);
  const theme = useTheme();

  if (!resume) return null;

  const isSplit = theme.section.layout === "split";

  const title = (
    <h2
      className={`text-[12px] font-semibold tracking-wide ${
        theme.section.uppercase ? "uppercase" : ""
      }`}
      style={{ color: theme.colors.text }}
    >
      Work Experience
    </h2>
  );

  const content =
    resume.experience.length === 0 ? (
      <p className="text-[11px]" style={{ color: theme.colors.muted }}>
        No experience added.
      </p>
    ) : (
      <div className="space-y-4">
        {resume.experience.map((exp, index) => (
          <div key={index}>
            <div className="flex items-start justify-between">
              <h3
                className="text-[12px] font-bold"
                style={{ color: theme.colors.secondary }}
              >
                {theme.experience.companyLeft
                  ? `${exp.company}${exp.position ? " - " + exp.position : ""}`
                  : exp.position}
              </h3>

              {theme.experience.dateRight && (
                <span className="text-[11px]" style={{ color: theme.colors.muted }}>
                  {exp.startDate} -{" "}
                  {exp.currentlyWorking ? "Present" : exp.endDate}
                </span>
              )}
            </div>

            {!theme.experience.companyLeft && (
              <p
                className={`text-[11px] ${theme.experience.roleItalic ? "italic" : ""}`}
                style={{ color: theme.colors.text }}
              >
                {exp.company}
              </p>
            )}

            {theme.experience.bullets && exp.responsibilities.length > 0 && (
              <ul
                className="mt-2 list-disc space-y-1 pl-5 text-[11px] leading-4"
                style={{ color: theme.colors.text }}
              >
                {exp.responsibilities.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            {theme.experience.bullets && exp.achievements?.length ? (
              <ul
                className="mt-2 list-disc space-y-1 pl-5 text-[11px] leading-4"
                style={{ color: theme.colors.text }}
              >
                {exp.achievements.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    );

  return (
    <section
      className={isSplit ? "grid grid-cols-4 gap-6" : ""}
      style={{
        marginTop: theme.section.spacing,
        paddingBottom: theme.section.divider ? "16px" : "0",
        borderBottom: theme.section.divider ? `1px solid #e5e7eb` : "none",
      }}
    >
      {isSplit ? (
        <>
          <div className="col-span-1">{title}</div>
          <div className="col-span-3">{content}</div>
        </>
      ) : (
        <>
          <div
            className={`pb-1 ${theme.section.divider ? "border-b" : ""}`}
            style={{ borderColor: theme.colors.muted }}
          >
            {title}
          </div>
          <div className="mt-3">{content}</div>
        </>
      )}
    </section>
  );
}