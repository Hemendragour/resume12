import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Sparkles, X } from "lucide-react";

import Button from "../../../../components/ui/Button";
import type { QuickGenerateFormData } from "../../../ai/services/generate-general-resume.service";

// interface Props {
//   onGenerate: (data: QuickGenerateFormData) => void;
//   onCancel: () => void;
// }

interface Props {
  onGenerate: (data: QuickGenerateFormData) => void;
  onCancel: () => void;
  initialData?: QuickGenerateFormData;
}

const inputClass =
  "mt-1.5 h-11 w-full rounded-lg border border-primary/15 bg-card px-4 text-dark outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

const textAreaClass =
  "mt-1.5 w-full rounded-lg border border-primary/15 bg-card px-4 py-3 text-dark outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

const labelClass = "text-sm font-medium text-dark";

function RemoveRowButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 top-3 text-dark/40 hover:text-danger"
    >
      <X size={16} />
    </button>
  );
}

function SectionHeader({
  title,
  optional,
  onAdd,
  addLabel,
}: {
  title: string;
  optional?: boolean;
  onAdd: () => void;
  addLabel: string;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h3 className="text-lg font-semibold text-dark">
        {title}{" "}
        {optional && (
          <span className="text-sm font-normal text-dark/50">(optional)</span>
        )}
      </h3>
      <Button
        type="button"
        variant="outline"
        size="sm"
        leftIcon={<Plus size={16} />}
        onClick={onAdd}
      >
        {addLabel}
      </Button>
    </div>
  );
}

export default function QuickGenerateForm({
  onGenerate,
  onCancel,
  initialData,
}: Props) {
  const { register, control, handleSubmit } = useForm<QuickGenerateFormData>({
    defaultValues: initialData ?? {
      jobDescription: "",
      summary: "",
      personalInfo: {
        fullName: "",
        title: "",
        email: "",
        phone: "",
        address: "",
        linkedIn: "",
        github: "",
        portfolio: "",
      },
      skills: [{ title: "", skillsText: "" }],
      experience: [],
      internships: [],
      education: [{ institution: "", degree: "" }],
      projects: [{ title: "", technologies: "", descriptionText: "" }],
      languages: [],
      certifications: "",
      achievements: "",
    },
  });

  const skills = useFieldArray({ control, name: "skills" });
  const experience = useFieldArray({ control, name: "experience" });
  const internships = useFieldArray({ control, name: "internships" });
  const education = useFieldArray({ control, name: "education" });
  const projects = useFieldArray({ control, name: "projects" });
  const languages = useFieldArray({ control, name: "languages" });

  const onSubmit = (data: QuickGenerateFormData) => onGenerate(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-5xl space-y-8 rounded-2xl border border-primary/10 bg-modal p-8"
    >
      <div>
        <h2 className="text-2xl font-bold text-dark">
          Generate Resume in 2 Minutes
        </h2>
        <p className="mt-1 text-dark/60">
          Drop in your details below and AI will turn them into a polished,
          ATS-friendly resume. Don't worry about grammar or formatting.
        </p>
      </div>

      {/* JOB DESCRIPTION */}
      <section>
        <label className={labelClass}>
          Job Description{" "}
          <span className="font-normal text-dark/50">
            (optional — tailors the resume to this role)
          </span>
        </label>
        <textarea
          {...register("jobDescription")}
          rows={4}
          placeholder="Paste the job description you're applying for..."
          className={textAreaClass}
        />
      </section>

      {/* PERSONAL INFO */}
      <section>
        <h3 className="mb-3 text-lg font-semibold text-dark">Personal Info</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input
              {...register("personalInfo.fullName", { required: true })}
              className={inputClass}
              placeholder="Rahul Verma"
            />
          </div>
          <div>
            <label className={labelClass}>Email *</label>
            <input
              {...register("personalInfo.email", { required: true })}
              type="email"
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className={labelClass}>Target Title</label>
            <input
              {...register("personalInfo.title")}
              className={inputClass}
              placeholder="Software Developer"
            />
          </div>
          <div>
            <label className={labelClass}>Phone *</label>
            <input {...register("personalInfo.phone")} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Address</label>
            <input
              {...register("personalInfo.address")}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>LinkedIn</label>
            <input
              {...register("personalInfo.linkedIn")}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>GitHub</label>
            <input
              {...register("personalInfo.github")}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Portfolio</label>
            <input
              {...register("personalInfo.portfolio")}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* SUMMARY */}
      <section>
        <label className={labelClass}>
          Summary{" "}
          <span className="font-normal text-dark/50">
            (optional — a few rough lines is enough, AI will polish it)
          </span>
        </label>
        <textarea
          {...register("summary")}
          rows={2}
          className={textAreaClass}
          placeholder="Software developer with experience in building web applications..."
        />
      </section>

      {/* SKILLS */}
      <section>
        <SectionHeader
          title="Skills"
          onAdd={() => skills.append({ title: "", skillsText: "" })}
          addLabel="Add Category"
        />
        <div className="space-y-4">
          {skills.fields.map((field, index) => (
            <div
              key={field.id}
              className="relative grid grid-cols-[200px_1fr] items-end gap-3 rounded-xl border border-primary/10 bg-card p-4"
            >
              {skills.fields.length > 1 && (
                <RemoveRowButton onClick={() => skills.remove(index)} />
              )}
              <div>
                <label className={labelClass}>Category</label>
                <input
                  {...register(`skills.${index}.title`)}
                  className={inputClass}
                  placeholder="e.g. Web"
                />
              </div>
              <div>
                <label className={labelClass}>Skills</label>
                <input
                  {...register(`skills.${index}.skillsText`)}
                  className={inputClass}
                  placeholder="React, Node.js, MongoDB (comma-separated)"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section>
        <SectionHeader
          title="Projects"
          onAdd={() =>
            projects.append({
              title: "",
              technologies: "",
              descriptionText: "",
            })
          }
          addLabel="Add Project"
        />
        <div className="space-y-4">
          {projects.fields.map((field, index) => (
            <div
              key={field.id}
              className="relative space-y-3 rounded-xl border border-primary/10 bg-card p-4"
            >
              {projects.fields.length > 1 && (
                <RemoveRowButton onClick={() => projects.remove(index)} />
              )}
              <input
                {...register(`projects.${index}.title`)}
                className={inputClass}
                placeholder="Project title"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  {...register(`projects.${index}.role`)}
                  className={inputClass}
                  placeholder="Your role (optional)"
                />
                <input
                  {...register(`projects.${index}.technologies`)}
                  className={inputClass}
                  placeholder="Technologies (comma-separated)"
                />
              </div>
              <textarea
                {...register(`projects.${index}.descriptionText`)}
                rows={3}
                className={textAreaClass}
                placeholder="What did you build, and what impact did it have? One point per line."
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  {...register(`projects.${index}.github`)}
                  className={inputClass}
                  placeholder="GitHub link"
                />
                <input
                  {...register(`projects.${index}.link`)}
                  className={inputClass}
                  placeholder="Live link"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section>
        <SectionHeader
          title="Experience"
          optional
          onAdd={() => experience.append({ company: "", position: "" })}
          addLabel="Add Experience"
        />
        <div className="space-y-4">
          {experience.fields.map((field, index) => (
            <div
              key={field.id}
              className="relative space-y-3 rounded-xl border border-primary/10 bg-card p-4"
            >
              <RemoveRowButton onClick={() => experience.remove(index)} />
              <div className="grid grid-cols-2 gap-3">
                <input
                  {...register(`experience.${index}.company`)}
                  className={inputClass}
                  placeholder="Company"
                />
                <input
                  {...register(`experience.${index}.position`)}
                  className={inputClass}
                  placeholder="Position"
                />
                <input
                  {...register(`experience.${index}.startDate`)}
                  className={inputClass}
                  placeholder="Start date"
                />
                <input
                  {...register(`experience.${index}.endDate`)}
                  className={inputClass}
                  placeholder="End date"
                />
                <input
                  {...register(`experience.${index}.location`)}
                  className={inputClass}
                  placeholder="Location"
                />
                <label className="flex items-center gap-2 text-sm text-dark">
                  <input
                    type="checkbox"
                    {...register(`experience.${index}.currentlyWorking`)}
                  />
                  Currently working here
                </label>
              </div>
              <textarea
                {...register(`experience.${index}.responsibilitiesText`)}
                rows={3}
                className={textAreaClass}
                placeholder="Responsibilities — one per line."
              />
              <textarea
                {...register(`experience.${index}.achievementsText`)}
                rows={2}
                className={textAreaClass}
                placeholder="Achievements — one per line (optional)."
              />
            </div>
          ))}
        </div>
      </section>

      {/* INTERNSHIPS */}
      <section>
        <SectionHeader
          title="Internships"
          optional
          onAdd={() => internships.append({ company: "", role: "" })}
          addLabel="Add Internship"
        />
        <div className="space-y-4">
          {internships.fields.map((field, index) => (
            <div
              key={field.id}
              className="relative space-y-3 rounded-xl border border-primary/10 bg-card p-4"
            >
              <RemoveRowButton onClick={() => internships.remove(index)} />
              <div className="grid grid-cols-2 gap-3">
                <input
                  {...register(`internships.${index}.company`)}
                  className={inputClass}
                  placeholder="Company"
                />
                <input
                  {...register(`internships.${index}.role`)}
                  className={inputClass}
                  placeholder="Role"
                />
                <input
                  {...register(`internships.${index}.startDate`)}
                  className={inputClass}
                  placeholder="Start date"
                />
                <input
                  {...register(`internships.${index}.endDate`)}
                  className={inputClass}
                  placeholder="End date"
                />
              </div>
              <textarea
                {...register(`internships.${index}.responsibilitiesText`)}
                rows={3}
                className={textAreaClass}
                placeholder="Responsibilities — one per line."
              />
              <textarea
                {...register(`internships.${index}.achievementsText`)}
                rows={2}
                className={textAreaClass}
                placeholder="Achievements — one per line (optional)."
              />
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section>
        <SectionHeader
          title="Education"
          onAdd={() => education.append({ institution: "", degree: "" })}
          addLabel="Add Education"
        />
        <div className="space-y-4">
          {education.fields.map((field, index) => (
            <div
              key={field.id}
              className="relative grid grid-cols-2 gap-3 rounded-xl border border-primary/10 bg-card p-4"
            >
              {education.fields.length > 1 && (
                <RemoveRowButton onClick={() => education.remove(index)} />
              )}
              <input
                {...register(`education.${index}.institution`)}
                className={inputClass}
                placeholder="Institution"
              />
              <input
                {...register(`education.${index}.degree`)}
                className={inputClass}
                placeholder="Degree"
              />
              <input
                {...register(`education.${index}.fieldOfStudy`)}
                className={inputClass}
                placeholder="Field of study"
              />
              <input
                {...register(`education.${index}.cgpa`)}
                className={inputClass}
                placeholder="CGPA / grade"
              />
              <input
                {...register(`education.${index}.startYear`)}
                className={inputClass}
                placeholder="Start year"
              />
              <input
                {...register(`education.${index}.endYear`)}
                className={inputClass}
                placeholder="End year"
              />
            </div>
          ))}
        </div>
      </section>

      {/* LANGUAGES */}
      <section>
        <SectionHeader
          title="Languages"
          optional
          onAdd={() => languages.append({ name: "", level: "" })}
          addLabel="Add Language"
        />
        <div className="space-y-3">
          {languages.fields.map((field, index) => (
            <div key={field.id} className="relative flex gap-3">
              <input
                {...register(`languages.${index}.name`)}
                className={inputClass}
                placeholder="Language e.g. English"
              />
              <input
                {...register(`languages.${index}.level`)}
                className={inputClass}
                placeholder="Level e.g. Fluent"
              />
              <button
                type="button"
                onClick={() => languages.remove(index)}
                className="shrink-0 text-dark/40 hover:text-danger"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS + CERTIFICATIONS */}
      <div className="grid grid-cols-2 gap-4">
        <section>
          <label className={labelClass}>Achievements</label>
          <textarea
            {...register("achievements")}
            rows={4}
            className={textAreaClass}
            placeholder="One achievement per line"
          />
        </section>
        <section>
          <label className={labelClass}>Certifications</label>
          <textarea
            {...register("certifications")}
            rows={4}
            className={textAreaClass}
            placeholder="One certification per line"
          />
        </section>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3 border-t border-primary/10 pt-6">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" leftIcon={<Sparkles size={18} />}>
          Generate Resume
        </Button>
      </div>
    </form>
  );
}
