import { FileText, FileClock, CircleCheckBig, Clock3 } from "lucide-react";

import StatCard from "./StatCard";
interface Props {
  total: number;
  draft: number;
  completed: number;
  downloads: number;
}

export default function DashboardStats({
  total,
  draft,
  completed,
  downloads,
}: Props) {
  return (
    <div className="grid min-w-0 grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-6 lg:grid-cols-4">
      <StatCard
        title="Total Resumes"
        value={total}
        icon={<FileText size={22} />}
      />

      <StatCard title="Draft" value={draft} icon={<FileClock size={22} />} />

      <StatCard
        title="Completed"
        value={completed}
        icon={<CircleCheckBig size={22} />}
      />

      <StatCard
        title="Downloads"
        value={downloads}
        icon={<Clock3 size={22} />}
      />
    </div>
  );
}
