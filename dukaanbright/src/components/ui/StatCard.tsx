import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  change?: string;
  changeColor?: string;
  className?: string;
}

export function StatCard({
  label, value, icon, iconColor, iconBg,
  change, changeColor = "text-on-surface-variant", className,
}: StatCardProps) {
  return (
    <div className={cn(
      "bg-surface-container-lowest rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-200",
      className
    )}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-400 leading-tight">
          {label}
        </span>
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", iconBg)}>
          <span className={cn("material-symbols-outlined text-[18px]", iconColor)}>{icon}</span>
        </div>
      </div>
      <p className="text-3xl font-extrabold text-on-surface tracking-tight">{value}</p>
      {change && (
        <p className={cn("text-xs font-bold mt-1", changeColor)}>{change}</p>
      )}
    </div>
  );
}
