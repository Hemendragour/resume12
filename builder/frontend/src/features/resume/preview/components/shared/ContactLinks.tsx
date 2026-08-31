import { useResumeStore } from "../../../../../store/resume.store";

export default function ContactLinks() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const p = resume.personalInfo;

  const normalizeUrl = (url: string) => {
    if (!url) return "";

    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;
  };

  const links = [
    {
      url: p.github,
      label: "GitHub",
    },
    {
      url: p.linkedIn,
      label: "LinkedIn",
    },
    {
      url: p.portfolio,
      label: "Portfolio",
    },
  ].filter((link) => Boolean(link.url));

  return (
    <div className="space-y-1 text-center text-[10px] text-slate-700">
      {/* Email + Phone */}
      {(p.email || p.phone) && (
        <div>{[p.email, p.phone].filter(Boolean).join(" | ")}</div>
      )}

      {/* Links */}
      {links.length > 0 && (
        <div className="flex items-center justify-center gap-2">
          {links.map((link, index) => (
            <span key={link.label} className="flex items-center">
              <a
                href={normalizeUrl(link.url!)}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {link.label}
              </a>

              {index < links.length - 1 && <span className="ml-2">|</span>}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
