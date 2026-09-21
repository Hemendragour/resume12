import { useResumeStore } from "../../../../../../store/resume.store";
import { ExecutiveBlueTheme as T } from "../../theme.executive-blue";

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
        className={`font-normal ${T.colors.accent} underline`}
      >
        Link
      </a>
    );
  });
}

export default function CertificationsPreview() {
  const resume = useResumeStore((state) => state.resume);
  if (!resume) return null;
  if (resume.certifications.length === 0) return null;

  return (
    <section className="mt-5">
      <h2
        className={`border-b ${T.colors.sectionBorder} pb-1 ${T.fontSize.sectionHeader} font-bold uppercase tracking-wide ${T.colors.heading}`}
      >
        Certifications
      </h2>

      <ul className="mt-2 space-y-1">
        {resume.certifications.map((cert, i) => (
          <li
            key={i}
            className={`flex gap-2 ${T.fontSize.body} ${T.colors.body}`}
          >
            <span className={T.colors.accent}>●</span>
            <span className="font-semibold">
              {renderCertification(cert)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
