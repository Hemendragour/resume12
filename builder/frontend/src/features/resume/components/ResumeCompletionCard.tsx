// import { CircleCheck, CircleX } from "lucide-react";

// interface Props {
//   percentage: number;
//   missing: string[];
// }

// export default function ResumeCompletionCard({ percentage, missing }: Props) {
//   return (
//     <section className="rounded-2xl border bg-white p-6 shadow-sm">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold">Resume Completion</h2>

//           <p className="mt-2 text-gray-500">Improve your resume score.</p>
//         </div>

//         <div className="text-3xl font-bold text-blue-600">{percentage}%</div>
//       </div>

//       <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-200">
//         <div
//           className="h-full rounded-full bg-blue-600"
//           style={{
//             width: `${percentage}%`,
//           }}
//         />
//       </div>

//       <div className="mt-8">
//         <h3 className="mb-4 font-semibold">Complete these sections</h3>

//         <div className="space-y-3">
//           {missing.map((item) => (
//             <div key={item} className="flex items-center gap-3">
//               <CircleX size={18} className="text-red-500" />

//               {item}
//             </div>
//           ))}

//           {missing.length === 0 && (
//             <div className="flex items-center gap-3">
//               <CircleCheck size={18} className="text-green-600" />
//               Resume Completed 🎉
//             </div>
//           )}
//         </div>
//       </div>

//       <button className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
//         Complete Resume
//       </button>
//     </section>
//   );
// }

// ResumeCompletionCard.tsx
import { CircleCheck, CircleX } from "lucide-react";

interface Props {
  percentage: number;
  missing: string[];
}

export default function ResumeCompletionCard({ percentage, missing }: Props) {
  return (
    <section className="rounded-2xl border border-primary/10 bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-dark">Resume Completion</h2>

          <p className="mt-2 text-primary/70">Improve your resume score.</p>
        </div>

        <div className="text-3xl font-bold text-primary">{percentage}%</div>
      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-background">
        <div
          className="h-full rounded-full bg-accent"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div className="mt-8">
        <h3 className="mb-4 font-semibold text-dark">
          Complete these sections
        </h3>

        <div className="space-y-3">
          {missing.map((item) => (
            <div key={item} className="flex items-center gap-3 text-dark">
              <CircleX size={18} className="text-danger" />

              {item}
            </div>
          ))}

          {missing.length === 0 && (
            <div className="flex items-center gap-3 text-dark">
              <CircleCheck size={18} className="text-success" />
              Resume Completed 🎉
            </div>
          )}
        </div>
      </div>

      <button className="mt-8 w-full rounded-xl bg-primary py-3 font-semibold text-white transition hover:bg-dark">
        Complete Resume
      </button>
    </section>
  );
}
