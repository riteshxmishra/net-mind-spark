export function ModelStatus() {
  const layers = [
    { name: "Input Layer", neurons: 1024, type: "Dense" },
    { name: "Conv1D Block", neurons: 512, type: "Conv1D + BN + ReLU" },
    { name: "LSTM Layer", neurons: 256, type: "Bidirectional LSTM" },
    { name: "Attention", neurons: 256, type: "Multi-Head Attention" },
    { name: "Dense Block", neurons: 128, type: "Dense + Dropout(0.3)" },
    { name: "Output", neurons: 8, type: "Softmax" },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3">Deep Neural Network Architecture</h3>
      <div className="space-y-1.5">
        {layers.map((layer, i) => (
          <div key={i} className="flex items-center gap-3 text-xs">
            <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
            <div className="flex-1 flex items-center justify-between bg-secondary/50 rounded px-3 py-1.5">
              <span className="font-medium text-foreground">{layer.name}</span>
              <span className="font-mono text-muted-foreground">{layer.type} ({layer.neurons})</span>
            </div>
            {i < layers.length - 1 && (
              <div className="absolute left-[19px] mt-6 w-px h-1.5 bg-border" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { label: "Parameters", value: "2.4M" },
          { label: "Training Loss", value: "0.0312" },
          { label: "Val Accuracy", value: "97.8%" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-lg font-semibold font-mono text-foreground">{stat.value}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
