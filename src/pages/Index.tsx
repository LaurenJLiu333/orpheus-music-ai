import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const slideFromRight = {
  hidden: { opacity: 0, x: 80 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const floatingNote = (x: string, y: string, delay: number, rotate: number, size: number) => ({
  className: "absolute pointer-events-none select-none",
  style: { left: x, top: y, fontSize: size },
  initial: { opacity: 0, rotate: rotate - 20, scale: 0.5 },
  animate: {
    opacity: [0, 0.7, 0.4, 0.7],
    rotate: [rotate - 20, rotate + 15, rotate - 8, rotate + 20],
    y: [0, -30, 10, -20],
    scale: [0.5, 1.1, 0.9, 1.1],
  },
  transition: {
    duration: 7,
    delay,
    repeat: Infinity,
    repeatType: "mirror" as const,
    ease: "easeInOut" as const,
  },
});

// Animated equalizer bars for the demo section
const EqualizerBars = () => (
  <div className="flex items-end gap-1 h-8">
    {[0.3, 0.7, 0.5, 1, 0.4, 0.8, 0.6].map((height, i) => (
      <motion.div
        key={i}
        className="w-1.5 rounded-full bg-gradient-to-t from-[#6c5ce7] to-[#00b894]"
        initial={{ height: 4 }}
        animate={{ height: [4, height * 32, 8, height * 24, 4] }}
        transition={{
          duration: 1.8,
          delay: i * 0.15,
          repeat: Infinity,
          ease: "easeInOut" as const,
        }}
      />
    ))}
  </div>
);

// Animated waveform for How It Works
const Waveform = () => (
  <div className="flex items-center gap-0.5 h-6">
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.div
        key={i}
        className="w-1 rounded-full bg-gradient-to-t from-[#6c5ce7]/40 to-[#00b894]/60"
        initial={{ height: 4 }}
        animate={{ height: [4, Math.random() * 20 + 6, 4] }}
        transition={{
          duration: 1.2 + Math.random() * 0.8,
          delay: i * 0.05,
          repeat: Infinity,
          ease: "easeInOut" as const,
        }}
      />
    ))}
  </div>
);

// Animated staff lines for Features
const StaffLines = () => (
  <div className="relative w-full h-16 overflow-hidden opacity-20">
    {[0, 1, 2, 3, 4].map((line) => (
      <div key={line} className="absolute w-full h-px bg-foreground/30" style={{ top: `${line * 25}%` }} />
    ))}
    {[0, 1, 2, 3, 4, 5].map((note, i) => (
      <motion.div
        key={i}
        className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-[#6c5ce7] to-[#00b894]"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: [i * 60 + 20, i * 60 + 30, i * 60 + 20], opacity: [0, 1, 0.6, 1] }}
        transition={{
          duration: 3,
          delay: i * 0.4,
          repeat: Infinity,
          repeatType: "mirror" as const,
          ease: "easeInOut" as const,
        }}
        style={{ top: `${[10, 35, 20, 60, 45, 80][i]}%` }}
      />
    ))}
  </div>
);

const Index = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="flex flex-col items-center overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative w-full flex flex-col items-center px-6 pt-24 pb-20 overflow-hidden min-h-[85vh] justify-center">
        {/* Floating music notes */}
        {[
          { symbol: "𝄞", ...floatingNote("6%", "10%", 0, -20, 90) },
          { symbol: "♪", ...floatingNote("88%", "15%", 0.4, 15, 72) },
          { symbol: "♫", ...floatingNote("12%", "68%", 1, -10, 64) },
          { symbol: "♬", ...floatingNote("80%", "72%", 0.7, 25, 68) },
          { symbol: "♩", ...floatingNote("45%", "5%", 1.3, -30, 56) },
          { symbol: "♪", ...floatingNote("94%", "42%", 0.2, 20, 60) },
          { symbol: "𝄢", ...floatingNote("3%", "38%", 1.8, 12, 80) },
          { symbol: "♫", ...floatingNote("58%", "82%", 1.5, -18, 58) },
          { symbol: "𝄞", ...floatingNote("70%", "5%", 0.9, 30, 50) },
          { symbol: "♬", ...floatingNote("25%", "85%", 2, -25, 54) },
        ].map(({ symbol, ...props }, i) => (
          <motion.span key={i} {...props}>
            <span className="font-display font-bold bg-gradient-to-br from-[#6c5ce7]/60 to-[#00b894]/50 bg-clip-text text-transparent">
              {symbol}
            </span>
          </motion.span>
        ))}

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[1.1] mb-6"
            style={{ color: "#200f3f" }}
          >
            Improve Your Music{" "}
            <motion.span
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="bg-gradient-to-r from-[#6c5ce7] to-[#00b894] bg-clip-text text-transparent inline-block"
            >
              With AI
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Upload your composition and receive instant feedback on harmony, melody, structure, and emotional impact.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={() => navigate("/upload")}
                className="rounded-full px-8 py-3 text-base font-semibold border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-primary-foreground transition-all"
                variant="outline"
                size="lg"
              >
                Upload Composition
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Animated equalizer under CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex justify-center mt-8"
          >
            <EqualizerBars />
          </motion.div>
        </motion.div>
      </section>

      {/* Product Demo Section - with scale-in cards and floating waveform */}
      <motion.section
        id="demo"
        className="relative w-full flex flex-col items-center px-6 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {/* Background waveform decoration */}
        <motion.div
          className="absolute top-8 left-1/2 -translate-x-1/2 w-64 opacity-30"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.3, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Waveform />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          custom={0}
          className="text-3xl md:text-5xl font-display font-bold text-center mb-4"
          style={{ color: "#200f3f" }}
        >
          See How Orpheus Analyzes Your Music
        </motion.h2>
        <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-center max-w-xl mb-14">
          Deep analysis of every dimension of your composition.
        </motion.p>
        <motion.div
          variants={scaleIn}
          custom={2}
          className="w-full max-w-5xl rounded-2xl border border-border p-8 shadow-lg"
          style={{ background: "var(--gradient-card)" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}>
              <Music size={20} style={{ color: "#200f3f" }} />
            </motion.div>
            <span className="font-semibold" style={{ color: "#200f3f" }}>Composition: Cello.midi</span>
            <div className="ml-auto">
              <EqualizerBars />
            </div>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <CheckCircle2 size={16} className="text-green-600" />,
                title: "Melody Analysis",
                content: (
                  <>
                    <span className="font-bold" style={{ color: "#200f3f" }}>Contour:</span> The melody spans C2 to A4, showing a healthy rise from the bass register into the tenor range.
                    <br /><span className="font-bold" style={{ color: "#200f3f" }}>Repetition:</span> With only 8 unique pitches across 84 notes, the motif is likely highly repetitive.
                    <br /><span className="font-bold" style={{ color: "#200f3f" }}>Suggestions:</span> Introduce more chromatic passing tones or leaps to break the C-major/A-minor diatonic predictability. Use the A4 climax sparingly to maintain its emotional impact. Ensure the 12-bar structure includes a clear B-section or melodic variation to avoid listener fatigue.
                  </>
                ),
              },
              {
                icon: <AlertTriangle size={16} className="text-yellow-600" />,
                title: "Harmony and Chord Fit",
                content: (
                  <>
                    <span className="font-bold" style={{ color: "#200f3f" }}>Scale:</span> The pitch classes suggest a pure C Major or A Natural Minor tonality.
                    <br /><span className="font-bold" style={{ color: "#200f3f" }}>Voice-Leading:</span> As a solo Cello piece, the harmony is implied. Ensure that leaps between low C2 and higher registers account for the physical shift on the fingerboard.
                    <br /><span className="font-bold" style={{ color: "#200f3f" }}>Clashes:</span> With no G# or F#, the harmony feels modal. If aiming for a Classical feel, introduce a leading tone (G#) for A minor cadences. The lack of accidentals suggests a safe but potentially static harmonic progression.
                  </>
                ),
              },
              {
                icon: <CheckCircle2 size={16} className="text-green-600" />,
                title: "Rhythm and Meter",
                content: (
                  <>
                    <span className="font-bold" style={{ color: "#200f3f" }}>Patterns:</span> The note count suggests an average of 7 notes per bar.
                    <br /><span className="font-bold" style={{ color: "#200f3f" }}>Flow:</span> Ensure rhythmic variety; avoid constant eighth notes.
                    <br /><span className="font-bold" style={{ color: "#200f3f" }}>Syncopation:</span> Use ties across barlines to create a more lyrical, "vocal" quality idiomatic to the cello. Maintain a steady pulse for the 12-bar phrasing.
                  </>
                ),
              },
              {
                icon: <CheckCircle2 size={16} className="text-green-600" />,
                title: "Range and Playability",
                content: (
                  <>
                    <span className="font-bold" style={{ color: "#200f3f" }}>Range:</span> C2 to A4 is perfectly idiomatic for Cello.
                    <br /><span className="font-bold" style={{ color: "#200f3f" }}>Playability:</span> C2 is the open C-string, providing a resonant foundation. A4 is reachable in thumb position or high positions on the A-string. Avoid rapid leaps from C2 to A4 to ensure the performer can maintain clean intonation.
                  </>
                ),
              },
              {
                icon: <CheckCircle2 size={16} className="text-green-600" />,
                title: "Style and Genre Consistency",
                content: (
                  <>
                    <span className="font-bold" style={{ color: "#200f3f" }}>Consistency:</span> The limited pitch set suggests a Minimalist or Neo-Classical style.
                    <br /><span className="font-bold" style={{ color: "#200f3f" }}>Dynamics:</span> The average velocity of 80 is static. For a solo string instrument, incorporate crescendos and diminuendos to mimic natural bow pressure changes and enhance the expressive quality.
                  </>
                ),
              },
              {
                icon: <Sparkles size={16} style={{ color: "#200f3f" }} />,
                title: "Top 3 Fixes",
                content: (
                  <>
                    <span className="font-bold" style={{ color: "#200f3f" }}>1. Dynamic Variation:</span> Vary velocity (60–100) to simulate realistic bowing and phrasing.
                    <br /><span className="font-bold" style={{ color: "#200f3f" }}>2. Harmonic Interest:</span> Introduce a G# (leading tone) if the piece is in A Minor to strengthen cadences.
                    <br /><span className="font-bold" style={{ color: "#200f3f" }}>3. Rhythmic Diversity:</span> Break repetitive patterns with dotted rhythms or rests to allow the "instrument" to breathe, improving the overall lyrical flow and realism.
                  </>
                ),
                special: true,
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                custom={i}
                whileHover={{ scale: 1.03, y: -4, transition: { duration: 0.2 } }}
                className={`rounded-xl border p-5 cursor-default ${
                  card.special ? "bg-background/30 border-foreground/20" : "bg-background/40 border-border"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {card.icon}
                  <span className="text-sm font-semibold" style={{ color: "#200f3f" }}>{card.title}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* How It Works - slides from alternating sides with waveform */}
      <motion.section
        id="how-it-works"
        className="relative w-full flex flex-col items-center px-6 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.h2
          variants={fadeUp}
          custom={0}
          className="text-3xl md:text-5xl font-display font-bold text-center mb-4"
          style={{ color: "#200f3f" }}
        >
          How It Works
        </motion.h2>
        <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-center max-w-xl mb-6">
          Three simple steps to better compositions.
        </motion.p>

        {/* Waveform divider */}
        <motion.div
          className="mb-14 w-48"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Waveform />
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl" variants={staggerContainer}>
          {[
            { icon: Upload, step: "01", title: "Upload Music", desc: "Upload MIDI, sheet music, or audio files.", variant: slideFromLeft },
            { icon: Brain, step: "02", title: "AI Analysis", desc: "The AI evaluates harmony, melody, and structure.", variant: fadeUp },
            { icon: MessageSquare, step: "03", title: "Receive Feedback", desc: "Get clear suggestions to improve your composition.", variant: slideFromRight },
          ].map((item) => (
            <motion.div
              key={item.step}
              variants={item.variant}
              custom={parseInt(item.step) - 1}
              whileHover={{ y: -10, scale: 1.04, transition: { duration: 0.3 } }}
              className="group rounded-2xl border border-border p-8 hover:shadow-xl transition-shadow"
              style={{ background: "var(--gradient-card)" }}
            >
              <motion.span
                className="text-xs font-mono text-muted-foreground mb-4 block"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                {item.step}
              </motion.span>
              <motion.div
                className="w-12 h-12 rounded-xl bg-background/40 flex items-center justify-center mb-5"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <item.icon size={24} style={{ color: "#200f3f" }} />
              </motion.div>
              <h3 className="text-lg font-display font-bold mb-2" style={{ color: "#200f3f" }}>{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Features Section - with staff lines and staggered scale animations */}
      <motion.section
        id="features"
        className="relative w-full flex flex-col items-center px-6 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        {/* Staff lines background decoration */}
        <motion.div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 max-w-4xl mx-auto px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <StaffLines />
        </motion.div>

        <motion.h2
          variants={fadeUp}
          custom={0}
          className="text-3xl md:text-5xl font-display font-bold text-center mb-4 relative z-10"
          style={{ color: "#200f3f" }}
        >
          Features
        </motion.h2>
        <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-center max-w-xl mb-14 relative z-10">
          Comprehensive analysis for every aspect of your music.
        </motion.p>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl relative z-10" variants={staggerContainer}>
          {[
            { icon: BarChart3, title: "Harmony Analysis", desc: "Detect weak chord progressions and suggest improvements." },
            { icon: Mic2, title: "Melody Insights", desc: "Identify repetitive or weak phrases in your melodies." },
            { icon: Layers, title: "Structure Feedback", desc: "Improve pacing and musical development across sections." },
            { icon: Headphones, title: "Orchestration Suggestions", desc: "Balance instrumentation and texture for richer sound." },
          ].map((f, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              custom={i}
              whileHover={{ y: -10, scale: 1.04, transition: { duration: 0.3 } }}
              className="group rounded-2xl border border-border p-8 hover:shadow-xl transition-shadow"
              style={{ background: "var(--gradient-card)" }}
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-background/40 flex items-center justify-center mb-5"
                whileHover={{ rotate: -15, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <f.icon size={24} style={{ color: "#200f3f" }} />
              </motion.div>
              <h3 className="text-lg font-display font-bold mb-2" style={{ color: "#200f3f" }}>{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Built for Composers - with bouncy entrance */}
      <motion.section
        className="w-full flex flex-col items-center px-6 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.h2
          variants={fadeUp}
          custom={0}
          className="text-3xl md:text-5xl font-display font-bold text-center mb-4"
          style={{ color: "#200f3f" }}
        >
          Built for Composers
        </motion.h2>
        <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-center max-w-xl mb-14">
          Orpheus helps composers, students, producers, and musicians improve their compositions with AI-powered analysis.
        </motion.p>
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl" variants={staggerContainer}>
          {[
            { icon: GraduationCap, label: "Composition Students" },
            { icon: Film, label: "Film Composers" },
            { icon: PenTool, label: "Music Producers" },
            { icon: Music, label: "Classical Musicians" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              custom={i}
              whileHover={{ y: -12, scale: 1.08, rotate: i % 2 === 0 ? 2 : -2, transition: { duration: 0.3, type: "spring", stiffness: 300 } }}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-border hover:shadow-xl transition-shadow"
              style={{ background: "var(--gradient-card)" }}
            >
              <motion.div
                className="w-14 h-14 rounded-xl bg-background/40 flex items-center justify-center"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" as const }}
              >
                <item.icon size={28} style={{ color: "#200f3f" }} />
              </motion.div>
              <span className="text-sm font-medium text-foreground text-center">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Final CTA - dramatic scale + glow */}
      <motion.section
        className="w-full flex flex-col items-center px-6 py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div
          variants={scaleIn}
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          className="relative w-full max-w-3xl rounded-3xl border border-border p-12 md:p-16 text-center overflow-hidden"
          style={{ background: "var(--gradient-card)" }}
        >
          {/* Floating notes inside CTA */}
          <motion.span
            className="absolute top-6 left-8 text-4xl pointer-events-none select-none"
            animate={{ y: [0, -10, 0], rotate: [-5, 10, -5], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
          >
            <span className="bg-gradient-to-br from-[#6c5ce7]/40 to-[#00b894]/30 bg-clip-text text-transparent font-display">♫</span>
          </motion.span>
          <motion.span
            className="absolute bottom-8 right-10 text-5xl pointer-events-none select-none"
            animate={{ y: [0, -15, 0], rotate: [5, -10, 5], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "easeInOut" as const }}
          >
            <span className="bg-gradient-to-br from-[#6c5ce7]/40 to-[#00b894]/30 bg-clip-text text-transparent font-display">𝄞</span>
          </motion.span>

          <h2 className="relative text-3xl md:text-5xl font-display font-bold mb-4" style={{ color: "#200f3f" }}>
            Start Improving Your Music Today
          </h2>
          <p className="relative text-muted-foreground max-w-lg mx-auto mb-8">
            Upload your composition and get instant AI feedback.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={() => navigate("/upload")}
              className="relative rounded-full px-10 py-3 text-base font-semibold border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-primary-foreground transition-all"
              variant="outline"
              size="lg"
            >
              Upload Composition
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="w-full py-8 px-6" />
    </main>
  );
};

export default Index;
