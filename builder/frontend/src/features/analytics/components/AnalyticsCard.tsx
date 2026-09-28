import type { ReactNode } from "react";

interface Props {
  title: string;
  value: number;
  icon?: ReactNode;
}

export default function AnalyticsCard({ title, value, icon }: Props) {
  return (
    <div className="rounded-2xl bg-navbar p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-nav-text">{title}</p>
        {icon && <div className="text-2xl">{icon}</div>}
      </div>

      <h2 className="mt-4 text-4xl font-bold text-heading">{value}</h2>
    </div>
  );
}