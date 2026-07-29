import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Briefcase, FileText } from "lucide-react";

import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

import { createResume } from "../services/resume.service";
import type { ResumeTemplate } from "../types/resume.types";

interface Props {
  open: boolean;
  onClose: () => void;
  templateId?: ResumeTemplate;
}

interface CreateResumeForm {
  title: string;
  targetRole: string;
}

export default function CreateResumeModal({ open, onClose, templateId = "technical-classic" }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateResumeForm>();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: CreateResumeForm) => {
    try {
      setLoading(true);

      const resume = await createResume({ ...data, templateId });

      onClose();
      navigate(`/resume/${resume._id}/edit`);
    } catch (error) {
      console.error(error);
      alert("Failed to create resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create New Resume"
      description="Give your resume a name to get started."
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Resume Name"
          required
          placeholder="Google Frontend Resume"
          leftIcon={<FileText size={18} />}
          error={errors.title?.message}
          {...register("title", {
            required: "Resume name is required",
          })}
        />

        <Input
          label="Target Role"
          required
          placeholder="Frontend Developer"
          leftIcon={<Briefcase size={18} />}
          error={errors.targetRole?.message}
          {...register("targetRole", {
            required: "Target role is required",
          })}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Resume"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}