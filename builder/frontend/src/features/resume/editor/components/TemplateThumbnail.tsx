import type { Resume } from "../../types/resume.types";

interface Props {
  templateId: Resume["templateId"];
}

export default function TemplateThumbnail({ templateId }: Props) {
  return (
    <div className="flex h-56 items-center justify-center bg-background">
      <div className="h-44 w-32 overflow-hidden rounded bg-modal shadow-lg">
        {(templateId === "technical-developer" ||
          templateId === "technical-classic") && (
          <>
            <div className="h-8 bg-primary" />

            <div className="space-y-2 p-2">
              <div className="h-2 w-20 rounded bg-primary/20" />
              <div className="h-2 w-full rounded bg-primary/10" />
              <div className="h-2 w-full rounded bg-primary/10" />
              <div className="mt-4 h-2 w-16 rounded bg-primary/20" />
              <div className="h-2 w-full rounded bg-primary/10" />
            </div>
          </>
        )}

        {templateId === "modern-professional" && (
          <div className="flex h-full">
            <div className="w-6 bg-dark" />

            <div className="flex-1 p-2">
              <div className="h-2 w-16 rounded bg-primary/20" />

              <div className="mt-3 space-y-2">
                <div className="h-2 rounded bg-primary/10" />
                <div className="h-2 rounded bg-primary/10" />
                <div className="h-2 rounded bg-primary/10" />
              </div>
            </div>
          </div>
        )}

        {templateId === "minimal-clean" && (
          <div className="p-2">
            <div className="mx-auto h-2 w-16 rounded bg-dark" />

            <div className="mt-4 space-y-2">
              <div className="h-px bg-dark" />
              <div className="h-2 rounded bg-primary/10" />
              <div className="h-2 rounded bg-primary/10" />
              <div className="h-px bg-dark" />
              <div className="h-2 rounded bg-primary/10" />
            </div>
          </div>
        )}

        {templateId === "executive" && (
          <>
            <div className="h-6 bg-dark" />

            <div className="p-2">
              <div className="h-2 w-20 rounded bg-primary/20" />

              <div className="mt-4 border-l-2 border-primary/40 pl-2">
                <div className="h-2 rounded bg-primary/10" />
                <div className="mt-2 h-2 rounded bg-primary/10" />
              </div>
            </div>
          </>
        )}

        {templateId === "student" && (
          <div className="p-2">
            <div className="h-12 rounded-full bg-accent/25" />

            <div className="mt-3 h-2 rounded bg-primary/20" />

            <div className="mt-3 space-y-2">
              <div className="h-2 rounded bg-primary/10" />
              <div className="h-2 rounded bg-primary/10" />
              <div className="h-2 rounded bg-primary/10" />
            </div>
          </div>
        )}

        {templateId === "ats" && (
          <div className="p-3">
            <div className="h-2 w-20 rounded bg-success" />

            <div className="mt-3 space-y-2">
              <div className="h-2 rounded bg-primary/10" />
              <div className="h-2 rounded bg-primary/10" />
              <div className="h-2 rounded bg-primary/10" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
