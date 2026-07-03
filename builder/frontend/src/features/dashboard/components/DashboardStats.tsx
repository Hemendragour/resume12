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
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total Resumes"
        value={total}
        icon={<FileText size={24} />}
      />

      <StatCard title="Draft" value={draft} icon={<FileClock size={24} />} />

      <StatCard
        title="Completed"
        value={completed}
        icon={<CircleCheckBig size={24} />}
      />

      <StatCard
  title="Downloads"
  value={downloads}
  icon={<Clock3 size={24} />}
/>
    </div>
  );
}
