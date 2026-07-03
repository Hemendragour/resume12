import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { usePublicResume } from "../features/resume/share/usePublicResume";

import { useResumeStore } from "../store/resume.store";

import TemplateRenderer from "../features/resume/preview/templates/TemplateRenderer";

export default function PublicResumePage() {
  const { shareId = "" } = useParams();

  const { loading, resume } = usePublicResume(shareId);

  const setResume = useResumeStore((state) => state.setResume);

  useEffect(() => {
    if (resume) {
      setResume(resume);
    }
  }, [resume]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="flex h-screen items-center justify-center">
        Resume not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Public Resume</h1>

          <p className="text-slate-500">Shared using Throne8 Resume Builder</p>
        </div>
      </div>

      <div className="mx-auto w-[850px] bg-white shadow-2xl">
        <TemplateRenderer />
      </div>
      <div className="border-t p-6 text-center text-sm text-slate-500">
        Powered by
        <span className="font-semibold">Throne8</span>
      </div>
    </div>
  );
}
