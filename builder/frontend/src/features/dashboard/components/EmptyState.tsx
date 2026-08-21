// import { FilePlus2 } from "lucide-react";

// import Button from "../../../components/ui/Button";

// interface Props {
//   onCreate: () => void;
// }

// export default function EmptyState({ onCreate }: Props) {
//   return (
//     <div className="rounded-3xl border-2 border-dashed border-dark-border bg-card p-16 text-center shadow-sm">
//       <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-info/10">
//         <FilePlus2 size={46} className="text-info" />
//       </div>

//       <h2 className="mt-8 text-3xl font-bold text-dark">No Resume Yet</h2>

//       <p className="mx-auto mt-4 max-w-md text-primary/70">
//         Build an ATS-friendly resume in just a few minutes. Create your first
//         resume to get started.
//       </p>

//       <div className="mt-8">
//         <Button onClick={onCreate}>Create Resume</Button>
//       </div>

//       <div className="mt-10 grid gap-4 md:grid-cols-3">
//         <div className="rounded-xl bg-background p-5">
//           <h3 className="font-semibold text-dark">ATS Friendly</h3>

//           <p className="mt-2 text-sm text-primary/70">
//             Optimized for recruiters and applicant tracking systems.
//           </p>
//         </div>

//         <div className="rounded-xl bg-background p-5">
//           <h3 className="font-semibold text-dark">Live Preview</h3>

//           <p className="mt-2 text-sm text-primary/70">
//             Instantly see every change while editing your resume.
//           </p>
//         </div>

//         <div className="rounded-xl bg-background p-5">
//           <h3 className="font-semibold text-dark">AI Ready</h3>

//           <p className="mt-2 text-sm text-primary/70">
//             Generate summaries and improve resume content using AI.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// EmptyState.tsx
import { FilePlus2 } from "lucide-react";

import Button from "../../../components/ui/Button";

interface Props {
  onCreate: () => void;
}

export default function EmptyState({ onCreate }: Props) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-primary/15 bg-card p-16 text-center shadow-sm">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-accent/15">
        <FilePlus2 size={46} className="text-primary" />
      </div>

      <h2 className="mt-8 text-3xl font-bold text-dark">No Resume Yet</h2>

      <p className="mx-auto mt-4 max-w-md text-primary/70">
        Build an ATS-friendly resume in just a few minutes. Create your first
        resume to get started.
      </p>

      <div className="mt-8">
        <Button onClick={onCreate}>Create Resume</Button>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-background p-5">
          <h3 className="font-semibold text-dark">ATS Friendly</h3>

          <p className="mt-2 text-sm text-primary/70">
            Optimized for recruiters and applicant tracking systems.
          </p>
        </div>

        <div className="rounded-xl bg-background p-5">
          <h3 className="font-semibold text-dark">Live Preview</h3>

          <p className="mt-2 text-sm text-primary/70">
            Instantly see every change while editing your resume.
          </p>
        </div>

        <div className="rounded-xl bg-background p-5">
          <h3 className="font-semibold text-dark">AI Ready</h3>

          <p className="mt-2 text-sm text-primary/70">
            Generate summaries and improve resume content using AI.
          </p>
        </div>
      </div>
    </div>
  );
}
