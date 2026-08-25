import { Sparkles } from "lucide-react";

export default function GenerateResumeLoader() {
  return (
    <div className="flex h-full min-h-100 flex-col items-center justify-center gap-4 text-center">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/40" />
        <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-primary">
          <Sparkles size={28} />
        </span>
      </div>

      <div>
        <p className="text-lg font-semibold text-dark">
          Generating your resume...
        </p>
        <p className="mt-1 text-sm text-dark/60">
          This usually takes a few seconds.
        </p>
      </div>
    </div>
  );
}
