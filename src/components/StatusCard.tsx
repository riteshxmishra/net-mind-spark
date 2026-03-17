import { StatusMetric } from "@/types/network";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface StatusCardProps {
  metric: StatusMetric;
}

export function StatusCard({ metric }: StatusCardProps) {
  const statusColor = {
    normal: "border-border",
    warning: "border-warning/50",
    threat: "border-threat/50",
  }[metric.status];

  const trendIcon = {
    up: <ArrowUp className="h-3 w-3" />,
    down: <ArrowDown className="h-3 w-3" />,
    stable: <Minus className="h-3 w-3" />,
  }[metric.trend];

  const trendColor = metric.status === "threat"
    ? "text-threat"
    : metric.trend === "up"
    ? "text-success"
    : "text-muted-foreground";

  return (
    <div className={`bg-card border ${statusColor} rounded-lg p-4 space-y-1`}>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {metric.label}
      </p>
      <p className="text-2xl font-semibold text-foreground font-mono">
        {metric.value}
      </p>
      <div className={`flex items-center gap-1 text-xs ${trendColor}`}>
        {trendIcon}
        <span>{metric.change}</span>
      </div>
    </div>
  );
}
