import { TrafficEntry } from "@/types/network";

interface TrafficTableProps {
  entries: TrafficEntry[];
}

function ClassBadge({ classification, threat }: { classification: string; threat: boolean }) {
  const colors: Record<string, string> = {
    Streaming: "bg-primary/15 text-primary",
    VoIP: "bg-success/15 text-success",
    "Web Browsing": "bg-primary/15 text-primary",
    "File Transfer": "bg-warning/15 text-warning",
    Malware: "bg-threat/15 text-threat",
    DDoS: "bg-threat/15 text-threat",
    DNS: "bg-muted text-muted-foreground",
    Gaming: "bg-purple-500/15 text-purple-400",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium ${colors[classification] || "bg-muted text-muted-foreground"}`}>
      {threat && <span className="h-1.5 w-1.5 rounded-full bg-threat animate-pulse" />}
      {classification}
    </span>
  );
}

export function TrafficTable({ entries }: TrafficTableProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">
          Live Classification Stream
        </h3>
        <span className="flex items-center gap-1.5 text-xs text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success pulse-glow" />
          Real-time
        </span>
      </div>
      <div className="overflow-auto max-h-[420px]">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-card z-10">
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left px-4 py-2 font-medium">Packet ID</th>
              <th className="text-left px-4 py-2 font-medium">Source</th>
              <th className="text-left px-4 py-2 font-medium">Destination</th>
              <th className="text-left px-4 py-2 font-medium">Proto</th>
              <th className="text-left px-4 py-2 font-medium">Port</th>
              <th className="text-right px-4 py-2 font-medium">Bytes</th>
              <th className="text-left px-4 py-2 font-medium">Classification</th>
              <th className="text-right px-4 py-2 font-medium">Confidence</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr
                key={entry.id}
                className={`border-b border-border/50 hover:bg-secondary/50 transition-colors ${
                  entry.threat ? "bg-threat/5" : ""
                }`}
              >
                <td className="px-4 py-2 font-mono text-muted-foreground">{entry.id}</td>
                <td className="px-4 py-2 font-mono">{entry.sourceIp}</td>
                <td className="px-4 py-2 font-mono">{entry.destIp}</td>
                <td className="px-4 py-2 font-mono">{entry.protocol}</td>
                <td className="px-4 py-2 font-mono">{entry.port}</td>
                <td className="px-4 py-2 font-mono text-right">
                  {entry.bytes > 1024 ? `${(entry.bytes / 1024).toFixed(1)}K` : entry.bytes}
                </td>
                <td className="px-4 py-2">
                  <ClassBadge classification={entry.classification} threat={entry.threat} />
                </td>
                <td className="px-4 py-2 font-mono text-right">
                  <span className={entry.confidence > 0.95 ? "text-success" : entry.confidence > 0.85 ? "text-foreground" : "text-warning"}>
                    {(entry.confidence * 100).toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
