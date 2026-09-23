// import { ArrowRight, Plus } from "lucide-react";

// interface Props {
//   name: string;
//   onCreate: () => void;
//   onContinue: () => void;
// }

// export default function WelcomeBanner({
//   name,
//   onCreate,
//   onContinue,
// }: Props) {
//   return (
//     <section className="rounded-3xl bg-gradient-to-r from-blue-600 via-blue-500 to-violet-600 p-8 text-white shadow-lg">
//       <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
//         <div>
//           <p className="text-sm uppercase tracking-widest text-blue-100">
//             Welcome Back
//           </p>

//           <h1 className="mt-2 text-4xl font-bold">
//             Hi, {name} 👋
//           </h1>

//           <p className="mt-3 max-w-xl text-blue-100">
//             Continue building your ATS-friendly resume and get closer to your
//             next job opportunity.
//           </p>
//         </div>

//         <div className="flex gap-4">
//           <button
//             onClick={onContinue}
//             className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:scale-105"
//           >
//             <ArrowRight size={18} />
//             Continue
//           </button>

//           <button
//             onClick={onCreate}
//             className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/20"
//           >
//             <Plus size={18} />
//             New Resume
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

import { ArrowRight, Plus } from "lucide-react";

interface Props {
  name: string;
  onCreate: () => void;
  onContinue: () => void;
}

export default function WelcomeBanner({ name, onCreate, onContinue }: Props) {
  return (
    <section className="rounded-2xl bg-linear-to-r from-primary via-tan to-accent p-5 text-background shadow-lg sm:rounded-3xl sm:p-8">
      <div className="flex flex-col items-start justify-between gap-5 sm:gap-6 lg:flex-row lg:items-center">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-widest text-background/80 sm:text-sm">
            Welcome Back
          </p>

          <h1 className="mt-2 text-2xl font-bold break-words sm:text-3xl lg:text-4xl">
            Hi, {name} 👋
          </h1>

          <p className="mt-3 max-w-xl text-sm text-background/80 sm:text-base">
            Continue building your ATS-friendly resume and get closer to your
            next job opportunity.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 min-[420px]:flex-row sm:w-auto sm:gap-4">
          <button
            onClick={onContinue}
            className="flex items-center justify-center gap-2 rounded-xl bg-background px-5 py-3 text-sm font-semibold text-primary transition hover:scale-105 sm:px-6 sm:text-base"
          >
            <ArrowRight size={18} />
            Continue
          </button>

          <button
            onClick={onCreate}
            className="flex items-center justify-center gap-2 rounded-xl border border-background/30 bg-background/10 px-5 py-3 text-sm font-semibold backdrop-blur transition hover:bg-background/20 sm:px-6 sm:text-base"
          >
            <Plus size={18} />
            New Resume
          </button>
        </div>
      </div>
    </section>
  );
}
