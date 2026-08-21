// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";

// import Button from "../../../../components/ui/Button";
// import Input from "../../../../components/ui/Input"; // ← Added Import
// import { useResumeStore } from "../../../../store/resume.store";
// import type { Resume } from "../../types/resume.types";
// // import { useState } from "react";
// import { useGenerateProject } from "../../../ai/hooks/useGenerateProject";
// import AIProjectContextModal from "../../../ai/components/AIProjectContextModal";

// interface Props {
//   onClose: () => void;
//   editIndex?: number;
//   initialData?: Resume["projects"][number];
// }

// type ProjectFormData = Resume["projects"][number];

// export default function ProjectForm({
//   onClose,
//   editIndex,
//   initialData,
// }: Props) {
//   const addProject = useResumeStore((state) => state.addProject);
//   const updateProject = useResumeStore((state) => state.updateProject);

//   const [technology, setTechnology] = useState("");

//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm<ProjectFormData>({
//     defaultValues: {
//       title: "",
//       role: "",
//       description: "",
//       startDate: "",
//       endDate: "",
//       currentlyWorking: false,
//       technologies: [],
//       github: "",
//       link: "",
//     },
//   });

//   // Reset form when initialData changes (for edit mode)
//   useEffect(() => {
//     if (initialData) {
//       reset(initialData);
//     }
//   }, [initialData, reset]);

//   const technologies = watch("technologies");

//   const addTechnology = () => {
//     const value = technology.trim();
//     if (!value) return;

//     // Prevent duplicate technologies
//     if (
//       technologies.some((tech) => tech.toLowerCase() === value.toLowerCase())
//     ) {
//       setTechnology("");
//       return;
//     }

//     setValue("technologies", [...technologies, value], {
//       shouldValidate: true,
//       shouldDirty: true,
//     });
//     setTechnology("");
//   };

//   const [showContextModal, setShowContextModal] = useState(false);

//   const { mutateAsync: generateProject, isPending: isGenerating } =
//     useGenerateProject();

//   const title = watch("title");

//   const handleGenerateClick = () => {
//     if (!title?.trim()) {
//       alert("Please enter Project Title first.");
//       return;
//     }
//     setShowContextModal(true);
//   };

//   const handleContextSubmit = async (context: {
//     whatBuilt: string;
//     problemSolved: string;
//     teamSize: string;
//     impact: string;
//   }) => {
//     try {
//       const result = await generateProject({
//         projectName: title.trim(),
//         technologies,
//         context,
//       });

//       const bullets = Array.isArray(result) ? result : [];

//       setValue("description", bullets.join("\n"));
//       setShowContextModal(false);
//     } catch (error) {
//       console.error("Generate failed:", error);
//       alert("Failed to generate with AI. Please try again.");
//     }
//   };

//   const removeTechnology = (tech: string) => {
//     setValue(
//       "technologies",
//       technologies.filter((t) => t !== tech),
//       { shouldValidate: true, shouldDirty: true },
//     );
//   };

//   const onSubmit = (data: ProjectFormData) => {
//     console.log("SUBMIT DATA", data);

//     const cleanedData = {
//       ...data,
//       github: data.github?.trim() ?? "",
//       link: data.link?.trim() ?? "",
//     };

//     if (editIndex !== undefined) {
//       updateProject(editIndex, cleanedData);
//     } else {
//       addProject(cleanedData);
//     }

//     reset();
//     onClose();
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="space-y-6 rounded-2xl border bg-white p-8"
//     >
//       <h2 className="text-2xl font-bold">
//         {editIndex !== undefined ? "Edit Project" : "Add Project"}
//       </h2>

//       {/* Project Title */}
//       <div>
//         <label className="font-medium">Project Title</label>
//         <input
//           {...register("title", {
//             required: "Project title is required",
//             minLength: { value: 2, message: "Minimum 2 characters required" },
//           })}
//           placeholder="AI Resume Builder using React, Node.js & MongoDB"
//           className="mt-2 h-12 w-full rounded-lg border px-4"
//         />
//         {errors.title && (
//           <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
//         )}
//       </div>

//       {/* Role - Added as per requirement */}
//       <Input
//         label="Role"
//         placeholder="Full Stack Developer"
//         {...register("role")}
//       />

//       {/* Description */}
//       {/* Description */}
//       <div>
//         <div className="flex items-center justify-between mb-2">
//           <label className="font-medium">Description</label>
//           <button
//             type="button"
//             onClick={handleGenerateClick}
//             disabled={isGenerating}
//             className="rounded-lg bg-violet-600 px-4 py-2 text-white text-sm flex items-center gap-2 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             {isGenerating ? "Generating..." : "✨ Generate with AI"}
//           </button>
//         </div>
//         <textarea
//           {...register("description", {
//             required: "Description is required",
//             minLength: { value: 10, message: "Minimum 10 characters required" },
//           })}
//           rows={5}
//           placeholder="One achievement per line."
//           className="mt-2 w-full rounded-lg border p-4"
//         />
//         {errors.description && (
//           <p className="mt-1 text-sm text-red-500">
//             {errors.description.message}
//           </p>
//         )}
//       </div>

//       {/* Start & End Date + Currently Working */}
//       <div className="space-y-4">
//         <div className="grid grid-cols-2 gap-4">
//           <Input label="Start Date" type="month" {...register("startDate")} />

//           <Input
//             label="End Date"
//             type="month"
//             disabled={watch("currentlyWorking")}
//             {...register("endDate")}
//           />
//         </div>

//         {/* Currently Working Checkbox */}
//         <label className="flex items-center gap-2">
//           <input type="checkbox" {...register("currentlyWorking")} />
//           Currently Working
//         </label>
//       </div>

//       {/* Technologies */}
//       <div>
//         <label className="font-medium">Technologies</label>
//         <div className="mt-2 flex gap-3">
//           <input
//             type="text"
//             value={technology}
//             onChange={(e) => setTechnology(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 e.preventDefault();
//                 addTechnology();
//               }
//             }}
//             placeholder="React"
//             className="h-12 flex-1 rounded-lg border px-4"
//           />
//           <Button type="button" onClick={addTechnology}>
//             Add
//           </Button>
//         </div>

//         <div className="mt-4 flex flex-wrap gap-2">
//           {technologies.map((tech) => (
//             <button
//               key={tech}
//               type="button"
//               onClick={() => removeTechnology(tech)}
//               className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700 hover:bg-blue-200 transition-colors"
//             >
//               {tech} ✕
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* GitHub URL */}
//       <div>
//         <label className="font-medium">GitHub URL (Optional)</label>
//         <input
//           type="text"
//           {...register("github", {
//             validate: (value) => {
//               if (value == null || value.trim() === "") return true;
//               try {
//                 new URL(value);
//                 return true;
//               } catch {
//                 return "Please enter a valid URL";
//               }
//             },
//           })}
//           placeholder="https://github.com/username/project"
//           className="mt-2 h-12 w-full rounded-lg border px-4"
//         />
//         {errors.github && (
//           <p className="mt-1 text-sm text-red-500">{errors.github.message}</p>
//         )}
//       </div>

//       {/* Live Demo URL */}
//       <div>
//         <label className="font-medium">Live Demo URL (Optional)</label>
//         <input
//           type="text"
//           {...register("link", {
//             validate: (value) => {
//               if (value == null || value.trim() === "") return true;
//               try {
//                 new URL(value);
//                 return true;
//               } catch {
//                 return "Please enter a valid URL";
//               }
//             },
//           })}
//           placeholder="https://project.vercel.app"
//           className="mt-2 h-12 w-full rounded-lg border px-4"
//         />
//         {errors.link && (
//           <p className="mt-1 text-sm text-red-500">{errors.link.message}</p>
//         )}
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-end gap-4 pt-4">
//         <Button type="button" variant="outline" onClick={onClose}>
//           Cancel
//         </Button>
//         <Button type="submit">
//           {editIndex !== undefined ? "Update Project" : "Save Project"}
//         </Button>
//       </div>

//       <AIProjectContextModal
//         open={showContextModal}
//         onClose={() => setShowContextModal(false)}
//         onSubmit={handleContextSubmit}
//         loading={isGenerating}
//       />
//     </form>
//   );
// }

/////////////  color

// ProjectForm.tsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input"; // ← Added Import
import { useResumeStore } from "../../../../store/resume.store";
import type { Resume } from "../../types/resume.types";
// import { useState } from "react";
import { useGenerateProject } from "../../../ai/hooks/useGenerateProject";
import AIProjectContextModal from "../../../ai/components/AIProjectContextModal";

interface Props {
  onClose: () => void;
  editIndex?: number;
  initialData?: Resume["projects"][number];
}

type ProjectFormData = Resume["projects"][number];

export default function ProjectForm({
  onClose,
  editIndex,
  initialData,
}: Props) {
  const addProject = useResumeStore((state) => state.addProject);
  const updateProject = useResumeStore((state) => state.updateProject);

  const [technology, setTechnology] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      title: "",
      role: "",
      description: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      technologies: [],
      github: "",
      link: "",
    },
  });

  // Reset form when initialData changes (for edit mode)
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const technologies = watch("technologies");

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

  const [showContextModal, setShowContextModal] = useState(false);

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

      setValue("description", bullets.join("\n"));
      setShowContextModal(false);
    } catch (error) {
      console.error("Generate failed:", error);
      alert("Failed to generate with AI. Please try again.");
    }
  };

  const removeTechnology = (tech: string) => {
    setValue(
      "technologies",
      technologies.filter((t) => t !== tech),
      { shouldValidate: true, shouldDirty: true },
    );
  };

  const onSubmit = (data: ProjectFormData) => {
    console.log("SUBMIT DATA", data);

    const cleanedData = {
      ...data,
      github: data.github?.trim() ?? "",
      link: data.link?.trim() ?? "",
    };

    if (editIndex !== undefined) {
      updateProject(editIndex, cleanedData);
    } else {
      addProject(cleanedData);
    }

    reset();
    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-2xl border border-primary/10 bg-modal p-8"
    >
      <h2 className="text-2xl font-bold text-dark">
        {editIndex !== undefined ? "Edit Project" : "Add Project"}
      </h2>

      {/* Project Title */}
      <div>
        <label className="font-medium text-dark">Project Title</label>
        <input
          {...register("title", {
            required: "Project title is required",
            minLength: { value: 2, message: "Minimum 2 characters required" },
          })}
          placeholder="AI Resume Builder using React, Node.js & MongoDB"
          className="mt-2 h-12 w-full rounded-lg border border-primary/15 bg-card px-4 text-dark outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-danger">{errors.title.message}</p>
        )}
      </div>

      {/* Role - Added as per requirement */}
      <Input
        label="Role"
        placeholder="Full Stack Developer"
        {...register("role")}
      />

      {/* Description */}
      {/* Description */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="font-medium text-dark">Description</label>
          <button
            type="button"
            onClick={handleGenerateClick}
            disabled={isGenerating}
            className="rounded-lg bg-accent px-4 py-2 text-dark text-sm flex items-center gap-2 hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isGenerating ? "Generating..." : "✨ Generate with AI"}
          </button>
        </div>
        <textarea
          {...register("description", {
            required: "Description is required",
            minLength: { value: 10, message: "Minimum 10 characters required" },
          })}
          rows={5}
          placeholder="One achievement per line."
          className="mt-2 w-full rounded-lg border border-primary/15 bg-card p-4 text-dark outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-danger">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Start & End Date + Currently Working */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Start Date" type="month" {...register("startDate")} />

          <Input
            label="End Date"
            type="month"
            disabled={watch("currentlyWorking")}
            {...register("endDate")}
          />
        </div>

        {/* Currently Working Checkbox */}
        <label className="flex items-center gap-2 text-dark">
          <input type="checkbox" {...register("currentlyWorking")} />
          Currently Working
        </label>
      </div>

      {/* Technologies */}
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

        <div className="mt-4 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => removeTechnology(tech)}
              className="rounded-full bg-accent/15 px-4 py-2 text-sm text-primary hover:bg-accent/25 transition-colors"
            >
              {tech} ✕
            </button>
          ))}
        </div>
      </div>

      {/* GitHub URL */}
      <div>
        <label className="font-medium text-dark">GitHub URL (Optional)</label>
        <input
          type="text"
          {...register("github", {
            validate: (value) => {
              if (value == null || value.trim() === "") return true;
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

      {/* Live Demo URL */}
      <div>
        <label className="font-medium text-dark">
          Live Demo URL (Optional)
        </label>
        <input
          type="text"
          {...register("link", {
            validate: (value) => {
              if (value == null || value.trim() === "") return true;
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

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {editIndex !== undefined ? "Update Project" : "Save Project"}
        </Button>
      </div>

      <AIProjectContextModal
        open={showContextModal}
        onClose={() => setShowContextModal(false)}
        onSubmit={handleContextSubmit}
        loading={isGenerating}
      />
    </form>
  );
}
