import { FileText, ExternalLink, Download, Terminal, Copy, ChevronDown, ChevronUp, Play, Database, Cpu, Zap } from "lucide-react";
import { useState } from "react";

export function ResearchPapers() {
  const [expandedProjects, setExpandedProjects] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  interface Project {
    id: string;
    prompt: string;
    title: string;
    status: string;
    stack: string[];
    description: string;
    metrics: Record<string, string>;
    commands: string[];
    github?: string;
    live?: string;
    architecture?: {
      fileStructure?: string[];
      coreTypes?: { name: string; details: string }[];
      apiMethods?: { signature: string; returns: string }[];
      shaderOps?: string[];
    };
  }

  const projects: Project[] = [
    {
      id: "github-analysis",
      prompt: "$ python analyze.py --repos=1200+ --languages=12 --deploy=vercel",
      title: "GitHub Language Analysis Platform | Full-Stack Data Application",
      status: "DEPLOYED",
      stack: ["Python", "Pandas", "NumPy", "scikit-learn", "React", "TypeScript", "Tailwind CSS", "Vercel"],
      description: "Analysis platform examining 1,200+ repositories across 12 programming languages with statistical analysis, ML clustering, and interactive visualization. Built predictive model for repository success with custom scoring algorithms, ANOVA testing, correlation analysis, multi-dimensional clustering, and time-series forecasting.",
      metrics: {
        "Data Points": "200k+ records",
        "Repositories": "1,200+",
        "Languages": "12",
        "Model Accuracy": "78%",
        "Tech Stack": "Python + React",
        "Deployment": "CI/CD via Vercel"
      },
      commands: [
        "python analyze.py --method=anova --significance=0.05 --output=stats.json",
        "python cluster.py --algorithm=kmeans --dimensions=multi --features=all",
        "python forecast.py --model=timeseries --horizon=6mo --accuracy=0.78",
        "python scoring.py --custom-algorithm --weights=stars,forks,commits",
        "npm run build && npm run test && vercel deploy --prod"
      ],
      github: "https://github.com/jacobcsmith/github-language-analysis",
      live: "https://github-analysis.vercel.app"
    },
    {
      id: "consim",
      prompt: "$ python consim.py --gpu --backend=cuda,pytorch,jax --performance=20x",
      title: "CONSIM: High-Dimensional Spectral Analysis Framework ⚡ FLAGSHIP",
      status: "PRODUCTION",
      stack: ["Python", "NumPy", "Numba (JIT)", "PyTorch", "JAX", "CUDA"],
      description: "GPU-accelerated computational framework for spectral resonance analysis and phase coherence tracking on high-dimensional manifolds. Simulates complex signal processing patterns for research applications with frequency signature analysis, temporal phase detection, spectral resonance mapping, real-time phase coherence tracking, and mutual information computation.",
      metrics: {
        "Performance": "~20x speedup",
        "Backend": "CUDA + PyTorch + JAX",
        "Compute": "Parallel GPU",
        "Precision": "Float64",
        "Components": "Neural + Gradient",
        "Latency": "<5ms/frame"
      },
      commands: [
        "python consim.py --gpu --coherence-threshold=0.85 --parallel",
        "python phase_detect.py --temporal --window=1024 --track-coherence",
        "python spectral_map.py --dimensions=high --resolution=max --freq-sig",
        "python mutual_info.py --compute --threshold=0.9",
        "pytest tests/ --benchmark --iterations=200k --gpu-accel"
      ],
      github: "https://github.com/jacobcsmith/consim"
    },
    {
      id: "traffic-analysis",
      prompt: "$ python etl_pipeline.py --records=200k+ --output=insights.sql --impact=1.2M+",
      title: "Traffic Collision Analysis & Infrastructure Investment Planning",
      status: "DEPLOYED",
      stack: ["Python", "PostgreSQL", "Pandas", "GIS", "Tableau"],
      description: "Processed 200k+ traffic records identifying collision hotspots and high-risk corridors through geospatial analysis. Analysis directly informed $1.2M+ infrastructure investment decisions with detailed risk mapping, speed-volume-geometry correlation, and hotspot identification with 500m radius clustering.",
      metrics: {
        "Records": "200k+ processed",
        "Investment": "$1.2M+ informed",
        "Method": "Geospatial hotspot",
        "Radius": "500m clustering",
        "Output": "SQL + Tableau viz",
        "Impact": "Real infrastructure"
      },
      commands: [
        "python extract_collision_data.py --source=municipal_db --records=200000",
        "python spatial_analysis.py --method=hotspot --radius=500m --cluster",
        "python risk_score.py --factors=speed,volume,geometry --correlate",
        "python generate_heatmap.py --output=geojson --layer=risk_corridors",
        "psql -d traffic -f generate_insights.sql | tableau-export --viz"
      ]
    },
    {
      id: "spotify-analytics",
      prompt: "$ tableau-dashboard.twbx --data=spotify_viral.csv --threshold=0.70",
      title: "Spotify Viral Music Pattern Analysis | Tableau Dashboard",
      status: "DEPLOYED",
      stack: ["Tableau", "Data Analysis", "Pattern Recognition"],
      description: "Interactive Tableau dashboard identifying viral music patterns through comprehensive audio feature analysis. Discovered 70% danceability threshold as key predictor for viral potential across multiple genres and artist types.",
      metrics: {
        "Platform": "Tableau",
        "Key Finding": "70% danceability",
        "Pattern": "Viral threshold",
        "Analysis": "Audio features",
        "Output": "Interactive dashboard",
        "Insight": "Predictive patterns"
      },
      commands: [
        "tableau --load spotify_viral.csv --analyze-features",
        "python preprocess.py --extract-danceability --normalize",
        "python correlation.py --feature=danceability --target=viral_score",
        "python threshold_analysis.py --optimal-cutoff=0.70",
        "tableau --export-dashboard --publish"
      ]
    },
    {
      id: "social-risk-assessment",
      prompt: "$ python risk_engine.py --geographic-mapping --child-welfare --optimize",
      title: "Social Risk Assessment Engine | Child Welfare Intervention Optimization",
      status: "DEPLOYED",
      stack: ["Python", "Algorithmic Engine", "GIS", "Risk Modeling"],
      description: "Algorithmic engine for child welfare intervention optimization through geographic risk mapping. Developed scoring system integrating multiple risk factors with spatial analysis to prioritize resource allocation and intervention timing.",
      metrics: {
        "System": "Risk scoring algorithm",
        "Domain": "Child welfare",
        "Method": "Geographic mapping",
        "Optimization": "Resource allocation",
        "Output": "Priority scoring",
        "Impact": "Intervention timing"
      },
      commands: [
        "python risk_engine.py --load-census-data --integrate-factors",
        "python geographic_map.py --spatial-analysis --clustering",
        "python score_calculator.py --multi-factor --weights=optimized",
        "python intervention_priority.py --threshold=high --allocate-resources",
        "python visualize.py --heatmap --risk-corridors --export"
      ]
    },
    {
      id: "autohacker-tli",
      prompt: "$ ./autohacker --mode=tli --ritual=recon_baseline --stage=time-locked",
      title: "Autohacker: Time-Locked Interface (TLI) | Surreal CLI Automation",
      status: "PROTOTYPE",
      stack: ["Python", "Bash", "ASCII UI", "Automation"],
      description: "Surreal, ASCII-driven automation framework with time-locked stages and ritualized UX for repeated operational tasks. Fast keyboard-first workflows with scripted toolchains, injection of variable parameters for repeatable experiments, and automated recon pipelines with demoable live tool flows.",
      metrics: {
        "Interface": "ASCII/CLI surreal",
        "Workflow": "Time-locked stages",
        "Input": "Keyboard-first",
        "Pipeline": "Scripted toolchains",
        "Use Case": "Recon automation",
        "UX": "Ritualized operations"
      },
      commands: [
        "./autohacker --stage=init --lock-time=300 --ritual-mode",
        "./autohacker --pipeline=recon --targets=targets.txt --baseline",
        "./autohacker --inject-var DOMAIN=example.com --repeat-experiment",
        "./autohacker --toolchain=automated --stage-progression",
        "./autohacker --export-results --format=json --timestamp"
      ]
    },
    {
      id: "usb-toolkit",
      prompt: "$ dd if=toolkit.img of=/dev/sdb bs=4M && ./provision_sbc.sh --one-click",
      title: "Preloaded USB/SBC Toolkit Series | Productized Embedded Media",
      status: "SHIPPED",
      stack: ["Linux", "Bash", "Python", "Raspberry Pi", "Embedded Systems"],
      description: "Ready-to-use bootable USB images and SD cards with curated tools and preconfigured environments for pentesting, automation, and analysis. One-click boot with small form-factor, minimal setup, affordability. Target users: researchers, red-teamers, field operators, curious tinkerers. Includes custom developer toolchains and data recovery suites.",
      metrics: {
        "Delivery": "One-click turnkey",
        "Boot Time": "<60s ready",
        "Tools": "50+ preconfigured",
        "Platform": "USB + Raspberry Pi",
        "Setup": "Minimal config",
        "Distribution": "Fiverr gigs"
      },
      commands: [
        "sudo dd if=toolkit.img of=/dev/sdb bs=4M status=progress",
        "./build_image.sh --profile=pentest --size=8GB --curated-tools",
        "./provision_sbc.sh --board=rpi4 --autostart --one-click",
        "rsync -avz configs/ /mnt/usb/home/user/ --preserve",
        "./test_boot.sh --verify-tools --benchmark-startup"
      ]
    },
    {
      id: "sdr-experiments",
      prompt: "$ rtl_sdr -f 433.92M -s 2.048M -n 10M | python analyze_signal.py --pipeline",
      title: "SDR & Signal Interception Experiments | Reproducible Capture Workflows",
      status: "ONGOING",
      stack: ["RTL-SDR", "Python", "GNURadio", "Signal Processing"],
      description: "Tooling and notebooks for SDR capture and analysis with reproducible pipelines. Workflows for intercepting non-standard transmissions, organizing streams, annotating signal events with metadata logging. Emphasis on reproducible capture pipelines (record → tag → analyze) with controlled experiments and frequency/EMF data collection.",
      metrics: {
        "Hardware": "RTL-SDR equivalent",
        "Workflow": "Record→Tag→Analyze",
        "Sampling": "2.048 MSPS",
        "Output": "Annotated captures",
        "Pipeline": "Reproducible",
        "Focus": "Non-standard signals"
      },
      commands: [
        "rtl_sdr -f 433.92M -s 2.048M -n 10M capture.iq",
        "python analyze_signal.py --input=capture.iq --fft-size=2048 --annotate",
        "python tag_events.py --threshold=-40dB --window=1s --metadata",
        "python organize_streams.py --catalog --timestamp --frequency-range",
        "gnuradio-companion signal_processor.grc --pipeline-mode"
      ]
    },
    {
      id: "linux-provisioning",
      prompt: "$ ./provision.sh --sbc=all --automate --compilers --sdks --dotfiles",
      title: "Linux System Provisioning & Automation | SBC Configuration",
      status: "DEPLOYED",
      stack: ["Bash", "Python", "Linux", "Automation", "SBC"],
      description: "Automated configuration of compilers, SDKs, and dotfiles across single-board computers and embedded Linux systems. One-click deployment scripts for rapid provisioning of development environments with custom configurations, system services, and kernel tuning.",
      metrics: {
        "Platforms": "Multi-SBC",
        "Automation": "One-click deploy",
        "Config": "Compilers + SDKs",
        "Dotfiles": "Custom configs",
        "Speed": "Rapid provisioning",
        "Target": "Embedded Linux"
      },
      commands: [
        "./provision.sh --sbc=rpi4,orangepi --install-all",
        "./configure_compilers.sh --gcc --clang --rust --toolchains",
        "./setup_sdks.sh --python --node --embedded",
        "./sync_dotfiles.sh --vim --zsh --tmux --git-config",
        "./optimize_system.sh --kernel-tuning --services --performance"
      ]
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="space-y-4">
      {projects.map((project, idx) => (
        <div
          key={idx}
          className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-8 hover:shadow-[0_0_50px_rgba(139,0,255,0.2)] transition-all"
        >
          <div className="font-mono">
            {/* Terminal Header */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-violet-500/30">
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-crimson-400" />
                <code className="text-xs text-violet-300/70">{project.prompt}</code>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 text-[10px] uppercase tracking-wider rounded ${
                    project.status === "DEPLOYED" || project.status === "PRODUCTION" || project.status === "SHIPPED"
                      ? "bg-green-600/20 text-green-300 border border-green-500/30"
                      : project.status === "IN_DEV" || project.status === "PROTOTYPE"
                      ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                      : "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                  }`}
                >
                  {project.status}
                </span>
                <button
                  onClick={() => {
                    setExpandedProjects(prev =>
                      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
                    );
                  }}
                  className="p-1 rounded hover:bg-violet-600/20 transition-colors"
                >
                  {expandedProjects.includes(idx) ? (
                    <ChevronUp className="w-4 h-4 text-violet-300" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-violet-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Compressed Info */}
            <div className="mb-3">
              <h3 className="text-sm text-transparent bg-gradient-to-r from-violet-400 to-crimson-400 bg-clip-text mb-2">
                {project.title}
              </h3>
              <p className="text-xs text-violet-300/70 leading-relaxed mb-2">
                {project.description}
              </p>
              
              {/* Stack badges - compressed */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.stack.map((tech, techIdx) => (
                  <span
                    key={techIdx}
                    className="px-2 py-0.5 rounded bg-violet-600/10 border border-violet-500/20 text-[10px] text-violet-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Metrics - horizontal compact */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] p-2 rounded bg-black/40 border border-violet-500/20">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <span className="text-violet-300/50">{key}:</span>
                    <span className="text-violet-200">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expandable Commands Section */}
            {expandedProjects.includes(idx) && (
              <div className="mt-3 pt-3 border-t border-violet-500/30 space-y-2 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 mb-2">
                  <Play className="w-3 h-3 text-crimson-400" />
                  <span className="text-[10px] uppercase tracking-wider text-violet-300/70">Execution Pipeline</span>
                </div>
                {project.commands.map((cmd, cmdIdx) => (
                  <div
                    key={cmdIdx}
                    className="group flex items-start gap-2 p-2 rounded bg-black/60 border border-violet-500/10 hover:border-crimson-500/30 transition-colors"
                  >
                    <span className="text-[10px] text-violet-300/40 mt-0.5">$</span>
                    <code className="flex-1 text-[11px] text-violet-200 leading-relaxed">{cmd}</code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(cmd);
                        setCopiedCmd(cmd);
                        setTimeout(() => setCopiedCmd(null), 2000);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-violet-600/20"
                      title="Copy command"
                    >
                      {copiedCmd === cmd ? (
                        <span className="text-[10px] text-green-400">✓</span>
                      ) : (
                        <Copy className="w-3 h-3 text-violet-400" />
                      )}
                    </button>
                  </div>
                ))}
                
                {/* Architecture Details (if available) */}
                {project.architecture && (
                  <div className="mt-4 pt-3 border-t border-crimson-500/20 space-y-3">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-3 h-3 text-crimson-400" />
                      <span className="text-[10px] uppercase tracking-wider text-crimson-300/70">System Architecture</span>
                    </div>
                    
                    {project.architecture.fileStructure && (
                      <div className="space-y-1">
                        <div className="text-[10px] text-violet-300/60 mb-1.5">File Structure:</div>
                        {project.architecture.fileStructure.map((file, fileIdx) => (
                          <div key={fileIdx} className="text-[10px] text-violet-200/80 font-mono pl-3 border-l-2 border-violet-500/20">
                            {file}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {project.architecture.coreTypes && (
                      <div className="space-y-1">
                        <div className="text-[10px] text-violet-300/60 mb-1.5">Core Types:</div>
                        {project.architecture.coreTypes.map((type, typeIdx) => (
                          <div key={typeIdx} className="p-2 rounded bg-black/60 border border-violet-500/10">
                            <div className="text-[10px] text-crimson-300 mb-1">{type.name}</div>
                            <code className="text-[9px] text-violet-200/70 leading-relaxed">{type.details}</code>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {project.architecture.apiMethods && (
                      <div className="space-y-1">
                        <div className="text-[10px] text-violet-300/60 mb-1.5">WASM API:</div>
                        <div className="space-y-1">
                          {project.architecture.apiMethods.map((method, methodIdx) => (
                            <div key={methodIdx} className="p-1.5 rounded bg-black/40 border border-violet-500/10">
                              <code className="text-[9px] text-violet-200">{method.signature}</code>
                              <span className="text-[9px] text-violet-300/50 ml-2">→ {method.returns}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {project.architecture.shaderOps && (
                      <div className="space-y-1">
                        <div className="text-[10px] text-violet-300/60 mb-1.5">WebGPU Compute Operations:</div>
                        <div className="grid grid-cols-1 gap-1">
                          {project.architecture.shaderOps.map((op, opIdx) => (
                            <code key={opIdx} className="text-[9px] text-green-300/70 px-2 py-1 rounded bg-black/40 border border-green-500/10">
                              {op}
                            </code>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Links */}
                {(project.github || project.live) && (
                  <div className="flex gap-2 mt-3 pt-2 border-t border-violet-500/20">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-2 py-1 rounded bg-violet-600/10 border border-violet-500/30 hover:bg-violet-600/20 transition-colors text-[10px] text-violet-300"
                      >
                        <ExternalLink className="w-3 h-3" />
                        GitHub
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-2 py-1 rounded bg-crimson-600/10 border border-crimson-500/30 hover:bg-crimson-600/20 transition-colors text-[10px] text-crimson-300"
                      >
                        <Zap className="w-3 h-3" />
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Terminal Summary */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-violet-950/40 to-crimson-950/40 rounded-xl border border-violet-500/30 shadow-[0_0_30px_rgba(220,20,60,0.1)] p-6 font-mono">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-violet-500/30">
          <Terminal className="w-4 h-4 text-crimson-400" />
          <span className="text-xs text-violet-300/70">$ cat ~/portfolio/technical_approach.txt</span>
        </div>
        <div className="space-y-2 text-xs text-violet-300/80">
          <div className="flex items-start gap-3">
            <span className="text-crimson-400">&gt;</span>
            <span>
              <strong className="text-violet-200">Shipping-First:</strong> Production-ready applications, not just prototypes. Real deployments with CI/CD pipelines.
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-crimson-400">&gt;</span>
            <span>
              <strong className="text-violet-200">Performance-Obsessed:</strong> GPU acceleration, zero-copy memory, lock-free concurrency, and sub-5ms latencies.
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-crimson-400">&gt;</span>
            <span>
              <strong className="text-violet-200">Full-Stack Range:</strong> From embedded Linux/SBC provisioning to React frontends with ML backends.
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-crimson-400">&gt;</span>
            <span>
              <strong className="text-violet-200">Data + Systems:</strong> Statistical analysis meets systems programming. Analytics dashboards backed by custom infrastructure.
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-crimson-400">&gt;</span>
            <span>
              <strong className="text-violet-200">Reproducible:</strong> Automated pipelines, Docker containers, and documented architectures for every project.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
