import { useState } from "react";
import { FolderGit2, Pencil, Plus, Trash2 } from "lucide-react";

import Button from "../../../../components/ui/Button";
import ProjectForm from "../components/ProjectForm";

import { useResumeStore } from "../../../../store/resume.store";
import Input from "../../../../components/ui/Input";

export default function ProjectsSection() {
  const resume = useResumeStore((state) => state.resume);

  const deleteProject = useResumeStore((state) => state.deleteProject);

  const renameSectionDisplayTitle = useResumeStore(
    (state) => state.renameSectionDisplayTitle,
  );
  const projectSection = resume?.sections.find(
    (section) => section.id === "projects",
  );

  const [showForm, setShowForm] = useState(false);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <Input
            label="Resume Heading"
            placeholder="College Projects"
            value={projectSection?.displayTitle ?? ""}
            onChange={(e) =>
              renameSectionDisplayTitle("projects", e.target.value)
            }
          />

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

                <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-700">
                  {project.description
                    .split("\n")
                    .filter((line) => line.trim() !== "")
                    .map((line, index) => (
                      <li key={index}>{line}</li>
                    ))}
                </ul>

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

                <div className="mt-3 flex flex-wrap gap-6 text-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-[15px] font-bold">{project.title}</h3>
                    </div>

                    <div className="flex gap-3 text-[12px]">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-blue-600 hover:underline"
                        >
                          Live Demo
                        </a>
                      )}

                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-blue-600 hover:underline"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>
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
