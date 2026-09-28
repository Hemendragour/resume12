import { Sparkles } from "lucide-react";

export default function GenerateResumeLoader() {
  return (
    <div className="flex h-full min-h-100 flex-col items-center justify-center gap-4 text-center">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-btn-hover-bg" />
        <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-btn-hover-bg text-subheading">
          <Sparkles size={28} />
        </span>
      </div>

      <div>
        <p className="text-lg font-semibold text-heading">
          Generating your resume...
        </p>
        <p className="mt-1 text-sm text-heading/60">
          This usually takes a few seconds.
        </p>
      </div>
    </div>
  );
}
