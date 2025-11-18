import { BarChart3, GitBranch, Zap, Code2 } from "lucide-react";

export function GitHubAnalysisShowcase() {
  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-2xl border border-violet-500/30 shadow-[0_0_40px_rgba(139,0,255,0.15)] p-8 mb-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-violet-600/20 to-crimson-600/20 border border-violet-500/30">
            <BarChart3 className="w-8 h-8 text-violet-400" />
          </div>
          <div>
            <h3 className="text-3xl text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-crimson-400 bg-clip-text">
              GitHub Language Dominance Analysis
            </h3>
            <p className="text-violet-300/70 mt-1">
              200k+ Repositories • 12 Languages • Statistical Deep-Dive
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-violet-950/30 border border-violet-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <GitBranch className="w-4 h-4 text-violet-400" />
            <p className="text-violet-300/70 text-xs">Dataset Size</p>
          </div>
          <p className="text-2xl text-violet-200">200k+</p>
          <p className="text-xs text-violet-400/60">Repositories</p>
        </div>

        <div className="bg-fuchsia-950/30 border border-fuchsia-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Code2 className="w-4 h-4 text-fuchsia-400" />
            <p className="text-violet-300/70 text-xs">Languages</p>
          </div>
          <p className="text-2xl text-violet-200">12</p>
          <p className="text-xs text-fuchsia-400/60">Categories</p>
        </div>

        <div className="bg-crimson-950/30 border border-crimson-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-crimson-400" />
            <p className="text-violet-300/70 text-xs">Deployment</p>
          </div>
          <p className="text-2xl text-violet-200">Netlify</p>
          <p className="text-xs text-crimson-400/60">CI/CD Pipeline</p>
        </div>

        <div className="bg-violet-950/30 border border-violet-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-violet-400" />
            <p className="text-violet-300/70 text-xs">Analysis</p>
          </div>
          <p className="text-2xl text-violet-200">3D Viz</p>
          <p className="text-xs text-violet-400/60">Statistical Models</p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6 p-6 rounded-xl bg-gradient-to-br from-violet-950/20 to-crimson-950/20 border border-violet-500/20">
        <p className="text-violet-200/90 leading-relaxed">
          Comprehensive capstone project analyzing language dominance patterns across 200,000+ GitHub repositories.
          Built full-stack interactive dashboard with React/TypeScript frontend, complemented by in-depth Jupyter
          notebook analysis featuring 3D visualizations, correlation matrices, and statistical modeling. Deployed
          production-ready application with CI/CD automation and comprehensive documentation.
        </p>
      </div>

      {/* Embedded Presentation */}
      <div className="relative rounded-xl overflow-hidden border-2 border-violet-500/30 shadow-[0_0_30px_rgba(139,0,255,0.3)] mb-6">
        {/* Neon corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-fuchsia-500/70 z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-crimson-500/70 z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-violet-500/70 z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-fuchsia-500/70 z-10 pointer-events-none" />
        
        {/* Scan line effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(139,0,255,0.03)_50%,transparent_100%)] bg-[length:100%_4px] animate-pulse z-10 pointer-events-none" />

        {/* Embedded iframe */}
        <div className="relative bg-black/20">
          <iframe
            style={{ border: "none", width: "100%", height: "600px" }}
            src="https://embed.figma.com/deck/g9UN6Mzd1VhGL6iU2JB0Ui/GitHub_Language_Dominance_Analysis--1-?node-id=0-20&viewport=-54%2C-34%2C0.29&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&embed-host=share"
            allowFullScreen
            title="GitHub Language Dominance Analysis Presentation"
          />
        </div>
      </div>

      {/* Technical Stack */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="border-l-2 border-violet-500 pl-4">
          <p className="text-violet-200 mb-2">Frontend Stack</p>
          <p className="text-violet-300/70 text-sm">
            React, TypeScript, Tailwind CSS
          </p>
        </div>
        <div className="border-l-2 border-fuchsia-500 pl-4">
          <p className="text-violet-200 mb-2">Analysis Tools</p>
          <p className="text-violet-300/70 text-sm">
            Jupyter, Pandas, NumPy, Plotly 3D
          </p>
        </div>
        <div className="border-l-2 border-crimson-500 pl-4">
          <p className="text-violet-200 mb-2">Deliverables</p>
          <p className="text-violet-300/70 text-sm">
            Dashboard, Presentation, PDF Report
          </p>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-4">
        <a
          href="https://www.notion.so/GitHub-Repository-Language-Analysis-Capstone-295336891f3680038aa3c0a8246b959b?pvs=21"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 text-violet-200 hover:border-violet-400/50 hover:shadow-[0_0_25px_rgba(139,0,255,0.4)] transition-all"
        >
          <Code2 className="w-4 h-4" />
          View Full Capstone Documentation
        </a>
        <a
          href="https://www.notion.so/GitHub-Language-Dashboard-Spec-v1-Starter-aadbf6ac2b1b42d680eedfdd0e3b47ff?pvs=21"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-crimson-600/20 to-fuchsia-600/20 border border-crimson-500/30 text-violet-200 hover:border-crimson-400/50 hover:shadow-[0_0_25px_rgba(220,20,60,0.4)] transition-all"
        >
          <BarChart3 className="w-4 h-4" />
          Dashboard Specifications
        </a>
      </div>
    </div>
  );
}
