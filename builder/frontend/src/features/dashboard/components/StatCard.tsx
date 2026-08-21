import type { ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  icon: ReactNode;
  subtitle?: string;
}

export default function StatCard({ title, value, icon, subtitle }: Props) {
  return (
    <div className="group rounded-2xl border border-primary/10 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary/70">{title}</p>

          <h2 className="text-3xl font-bold text-dark">{value}</h2>

          {subtitle && <p className="text-sm text-primary/50">{subtitle}</p>}
        </div>

        <div className="rounded-xl bg-accent/15 p-3 text-primary transition group-hover:bg-primary group-hover:text-background">
          {icon}
        </div>
      </div>
    </div>
  );
}
