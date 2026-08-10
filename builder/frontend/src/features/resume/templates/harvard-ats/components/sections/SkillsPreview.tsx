// import { useResumeStore } from "../../../../../../store/resume.store";

// import SectionHeader from "../shared/SectionHeader";
// import { HarvardATSTheme as T } from "../theme.harvard-ats";

// export default function SkillsPreview() {
//   const resume = useResumeStore((state) => state.resume);

//   if (!resume) return null;

//   const skills = resume.skills ?? [];

//   if (!skills.length) return null;

//   const section = resume.sections.find(
//     (section) => section.type === "skills"
//   );

//   return (
//     <section className={T.spacing.section}>
//       <SectionHeader
//         title={
//           section?.displayTitle?.trim()
//             ? section.displayTitle
//             : section?.title || "Technical Skills"
//         }
//       />

//       <div className="space-y-2">
//         {skills.map((category, index) => {
//           if (!category.skills.length) return null;

//           return (
//             <div
//               key={index}
//               className={T.skills.row}
//             >
//               <div
//                 className={`
//                   ${T.skills.category}
//                   ${T.fontWeight.bold}
//                   ${T.fontSize.body}
//                   ${T.colors.heading}
//                 `}
//               >
//                 {category.title}
//               </div>

//               <div
//                 className={`
//                   ${T.skills.value}
//                   ${T.fontFamily.body}
//                   ${T.fontSize.body}
//                   ${T.colors.body}
//                   ${T.lineHeight.body}
//                 `}
//               >
//                 {category.skills.join(" • ")}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";
import { HarvardATSTheme as T } from "../theme.harvard-ats";

export default function SkillsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const skills = resume.skills ?? [];

  if (!skills.length) return null;

  const section = resume.sections.find((section) => section.type === "skills");

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          section?.displayTitle?.trim()
            ? section.displayTitle
            : section?.title || "Technical Skills"
        }
      />

      <div className={`space-y-0.5 mt-2 ${T.content.indent}`}>
        {skills.map((category, index) => {
          if (!category.skills.length) return null;

          return (
            <div key={index} className={T.skills.row}>
              <div
                className={`
                  ${T.skills.category}
                  ${T.fontFamily.heading}
                  ${T.fontWeight.bold}
                  ${T.fontSize.body}
                  ${T.colors.heading}
                `}
              >
                {category.title}
              </div>

              <div
                className={`
                  ${T.skills.value}
                  ${T.fontFamily.body}
                  ${T.fontSize.body}
                  ${T.colors.body}
                  ${T.lineHeight.body}
                `}
              >
                {category.skills.join(", ")}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
