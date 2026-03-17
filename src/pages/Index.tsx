import { useState, useEffect, useCallback } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { StatusCard } from "@/components/StatusCard";
import { TrafficTable } from "@/components/TrafficTable";
import { ThroughputChart, ThreatChart, ClassificationPieChart } from "@/components/Charts";
import { ModelStatus } from "@/components/ModelStatus";
import { generateTrafficBatch, statusMetrics } from "@/data/mockData";
import { TrafficEntry } from "@/types/network";

export default function Index() {
  const [activeView, setActiveView] = useState("overview");
  const [trafficData, setTrafficData] = useState<TrafficEntry[]>(() => generateTrafficBatch(50));

  const addEntries = useCallback(() => {
    setTrafficData((prev) => {
      const newEntries = generateTrafficBatch(3, prev.length);
      return [...newEntries, ...prev].slice(0, 200);
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(addEntries, 2000);
    return () => clearInterval(interval);
  }, [addEntries]);

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar activeView={activeView} onNavigate={setActiveView} />

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm border-b border-border px-6 py-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Network Intelligence Dashboard</h2>
            <p className="text-xs text-muted-foreground">
              Deep Learning Traffic Classification • Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="h-2 w-2 rounded-full bg-success pulse-glow" />
              <span className="text-muted-foreground">Model v3.2.1 Active</span>
            </div>
            <div className="px-3 py-1 bg-secondary rounded text-xs font-mono text-foreground">
              {trafficData.length} packets buffered
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Status Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {statusMetrics.map((metric) => (
              <StatusCard key={metric.label} metric={metric} />
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <ThroughputChart />
            </div>
            <ClassificationPieChart />
          </div>

          {/* Threat + Model Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ThreatChart />
            <ModelStatus />
          </div>

          {/* Traffic Table */}
          <TrafficTable entries={trafficData} />
        </div>
      </main>
    </div>
  );
}
