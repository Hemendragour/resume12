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
        {info.fullName}
      </h1>

      {/* Title */}
      {info.title && (
        <p className="mt-1 text-[11px] text-slate-600">{info.title}</p>
      )}

      {/* Contact */}
      <div className="mt-2">
        <ContactLinks />
      </div>
    </header>
  );
}
