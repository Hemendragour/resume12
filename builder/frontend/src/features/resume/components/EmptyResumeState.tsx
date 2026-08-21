// import { FilePlus2 } from "lucide-react";

// interface Props {
//   onCreate: () => void;
// }

// export default function EmptyResumeState({ onCreate }: Props) {
//   return (
//     <div className="rounded-3xl border-2 border-dashed border-gray-300 bg-white py-20 text-center">
//       <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
//         <FilePlus2 size={36} className="text-blue-600" />
//       </div>

//       <h2 className="mt-6 text-3xl font-bold">No Resume Yet</h2>

//       <p className="mt-3 text-gray-500">
//         Create your first ATS-friendly resume.
//       </p>

//       <button
//         onClick={onCreate}
//         className="mt-8 rounded-xl bg-blue-600 px-8 py-3 text-white hover:bg-blue-700"
//       >
//         + Create Resume
//       </button>
//     </div>
//   );
// }

// EmptyResumeState.tsx
import { FilePlus2 } from "lucide-react";

interface Props {
  onCreate: () => void;
}

export default function EmptyResumeState({ onCreate }: Props) {
  return (
    <div className="rounded-3xl border-2 border-dashed border-primary/15 bg-card py-20 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/15">
        <FilePlus2 size={36} className="text-primary" />
      </div>

      <h2 className="mt-6 text-3xl font-bold text-dark">No Resume Yet</h2>

      <p className="mt-3 text-primary/70">
        Create your first ATS-friendly resume.
      </p>

      <button
        onClick={onCreate}
        className="mt-8 rounded-xl bg-primary px-8 py-3 text-white hover:bg-dark"
      >
        + Create Resume
      </button>
    </div>
  );
}
