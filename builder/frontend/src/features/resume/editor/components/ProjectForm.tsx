// ProjectForm.tsx
import { useEffect, useState } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import MonthYearPicker from "./MonthYearPicker";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import { useResumeStore } from "../../../../store/resume.store";
import type { Resume } from "../../types/resume.types";

import { useGenerateProject } from "../../../ai/hooks/useGenerateProject";
import AIProjectContextModal from "../../../ai/components/AIProjectContextModal";

interface Props {
  onClose: () => void;
  editIndex?: number;
  initialData?: Resume["projects"][number];
}
const CURRENT_YEAR = new Date().getFullYear();
interface ProjectFormData {
  title: string;
  role: string;
  description: { value: string }[];
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  technologies: string[];
  github: string;
  link: string;
}

export default function ProjectForm({
  onClose,
  editIndex,
  initialData,
}: Props) {
  const addProject = useResumeStore((state) => state.addProject);
  const updateProject = useResumeStore((state) => state.updateProject);

  const [technology, setTechnology] = useState("");
  const [showContextModal, setShowContextModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      title: "",
      role: "",
      description: [{ value: "" }],
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      technologies: [],
      github: "",
      link: "",
    },
  });

  /*
   * ---------------------------------------------------------
   * DESCRIPTION FIELD ARRAY
   * ---------------------------------------------------------
   */

  const {
    fields: descriptionFields,
    append: addDescription,
    remove: removeDescription,
  } = useFieldArray({
    control,
    name: "description",
  });

  /*
   * ---------------------------------------------------------
   * EDIT MODE
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || "",
        role: initialData.role || "",

        // Convert string[] -> { value: string }[]
        description: (initialData.description || []).map((description) => ({
          value: description,
        })),

        startDate: initialData.startDate || "",
        endDate: initialData.endDate || "",
        currentlyWorking: initialData.currentlyWorking || false,
        technologies: initialData.technologies || [],
        github: initialData.github || "",
        link: initialData.link || "",
      });
    }
  }, [initialData, reset]);

  /*
   * ---------------------------------------------------------
   * TECHNOLOGIES
   * ---------------------------------------------------------
   */

  const technologies = watch("technologies") || [];

  const addTechnology = () => {
    const value = technology.trim();

    if (!value) return;

    // Prevent duplicate technologies
    if (
      technologies.some((tech) => tech.toLowerCase() === value.toLowerCase())
    ) {
      setTechnology("");
      return;
    }

    setValue("technologies", [...technologies, value], {
      shouldValidate: true,
      shouldDirty: true,
    });

    setTechnology("");
  };

  const removeTechnology = (tech: string) => {
    setValue(
      "technologies",
      technologies.filter((t) => t !== tech),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  };

  /*
   * ---------------------------------------------------------
   * AI GENERATION
   * ---------------------------------------------------------
   */

  const { mutateAsync: generateProject, isPending: isGenerating } =
    useGenerateProject();

  const title = watch("title");

  const handleGenerateClick = () => {
    if (!title?.trim()) {
      alert("Please enter Project Title first.");
      return;
    }

    setShowContextModal(true);
  };

  const handleContextSubmit = async (context: {
    whatBuilt: string;
    problemSolved: string;
    teamSize: string;
    impact: string;
  }) => {
    try {
      const result = await generateProject({
        projectName: title.trim(),
        technologies,
        context,
      });

      const bullets = Array.isArray(result) ? result : [];

      /*
       * AI result:
       *
       * [
       *   "Built a real-time chat application...",
       *   "Implemented JWT authentication...",
       *   "Used Socket.IO..."
       * ]
       *
       * Convert to react-hook-form field array:
       *
       * [
       *   { value: "Built..." },
       *   { value: "Implemented..." },
       *   { value: "Used..." }
       * ]
       */

      setValue(
        "description",
        bullets.map((bullet: string) => ({
          value: bullet,
        })),
        {
          shouldDirty: true,
          shouldValidate: true,
        },
      );

      setShowContextModal(false);
    } catch (error) {
      console.error("Generate failed:", error);
      alert("Failed to generate with AI. Please try again.");
    }
  };

  /*
   * ---------------------------------------------------------
   * SUBMIT
   * ---------------------------------------------------------
   */

  const onSubmit = (data: ProjectFormData) => {
    console.log("PROJECT FORM DATA", data);

    /*
     * Convert:
     *
     * description: [
     *   { value: "Bullet 1" },
     *   { value: "Bullet 2" }
     * ]
     *
     * into:
     *
     * description: [
     *   "Bullet 1",
     *   "Bullet 2"
     * ]
     */

    const cleanedData = {
      title: data.title.trim(),

      role: data.role?.trim() ?? "",

      description: data.description
        .map((item) => item.value.trim())
        .filter(Boolean),

      startDate: data.startDate,

      endDate: data.currentlyWorking ? "" : data.endDate,

      currentlyWorking: data.currentlyWorking,

      technologies: data.technologies,

      github: data.github?.trim() ?? "",

      link: data.link?.trim() ?? "",
    };

    console.log("CLEANED PROJECT DATA", cleanedData);

    if (editIndex !== undefined) {
      updateProject(editIndex, cleanedData);
    } else {
      addProject(cleanedData);
    }

    reset();

    onClose();
  };

  /*
   * ---------------------------------------------------------
   * UI
   * ---------------------------------------------------------
   */

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-2xl border border-primary/10 bg-modal p-8"
    >
      {/* TITLE */}

      <h2 className="text-2xl font-bold text-dark">
        {editIndex !== undefined ? "Edit Project" : "Add Project"}
      </h2>

      {/* PROJECT TITLE */}

      <div>
        <label className="font-medium text-dark">Project Title</label>

        <input
          {...register("title", {
            required: "Project title is required",
            minLength: {
              value: 2,
              message: "Minimum 2 characters required",
            },
          })}
          placeholder="AI Resume Builder using React, Node.js & MongoDB"
          className="mt-2 h-12 w-full rounded-lg border border-primary/15 bg-card px-4 text-dark outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-danger">{errors.title.message}</p>
        )}
      </div>

      {/* ROLE */}

      <Input
        label="Role"
        placeholder="Full Stack Developer"
        {...register("role")}
      />

      {/* DESCRIPTION */}

      <div>
        <div className="mb-3 flex items-center justify-between">
          <label className="font-medium text-dark">Description</label>

          <button
            type="button"
            onClick={handleGenerateClick}
            disabled={isGenerating}
            className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm text-dark transition-colors hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isGenerating ? "Generating..." : "✨ Generate with AI"}
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {descriptionFields.map((field, index) => (
            <div key={field.id} className="flex gap-3">
              <input
                {...register(`description.${index}.value`, {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                })}
                placeholder={
                  index === 0
                    ? "Built a real-time chat application using Socket.IO"
                    : "Describe another achievement or feature"
                }
                className="h-11 flex-1 rounded-lg border border-primary/15 bg-card px-4 text-dark outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />

              <Button
                type="button"
                variant="outline"
                onClick={() => removeDescription(index)}
                disabled={descriptionFields.length === 1}
              >
                Remove
              </Button>
            </div>
          ))}

          {/* Description validation */}

          {errors.description?.message && (
            <p className="text-sm text-danger">{errors.description.message}</p>
          )}

          {/* ADD DESCRIPTION */}

          <Button
            type="button"
            variant="outline"
            onClick={() => addDescription({ value: "" })}
          >
            + Add Description
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* START DATE */}
          <div>
            <label className="text-sm font-medium text-dark">Start Date</label>

            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <MonthYearPicker
                  value={field.value || ""}
                  onChange={field.onChange}
                  maxYear={CURRENT_YEAR}
                  placeholder="Select start month"
                />
              )}
            />
          </div>

          {/* END DATE */}
          <div>
            <label className="text-sm font-medium text-dark">End Date</label>

            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <MonthYearPicker
                  value={field.value || ""}
                  onChange={field.onChange}
                  maxYear={CURRENT_YEAR}
                  disabled={watch("currentlyWorking")}
                  placeholder="Select end month"
                />
              )}
            />
          </div>
        </div>

        {/* CURRENTLY WORKING */}
        <label className="flex items-center gap-2 text-dark">
          <input
            type="checkbox"
            {...register("currentlyWorking", {
              onChange: (e) => {
                if (e.target.checked) {
                  setValue("endDate", "");
                }
              },
            })}
          />
          Currently Working
        </label>
      </div>

      {/* TECHNOLOGIES */}

      <div>
        <label className="font-medium text-dark">Technologies</label>

        <div className="mt-2 flex gap-3">
          <input
            type="text"
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTechnology();
              }
            }}
            placeholder="React"
            className="h-12 flex-1 rounded-lg border border-primary/15 bg-card px-4 text-dark outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />

          <Button type="button" onClick={addTechnology}>
            Add
          </Button>
        </div>

        {/* TECHNOLOGY TAGS */}

        <div className="mt-4 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => removeTechnology(tech)}
              className="rounded-full bg-accent/15 px-4 py-2 text-sm text-primary transition-colors hover:bg-accent/25"
            >
              {tech} ✕
            </button>
          ))}
        </div>
      </div>

      {/* GITHUB */}

      <div>
        <label className="font-medium text-dark">GitHub URL (Optional)</label>

        <input
          type="text"
          {...register("github", {
            validate: (value) => {
              if (!value || value.trim() === "") {
                return true;
              }

              try {
                new URL(value);
                return true;
              } catch {
                return "Please enter a valid URL";
              }
            },
          })}
          placeholder="https://github.com/username/project"
          className="mt-2 h-12 w-full rounded-lg border border-primary/15 bg-card px-4 text-dark outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />

        {errors.github && (
          <p className="mt-1 text-sm text-danger">{errors.github.message}</p>
        )}
      </div>

      {/* LIVE DEMO */}

      <div>
        <label className="font-medium text-dark">
          Live Demo URL (Optional)
        </label>

        <input
          type="text"
          {...register("link", {
            validate: (value) => {
              if (!value || value.trim() === "") {
                return true;
              }

              try {
                new URL(value);
                return true;
              } catch {
                return "Please enter a valid URL";
              }
            },
          })}
          placeholder="https://project.vercel.app"
          className="mt-2 h-12 w-full rounded-lg border border-primary/15 bg-card px-4 text-dark outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />

        {errors.link && (
          <p className="mt-1 text-sm text-danger">{errors.link.message}</p>
        )}
      </div>

      {/* ACTION BUTTONS */}

      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>

        <Button type="submit">
          {editIndex !== undefined ? "Update Project" : "Save Project"}
        </Button>
      </div>

      {/* AI CONTEXT MODAL */}

      <AIProjectContextModal
        open={showContextModal}
        onClose={() => setShowContextModal(false)}
        onSubmit={handleContextSubmit}
        loading={isGenerating}
      />
    </form>
  );
}
