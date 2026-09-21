import { useResumeStore } from "../../../../../../store/resume.store";

const URL_PATTERN = /(https?:\/\/[^\s)]+|www\.[^\s)]+)/gi;

/**
 * Renders a certification line as plain text, but turns any URL found in it
 * into a clickable, underlined "Link" — so certificates that include a
 * verification link show a clean hyperlink instead of exposing the raw URL.
 */
function renderCertification(text: string) {
  // With one capturing group, String.split interleaves plain text and
  // matched URLs: [text, url, text, url, ...]. Odd indices are the matches.
  const parts = text.split(URL_PATTERN);

  return parts.map((part, index) => {
    const isUrl = index % 2 === 1;

    if (!isUrl) {
      return <span key={index}>{part}</span>;
    }

    const href = part.startsWith("http") ? part : `https://${part}`;

    return (
      <a
        key={index}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 underline"
      >
        Link
      </a>
    );
  });
}

export default function CertificationsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume || resume.certifications.length === 0) return null;

  const certificationsSection = resume.sections.find(
    (section) => section.id === "certifications",
  );

  return (
    <section className="mt-5">
      <h2 className="border-b border-slate-500 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-800">
        {certificationsSection?.displayTitle?.trim() ||
          certificationsSection?.title ||
          "Certifications"}
      </h2>

      <ul className="mt-2 list-disc space-y-1 pl-5 text-[11px] text-slate-700">
        {resume.certifications.map((c) => (
          <li key={c}>{renderCertification(c)}</li>
        ))}
      </ul>
    </section>
  );
}
