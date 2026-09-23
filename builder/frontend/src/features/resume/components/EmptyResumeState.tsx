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
    <div className="rounded-2xl border-2 border-dashed border-primary/15 bg-card px-6 py-12 text-center sm:rounded-3xl sm:py-20">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 sm:h-20 sm:w-20">
        <FilePlus2 size={32} className="text-primary" />
      </div>

      <h2 className="mt-5 text-2xl font-bold text-dark sm:mt-6 sm:text-3xl">
        No Resume Yet
      </h2>

      <p className="mt-3 text-sm text-primary/70 sm:text-base">
        Create your first ATS-friendly resume.
      </p>

      <button
        onClick={onCreate}
        className="mt-6 w-full rounded-xl bg-primary px-8 py-3 text-white hover:bg-dark sm:mt-8 sm:w-auto"
      >
        + Create Resume
      </button>
    </div>
  );
}
