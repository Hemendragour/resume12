import type { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  icon: ReactNode;
  subtitle?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  subtitle,
}: Props) {
  return (
    <div className="group rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div className="space-y-2">

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-slate-900">
            {value}
          </h2>

          {subtitle && (
            <p className="text-sm text-slate-400">
              {subtitle}
            </p>
          )}

        </div>

        <div className="rounded-xl bg-blue-100 p-3 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
          {icon}
        </div>

      </div>

    </div>
  );
}