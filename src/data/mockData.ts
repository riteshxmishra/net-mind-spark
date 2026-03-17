import { TrafficEntry, StatusMetric } from "@/types/network";

const classifications: TrafficEntry["classification"][] = [
  "Streaming", "VoIP", "Web Browsing", "File Transfer", "Malware", "DDoS", "DNS", "Gaming"
];

const protocols = ["TCP", "UDP", "ICMP", "HTTP", "HTTPS", "DNS", "QUIC"];

function randomIp() {
  return `${Math.floor(Math.random() * 223) + 1}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}

export function generateTrafficEntry(id: number): TrafficEntry {
  const classification = classifications[Math.floor(Math.random() * classifications.length)];
  const isThreat = classification === "Malware" || classification === "DDoS";
  return {
    id: `PKT-${String(id).padStart(6, "0")}`,
    timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
    sourceIp: randomIp(),
    destIp: randomIp(),
    protocol: protocols[Math.floor(Math.random() * protocols.length)],
    bytes: Math.floor(Math.random() * 50000) + 64,
    classification,
    confidence: Math.round((0.75 + Math.random() * 0.24) * 100) / 100,
    threat: isThreat,
    port: [80, 443, 8080, 53, 22, 3389, 5060, 8443][Math.floor(Math.random() * 8)],
  };
}

export function generateTrafficBatch(count: number, startId: number = 0): TrafficEntry[] {
  return Array.from({ length: count }, (_, i) => generateTrafficEntry(startId + i));
}

export function generateTimeSeriesData(points: number = 24) {
  return Array.from({ length: points }, (_, i) => {
    const hour = new Date(Date.now() - (points - i) * 3600000);
    return {
      time: hour.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      throughput: Math.floor(2000 + Math.random() * 3000 + Math.sin(i / 3) * 1000),
      threats: Math.floor(Math.random() * 15 + (i > 18 ? 10 : 2)),
      bandwidth: Math.floor(500 + Math.random() * 1500),
    };
  });
}

export const statusMetrics: StatusMetric[] = [
  { label: "Total Throughput", value: "4.7 Gbps", change: "+12.3%", trend: "up", status: "normal" },
  { label: "Classification Accuracy", value: "97.8%", change: "+0.4%", trend: "up", status: "normal" },
  { label: "Active Threats", value: "23", change: "+8", trend: "up", status: "threat" },
  { label: "Bandwidth Saved", value: "1.2 TB", change: "+340 GB", trend: "up", status: "normal" },
  { label: "Avg Latency", value: "2.4ms", change: "-0.3ms", trend: "down", status: "normal" },
  { label: "Model Inference", value: "0.8ms", change: "stable", trend: "stable", status: "normal" },
];

export const classificationDistribution = [
  { name: "Web Browsing", value: 34, fill: "hsl(199, 89%, 60%)" },
  { name: "Streaming", value: 28, fill: "hsl(270, 70%, 60%)" },
  { name: "VoIP", value: 12, fill: "hsl(160, 84%, 39%)" },
  { name: "File Transfer", value: 10, fill: "hsl(38, 92%, 50%)" },
  { name: "DNS", value: 8, fill: "hsl(199, 60%, 40%)" },
  { name: "Gaming", value: 5, fill: "hsl(300, 60%, 50%)" },
  { name: "Malware", value: 2, fill: "hsl(0, 84%, 60%)" },
  { name: "DDoS", value: 1, fill: "hsl(0, 60%, 45%)" },
];
