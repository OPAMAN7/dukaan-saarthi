import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  variant?: "green" | "yellow" | "red" | "blue" | "gray" | "teal";
  className?: string;
}

const variantMap = {
  green:  "bg-emerald-50 text-emerald-700",
  yellow: "bg-amber-50 text-amber-700",
  red:    "bg-red-50 text-red-700",
  blue:   "bg-blue-50 text-blue-700",
  gray:   "bg-surface-container text-on-surface-variant",
  teal:   "bg-cyan-50 text-primary-container",
};

export function Badge({ label, variant = "gray", className }: BadgeProps) {
  return (
    <span className={cn(
      "text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wide",
      variantMap[variant],
      className
    )}>
      {label}
    </span>
  );
}

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionHeading({ title, subtitle, action }: SectionHeadingProps) {
  return (
    <div className="flex justify-between items-end mb-6">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight text-on-surface">{title}</h1>
        {subtitle && (
          <p className="text-on-surface-variant mt-1 font-medium">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
