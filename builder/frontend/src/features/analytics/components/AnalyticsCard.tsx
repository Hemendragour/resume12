import type { ReactNode } from "react";

interface Props {
  title: string;
  value: number;
  icon?: ReactNode;
}

export default function AnalyticsCard({ title, value, icon }: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{title}</p>
        {icon && <div className="text-2xl">{icon}</div>}
      </div>

      <h2 className="mt-4 text-4xl font-bold text-gray-900">{value}</h2>
    </div>
  );
}