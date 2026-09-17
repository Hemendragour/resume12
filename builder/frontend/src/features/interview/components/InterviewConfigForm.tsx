import { useRef, useState } from "react";
import { Loader2, UploadCloud } from "lucide-react";

import { useResumes } from "../../resume/hooks/useResumes";
import { useUploadAndParseResume } from "../../resume/hooks/useUploadAndParseResume";

import type {
  Difficulty,
  QuestionCount,
  QuestionType,
  StartInterviewPayload,
} from "../types/interview.types";

interface InterviewConfigFormProps {
  onSubmit: (payload: StartInterviewPayload) => void;
  submitting: boolean;
}

const QUESTION_TYPES: { value: QuestionType; label: string }[] = [
  { value: "mixed", label: "Mixed" },
  { value: "technical", label: "Technical" },
  { value: "hr", label: "HR" },
  { value: "behavioral", label: "Behavioral" },
];

const DIFFICULTIES: { value: Difficulty; label: string }[] = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const QUESTION_COUNTS: QuestionCount[] = [5, 10, 15];

export default function InterviewConfigForm({
  onSubmit,
  submitting,
}: InterviewConfigFormProps) {
  const { resumes, loading: loadingResumes } = useResumes();
  const uploadAndParse = useUploadAndParseResume();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [resumeId, setResumeId] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [preparationNotes, setPreparationNotes] = useState("");
  const [questionType, setQuestionType] = useState<QuestionType>("mixed");
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [totalQuestions, setTotalQuestions] = useState<QuestionCount>(5);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const resume = await uploadAndParse.mutateAsync({ file });

    // Newly uploaded resume is saved to the user's resumes and selected.
    setResumeId(resume._id);
  };

  const canSubmit =
    resumeId.trim().length > 0 &&
    targetRole.trim().length > 0 &&
    !submitting &&
    !uploadAndParse.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) return;

    onSubmit({
      resumeId,
      targetRole: targetRole.trim(),
      jobDescription: jobDescription.trim() || undefined,
      preparationNotes: preparationNotes.trim() || undefined,
      questionType,
      difficulty,
      totalQuestions,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Resume */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-dark">
          Resume
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={resumeId}
            onChange={(e) => setResumeId(e.target.value)}
            disabled={loadingResumes}
            className="min-w-[220px] flex-1 rounded-xl border border-primary/15 bg-card px-4 py-2.5 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">
              {loadingResumes ? "Loading resumes..." : "Select a saved resume"}
            </option>

            {resumes.map((resume) => (
              <option key={resume._id} value={resume._id}>
                {resume.title || "Untitled resume"}
              </option>
            ))}
          </select>

          <span className="text-xs text-primary/50">or</span>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadAndParse.isPending}
            className="flex items-center gap-2 rounded-xl border border-dashed border-primary/25 px-4 py-2.5 text-sm font-medium text-primary transition hover:border-accent hover:text-accent disabled:opacity-60"
          >
            {uploadAndParse.isPending ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <UploadCloud size={16} />
            )}
            Upload new resume
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {uploadAndParse.isError && (
          <p className="mt-2 text-xs text-red-500">
            Couldn't upload that file. Please try again.
          </p>
        )}
      </div>

      {/* Target role */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-dark">
          Target role
        </label>

        <input
          type="text"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="e.g. Frontend Developer, Data Analyst"
          className="w-full rounded-xl border border-primary/15 bg-card px-4 py-2.5 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Job description (optional) */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-dark">
          Job description{" "}
          <span className="font-normal text-primary/50">(optional)</span>
        </label>

        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={4}
          placeholder="Paste the job description here for more relevant questions"
          className="w-full resize-none rounded-xl border border-primary/15 bg-card px-4 py-2.5 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Preparation notes */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-dark">
          What are you preparing for?
        </label>

        <textarea
          value={preparationNotes}
          onChange={(e) => setPreparationNotes(e.target.value)}
          rows={3}
          placeholder="e.g. I want more system design questions, I'm weak in SQL..."
          className="w-full resize-none rounded-xl border border-primary/15 bg-card px-4 py-2.5 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Question type */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-dark">
          Question type
        </label>

        <div className="flex flex-wrap gap-2">
          {QUESTION_TYPES.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setQuestionType(option.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                questionType === option.value
                  ? "bg-accent text-white"
                  : "border border-primary/15 text-primary/70 hover:border-accent"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-dark">
          Difficulty
        </label>

        <div className="flex flex-wrap gap-2">
          {DIFFICULTIES.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setDifficulty(option.value)}
              className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
                difficulty === option.value
                  ? "bg-accent text-white"
                  : "border border-primary/15 text-primary/70 hover:border-accent"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Question count */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-dark">
          Number of questions
        </label>

        <div className="flex flex-wrap gap-2">
          {QUESTION_COUNTS.map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setTotalQuestions(count)}
              className={`h-11 w-11 rounded-full text-sm font-semibold transition ${
                totalQuestions === count
                  ? "bg-accent text-white"
                  : "border border-primary/15 text-primary/70 hover:border-accent"
              }`}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Generating your first question...
          </>
        ) : (
          "Generate"
        )}
      </button>
    </form>
  );
}
