import { useResumeStore } from "../../../../../../store/resume.store";
import { FaFileLines } from "react-icons/fa6";

import { ModernProfessionalTheme as T } from "../theme.modern-professional";
import SectionHeader from "../shared/SectionHeader";

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
        className={`underline ${T.colors.link}`}
      >
        Link
      </a>
    );
  });
}

export default function CertificationsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume || resume.certifications.length === 0) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title="Certifications"
        icon={<FaFileLines size={T.sectionHeader.badgeIconSize} />}
      />

      <ul className="mt-3 space-y-2 pl-4 list-disc">
        {resume.certifications.map((certification, index) => (
          <li
            key={index}
            className="text-[12.5px] leading-[1.6] text-slate-700"
          >
            {renderCertification(certification)}
          </li>
        ))}
      </ul>
    </section>
  );
}
