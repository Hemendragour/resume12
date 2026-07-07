import { useResumeStore } from "../../../../../store/resume.store";

export default function SkillsPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  return (
    <section className="mt-8">
      <h2 className="font-bold text-lg border-b pb-2">SKILLS</h2>

      <div className="flex flex-wrap gap-2 mt-3">
        {resume.skills.length > 0 ? (
          resume.skills.map((skill) => (
            <span key={skill} className="border px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))
        ) : (
          <p className="text-gray-500">No skills added.</p>
        )}
      </div>
    </section>
  );
}
