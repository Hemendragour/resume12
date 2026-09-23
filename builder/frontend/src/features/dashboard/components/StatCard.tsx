import type { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  icon: ReactNode;
  subtitle?: string;
}

export default function StatCard({ title, value, icon, subtitle }: Props) {
  return (
    <div className="group min-w-0 rounded-2xl border border-primary/10 bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 space-y-1 sm:space-y-2">
          <p className="truncate text-xs font-medium text-primary/70 sm:text-sm">
            {title}
          </p>

          <h2 className="text-xl font-bold text-dark sm:text-3xl">{value}</h2>

          {subtitle && (
            <p className="truncate text-xs text-primary/50 sm:text-sm">
              {subtitle}
            </p>
          )}
        </div>

        <div className="shrink-0 rounded-xl bg-accent/15 p-2 text-primary transition group-hover:bg-primary group-hover:text-background sm:p-3">
          {icon}
        </div>
      </div>
    </div>
  );
}
