import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import { useResumeStore } from "../../../../store/resume.store";
import Button from "../../../../components/ui/Button";
import ExperienceForm from "../components/ExperienceForm";
import Input from "../../../../components/ui/Input";

export default function ExperienceSection() {
  const resume = useResumeStore((state) => state.resume);
  const renameSectionDisplayTitle = useResumeStore(
    (state) => state.renameSectionDisplayTitle,
  );

  const experienceSection = resume?.sections.find(
    (section) => section.id === "experience",
  );

  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const deleteExperience = useResumeStore((state) => state.deleteExperience);

  return (
    <div className="space-y-6">
      <Input
        label="Resume Heading"
        placeholder="Work Experience"
        value={experienceSection?.displayTitle ?? ""}
        onChange={(e) =>
          renameSectionDisplayTitle("experience", e.target.value)
        }
      />
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Work Experience</h3>

          <p className="text-sm text-slate-500">
            Add your professional experience.
          </p>
        </div>

        <Button leftIcon={<Plus size={18} />} onClick={() => setShowForm(true)}>
          Add Experience
        </Button>
      </div>

      {resume?.experience.length === 0 && (
        <div className="rounded-xl border-2 border-dashed p-12 text-center">
          <h4 className="text-lg font-semibold">No Experience Added</h4>

          <p className="mt-2 text-slate-500">
            Click "Add Experience" to add your first job.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {resume?.experience.map((item, index) => (
          <div key={index} className="rounded-xl border bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-lg font-semibold">{item.position}</h4>

                <p className="text-slate-600">{item.company}</p>

                <p className="mt-2 text-sm text-slate-500">
                  {item.startDate} -{" "}
                  {item.currentlyWorking ? "Present" : item.endDate}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={<Pencil size={16} />}
                  onClick={() => {
                    setEditingIndex(index);
                    setShowForm(true);
                  }}
                >
                  Edit
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  leftIcon={<Trash2 size={16} />}
                  onClick={() => deleteExperience(index)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <ExperienceForm
          onClose={() => {
            setShowForm(false);
            setEditingIndex(null);
          }}
          editIndex={editingIndex ?? undefined}
          initialData={
            editingIndex !== null ? resume?.experience[editingIndex] : undefined
          }
        />
      )}
    </div>
  );
}
