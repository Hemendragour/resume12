// import { useResumeStore } from "../../../../store/resume.store";
// import Input from "../../../../components/ui/Input";

// export default function StrengthsSection() {
//   const resume = useResumeStore((state) => state.resume);

//   const addStrength = useResumeStore((state) => state.addStrength);
//   const updateStrength = useResumeStore(
//     (state) => state.updateStrength
//   );
//   const deleteStrength = useResumeStore(
//     (state) => state.deleteStrength
//   );

//   const renameSectionDisplayTitle = useResumeStore(
//     (state) => state.renameSectionDisplayTitle
//   );

//   if (!resume) return null;

//   const strengths = resume.strengths ?? [];

//   const strengthSection = resume.sections.find(
//     (section) => section.id === "strengths"
//   );

//   return (
//     <div className="space-y-6">
//       <Input
//         label="Resume Heading"
//         placeholder="Strengths"
//         value={strengthSection?.displayTitle ?? ""}
//         onChange={(e) =>
//           renameSectionDisplayTitle(
//             "strengths",
//             e.target.value
//           )
//         }
//       />

//       <div className="space-y-4">
//         {strengths.map((strength, index) => (
//           <div
//             key={index}
//             className="rounded-lg border p-4 space-y-3"
//           >
//             <Input
//               label="Strength"
//               placeholder="Problem Solving"
//               value={strength.title}
//               onChange={(e) =>
//                 updateStrength(index, {
//                   ...strength,
//                   title: e.target.value,
//                 })
//               }
//             />

//             <textarea
//               className="w-full rounded-lg border p-3 outline-none focus:border-blue-600"
//               rows={3}
//               placeholder="Describe your strength..."
//               value={strength.description}
//               onChange={(e) =>
//                 updateStrength(index, {
//                   ...strength,
//                   description: e.target.value,
//                 })
//               }
//             />

//             <button
//               type="button"
//               onClick={() => deleteStrength(index)}
//               className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>

//       <button
//         type="button"
//         onClick={() =>
//           addStrength({
//             title: "",
//             description: "",
//           })
//         }
//         className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
//       >
//         + Add Strength
//       </button>
//     </div>
//   );
// }

import { useResumeStore } from "../../../../store/resume.store";
import Input from "../../../../components/ui/Input";

export default function StrengthsSection() {
  const resume = useResumeStore((state) => state.resume);

  const addStrength = useResumeStore((state) => state.addStrength);
  const updateStrength = useResumeStore((state) => state.updateStrength);
  const deleteStrength = useResumeStore((state) => state.deleteStrength);

  const renameSectionDisplayTitle = useResumeStore(
    (state) => state.renameSectionDisplayTitle,
  );

  if (!resume) return null;

  const strengths = resume.strengths ?? [];

  const strengthSection = resume.sections.find(
    (section) => section.id === "strengths",
  );

  return (
    <div className="space-y-6">
      <Input
        label="Resume Heading"
        placeholder="Strengths"
        value={strengthSection?.displayTitle ?? ""}
        onChange={(e) => renameSectionDisplayTitle("strengths", e.target.value)}
      />

      <div className="space-y-4">
        {strengths.map((strength, index) => (
          <div
            key={index}
            className="rounded-lg border border-primary/10 bg-modal p-4 space-y-3"
          >
            <Input
              label="Strength"
              placeholder="Problem Solving"
              value={strength.title}
              onChange={(e) =>
                updateStrength(index, {
                  ...strength,
                  title: e.target.value,
                })
              }
            />

            <textarea
              className="w-full rounded-lg border border-primary/15 bg-card p-3 text-dark outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              rows={3}
              placeholder="Describe your strength..."
              value={strength.description}
              onChange={(e) =>
                updateStrength(index, {
                  ...strength,
                  description: e.target.value,
                })
              }
            />

            <button
              type="button"
              onClick={() => deleteStrength(index)}
              className="rounded-lg bg-danger px-4 py-2 text-white hover:opacity-90"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() =>
          addStrength({
            title: "",
            description: "",
          })
        }
        className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-dark"
      >
        + Add Strength
      </button>
    </div>
  );
}
