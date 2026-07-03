import { useState } from "react";
import { GraduationCap, Pencil, Plus, Trash2 } from "lucide-react";

import Button from "../../../../components/ui/Button";
import EducationForm from "../components/EducationForm";

import { useResumeStore } from "../../../../store/resume.store";

export default function EducationSection() {
  const resume = useResumeStore((state) => state.resume);

  const deleteEducation = useResumeStore((state) => state.deleteEducation);

  const [showForm, setShowForm] = useState(false);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Education</h2>

          <p className="text-gray-500">Add your education history.</p>
        </div>

        <Button
          leftIcon={<Plus size={18} />}
          onClick={() => {
            setEditingIndex(null);
            setShowForm(true);
          }}
        >
          Add Education
        </Button>
      </div>

      {resume?.education.length === 0 && (
        <div className="rounded-xl border-2 border-dashed p-12 text-center">
          <GraduationCap className="mx-auto mb-4" size={40} />

          <h3 className="text-xl font-semibold">No Education Added</h3>

          <p className="mt-2 text-gray-500">Add your first education.</p>
        </div>
      )}

      <div className="space-y-4">
        {resume?.education.map((item, index) => (
          <div key={index} className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold">{item.degree}</h3>

                <p className="font-medium text-blue-600">{item.institution}</p>

                <p className="text-gray-600">{item.fieldOfStudy}</p>

                <p className="mt-2 text-sm text-gray-500">
                  {item.startYear} - {item.endYear}
                </p>

                {item.cgpa && (
                  <p className="mt-2 text-sm">CGPA : {item.cgpa}</p>
                )}
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
                  onClick={() => deleteEducation(index)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <EducationForm
          onClose={() => {
            setShowForm(false);
            setEditingIndex(null);
          }}
          editIndex={editingIndex ?? undefined}
          initialData={
            editingIndex !== null ? resume?.education[editingIndex] : undefined
          }
        />
      )}
    </div>
  );
}
