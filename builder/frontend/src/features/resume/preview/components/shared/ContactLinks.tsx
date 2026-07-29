import { useResumeStore } from "../../../../../store/resume.store";

export default function ContactLinks() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const p = resume.personalInfo;

  const clean = (url: string) => {
    try {
      const u = new URL(url);
      return u.hostname + u.pathname.replace(/\/$/, "");
    } catch {
      return url;
    }
  };

  return (
    <div className="space-y-1 text-center text-[10px] text-slate-700">
      <div>
        {[p.email, p.phone]
          .filter(Boolean)
          .join(" | ")}
      </div>

      <div>
        {[p.github && clean(p.github), p.linkedIn && clean(p.linkedIn), p.portfolio && clean(p.portfolio)]
          .filter(Boolean)
          .join(" | ")}
      </div>
    </div>
  );
}