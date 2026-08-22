// RenameResumeModal.tsx
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";

interface Props {
  open: boolean;
  initialValue: string;
  loading: boolean;
  onClose: () => void;
  onSave: (title: string) => void;
}

interface FormData {
  title: string;
}

export default function RenameResumeModal({
  open,
  initialValue,
  loading,
  onClose,
  onSave,
}: Props) {
  const { register, handleSubmit, reset } = useForm<FormData>();

  useEffect(() => {
    reset({
      title: initialValue,
    });
  }, [initialValue, reset]);

  const submit = (data: FormData) => {
    onSave(data.title.trim());
  };

  return (
    <Modal open={open} onClose={onClose} title="Rename Resume">
      <form onSubmit={handleSubmit(submit)} className="space-y-6">
        <div>
          <label className="font-medium text-dark">Resume Name</label>

          <input
            {...register("title", {
              required: true,
            })}
            className="mt-2 h-12 w-full rounded-lg border border-primary/15 bg-card px-4 text-dark outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
