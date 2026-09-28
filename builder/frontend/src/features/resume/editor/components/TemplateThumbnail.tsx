import type { Resume } from "../../types/resume.types";

interface Props {
  templateId: Resume["templateId"];
}

export default function TemplateThumbnail({ templateId }: Props) {
  return (
    <div className="flex h-56 items-center justify-center bg-navbar-hover">
      <div className="h-44 w-32 overflow-hidden rounded bg-popup shadow-lg">
        {(templateId === "technical-developer" ||
          templateId === "technical-classic") && (
          <>
            <div className="h-8 bg-btn" />

            <div className="space-y-2 p-2">
              <div className="h-2 w-20 rounded bg-btn/20" />
              <div className="h-2 w-full rounded bg-btn-hover-bg" />
              <div className="h-2 w-full rounded bg-btn-hover-bg" />
              <div className="mt-4 h-2 w-16 rounded bg-btn/20" />
              <div className="h-2 w-full rounded bg-btn-hover-bg" />
            </div>
          </>
        )}

        {templateId === "modern-professional" && (
          <div className="flex h-full">
            <div className="w-6 bg-btn" />

            <div className="flex-1 p-2">
              <div className="h-2 w-16 rounded bg-btn/20" />

              <div className="mt-3 space-y-2">
                <div className="h-2 rounded bg-btn-hover-bg" />
                <div className="h-2 rounded bg-btn-hover-bg" />
                <div className="h-2 rounded bg-btn-hover-bg" />
              </div>
            </div>
          </div>
        )}

        {templateId === "minimal-clean" && (
          <div className="p-2">
            <div className="mx-auto h-2 w-16 rounded bg-btn" />

            <div className="mt-4 space-y-2">
              <div className="h-px bg-btn" />
              <div className="h-2 rounded bg-btn-hover-bg" />
              <div className="h-2 rounded bg-btn-hover-bg" />
              <div className="h-px bg-btn" />
              <div className="h-2 rounded bg-btn-hover-bg" />
            </div>
          </div>
        )}

        {templateId === "executive" && (
          <>
            <div className="h-6 bg-btn" />

            <div className="p-2">
              <div className="h-2 w-20 rounded bg-btn/20" />

              <div className="mt-4 border-l-2 border-border pl-2">
                <div className="h-2 rounded bg-btn-hover-bg" />
                <div className="mt-2 h-2 rounded bg-btn-hover-bg" />
              </div>
            </div>
          </>
        )}

        {templateId === "student" && (
          <div className="p-2">
            <div className="h-12 rounded-full bg-btn-hover-bg" />

            <div className="mt-3 h-2 rounded bg-btn/20" />

            <div className="mt-3 space-y-2">
              <div className="h-2 rounded bg-btn-hover-bg" />
              <div className="h-2 rounded bg-btn-hover-bg" />
              <div className="h-2 rounded bg-btn-hover-bg" />
            </div>
          </div>
        )}

        {templateId === "ats" && (
          <div className="p-3">
            <div className="h-2 w-20 rounded bg-green-600" />

            <div className="mt-3 space-y-2">
              <div className="h-2 rounded bg-btn-hover-bg" />
              <div className="h-2 rounded bg-btn-hover-bg" />
              <div className="h-2 rounded bg-btn-hover-bg" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
