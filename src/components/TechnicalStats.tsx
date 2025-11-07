import { Code, GitCommit, Cpu, Database, Zap, Terminal } from "lucide-react";

export function TechnicalStats() {
  const stats = [
    {
      icon: Code,
      label: "Lines of Code",
      value: "150k+",
      detail: "Production code written (2024)",
      color: "from-violet-400 to-fuchsia-400",
    },
    {
      icon: GitCommit,
      label: "Commits",
      value: "2,400+",
      detail: "GitHub contributions (annual)",
      color: "from-fuchsia-400 to-pink-400",
    },
    {
      icon: Cpu,
      label: "GPU Kernels",
      value: "12+",
      detail: "WebGPU/CUDA compute shaders",
      color: "from-crimson-400 to-pink-400",
    },
    {
      icon: Database,
      label: "Data Processed",
      value: "200k+",
      detail: "Records analyzed (Capstone)",
      color: "from-violet-400 to-purple-400",
    },
    {
      icon: Zap,
      label: "Performance Gains",
      value: "20×",
      detail: "GPU vs CPU (JAX optimization)",
      color: "from-fuchsia-400 to-violet-400",
    },
    {
      icon: Terminal,
      label: "CLI Tools",
      value: "7+",
      detail: "Command-line utilities built",
      color: "from-crimson-400 to-fuchsia-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_20px_rgba(220,20,60,0.1)] p-6 hover:shadow-[0_0_40px_rgba(139,0,255,0.2)] transition-all"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 rounded-lg bg-gradient-to-br from-violet-600/20 to-crimson-600/20 border border-violet-500/30 mb-4">
                <Icon className="w-6 h-6 text-violet-300" />
              </div>
              <div
                className={`text-2xl bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
              >
                {stat.value}
              </div>
              <div className="text-sm text-violet-200 mb-1">{stat.label}</div>
              <div className="text-xs text-violet-300/60">{stat.detail}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
