import type { Resume } from "../types/resume.types";

interface Props {
  resume: Resume;
}

export default function TechnicalThumbnail({
  resume,
}: Props) {
  const { personalInfo } = resume;

  return (
    <div className="h-44 w-32 overflow-hidden rounded bg-white shadow">

      {/* Header */}

      <div className="bg-blue-600 p-2 text-center text-white">

        <h2 className="truncate text-[8px] font-bold uppercase">
          {personalInfo.fullName || "YOUR NAME"}
        </h2>

        <p className="truncate text-[6px]">
          {personalInfo.title || "Developer"}
        </p>

      </div>

      <div className="space-y-2 p-2">

        <div className="h-[2px] rounded bg-slate-300" />

        <div className="space-y-1">

          <div className="h-[2px] rounded bg-slate-200" />

          <div className="h-[2px] rounded bg-slate-200" />

          <div className="h-[2px] rounded bg-slate-200" />

        </div>

        <div className="mt-3 h-[2px] rounded bg-slate-300" />

        <div className="mt-2 flex flex-wrap gap-1">

          {resume.skills
            .slice(0, 4)
            .map((skill) => (
              <div
                key={skill}
                className="rounded border px-1 text-[5px]"
              >
                {skill}
              </div>
            ))}

        </div>

      </div>

    </div>
  );
}