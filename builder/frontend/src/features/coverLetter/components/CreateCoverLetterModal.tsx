import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Briefcase, FileText } from "lucide-react";

import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

import { createCoverLetter } from "../services/coverLetter.service";
import type { CoverLetterTemplate } from "../types/coverLetter.types";
import { CoverLetterTemplates } from "../types/coverLetter.types";

interface Props {
  open: boolean;
  onClose: () => void;
  templateId?: CoverLetterTemplate;
}

interface CreateCoverLetterForm {
  title: string;
  targetRole: string;
}

export default function CreateCoverLetterModal({
  open,
  onClose,
  templateId = CoverLetterTemplates.CLASSIC_FORMAL,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCoverLetterForm>();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: CreateCoverLetterForm) => {
    try {
      setLoading(true);

      const coverLetter = await createCoverLetter({ ...data, templateId });

      onClose();
      navigate(`/cover-letter/${coverLetter._id}/edit`);
    } catch (error) {
      console.error(error);
      alert("Failed to create cover letter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create New Cover Letter"
      description="Give your cover letter a name to get started."
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Cover Letter Name"
          required
          placeholder="Nexora Full Stack Cover Letter"
          leftIcon={<FileText size={18} />}
          error={errors.title?.message}
          {...register("title", {
            required: "Cover letter name is required",
          })}
        />

        <Input
          label="Target Role"
          required
          placeholder="Full Stack Developer"
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
            {loading ? "Creating..." : "Create Cover Letter"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
