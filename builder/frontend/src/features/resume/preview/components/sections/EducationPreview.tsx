// import { useResumeStore } from "../../../../../store/resume.store";

// export default function EducationPreview() {
//   const resume = useResumeStore((state) => state.resume);

//   if (!resume) return null;

//   return (
//     <section className="mt-6">
//       {/* Heading */}
//       <h2 className="border-b border-slate-500 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-800">
//         Education
//       </h2>

//       {resume.education.length === 0 ? (
//         <p className="mt-3 text-[11px] text-slate-500">No education added.</p>
//       ) : (
//         <div className="mt-4 space-y-5">
//           {resume.education.map((edu, index) => (
//             <div key={index}>
//               {/* Degree + Date */}
//               <div className="flex justify-between">
//                 <h3 className="text-[12px] font-bold text-slate-900">
//                   {edu.degree}
//                   {edu.fieldOfStudy && ` - ${edu.fieldOfStudy}`}
//                 </h3>

//                 <span className="text-[11px] text-slate-600">
//                   {edu.startYear} - {edu.endYear}
//                 </span>
//               </div>

//               {/* College */}
//               <p className="mt-1 text-[11px] italic text-slate-700">
//                 {edu.institution}
//               </p>

//               {/* CGPA */}
//               {edu.cgpa && (
//                 <p className="mt-1 text-[11px] text-slate-700">
//                   CGPA: {edu.cgpa}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

import { useResumeStore } from "../../../../../store/resume.store";
import { useTheme } from "../../themes/ThemeProvider";

export default function EducationPreview() {
  const resume = useResumeStore((state) => state.resume);
  const theme = useTheme();

  if (!resume) return null;

  return (
    <section style={{ marginTop: theme.section.spacing }}>
      <h2
        className={`pb-1 text-[13px] font-bold tracking-wide ${
          theme.section.uppercase ? "uppercase" : ""
        } ${theme.section.divider ? "border-b" : ""}`}
        style={{ color: theme.colors.primary, borderColor: theme.colors.muted }}
      >
        Education
      </h2>

      {resume.education.length === 0 ? (
        <p className="mt-3 text-[11px]" style={{ color: theme.colors.muted }}>
          No education added.
        </p>
      ) : (
        <div className="mt-2 space-y-4">
          {resume.education.map((edu, index) => (
            <div key={index}>
              {/* Institution + Date range */}
              <div className="flex justify-between">
                <h3
                  className="text-[12px] font-bold"
                  style={{ color: theme.colors.secondary }}
                >
                  {edu.institution}
                </h3>

                {theme.education.dateRight && (
                  <span className="text-[11px]" style={{ color: theme.colors.muted }}>
                    {edu.startMonth} {edu.startYear} –{" "}
                    {edu.current ? "Present" : `${edu.endMonth} ${edu.endYear}`}
                  </span>
                )}
              </div>

              {/* Degree + Field, CGPA on the right */}
              <div className="mt-0.5 flex justify-between">
                <p className="text-[11px]" style={{ color: theme.colors.text }}>
                  {edu.degree}
                  {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                </p>

                {edu.cgpa && (
                  <span className="text-[11px]" style={{ color: theme.colors.text }}>
                    CGPA: {edu.cgpa}
                  </span>
                )}
              </div>

              {/* Relevant Coursework */}
              {edu.coursework && (
                <p className="mt-1 text-[11px]" style={{ color: theme.colors.text }}>
                  <span className="font-semibold">Relevant Coursework:</span>{" "}
                  {edu.coursework}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
