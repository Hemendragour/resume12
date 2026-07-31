import { useState } from "react";
import type { KeyboardEvent } from "react";
import { Award, X } from "lucide-react";

import { useResumeStore } from "../../../../store/resume.store";
import Input from "../../../../components/ui/Input";

export default function CertificationsSection() {
  const resume = useResumeStore((state) => state.resume);

  const certifications = useResumeStore(
    (state) => state.resume?.certifications ?? []
  );

  const addCertification = useResumeStore(
    (state) => state.addCertification
  );

  const removeCertification = useResumeStore(
    (state) => state.removeCertification
  );

  const renameSectionDisplayTitle = useResumeStore(
    (state) => state.renameSectionDisplayTitle
  );

  const certificationsSection = resume?.sections.find(
    (section) => section.id === "certifications"
  );

  const [value, setValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const certification = value.trim();

    if (!certification) return;

    addCertification(certification);

    setValue("");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Certifications</h2>

        <p className="mt-1 text-gray-500">
          Press Enter to add a certification.
        </p>
      </div>

      {/* Resume Heading */}
      <Input
        label="Resume Heading"
        placeholder="Certifications"
        value={certificationsSection?.displayTitle ?? ""}
        onChange={(e) =>
          renameSectionDisplayTitle(
            "certifications",
            e.target.value
          )
        }
      />

      {/* Certification Input */}
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="AWS Certified Cloud Practitioner"
        className="h-12 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-600"
      />

      {/* Certification List */}
      <div className="flex flex-wrap gap-3">
        {certifications.map((certification) => (
          <button
            key={certification}
            type="button"
            onClick={() => removeCertification(certification)}
            className="flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-yellow-700 transition hover:bg-yellow-200"
          >
            <Award size={16} />
            <span>{certification}</span>
            <X size={16} />
          </button>
        ))}
      </div>
    </div>
  );
}