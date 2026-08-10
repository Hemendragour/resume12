// import { useResumeStore } from "../../../../../../store/resume.store";

// import SectionHeader from "../shared/SectionHeader";
// import { HarvardATSTheme as T } from "../theme.harvard-ats";

// export default function SummaryPreview() {
//   const resume = useResumeStore((state) => state.resume);

//   if (!resume) return null;

//   if (!resume.summary?.trim()) return null;

//   const section = resume.sections.find((section) => section.type === "summary");

//   return (
//     <section className={T.spacing.section}>
//       <SectionHeader
//         title={
//           section?.displayTitle?.trim()
//             ? section.displayTitle
//             : section?.title || "Professional Summary"
//         }
//       />

//       <p
//         className={`
//           ${T.fontFamily.body}
//           ${T.fontSize.body}
//           ${T.fontWeight.normal}
//           ${T.lineHeight.body}
//           ${T.colors.body}
//           text-justify
//           whitespace-pre-line
//         `}
//       >
//         {resume.summary}
//       </p>
//     </section>
//   );
// }



import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";
import { HarvardATSTheme as T } from "../theme.harvard-ats";

export default function SummaryPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  if (!resume.summary?.trim()) return null;

  const section = resume.sections.find(
    (section) => section.type === "summary"
  );

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          section?.displayTitle?.trim()
            ? section.displayTitle
            : section?.title || "Professional Summary"
        }
      />

      <p
        className={`
          ${T.fontFamily.body}
          ${T.fontSize.body}
          ${T.fontWeight.normal}
          ${T.lineHeight.body}
          ${T.colors.body}
          ${T.content.indent}
          text-justify
          whitespace-pre-line
          mt-2
        `}
      >
        {resume.summary}
      </p>
    </section>
  );
}