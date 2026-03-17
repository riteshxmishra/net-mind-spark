import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";
import { generateTimeSeriesData, classificationDistribution } from "@/data/mockData";

const timeData = generateTimeSeriesData(24);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-card border border-border rounded px-3 py-2 text-xs shadow-lg">
      <p className="text-muted-foreground mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="font-mono">
          {p.name}: {p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export function ThroughputChart() {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-foreground mb-4">Network Throughput (Mbps)</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={timeData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 22%)" />
          <XAxis dataKey="time" stroke="hsl(215, 20%, 55%)" fontSize={10} tickLine={false} />
          <YAxis stroke="hsl(215, 20%, 55%)" fontSize={10} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="throughput" stroke="hsl(199, 89%, 60%)" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="bandwidth" stroke="hsl(160, 84%, 39%)" strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ThreatChart() {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-foreground mb-4">Threat Detections (24h)</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={timeData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 22%)" />
          <XAxis dataKey="time" stroke="hsl(215, 20%, 55%)" fontSize={10} tickLine={false} />
          <YAxis stroke="hsl(215, 20%, 55%)" fontSize={10} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="threats" fill="hsl(0, 84%, 60%)" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ClassificationPieChart() {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-foreground mb-4">Traffic Distribution</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={classificationDistribution}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {classificationDistribution.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-1 mt-2">
        {classificationDistribution.map((d) => (
          <div key={d.name} className="flex items-center gap-1.5 text-xs">
            <span className="h-2 w-2 rounded-full shrink-0" style={{ background: d.fill }} />
            <span className="text-muted-foreground truncate">{d.name}</span>
            <span className="font-mono text-foreground ml-auto">{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
