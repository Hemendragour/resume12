// import { useResumeStore } from "../../../../../store/resume.store";
// import { useTheme } from "../../themes/ThemeProvider";
// import ContactLinks from "./ContactLinks";

// export default function ResumeHeader() {
//   const resume = useResumeStore((state) => state.resume);
//   const theme = useTheme();

//   if (!resume) return null;

//   const p = resume.personalInfo;

//   return (
//     <header
//       className={`${
//         theme.header.align === "center" ? "text-center" : "text-left"
//       }`}
//     >
//       <h1
//         style={{ fontSize: theme.header.nameSize }}
//         className="font-bold tracking-tight uppercase text-slate-900"
//       >
//         {p.fullName || "YOUR NAME"}
//       </h1>

//       <p
//         style={{ fontSize: theme.header.contactSize }}
//         className="mt-1 text-slate-600"
//       >
//         {p.title || "Professional Title"}
//       </p>

//       <ContactLinks />

//       {theme.section.divider && <hr className="mt-4 border-slate-400" />}
//     </header>
//   );
// }


import { useResumeStore } from "../../../../../store/resume.store";

import ContactLinks from "./ContactLinks";

export default function ResumeHeader() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const info = resume.personalInfo;

  return (
    <header className="border-b border-slate-500 pb-3 text-center">
      {/* Name */}
      <h1 className="text-[20px] font-bold uppercase tracking-tight text-slate-900">
        {info.fullName || "YOUR NAME"}
      </h1>

      {/* Title */}
      {info.title && (
        <p className="mt-1 text-[11px] text-slate-600">
          {info.title}
        </p>
      )}

      {/* Contact */}
      <div className="mt-2">
        <ContactLinks />
      </div>
    </header>
  );
}