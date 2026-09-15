import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Loader2, UploadCloud } from "lucide-react";

import Modal from "../../../components/ui/Modal";
import { templates } from "../config/templates";
import { useUploadAndParseResume } from "../hooks/useUploadAndParseResume";
import type { ResumeTemplate } from "../types/resume.types";

interface Props {
  open: boolean;
  onClose: () => void;
}

type Step = "template" | "upload";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB, matches backend limit

export default function UploadResumeModal({ open, onClose }: Props) {
  const navigate = useNavigate();
  const uploadMutation = useUploadAndParseResume();

  const [step, setStep] = useState<Step>("template");
  const [selectedTemplateId, setSelectedTemplateId] =
    useState<ResumeTemplate | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setStep("template");
    setSelectedTemplateId(null);
    setSelectedFile(null);
    setError(null);
    setIsDragging(false);
  };

  const handleClose = () => {
    if (uploadMutation.isPending) return;
    resetState();
    onClose();
  };

  const handleSelectTemplate = (templateId: ResumeTemplate) => {
    setSelectedTemplateId(templateId);
    setError(null);
    setStep("upload");
  };

  const validateAndSetFile = (file: File | undefined) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("PDF must be 5MB or smaller.");
      return;
    }

    setError(null);
    setSelectedFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateAndSetFile(e.target.files?.[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    validateAndSetFile(e.dataTransfer.files?.[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedTemplateId) return;

    setError(null);

    try {
      const resume = await uploadMutation.mutateAsync({
        file: selectedFile,
        templateId: selectedTemplateId,
      });

      resetState();
      onClose();
      navigate(`/resume/${resume._id}/edit`);
    } catch (err) {
      console.error(err);
      setError(
        "Failed to parse your resume. Please check the file and try again.",
      );
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Upload Resume"
      description={
        step === "template"
          ? "Choose a template for your uploaded resume."
          : "Upload your existing resume as a PDF. We'll parse it into your chosen template."
      }
      size={step === "template" ? "xl" : "md"}
    >
      {error && (
        <p className="mb-4 rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">
          {error}
        </p>
      )}

      {step === "template" && (
        <div className="grid max-h-[70vh] grid-cols-1 gap-5 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => handleSelectTemplate(template.id)}
              className={`relative text-left border rounded-xl p-5 transition hover:shadow-lg hover:-translate-y-0.5 border-primary/10 ${template.color}`}
            >
              <div className="mb-4 flex justify-center">
                <div className="overflow-hidden rounded-lg bg-white shadow-md">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-auto block"
                  />
                </div>
              </div>
              <h3 className="font-semibold text-lg">{template.name}</h3>
              <span className="inline-block mt-3 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                {template.ats}
              </span>
            </button>
          ))}
        </div>
      )}

      {step === "upload" && (
        <div>
          <button
            type="button"
            onClick={() => {
              setStep("template");
              setError(null);
            }}
            disabled={uploadMutation.isPending}
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary/70 hover:text-primary disabled:opacity-50"
          >
            <ArrowLeft size={16} />
            Choose a different template
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            hidden
            onChange={handleFileInputChange}
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 text-center cursor-pointer transition ${
              isDragging
                ? "border-accent bg-accent/5"
                : "border-primary/20 hover:border-primary/40"
            }`}
          >
            {selectedFile ? (
              <>
                <FileText size={32} className="text-accent" />
                <p className="text-sm font-medium text-dark">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-primary/60">
                  Click or drop another file to replace it
                </p>
              </>
            ) : (
              <>
                <UploadCloud size={32} className="text-primary/50" />
                <p className="text-sm font-medium text-dark">
                  Click to browse or drag & drop your resume
                </p>
                <p className="text-xs text-primary/60">PDF only, up to 5MB</p>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={handleUpload}
            disabled={!selectedFile || uploadMutation.isPending}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-background transition hover:bg-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploadMutation.isPending ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Parsing your resume...
              </>
            ) : (
              "Upload & Continue"
            )}
          </button>
        </div>
      )}
    </Modal>
  );
}
