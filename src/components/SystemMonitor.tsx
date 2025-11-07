import { useState, useEffect } from "react";
import { Terminal, Activity } from "lucide-react";

export function SystemMonitor() {
  const [activeMetric, setActiveMetric] = useState(0);

  const metrics = [
    { label: "GPU_UTIL", value: "94.2%", status: "optimal" },
    { label: "MEM_POOL", value: "42.8 MB", status: "nominal" },
    { label: "FRAME_TIME", value: "4.7 ms", status: "optimal" },
    { label: "CELL_COUNT", value: "2.07M", status: "nominal" },
    { label: "THREAD_POOL", value: "8/8 active", status: "optimal" },
    { label: "BUFFER_SWAP", value: "lock-free", status: "optimal" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [metrics.length]);

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-6">
      <div className="flex items-center gap-3 mb-4">
        <Terminal className="w-5 h-5 text-violet-400" />
        <h4 className="text-violet-200">System Monitor</h4>
        <Activity className="w-4 h-4 text-green-400 animate-pulse ml-auto" />
      </div>
      <div className="font-mono text-xs space-y-1">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className={`flex justify-between items-center p-2 rounded transition-all ${
              idx === activeMetric
                ? "bg-violet-600/20 border-l-2 border-violet-400"
                : "bg-violet-950/30"
            }`}
          >
            <span className="text-violet-300/70">{metric.label}:</span>
            <div className="flex items-center gap-2">
              <span className="text-violet-200">{metric.value}</span>
              <span
                className={`w-2 h-2 rounded-full ${
                  metric.status === "optimal"
                    ? "bg-green-400"
                    : "bg-yellow-400"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-violet-500/20 text-xs text-violet-300/60">
        <span className="text-green-400">●</span> All systems operational
      </div>
    </div>
  );
}
