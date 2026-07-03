import { useForm } from "react-hook-form";

import Button from "../../../../components/ui/Button";

import { useResumeStore } from "../../../../store/resume.store";

import type { Resume } from "../../types/resume.types";

interface Props {
  onClose: () => void;
  editIndex?: number;
  initialData?: Resume["education"][number];
}

type EducationFormData = Resume["education"][number];

export default function EducationForm({
  onClose,
  editIndex,
  initialData,
}: Props) {
  const addEducation = useResumeStore((state) => state.addEducation);

  const updateEducationItem = useResumeStore(
    (state) => state.updateEducationItem,
  );

  const { register, handleSubmit, reset } = useForm<EducationFormData>({
    defaultValues: initialData ?? {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startYear: new Date().getFullYear(),
      endYear: new Date().getFullYear(),
      cgpa: "",
    },
  });

  const onSubmit = (data: EducationFormData) => {
    if (editIndex !== undefined) {
      updateEducationItem(editIndex, data);
    } else {
      addEducation(data);
    }

    reset();

    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-2xl border bg-white p-8"
    >
      <h2 className="text-2xl font-bold">
        {editIndex !== undefined ? "Edit Education" : "Add Education"}
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <input
          {...register("institution")}
          placeholder="College"
          className="h-12 rounded-lg border px-4"
        />

        <input
          {...register("degree")}
          placeholder="Degree"
          className="h-12 rounded-lg border px-4"
        />

        <input
          {...register("fieldOfStudy")}
          placeholder="Computer Science"
          className="h-12 rounded-lg border px-4"
        />

        <input
          type="number"
          {...register("startYear", {
            valueAsNumber: true,
          })}
          className="h-12 rounded-lg border px-4"
        />

        <input
          type="number"
          {...register("endYear", {
            valueAsNumber: true,
          })}
          className="h-12 rounded-lg border px-4"
        />

        <input
          {...register("cgpa")}
          placeholder="CGPA"
          className="h-12 rounded-lg border px-4"
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>

        <Button type="submit">Save Education</Button>
      </div>
    </form>
  );
}
