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
        className="text-slate-700 underline hover:text-black"
      >
        Link
      </a>
    );
  });
}

export default function CertificationsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const certifications = resume.certifications.filter(
    (cert) => cert.trim() !== "",
  );

  if (certifications.length === 0) return null;
  const certificationsSection = resume.sections.find(
    (section) => section.id === "certifications",
  );
  return (
    <section className="mt-6">
      <h2 className="mb-2 border-b border-slate-700 pb-1 text-[13px] font-bold uppercase tracking-[0.6px] text-black">
        {certificationsSection?.displayTitle?.trim() ||
          certificationsSection?.title ||
          "Certificates"}
      </h2>

      <p className="text-[11.5px] leading-[1.6] text-slate-800">
        {certifications.map((cert, index) => (
          <span key={index}>
            {renderCertification(cert)}
            {index !== certifications.length - 1 && (
              <span className="mx-2 text-slate-400">|</span>
            )}
          </span>
        ))}
      </p>
    </section>
  );
}
