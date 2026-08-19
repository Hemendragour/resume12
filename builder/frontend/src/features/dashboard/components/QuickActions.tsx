// import { FilePlus2, Sparkles, ScanSearch, Upload } from "lucide-react";

// interface Props {
//   onCreate: () => void;
// }

// const actions = [
//   {
//     title: "Create Resume",
//     description: "Start a new resume",
//     icon: FilePlus2,
//   },
//   {
//     title: "AI Summary",
//     description: "Generate ATS summary",
//     icon: Sparkles,
//   },
//   {
//     title: "ATS Check",
//     description: "Analyze resume score",
//     icon: ScanSearch,
//   },
//   {
//     title: "Import Resume",
//     description: "Upload existing resume",
//     icon: Upload,
//   },
// ];

// export default function QuickActions({ onCreate }: Props) {
//   return (
//     <section>
//       <h2 className="mb-5 text-2xl font-bold">⚡ Quick Actions</h2>

//       <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
//         {actions.map((item) => {
//           const Icon = item.icon;

//           return (
//             <button
//               key={item.title}
//               onClick={() => {
//                 if (item.title === "Create Resume") {
//                   onCreate();
//                 }
//               }}
//               className="rounded-2xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
//             >
//               <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
//                 <Icon size={24} className="text-blue-600" />
//               </div>

//               <h3 className="font-semibold">{item.title}</h3>

//               <p className="mt-2 text-sm text-gray-500">{item.description}</p>
//             </button>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

import { FilePlus2, Sparkles, ScanSearch, Upload } from "lucide-react";

interface Props {
  onCreate: () => void;
}

const actions = [
  {
    title: "Create Resume",
    description: "Start a new resume",
    icon: FilePlus2,
  },
  {
    title: "AI Summary",
    description: "Generate ATS summary",
    icon: Sparkles,
  },
  {
    title: "ATS Check",
    description: "Analyze resume score",
    icon: ScanSearch,
  },
  {
    title: "Import Resume",
    description: "Upload existing resume",
    icon: Upload,
  },
];

export default function QuickActions({ onCreate }: Props) {
  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold text-dark">⚡ Quick Actions</h2>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.title}
              onClick={() => {
                if (item.title === "Create Resume") {
                  onCreate();
                }
              }}
              className="rounded-2xl border border-dark-border bg-card p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-info/10">
                <Icon size={24} className="text-info" />
              </div>

              <h3 className="font-semibold text-dark">{item.title}</h3>

              <p className="mt-2 text-sm text-primary/70">{item.description}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
