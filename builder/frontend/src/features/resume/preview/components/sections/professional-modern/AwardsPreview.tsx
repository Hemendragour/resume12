import { Trophy } from "lucide-react";

import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../../shared/professional-modern/SectionHeader";

export default function AwardsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const awards = resume.awards ?? [];

  if (awards.length === 0) return null;

  return (
    <section>
      <SectionHeader title="Awards" icon={<Trophy size={16} />} />

      <ul className="mt-3 list-disc list-inside">
        {awards.map((award, index) => (
          <li key={index}>{award}</li>
        ))}
      </ul>
    </section>
  );
}