// // import { Mail, Phone } from "lucide-react";
// // import { FaGithub, FaLinkedin } from "react-icons/fa";

// // import { useResumeStore } from "../../../../store/resume.store";

// // // import DynamicSectionRenderer from "./components/DynamicSectionRenderer";
// // // import { ResumeTemplatesMap } from "../index";
// // import { EnhancvModernTheme as T } from "./components/theme.enhancv-modern";
// // import { EnhancvSectionRegistry } from "./components/SectionRegistry.enhancv";
// // import EnhancvCustomSectionPreview from "./components/sections/CustomSectionPreview";
// // import DynamicSectionRenderer from "../../preview/components/DynamicSectionRenderer";

// // export default function EnhancvModernTemplate() {
// //   const resume = useResumeStore((state) => state.resume);

// //   if (!resume) return null;

// //   const { personalInfo } = resume;

// //   return (
// //     <div
// //       className={`
// //         min-h-[1123px]
// //         max-w-[794px]
// //         mx-auto
// //         ${T.colors.page}
// //         ${T.spacing.page}
// //         ${T.fontFamily}
// //       `}
// //     >
// //       {/* Header */}

// //       <header className="text-center border-b border-slate-800 pb-2">
// //         <h1
// //           className={`
// //             ${T.fontSize.name}
// //             ${T.fontWeight.name}
// //             ${T.colors.heading}
// //           `}
// //         >
// //           {personalInfo.fullName || "YOUR NAME"}
// //         </h1>

// //         <p
// //           className={`
        
// //             ${T.fontSize.title}
// //             ${T.colors.body}
// //           `}
// //         >
// //           {personalInfo.title || "SOFTWARE ENGINEER"}
// //         </p>

// //         <div className=" flex justify-center items-center flex-wrap gap-2 text-gray-600 text-sm">
// //           {personalInfo.email && (
// //             <>
// //               <span>•</span>
// //               <span>{personalInfo.email}</span>
// //             </>
// //           )}
// //           {personalInfo.linkedIn && (
// //             <>
// //               <span>•</span>
// //               <a
// //                 href={personalInfo.linkedIn}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className=" no-underline hover:no-underline"
// //               >
// //                 linkedin.com
// //               </a>
// //             </>
// //           )}

// //           {personalInfo.github && (
// //             <>
// //               <span>•</span>
// //               <a
// //                 href={personalInfo.github}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="no-underline hover:no-underline"
// //               >
// //                 github.com
// //               </a>
// //             </>
// //           )}
// //           <span>•</span>
// //           {personalInfo.phone && <span>{personalInfo.phone}</span>}
// //         </div>
// //       </header>

// //       {/* Body */}

// //       <main className="mt-8">
// //         <DynamicSectionRenderer
// //           registry={EnhancvSectionRegistry}
// //           customSectionComponent={EnhancvCustomSectionPreview}
// //         />
// //       </main>
// //     </div>
// //   );
// // }



// import { useResumeStore } from "../../../../store/resume.store";

// import { EnhancvModernTheme as T } from "./components/theme.enhancv-modern";
// import { EnhancvSectionRegistry } from "./components/SectionRegistry.enhancv";
// import EnhancvCustomSectionPreview from "./components/sections/CustomSectionPreview";
// import DynamicSectionRenderer from "../../preview/components/DynamicSectionRenderer";

// export default function EnhancvModernTemplate() {
//   const resume = useResumeStore((state) => state.resume);

//   if (!resume) return null;

//   const { personalInfo } = resume;

//   return (
//     <div
//       className={`
//         min-h-[1123px]
//         max-w-[794px]
//         mx-auto
//         ${T.colors.page}
//         ${T.spacing.page}
//         ${T.fontFamily}
//       `}
//     >
//       {/* Header */}
//       <header className="text-center border-b border-slate-800 pb-2">
//         <h1
//           className={`
//             ${T.fontSize.name}
//             ${T.fontWeight.name}
//             ${T.colors.heading}
//             ${T.lineHeight.name}
//           `}
//         >
//           {personalInfo.fullName || "YOUR NAME"}
//         </h1>

//         <p
//           className={`
//             ${T.fontSize.title}
//             ${T.colors.body}
//             ${T.lineHeight.title}
//           `}
//         >
//           {personalInfo.title || "SOFTWARE ENGINEER"}
//         </p>

//         <div
//           className={`
//             flex justify-center items-center flex-wrap gap-2
//             ${T.fontSize.contact}
//             ${T.colors.muted}
//             ${T.lineHeight.contact}
//           `}
//         >
//           {personalInfo.email && (
//             <>
//               <span>•</span>
//               <span>{personalInfo.email}</span>
//             </>
//           )}
//           {personalInfo.linkedIn && (
//             <>
//               <span>•</span>
//               <a
//                 href={personalInfo.linkedIn}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="no-underline hover:no-underline"
//               >
//                 linkedin.com
//               </a>
//             </>
//           )}
//           {personalInfo.github && (
//             <>
//               <span>•</span>
//               <a
//                 href={personalInfo.github}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="no-underline hover:no-underline"
//               >
//                 github.com
//               </a>
//             </>
//           )}
//           {personalInfo.phone && (
//             <>
//               <span>•</span>
//               <span>{personalInfo.phone}</span>
//             </>
//           )}
//         </div>
//       </header>

//       {/* Body */}
//       <main className={T.spacing.section}>
//         <DynamicSectionRenderer
//           registry={EnhancvSectionRegistry}
//           customSectionComponent={EnhancvCustomSectionPreview}
//         />
//       </main>
//     </div>
//   );
// }


import { useResumeStore } from "../../../../store/resume.store";
import { EnhancvModernTheme as T } from "./components/theme.enhancv-modern";
import { EnhancvSectionRegistry } from "./components/SectionRegistry.enhancv";
import EnhancvCustomSectionPreview from "./components/sections/CustomSectionPreview";
import DynamicSectionRenderer from "../../preview/components/DynamicSectionRenderer";

export default function EnhancvModernTemplate() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const { personalInfo } = resume;

  return (
    <div
      className={`
        min-h-[1123px]
        max-w-[794px]
        mx-auto
        ${T.colors.page}
        ${T.spacing.page}
        ${T.fontFamily}
      `}
    >
      {/* Header */}
      <header className="text-center border-b border-slate-800 pb-2">
        <h1
          className={`
            ${T.fontSize.name}
            ${T.fontWeight.name}
            ${T.colors.heading}
            ${T.lineHeight.name}
          `}
        >
          {personalInfo.fullName || "YOUR NAME"}
        </h1>

        <p
          className={`
            ${T.fontSize.title}
            ${T.colors.body}
            ${T.lineHeight.title}
          `}
        >
          {personalInfo.title || "SOFTWARE ENGINEER"}
        </p>

        <div
          className={`
            flex justify-center items-center flex-wrap gap-2
            ${T.fontSize.contact}
            ${T.colors.muted}
            ${T.lineHeight.contact}
          `}
        >
          {personalInfo.email && (
            <>
              <span>•</span>
              <span>{personalInfo.email}</span>
            </>
          )}

          {personalInfo.linkedIn && (
  <>
    <span>•</span>
    <a
      href={
        personalInfo.linkedIn.startsWith("http")
          ? personalInfo.linkedIn
          : `https://${personalInfo.linkedIn}`
      }
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline hover:no-underline"
    >
      linkedin.com
    </a>
  </>
)}

{personalInfo.github && (
  <>
    <span>•</span>
    <a
      href={
        personalInfo.github.startsWith("http")
          ? personalInfo.github
          : `https://${personalInfo.github}`
      }
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline hover:no-underline"
    >
      github.com
    </a>
  </>
)}

          {personalInfo.phone && (
            <>
              <span>•</span>
              <span>{personalInfo.phone}</span>
            </>
          )}
        </div>
      </header>

      {/* Body */}
      <main className={T.spacing.section}>
        <DynamicSectionRenderer
          registry={EnhancvSectionRegistry}
          customSectionComponent={EnhancvCustomSectionPreview}
        />
      </main>
    </div>
  );
}