import { Heart } from "lucide-react";

import { useResumeStore } from "../../../../../../store/resume.store";

import SectionHeader from "../../shared/professional-modern/SectionHeader";

import { ProfessionalModernTheme as T } from "../../theme.professional-modern";

export default function InterestsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const interests = resume.interests ?? [];

  if (interests.length === 0) return null;

  return (
    <section className={T.spacing.section}>
      <SectionHeader title="Interests" icon={<Heart size={16} />} />

      <p className={`mt-3 ${T.fontSize.body} ${T.colors.body}`}>
        {interests.join(", ")}
      </p>
    </section>
  );
}