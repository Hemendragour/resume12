import { Fragment } from "react";

import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../shared/SectionHeader";
import { LatexATSV2Theme as T } from "../theme.latex-ats-v2";

export default function LanguagesPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const languages = resume.languages ?? [];

  if (!languages.length) return null;

  const section = resume.sections.find(
    (section) => section.type === "languages",
  );

  return (
    <section className={T.spacing.section}>
      <SectionHeader
        title={
          section?.displayTitle?.trim()
            ? section.displayTitle
            : section?.title || "Languages"
        }
      />

      <div
        className={`
          ${T.spacing.itemHeader}
          grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1
        `}
      >
        {languages.map((language, index) => (
          <Fragment key={index}>
            <span
              className={`
                ${T.fontWeight.bold}
                ${T.fontSize.body}
                ${T.colors.body}
              `}
            >
              {language.name}
            </span>

            <span className={`${T.fontSize.body} ${T.colors.body}`}>
              {language.level}
            </span>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
