// import { Sparkles, FileText, ScanSearch, Download, Share2 } from "lucide-react";

// const activities = [
//   {
//     title: "AI generated a professional summary",
//     time: "2 min ago",
//     icon: Sparkles,
//   },
//   {
//     title: "Resume updated",
//     time: "15 min ago",
//     icon: FileText,
//   },
//   {
//     title: "ATS Analysis completed",
//     time: "1 hour ago",
//     icon: ScanSearch,
//   },
//   {
//     title: "Resume downloaded",
//     time: "Yesterday",
//     icon: Download,
//   },
//   {
//     title: "Resume shared",
//     time: "2 days ago",
//     icon: Share2,
//   },
// ];

// export default function RecentActivity() {
//   return (
//     <section className="rounded-2xl border border-dark-border bg-card p-6 shadow-sm">
//       <h2 className="mb-6 text-2xl font-bold text-dark">Recent Activity</h2>

//       <div className="space-y-5">
//         {activities.map((item) => {
//           const Icon = item.icon;

//           return (
//             <div key={item.title} className="flex items-center gap-4">
//               <div className="rounded-xl bg-info/10 p-3">
//                 <Icon size={20} className="text-info" />
//               </div>

//               <div className="flex-1">
//                 <p className="font-medium text-dark">{item.title}</p>

//                 <p className="text-sm text-primary/70">{item.time}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

// RecentActivity.tsx
import { Sparkles, FileText, ScanSearch, Download, Share2 } from "lucide-react";

const activities = [
  {
    title: "AI generated a professional summary",
    time: "2 min ago",
    icon: Sparkles,
  },
  {
    title: "Resume updated",
    time: "15 min ago",
    icon: FileText,
  },
  {
    title: "ATS Analysis completed",
    time: "1 hour ago",
    icon: ScanSearch,
  },
  {
    title: "Resume downloaded",
    time: "Yesterday",
    icon: Download,
  },
  {
    title: "Resume shared",
    time: "2 days ago",
    icon: Share2,
  },
];

export default function RecentActivity() {
  return (
    <section className="rounded-2xl border border-primary/10 bg-card p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-dark">Recent Activity</h2>

      <div className="space-y-5">
        {activities.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="flex items-center gap-4">
              <div className="rounded-xl bg-accent/15 p-3">
                <Icon size={20} className="text-primary" />
              </div>

              <div className="flex-1">
                <p className="font-medium text-dark">{item.title}</p>

                <p className="text-sm text-primary/70">{item.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
