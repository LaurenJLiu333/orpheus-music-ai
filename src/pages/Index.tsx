import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Music,
  Upload,
  Brain,
  MessageSquare,
  BarChart3,
  Layers,
  Mic2,
  GraduationCap,
  Film,
  Headphones,
  PenTool,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center px-6 pt-24 pb-20 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-glow-pulse pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[300px] rounded-full bg-secondary/10 blur-[100px] animate-glow-pulse pointer-events-none" style={{ animationDelay: "1.5s" }} />

        <div className="relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-muted/50 text-sm text-muted-foreground mb-8">
            <Sparkles size={14} className="text-primary" />
            AI-Powered Music Analysis
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground leading-[1.1] mb-6">
            Improve Your Music{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              With AI
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload your composition and receive instant feedback on harmony, melody, structure, and emotional impact.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => navigate("/upload")}
              className="rounded-full px-8 py-3 text-base font-semibold bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
              size="lg"
            >
              Upload Composition
              <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button
              variant="outline"
              className="rounded-full px-8 py-3 text-base font-semibold border-border text-foreground hover:bg-muted transition-colors"
              size="lg"
              onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
            >
              See Example Feedback
            </Button>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="relative z-10 mt-16 w-full max-w-2xl animate-float">
          <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 shadow-2xl shadow-primary/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-2 text-xs text-muted-foreground font-mono">orpheus-analysis</span>
            </div>
            <div className="flex items-center gap-3 mb-5 px-4 py-3 rounded-xl bg-muted/50 border border-border">
              <Upload size={16} className="text-primary" />
              <span className="text-sm text-foreground">piano_piece.mid</span>
              <span className="ml-auto text-xs text-muted-foreground">Uploaded</span>
            </div>
            <div className="space-y-3 px-1">
              <p className="text-xs font-semibold text-primary uppercase tracking-wider">AI Analysis</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Harmony Score</span>
                <span className="text-sm font-semibold text-foreground">8.2 / 10</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-muted">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: "82%" }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Melody Variation</span>
                <span className="text-sm font-semibold text-foreground">Medium</span>
              </div>
              <div className="mt-3 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20">
                <p className="text-sm text-foreground">
                  <span className="text-primary font-medium">Suggestion:</span> Try modulation in bar 16 to add harmonic interest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Demo Section */}
      <section id="demo" className="w-full flex flex-col items-center px-6 py-24">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-center text-foreground mb-4">
          See How Orpheus Analyzes Your Music
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mb-14">
          Deep analysis of every dimension of your composition.
        </p>
        <div className="w-full max-w-3xl rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-8 shadow-xl shadow-primary/5">
          <div className="flex items-center gap-3 mb-6">
            <Music size={20} className="text-primary" />
            <span className="text-foreground font-semibold">Composition: Piano Study</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl bg-muted/40 border border-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={16} className="text-green-400" />
                <span className="text-sm font-semibold text-foreground">Harmony</span>
              </div>
              <p className="text-sm text-muted-foreground">Strong tonal center detected throughout.</p>
            </div>
            <div className="rounded-xl bg-muted/40 border border-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={16} className="text-yellow-400" />
                <span className="text-sm font-semibold text-foreground">Melody</span>
              </div>
              <p className="text-sm text-muted-foreground">Phrase repetition detected in bars 8–14.</p>
            </div>
            <div className="rounded-xl bg-muted/40 border border-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={16} className="text-green-400" />
                <span className="text-sm font-semibold text-foreground">Structure</span>
              </div>
              <p className="text-sm text-muted-foreground">Clear A-B-A form identified.</p>
            </div>
            <div className="rounded-xl bg-primary/10 border border-primary/20 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-primary" />
                <span className="text-sm font-semibold text-foreground">AI Suggestion</span>
              </div>
              <p className="text-sm text-muted-foreground">Introduce a secondary dominant before bar 18.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="w-full flex flex-col items-center px-6 py-24">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-center text-foreground mb-4">
          How It Works
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mb-14">
          Three simple steps to better compositions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {[
            { icon: Upload, step: "01", title: "Upload Music", desc: "Upload MIDI, sheet music, or audio files." },
            { icon: Brain, step: "02", title: "AI Analysis", desc: "The AI evaluates harmony, melody, and structure." },
            { icon: MessageSquare, step: "03", title: "Receive Feedback", desc: "Get clear suggestions to improve your composition." },
          ].map((item) => (
            <div
              key={item.step}
              className="group rounded-2xl border border-border p-8 hover:border-primary/40 transition-colors"
              style={{ background: "var(--gradient-card)" }}
            >
              <span className="text-xs font-mono text-primary mb-4 block">{item.step}</span>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <item.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-display font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full flex flex-col items-center px-6 py-24">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-center text-foreground mb-4">
          Features
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mb-14">
          Comprehensive analysis for every aspect of your music.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {[
            { icon: BarChart3, title: "Harmony Analysis", desc: "Detect weak chord progressions and suggest improvements." },
            { icon: Mic2, title: "Melody Insights", desc: "Identify repetitive or weak phrases in your melodies." },
            { icon: Layers, title: "Structure Feedback", desc: "Improve pacing and musical development across sections." },
            { icon: Headphones, title: "Orchestration Suggestions", desc: "Balance instrumentation and texture for richer sound." },
          ].map((f, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-border p-8 hover:border-primary/40 transition-colors"
              style={{ background: "var(--gradient-card)" }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <f.icon size={24} className="text-primary" />
              </div>
              <h3 className="text-lg font-display font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Built for Composers */}
      <section className="w-full flex flex-col items-center px-6 py-24">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-center text-foreground mb-4">
          Built for Composers
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mb-14">
          Orpheus helps composers, students, producers, and musicians improve their compositions with AI-powered analysis.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl">
          {[
            { icon: GraduationCap, label: "Composition Students" },
            { icon: Film, label: "Film Composers" },
            { icon: PenTool, label: "Music Producers" },
            { icon: Music, label: "Classical Musicians" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-border hover:border-primary/40 transition-colors" style={{ background: "var(--gradient-card)" }}>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <item.icon size={28} className="text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full flex flex-col items-center px-6 py-24">
        <div className="relative w-full max-w-3xl rounded-3xl border border-border p-12 md:p-16 text-center overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 pointer-events-none" />
          <h2 className="relative text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Start Improving Your Music Today
          </h2>
          <p className="relative text-muted-foreground max-w-lg mx-auto mb-8">
            Upload your composition and get instant AI feedback.
          </p>
          <Button
            onClick={() => navigate("/upload")}
            className="relative rounded-full px-10 py-3 text-base font-semibold bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            size="lg"
          >
            Upload Composition
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-border py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">© 2026 Orpheus Music AI. All rights reserved.</span>
          <div className="flex items-center gap-1">
            <Music size={16} className="text-primary" />
            <span className="text-sm font-display font-semibold text-foreground">Orpheus</span>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
