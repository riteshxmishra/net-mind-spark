export interface TrafficEntry {
  id: string;
  timestamp: string;
  sourceIp: string;
  destIp: string;
  protocol: string;
  bytes: number;
  classification: "Streaming" | "VoIP" | "Web Browsing" | "File Transfer" | "Malware" | "DDoS" | "DNS" | "Gaming";
  confidence: number;
  threat: boolean;
  port: number;
}

export interface StatusMetric {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "stable";
  status: "normal" | "warning" | "threat";
}
