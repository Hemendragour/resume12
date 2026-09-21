import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";
import { LatexATSTheme as T } from "../theme.latex-ats";

const URL_PATTERN = /(https?:\/\/[^\s)]+|www\.[^\s)]+)/gi;

/**
 * Renders a certification line as plain text, but turns any URL found in it
 * (e.g. "IBM Data Science Certificate - https://coursera.org/verify/xyz")
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
        className={`underline ${T.colors.link}`}
      >
        Link
      </a>
    );
  });
}

export default function CertificationsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const certifications = resume.certifications ?? [];

  if (!certifications.length) return null;

  const section = resume.sections.find(
    (section) => section.type === "certifications",
  );

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          section?.displayTitle?.trim()
            ? section.displayTitle
            : section?.title || "Certifications"
        }
      />

      <ul
        className={`
          ${T.list.bullet}
          ${T.spacing.bullet}
          ${T.spacing.itemHeader}
          ${T.fontSize.body}
          ${T.lineHeight.body}
          ${T.colors.body}
        `}
      >
        {certifications.map((certification, index) => (
          <li key={index}>{renderCertification(certification)}</li>
        ))}
      </ul>
    </section>
  );
}

