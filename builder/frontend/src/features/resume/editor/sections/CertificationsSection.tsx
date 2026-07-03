import { useState } from "react";
import type { KeyboardEvent } from "react";
import { Award, X } from "lucide-react";

import { useResumeStore } from "../../../../store/resume.store";

export default function CertificationsSection() {
  const certifications = useResumeStore(
    (state) => state.resume?.certifications ?? [],
  );

  const addCertification = useResumeStore((state) => state.addCertification);

  const removeCertification = useResumeStore(
    (state) => state.removeCertification,
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
      <div>
        <h2 className="text-2xl font-bold">Certifications</h2>

        <p className="text-gray-500">Press Enter to add a certification.</p>
      </div>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="AWS Certified Cloud Practitioner"
        className="h-12 w-full rounded-xl border px-4"
      />

      <div className="flex flex-wrap gap-3">
        {certifications.map((certification) => (
          <button
            key={certification}
            type="button"
            onClick={() => removeCertification(certification)}
            className="flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-yellow-700"
          >
            <Award size={16} />
            {certification}
            <X size={16} />
          </button>
        ))}
      </div>
    </div>
  );
}
