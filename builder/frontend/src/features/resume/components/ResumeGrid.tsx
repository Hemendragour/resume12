// import ResumeCard from "./ResumeCard";

// import EmptyState from "../../dashboard/components/EmptyState";

// import { useResumes } from "../hooks/useResumes";

// interface Props {
//   resumes: Resume[];
//   loading: boolean;
//   onCreate: () => void;
//   onRefresh: () => void;
// }

// export default function ResumeGrid({
//   resumes,
//   loading,
//   onCreate,
//   onRefresh,
// }: Props) {

//   if (loading) {
//     return (
//       <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//         {Array.from({
//           length: 6,
//         }).map((_, index) => (
//           <div
//             key={index}
//             className="h-96 animate-pulse rounded-3xl bg-slate-200"
//           />
//         ))}
//       </div>
//     );
//   }

//   if (!resumes.length) {
//     return (
//       <EmptyState
//         onCreate={onCreate}
//       />
//     );
//   }

//   return (
//     <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
//       {resumes.map((resume) => (
//        <ResumeCard
//   key={resume._id}
//   resume={resume}
//   onRefresh={onRefresh}
// />
//       ))}
//     </div>
//   );
// }

import ResumeCard from "./ResumeCard";
import EmptyState from "../../dashboard/components/EmptyState";

import type { Resume } from "../types/resume.types"; // ← Ye import zaroori hai
// import { useResumes } from "../hooks/useResumes";

interface Props {
  resumes: Resume[];
  loading: boolean;
  onCreate: () => void;
  onRefresh: () => void;
}

export default function ResumeGrid({
  resumes,
  loading,
  onCreate,
  onRefresh,
}: Props) {
  // Loading State
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-96 animate-pulse rounded-3xl bg-slate-200"
          />
        ))}
      </div>
    );
  }

  // Empty State
  if (!resumes || resumes.length === 0) {
    return <EmptyState onCreate={onCreate} />;
  }

  // Resume Cards
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {resumes.map((resume) => (
        <ResumeCard key={resume._id} resume={resume} onRefresh={onRefresh} />
      ))}
    </div>
  );
}
