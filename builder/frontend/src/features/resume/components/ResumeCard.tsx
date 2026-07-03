import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Clock, Edit3, Briefcase } from "lucide-react";

import ResumeCardMenu from "./ResumeCardMenu";
import RenameResumeModal from "./RenameResumeModal";
import DeleteResumeModal from "./DeleteResumeModal";
import ResumeThumbnail from "./ResumeThumbnail"; // ← Add this import

import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";

import { useRenameResume } from "../hooks/useRenameResume";
import { useDeleteResume } from "../hooks/useDeleteResume";
import { useDuplicateResume } from "../hooks/useDuplicateResume";

import type { Resume } from "../types/resume.types";

import ShareResumeModal from "../share/ShareResumeModal";
import { useShareResume } from "../share/useShareResume";

interface ResumeCardProps {
  resume: Resume;
  onRefresh: () => void;
}

export default function ResumeCard({ resume, onRefresh }: ResumeCardProps) {
  const navigate = useNavigate();

  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [title, setTitle] = useState(resume.title);

  const renameMutation = useRenameResume();
  const deleteMutation = useDeleteResume();
  const duplicateMutation = useDuplicateResume();

  const [shareOpen, setShareOpen] = useState(false);

  const [shareId, setShareId] = useState("");

  const { shareMutation } = useShareResume();

  // Calculate completion percentage
  const completion = (() => {
    let score = 0;
    if (resume.personalInfo?.fullName) score += 15;
    if (resume.summary) score += 15;
    if (resume.skills?.length) score += 20;
    if (resume.experience?.length) score += 20;
    if (resume.education?.length) score += 15;
    if (resume.projects?.length) score += 15;
    return score;
  })();

  const progressColor =
    completion >= 80
      ? "bg-green-500"
      : completion >= 50
        ? "bg-yellow-500"
        : "bg-red-500";

  const handleRename = async (newTitle: string) => {
    await renameMutation.mutateAsync({
      id: resume._id,
      title: newTitle,
    });

    setTitle(newTitle);
    setRenameOpen(false);
    onRefresh();
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(resume._id);
      setDeleteOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDuplicate = async () => {
    try {
      await duplicateMutation.mutateAsync(resume._id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = async () => {
    try {
      const data = await shareMutation.mutateAsync(resume._id);

      setShareId(data.shareId);

      setShareOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-56 items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
        <ResumeThumbnail resume={resume} />
      </div>

      {/* Body */}
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold line-clamp-1">{title}</h3>

            <div className="mt-2 flex items-center gap-2">
              <Badge color={resume.status === "draft" ? "yellow" : "green"}>
                {resume.status}
              </Badge>

              <Badge>{completion}% Complete</Badge>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-500">
                <span>Profile Completion</span>
                <span>{completion}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-slate-200">
                <div
                  className={`${progressColor} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>
          </div>

          <ResumeCardMenu
            onRename={() => setRenameOpen(true)}
            onDuplicate={handleDuplicate}
            onDelete={() => setDeleteOpen(true)}
            onDownload={() => navigate(`/resume/${resume._id}/edit`)}
            onShare={handleShare}
          />
        </div>

        {/* Target Role */}
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Briefcase size={16} />
          {resume.targetRole || "Target role not selected"}
        </div>

        {/* Last Updated */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock size={16} />
          Last Updated {new Date(resume.updatedAt).toLocaleDateString()}
        </div>

        {/* Edit Button */}
        <div className="pt-2">
          <Button
            fullWidth
            className="h-11"
            leftIcon={<Edit3 size={18} />}
            onClick={() => navigate(`/resume/${resume._id}/edit`)}
          >
            Edit Resume
          </Button>
        </div>
      </div>

      {/* Modals */}
      <RenameResumeModal
        open={renameOpen}
        initialValue={title}
        loading={renameMutation.isPending}
        onClose={() => setRenameOpen(false)}
        onSave={handleRename}
      />

      <DeleteResumeModal
        open={deleteOpen}
        title={title}
        loading={deleteMutation.isPending}
        onClose={() => setDeleteOpen(false)}
        onDelete={handleDelete}
      />

      <ShareResumeModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        shareId={shareId}
      />
    </Card>
  );
}
