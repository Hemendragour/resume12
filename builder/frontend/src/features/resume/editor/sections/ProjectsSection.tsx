import { useState } from "react";
import { FolderGit2, Pencil, Plus, Trash2 } from "lucide-react";

import Button from "../../../../components/ui/Button";
import ProjectForm from "../components/ProjectForm";

import { useResumeStore } from "../../../../store/resume.store";

export default function ProjectsSection() {
  const resume = useResumeStore((state) => state.resume);

  const deleteProject = useResumeStore((state) => state.deleteProject);

  const [showForm, setShowForm] = useState(false);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>

          <p className="text-gray-500">Showcase your best work.</p>
        </div>

        <Button
          leftIcon={<Plus size={18} />}
          onClick={() => {
            setEditingIndex(null);
            setShowForm(true);
          }}
        >
          Add Project
        </Button>
      </div>

      {/* Empty State */}

      {resume?.projects.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed p-12 text-center">
          <FolderGit2 size={44} className="mx-auto mb-4 text-slate-400" />

          <h3 className="text-xl font-semibold">No Projects Added</h3>

          <p className="mt-2 text-gray-500">Add your portfolio projects.</p>
        </div>
      )}

      {/* Cards */}

      <div className="space-y-5">
        {resume?.projects.map((project, index) => (
          <div
            key={index}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-bold">{project.title}</h3>

                <p className="text-gray-600">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.github && (
                  <p className="text-sm text-blue-600">
                    GitHub: {project.github}
                  </p>
                )}

                {project.link && (
                  <p className="text-sm text-green-600">Live: {project.link}</p>
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
                  onClick={() => deleteProject(index)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}

      {showForm && (
        <ProjectForm
          onClose={() => {
            setShowForm(false);
            setEditingIndex(null);
          }}
          editIndex={editingIndex ?? undefined}
          initialData={
            editingIndex !== null ? resume?.projects[editingIndex] : undefined
          }
        />
      )}
    </div>
  );
}
