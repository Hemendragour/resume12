// import { useForm } from "react-hook-form";
// import { X, FileText } from "lucide-react";

// interface Props {
//   open: boolean;
//   onClose: () => void;
// }

// interface FormData {
//   title: string;
//   targetRole: string;
//   templateId: string;
// }

// const templates = [
//   {
//     id: "technical-developer",
//     name: "Technical Developer",
//     description: "Best for Software Engineers",
//   },
//   {
//     id: "modern-professional",
//     name: "Modern Professional",
//     description: "Clean ATS Friendly Layout",
//   },
//   {
//     id: "minimal-clean",
//     name: "Minimal Clean",
//     description: "Simple One Page Resume",
//   },
// ];

// export default function CreateResumeModal({
//   open,
//   onClose,
// }: Props) {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//   } = useForm<FormData>({
//     defaultValues: {
//       title: "",
//       targetRole: "",
//       templateId: "technical-developer",
//     },
//   });

//   const selectedTemplate = watch("templateId");

//   if (!open) return null;

//   const onSubmit = (data: FormData) => {
//     console.log(data);

//     /*
//       NEXT STEP

//       POST /api/v1/resumes

//       Navigate

//       /resume/:id/edit
//     */
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

//       <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">

//         {/* Header */}

//         <div className="flex items-center justify-between border-b p-6">

//           <div>

//             <h2 className="text-2xl font-bold">

//               Create Resume

//             </h2>

//             <p className="text-sm text-gray-500">

//               Create a new professional resume

//             </p>

//           </div>

//           <button
//             onClick={onClose}
//             className="rounded-lg p-2 hover:bg-gray-100"
//           >
//             <X />
//           </button>

//         </div>

//         <form
//           onSubmit={handleSubmit(onSubmit)}
//         >

//           <div className="space-y-6 p-6">

//             {/* Resume Name */}

//             <div>

//               <label className="mb-2 block font-medium">

//                 Resume Name

//               </label>

//               <input
//                 {...register("title")}
//                 placeholder="Google Frontend Resume"
//                 className="h-12 w-full rounded-lg border px-4"
//               />

//             </div>

//             {/* Target Role */}

//             <div>

//               <label className="mb-2 block font-medium">

//                 Target Role

//               </label>

//               <input
//                 {...register("targetRole")}
//                 placeholder="Frontend Developer"
//                 className="h-12 w-full rounded-lg border px-4"
//               />

//             </div>

//             {/* Templates */}

//             <div>

//               <label className="mb-4 block font-medium">

//                 Choose Template

//               </label>

//               <div className="grid grid-cols-3 gap-5">

//                 {templates.map((template) => (

//                   <button
//                     type="button"
//                     key={template.id}
//                     onClick={() =>
//                       setValue(
//                         "templateId",
//                         template.id
//                       )
//                     }
//                     className={`rounded-xl border p-5 transition

//                     ${
//                       selectedTemplate ===
//                       template.id
//                         ? "border-blue-600 bg-blue-50"
//                         : "hover:border-blue-400"
//                     }`}
//                   >

//                     <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-gray-100">

//                       <FileText
//                         size={48}
//                       />

//                     </div>

//                     <h3 className="font-semibold">

//                       {template.name}

//                     </h3>

//                     <p className="mt-2 text-sm text-gray-500">

//                       {template.description}

//                     </p>

//                   </button>

//                 ))}

//               </div>

//             </div>

//           </div>

//           {/* Footer */}

//           <div className="flex justify-end gap-4 border-t p-6">

//             <button
//               type="button"
//               onClick={onClose}
//               className="rounded-lg border px-6 py-3"
//             >

//               Cancel

//             </button>

//             <button
//               type="submit"
//               className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
//             >

//               Create Resume

//             </button>

//           </div>

//         </form>

//       </div>

//     </div>
//   );
// }

import { useState } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import { Briefcase, FileText, Sparkles } from "lucide-react";

import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import type { ResumeTemplate } from "../types/resume.types";

import { createResume } from "../services/resume.service";
interface Props {
  open: boolean;
  onClose: () => void;
}

interface CreateResumeForm {
  title: string;
  targetRole: string;
    templateId: ResumeTemplate;
}

interface TemplateOption {
  id: ResumeTemplate;
  name: string;
  color: string;
  ats: string;
}

const templates: TemplateOption[] = [
  {
    id: "technical-developer",
    name: "Technical Developer",
    color: "bg-slate-100",
    ats: "98% ATS",
  },
  {
    id: "modern-professional",
    name: "Modern Professional",
    color: "bg-blue-50",
    ats: "96% ATS",
  },
  {
    id: "minimal-clean",
    name: "Minimal Clean",
    color: "bg-gray-100",
    ats: "95% ATS",
  },
];
export default function CreateResumeModal({ open, onClose }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateResumeForm>({
    defaultValues: {
      templateId: "technical-developer",
    },
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const selected = watch("templateId");

  const onSubmit = async (data: CreateResumeForm) => {
    try {
      setLoading(true);

      const resume = await createResume(data);

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
      description="Start with an ATS-friendly professional template."
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-6">
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
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2">
            <Sparkles size={18} />

            <h3 className="text-lg font-bold">Choose Template</h3>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {templates.map((template) => (
              <Card
                key={template.id}
                className={`
                cursor-pointer
                overflow-hidden
                border-2
                transition-all
                ${
                  selected === template.id
                    ? "border-blue-600"
                    : "border-transparent"
                }
                `}
              >
                <button
                  type="button"
                  onClick={() => setValue("templateId", template.id  )}
                  className="w-full text-left"
                >
                  <div
                    className={`h-48 ${template.color} flex items-center justify-center`}
                  >
                    <div className="rounded bg-white p-6 shadow">Resume</div>
                  </div>

                  <div className="space-y-2 p-5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{template.name}</h4>

                      <Badge>{template.ats}</Badge>
                    </div>

                    <p className="text-sm text-slate-500">
                      Professional ATS Optimized Layout
                    </p>
                  </div>
                </button>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
  <Button
    type="button"
    variant="outline"
    onClick={onClose}
    disabled={loading}
  >
    Cancel
  </Button>

  <Button
    type="submit"
    disabled={loading}
  >
    {loading ? "Creating..." : "Create Resume"}
  </Button>
</div>
      </form>
    </Modal>
  );
}
