import { useCoverLetterStore } from "../../../../store/coverLetter.store";

/**
 * Classic Formal cover letter template.
 *
 * Modelled on a clean LaTeX-style business letter: bold name header,
 * a contact line, an accent rule, a recipient/date row, an optional
 * subject line, greeting, body paragraphs, and a signature block.
 */
export default function CoverLetterPreview() {
  const coverLetter = useCoverLetterStore((state) => state.coverLetter);

  if (!coverLetter) return null;

  const { personalInfo, recipient, body, closing } = coverLetter;

  const contactParts = [
    personalInfo.location,
    personalInfo.phone,
    personalInfo.email,
  ].filter(Boolean);

  const linkParts = [
    personalInfo.github
      ? { label: personalInfo.github, href: `https://${personalInfo.github.replace(/^https?:\/\//, "")}` }
      : null,
    personalInfo.linkedIn
      ? { label: personalInfo.linkedIn, href: `https://${personalInfo.linkedIn.replace(/^https?:\/\//, "")}` }
      : null,
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <div className="h-full w-full overflow-y-auto bg-white px-14 py-12 font-serif text-[13px] leading-relaxed text-slate-800">
      {/* Name */}
      <h1 className="text-[26px] font-bold tracking-tight text-slate-900">
        {personalInfo.fullName || "Your Name"}
      </h1>

      {/* Contact row 1: location | phone | email */}
      {contactParts.length > 0 && (
        <p className="mt-1 text-[12px] text-slate-600">
          {contactParts.map((part, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-2">|</span>}
              {part}
            </span>
          ))}
        </p>
      )}

      {/* Contact row 2: github | linkedin */}
      {linkParts.length > 0 && (
        <p className="mt-1 text-[12px]">
          {linkParts.map((link, i) => (
            <span key={i}>
              {i > 0 && <span className="mx-2 text-slate-600">|</span>}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline"
              >
                {link.label}
              </a>
            </span>
          ))}
        </p>
      )}

      {/* Accent rule */}
      <div className="my-4 h-[2px] w-full bg-[#1F4E79]" />

      {/* Recipient (left) + Date (right) */}
      <div className="flex items-start justify-between gap-8">
        <div>
          <p className="font-bold">{recipient.recipientName || "Hiring Manager"}</p>
          {recipient.companyName && <p>{recipient.companyName}</p>}
          {recipient.companyLocation && <p>{recipient.companyLocation}</p>}
        </div>

        <p className="shrink-0 text-right">{recipient.date}</p>
      </div>

      {/* Subject */}
      {recipient.subject && (
        <p className="mt-4 font-bold">Subject: {recipient.subject}</p>
      )}

      {/* Greeting */}
      <p className="mt-4">{recipient.greeting}</p>

      {/* Body */}
      <div className="mt-3 space-y-3 text-justify">
        {body.opening && <p>{body.opening}</p>}

        {body.paragraphs.map(
          (paragraph, index) =>
            paragraph.trim() && <p key={index}>{paragraph}</p>,
        )}

        {body.closing && <p>{body.closing}</p>}
      </div>

      {/* Signature */}
      <div className="mt-6">
        <p>{closing.signOff}</p>
        <p className="mt-6 font-bold">{closing.fullName}</p>
      </div>
    </div>
  );
}
