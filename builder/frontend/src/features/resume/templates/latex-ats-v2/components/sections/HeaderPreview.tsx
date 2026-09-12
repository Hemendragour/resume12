import { useResumeStore } from "../../../../../../store/resume.store";

import { LatexATSV2Theme as T } from "../theme.latex-ats-v2";

export default function HeaderPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const { personalInfo } = resume;

  return (
    <header className="w-full">
      <h1
        className={`
          ${T.fontFamily.heading}
          ${T.fontSize.name}
          ${T.fontWeight.bold}
          ${T.lineHeight.heading}
          ${T.colors.heading}
          [font-variant:small-caps]
        `}
      >
        {personalInfo.fullName}
      </h1>

      <div
        className={`
          ${T.fontFamily.body}
          ${T.fontSize.contact}
          [font-variant-numeric:lining-nums]
          ${T.colors.body}
          mt-2 space-y-1
        `}
      >
        {personalInfo.phone && (
          <p>
            Phone:{" "}
            <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
              {personalInfo.phone}
            </span>
          </p>
        )}

        {personalInfo.email && (
          <p>
            Email:{" "}
            <a
              href={`mailto:${personalInfo.email}`}
              className="underline hover:no-underline break-all"
            >
              {personalInfo.email}
            </a>
          </p>
        )}

        {personalInfo.linkedIn && (
          <p className="break-all">
            LinkedIn:{" "}
            <a
              href={personalInfo.linkedIn}
              target="_blank"
              rel="noreferrer"
              className="underline hover:no-underline"
            >
              {personalInfo.linkedIn}
            </a>
          </p>
        )}

        {personalInfo.github && (
          <p className="break-all">
            Github:{" "}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="underline hover:no-underline"
            >
              {personalInfo.github}
            </a>
          </p>
        )}

        {personalInfo.portfolio && (
          <p className="break-all">
            Portfolio:{" "}
            <a
              href={personalInfo.portfolio}
              target="_blank"
              rel="noreferrer"
              className="underline hover:no-underline"
            >
              {personalInfo.portfolio}
            </a>
          </p>
        )}
      </div>

      <div className={`${T.divider.header} w-full`} />
    </header>
  );
}
