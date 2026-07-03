import type { Resume } from "../../types/resume.types";

interface Props {
  templateId: Resume["templateId"];
}

export default function TemplateThumbnail({ templateId }: Props) {
  return (
    <div className="flex h-56 items-center justify-center bg-slate-100">
      <div
        className={`overflow-hidden rounded bg-white shadow-lg transition
        ${
          templateId === "modern"
            ? "h-44 w-32"
            : templateId === "executive"
              ? "h-44 w-32"
              : templateId === "minimal"
                ? "h-44 w-32"
                : templateId === "student"
                  ? "h-44 w-32"
                  : "h-44 w-32"
        }`}
      >
        {templateId === "technical" && (
          <>
            <div className="h-8 bg-blue-600" />

            <div className="space-y-2 p-2">
              <div className="h-2 w-20 rounded bg-gray-300" />
              <div className="h-2 w-full rounded bg-gray-200" />
              <div className="h-2 w-full rounded bg-gray-200" />
              <div className="mt-4 h-2 w-16 rounded bg-gray-300" />
              <div className="h-2 w-full rounded bg-gray-200" />
            </div>
          </>
        )}

        {templateId === "modern" && (
          <div className="flex h-full">
            <div className="w-6 bg-slate-800" />

            <div className="flex-1 p-2">
              <div className="h-2 w-16 rounded bg-gray-300" />

              <div className="mt-3 space-y-2">
                <div className="h-2 rounded bg-gray-200" />

                <div className="h-2 rounded bg-gray-200" />

                <div className="h-2 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        )}

        {templateId === "minimal" && (
          <div className="p-2">
            <div className="mx-auto h-2 w-16 rounded bg-black" />

            <div className="mt-4 space-y-2">
              <div className="h-[1px] bg-black" />

              <div className="h-2 rounded bg-gray-200" />

              <div className="h-2 rounded bg-gray-200" />

              <div className="h-[1px] bg-black" />

              <div className="h-2 rounded bg-gray-200" />
            </div>
          </div>
        )}

        {templateId === "executive" && (
          <>
            <div className="h-6 bg-slate-900" />

            <div className="p-2">
              <div className="h-2 w-20 rounded bg-gray-300" />

              <div className="mt-4 border-l-2 border-slate-700 pl-2">
                <div className="h-2 rounded bg-gray-200" />

                <div className="mt-2 h-2 rounded bg-gray-200" />
              </div>
            </div>
          </>
        )}

        {templateId === "student" && (
          <div className="p-2">
            <div className="h-12 rounded-full bg-blue-200" />

            <div className="mt-3 h-2 rounded bg-gray-300" />

            <div className="mt-3 space-y-2">
              <div className="h-2 rounded bg-gray-200" />

              <div className="h-2 rounded bg-gray-200" />

              <div className="h-2 rounded bg-gray-200" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
