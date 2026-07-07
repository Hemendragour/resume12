import { useResumeStore } from "../../../../../store/resume.store";

export default function PersonalInfoPreview() {
  const resume = useResumeStore((state) => state.resume);

  if (!resume) return null;

  const { personalInfo } = resume;

  return (
    <section className="text-center border-b pb-5">
      <h1 className="text-3xl font-bold uppercase">
        {personalInfo.fullName || "Your Name"}
      </h1>

      <p className="text-blue-600 font-medium mt-2">
        {personalInfo.title || "Professional Title"}
      </p>

      <div className="flex flex-wrap justify-center gap-3 mt-4 text-gray-600">
        {personalInfo.email && <span>{personalInfo.email}</span>}
        {personalInfo.phone && <span>{personalInfo.phone}</span>}
        {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
        {personalInfo.github && <span>{personalInfo.github}</span>}
      </div>
    </section>
  );
}
