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
  Headphones,
  GraduationCap,
  Film,
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
        <div className="relative z-10 text-center max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[1.1] mb-6" style={{ color: "#200f3f" }}>
            Improve Your Music{" "}
            <span className="bg-gradient-to-r from-[#6c5ce7] to-[#00b894] bg-clip-text text-transparent">
              With AI
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload your composition and receive instant feedback on harmony, melody, structure, and emotional impact.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => navigate("/upload")}
              className="rounded-full px-8 py-3 text-base font-semibold border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-primary-foreground transition-all"
              variant="outline"
              size="lg"
            >
              Upload Composition
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        </div>

      </section>

      {/* Product Demo Section */}
      <section id="demo" className="w-full flex flex-col items-center px-6 py-24">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-4" style={{ color: "#200f3f" }}>
          See How Orpheus Analyzes Your Music
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mb-14">
          Deep analysis of every dimension of your composition.
        </p>
        <div className="w-full max-w-3xl rounded-2xl border border-border p-8 shadow-lg" style={{ background: "var(--gradient-card)" }}>
          <div className="flex items-center gap-3 mb-6">
            <Music size={20} style={{ color: "#200f3f" }} />
            <span className="font-semibold" style={{ color: "#200f3f" }}>Composition: Cello.midi</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-xl bg-background/40 border border-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={16} className="text-green-600" />
                <span className="text-sm font-semibold text-foreground">Melody Analysis</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-bold" style={{ color: "#200f3f" }}>Contour:</span> The melody spans C2 to A4, showing a healthy rise from the bass register into the tenor range.
                <br /><span className="font-bold" style={{ color: "#200f3f" }}>Repetition:</span> With only 8 unique pitches across 84 notes, the motif is likely highly repetitive.
                <br /><span className="font-bold" style={{ color: "#200f3f" }}>Suggestions:</span> Introduce more chromatic passing tones or leaps to break the C-major/A-minor diatonic predictability. Use the A4 climax sparingly to maintain its emotional impact. Ensure the 12-bar structure includes a clear B-section or melodic variation to avoid listener fatigue.
              </p>
            </div>
            <div className="rounded-xl bg-background/40 border border-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={16} className="text-yellow-600" />
                <span className="text-sm font-semibold text-foreground">Harmony and Chord Fit</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-bold" style={{ color: "#200f3f" }}>Scale:</span> The pitch classes suggest a pure C Major or A Natural Minor tonality.
                <br /><span className="font-bold" style={{ color: "#200f3f" }}>Voice-Leading:</span> As a solo Cello piece, the harmony is implied. Ensure that leaps between low C2 and higher registers account for the physical shift on the fingerboard.
                <br /><span className="font-bold" style={{ color: "#200f3f" }}>Clashes:</span> With no G# or F#, the harmony feels modal. If aiming for a Classical feel, introduce a leading tone (G#) for A minor cadences. The lack of accidentals suggests a safe but potentially static harmonic progression.
              </p>
            </div>
            <div className="rounded-xl bg-background/40 border border-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={16} className="text-green-600" />
                <span className="text-sm font-semibold text-foreground">Rhythm and Meter</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-bold" style={{ color: "#200f3f" }}>Patterns:</span> The note count suggests an average of 7 notes per bar.
                <br /><span className="font-bold" style={{ color: "#200f3f" }}>Flow:</span> Ensure rhythmic variety; avoid constant eighth notes.
                <br /><span className="font-bold" style={{ color: "#200f3f" }}>Syncopation:</span> Use ties across barlines to create a more lyrical, "vocal" quality idiomatic to the cello. Maintain a steady pulse for the 12-bar phrasing.
              </p>
            </div>
            <div className="rounded-xl bg-background/40 border border-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={16} className="text-green-600" />
                <span className="text-sm font-semibold text-foreground">Range and Playability</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-bold" style={{ color: "#200f3f" }}>Range:</span> C2 to A4 is perfectly idiomatic for Cello.
                <br /><span className="font-bold" style={{ color: "#200f3f" }}>Playability:</span> C2 is the open C-string, providing a resonant foundation. A4 is reachable in thumb position or high positions on the A-string. Avoid rapid leaps from C2 to A4 to ensure the performer can maintain clean intonation.
              </p>
            </div>
            <div className="rounded-xl bg-background/40 border border-border p-5">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={16} className="text-green-600" />
                <span className="text-sm font-semibold text-foreground">Style and Genre Consistency</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-bold" style={{ color: "#200f3f" }}>Consistency:</span> The limited pitch set suggests a Minimalist or Neo-Classical style.
                <br /><span className="font-bold" style={{ color: "#200f3f" }}>Dynamics:</span> The average velocity of 80 is static. For a solo string instrument, incorporate crescendos and diminuendos to mimic natural bow pressure changes and enhance the expressive quality.
              </p>
            </div>
            <div className="rounded-xl bg-background/30 border border-foreground/20 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} style={{ color: "#200f3f" }} />
                <span className="text-sm font-semibold" style={{ color: "#200f3f" }}>Top 3 Fixes</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-bold" style={{ color: "#200f3f" }}>1. Dynamic Variation:</span> Vary velocity (60–100) to simulate realistic bowing and phrasing.
                <br /><span className="font-bold" style={{ color: "#200f3f" }}>2. Harmonic Interest:</span> Introduce a G# (leading tone) if the piece is in A Minor to strengthen cadences.
                <br /><span className="font-bold" style={{ color: "#200f3f" }}>3. Rhythmic Diversity:</span> Break repetitive patterns with dotted rhythms or rests to allow the "instrument" to breathe, improving the overall lyrical flow and realism.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="w-full flex flex-col items-center px-6 py-24">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-4" style={{ color: "#200f3f" }}>
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
              className="group rounded-2xl border border-border p-8 hover:shadow-lg transition-all"
              style={{ background: "var(--gradient-card)" }}
            >
              <span className="text-xs font-mono text-muted-foreground mb-4 block">{item.step}</span>
              <div className="w-12 h-12 rounded-xl bg-background/40 flex items-center justify-center mb-5">
                <item.icon size={24} style={{ color: "#200f3f" }} />
              </div>
              <h3 className="text-lg font-display font-bold mb-2" style={{ color: "#200f3f" }}>{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full flex flex-col items-center px-6 py-24">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-4" style={{ color: "#200f3f" }}>
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
              className="group rounded-2xl border border-border p-8 hover:shadow-lg transition-all"
              style={{ background: "var(--gradient-card)" }}
            >
              <div className="w-12 h-12 rounded-xl bg-background/40 flex items-center justify-center mb-5">
                <f.icon size={24} style={{ color: "#200f3f" }} />
              </div>
              <h3 className="text-lg font-display font-bold mb-2" style={{ color: "#200f3f" }}>{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Built for Composers */}
      <section className="w-full flex flex-col items-center px-6 py-24">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-4" style={{ color: "#200f3f" }}>
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
            <div key={i} className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-border hover:shadow-lg transition-all" style={{ background: "var(--gradient-card)" }}>
              <div className="w-14 h-14 rounded-xl bg-background/40 flex items-center justify-center">
                <item.icon size={28} style={{ color: "#200f3f" }} />
              </div>
              <span className="text-sm font-medium text-foreground text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full flex flex-col items-center px-6 py-24">
        <div className="relative w-full max-w-3xl rounded-3xl border border-border p-12 md:p-16 text-center overflow-hidden" style={{ background: "var(--gradient-card)" }}>
          <h2 className="relative text-3xl md:text-5xl font-display font-bold mb-4" style={{ color: "#200f3f" }}>
            Start Improving Your Music Today
          </h2>
          <p className="relative text-muted-foreground max-w-lg mx-auto mb-8">
            Upload your composition and get instant AI feedback.
          </p>
          <Button
            onClick={() => navigate("/upload")}
            className="relative rounded-full px-10 py-3 text-base font-semibold border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-primary-foreground transition-all"
            variant="outline"
            size="lg"
          >
            Upload Composition
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 px-6" />
    </main>
  );
};

export default Index;
