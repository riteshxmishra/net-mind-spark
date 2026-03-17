import { useState } from "react";
import {
  Activity, Shield, BarChart3, Radio, Settings, ChevronLeft,
  Network, Brain, AlertTriangle, Gauge
} from "lucide-react";

const navItems = [
  { icon: Gauge, label: "Overview", id: "overview" },
  { icon: Radio, label: "Live Stream", id: "live" },
  { icon: Shield, label: "Threat Intel", id: "threats" },
  { icon: BarChart3, label: "Bandwidth", id: "bandwidth" },
  { icon: Brain, label: "DL Models", id: "models" },
  { icon: AlertTriangle, label: "Alerts", id: "alerts" },
  { icon: Settings, label: "Settings", id: "settings" },
];

interface AppSidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

export function AppSidebar({ activeView, onNavigate }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-200 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      <div className="flex items-center gap-2 px-4 py-4 border-b border-sidebar-border">
        <Network className="h-6 w-6 text-primary shrink-0" />
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold text-foreground leading-tight">NetClassify</h1>
            <p className="text-[10px] text-muted-foreground">Deep Learning NOC</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      <nav className="flex-1 py-2 space-y-0.5 px-2">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="px-3 py-3 border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <Activity className="h-3.5 w-3.5 text-success pulse-glow shrink-0" />
          {!collapsed && (
            <span className="text-[10px] text-muted-foreground">
              System Operational
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
