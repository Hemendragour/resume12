import { useState } from "react";

import DuplicateResumeModal from "../../resume/components/DuplicateResumeModal";
import type { Resume } from "../hooks/useResumes";

interface Props {
  resume: Resume;
}

export default function ResumeCard({ resume }: Props) {
  const [duplicateOpen, setDuplicateOpen] = useState(false);

  return (
    <div className="bg-card rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold text-dark">{resume.title}</h2>

      <p className="text-primary/70 mt-2">Template : {resume.templateId}</p>

      <p className="text-primary/70">Version : {resume.version}</p>

      <div className="mt-5 flex gap-3">
        <button className="bg-primary text-background px-4 py-2 rounded">
          Edit
        </button>

        <button
          type="button"
          className="bg-warning text-background px-4 py-2 rounded"
          onClick={() => setDuplicateOpen(true)}
        >
          Duplicate
        </button>

        <button className="bg-danger text-background px-4 py-2 rounded">
          Delete
        </button>
      </div>

      <DuplicateResumeModal
        open={duplicateOpen}
        onClose={() => setDuplicateOpen(false)}
        resumeId={resume._id}
        currentTemplateId={resume.templateId}
      />
    </div>
  );
}
