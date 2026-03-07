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

// Animated equalizer bars
const EqualizerBars = () => (
  <div className="flex items-end gap-1 h-8">
    {[0.3, 0.7, 0.5, 1, 0.4, 0.8, 0.6].map((height, i) => (
      <motion.div
        key={i}
        className="w-1.5 rounded-full"
        style={{ background: "linear-gradient(to top, hsl(210 65% 60%), hsl(160 55% 55%))" }}
        initial={{ height: 4 }}
        animate={{ height: [4, height * 32, 8, height * 24, 4] }}
        transition={{ duration: 1.8, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" as const }}
      />
    ))}
  </div>
);

// Animated waveform
const Waveform = () => (
  <div className="flex items-center gap-0.5 h-6">
    {Array.from({ length: 20 }).map((_, i) => (
      <motion.div
        key={i}
        className="w-1 rounded-full"
        style={{ background: `linear-gradient(to top, hsl(210 60% 70%), hsl(${150 + i * 2} 50% 65%))` }}
        initial={{ height: 4 }}
        animate={{ height: [4, Math.random() * 20 + 6, 4] }}
        transition={{ duration: 1.2 + Math.random() * 0.8, delay: i * 0.05, repeat: Infinity, ease: "easeInOut" as const }}
      />
    ))}
  </div>
);

// Concentric rings decoration
const ConcentricRings = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
    {[280, 400, 520].map((size, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{ width: size, height: size, border: `1px solid hsl(210 60% 75% / ${0.15 - i * 0.03})` }}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: i * 0.2 }}
      />
    ))}
  </div>
);

// Dot pattern
const DotPattern = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: "radial-gradient(hsl(210 60% 50%) 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    }} />
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

      {/* ═══════════════════════════════════════════════════════════
          HERO — Clean with floating notes + parallax
      ═══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative w-full flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden min-h-[85vh]" style={{ background: "linear-gradient(180deg, hsl(48 40% 95%) 0%, hsl(160 35% 92%) 60%, hsl(160 38% 91%) 100%)" }}>
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
            <span className="font-display font-bold" style={{ background: "linear-gradient(135deg, hsl(210 65% 55%), hsl(160 50% 50%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {symbol}
            </span>
          </motion.span>
        ))}

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[1.1] mb-6 text-foreground"
          >
            Improve Your Music{" "}
            <motion.span
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="inline-block" style={{ background: "linear-gradient(135deg, hsl(210 65% 55%), hsl(160 55% 45%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
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
            className="flex items-center justify-center"
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

      {/* ═══════════════════════════════════════════════════════════
          DEMO — Dot pattern bg, soft card container
      ═══════════════════════════════════════════════════════════ */}
      <motion.section
        id="demo"
        className="relative w-full flex flex-col items-center px-6 py-28"
        style={{ background: "linear-gradient(180deg, hsl(160 38% 91%) 0%, hsl(180 38% 91%) 50%, hsl(210 42% 91%) 100%)" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <DotPattern />

        <motion.div className="relative z-10 flex flex-col items-center w-full max-w-5xl">
          <motion.div
            variants={fadeUp}
            custom={0}
            className="flex items-center gap-3 mb-4"
          >
            <div className="h-px w-8 bg-foreground/30" />
            <span className="text-xs font-mono tracking-widest text-muted-foreground uppercase">Live Demo</span>
            <div className="h-px w-8 bg-foreground/30" />
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-3xl md:text-5xl font-display font-bold text-center mb-4 text-foreground"
          >
            See How Orpheus Analyzes Your Music
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-center max-w-xl mb-14">
            Deep analysis of every dimension of your composition.
          </motion.p>

          <motion.div
            variants={scaleIn}
            custom={2}
            className="w-full rounded-2xl border border-border p-8 shadow-lg"
            style={{ background: "var(--gradient-card)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}>
                <Music size={20} className="text-foreground" />
              </motion.div>
              <span className="font-semibold text-foreground">Composition: Cello.midi</span>
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
                      <span className="font-bold text-foreground">Contour:</span> The melody spans C2 to A4, showing a healthy rise from the bass register into the tenor range.
                      <br /><span className="font-bold text-foreground">Repetition:</span> With only 8 unique pitches across 84 notes, the motif is likely highly repetitive.
                      <br /><span className="font-bold text-foreground">Suggestions:</span> Introduce more chromatic passing tones or leaps to break the C-major/A-minor diatonic predictability.
                    </>
                  ),
                },
                {
                  icon: <AlertTriangle size={16} className="text-yellow-600" />,
                  title: "Harmony and Chord Fit",
                  content: (
                    <>
                      <span className="font-bold text-foreground">Scale:</span> The pitch classes suggest a pure C Major or A Natural Minor tonality.
                      <br /><span className="font-bold text-foreground">Voice-Leading:</span> As a solo Cello piece, the harmony is implied.
                      <br /><span className="font-bold text-foreground">Clashes:</span> The lack of accidentals suggests a safe but potentially static harmonic progression.
                    </>
                  ),
                },
                {
                  icon: <CheckCircle2 size={16} className="text-green-600" />,
                  title: "Rhythm and Meter",
                  content: (
                    <>
                      <span className="font-bold text-foreground">Patterns:</span> The note count suggests an average of 7 notes per bar.
                      <br /><span className="font-bold text-foreground">Flow:</span> Ensure rhythmic variety; avoid constant eighth notes.
                      <br /><span className="font-bold text-foreground">Syncopation:</span> Use ties across barlines to create a more lyrical quality.
                    </>
                  ),
                },
                {
                  icon: <CheckCircle2 size={16} className="text-green-600" />,
                  title: "Range and Playability",
                  content: (
                    <>
                      <span className="font-bold text-foreground">Range:</span> C2 to A4 is perfectly idiomatic for Cello.
                      <br /><span className="font-bold text-foreground">Playability:</span> C2 is the open C-string, providing a resonant foundation. A4 is reachable in thumb position.
                    </>
                  ),
                },
                {
                  icon: <CheckCircle2 size={16} className="text-green-600" />,
                  title: "Style and Genre Consistency",
                  content: (
                    <>
                      <span className="font-bold text-foreground">Consistency:</span> The limited pitch set suggests a Minimalist or Neo-Classical style.
                      <br /><span className="font-bold text-foreground">Dynamics:</span> The average velocity of 80 is static. Incorporate crescendos and diminuendos.
                    </>
                  ),
                },
                {
                  icon: <Sparkles size={16} className="text-foreground" />,
                  title: "Top 3 Fixes",
                  content: (
                    <>
                      <span className="font-bold text-foreground">1. Dynamic Variation:</span> Vary velocity (60–100) to simulate realistic bowing.
                      <br /><span className="font-bold text-foreground">2. Harmonic Interest:</span> Introduce a G# (leading tone) for A Minor cadences.
                      <br /><span className="font-bold text-foreground">3. Rhythmic Diversity:</span> Break repetitive patterns with dotted rhythms or rests.
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
                    <span className="text-sm font-semibold text-foreground">{card.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.content}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════
          HOW IT WORKS — Numbered vertical timeline feel, clean bg
      ═══════════════════════════════════════════════════════════ */}
      <motion.section
        id="how-it-works"
        className="relative w-full flex flex-col items-center px-6 py-28" style={{ background: "linear-gradient(180deg, hsl(210 42% 91%) 0%, hsl(190 40% 91%) 50%, hsl(160 40% 91%) 100%)" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.h2
          variants={fadeUp}
          custom={0}
          className="text-3xl md:text-5xl font-display font-bold text-center mb-4 text-foreground"
        >
          How It Works
        </motion.h2>
        <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-center max-w-xl mb-6">
          Three simple steps to better compositions.
        </motion.p>

        <motion.div
          className="mb-14 flex justify-center w-full"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Waveform />
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl" variants={staggerContainer}>
          {[
            { icon: Upload, step: "01", title: "Upload Music", desc: "Upload MIDI, sheet music, or audio files.", variant: slideFromLeft },
            { icon: Brain, step: "02", title: "AI Analysis", desc: "The AI evaluates harmony, melody, and structure.", variant: fadeUp },
            { icon: MessageSquare, step: "03", title: "Receive Feedback", desc: "Get clear suggestions to improve your composition.", variant: slideFromRight },
          ].map((item) => (
            <motion.div
              key={item.step}
              variants={item.variant}
              custom={parseInt(item.step) - 1}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group flex flex-col items-center text-center rounded-2xl border border-border/60 p-8 hover:shadow-xl transition-shadow bg-background/70 backdrop-blur-sm"
            >
              <motion.span
                className="text-4xl font-display font-bold text-foreground/10 mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                {item.step}
              </motion.span>
              <motion.div
                className="w-14 h-14 rounded-full bg-secondary/40 flex items-center justify-center mb-5"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <item.icon size={24} className="text-foreground" />
              </motion.div>
              <h3 className="text-lg font-display font-bold mb-2 text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════
          FEATURES — Gradient bg strip, concentric rings, 2x2 grid
      ═══════════════════════════════════════════════════════════ */}
      <motion.section
        id="features"
        className="relative w-full flex flex-col items-center px-6 py-28 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(160 40% 91%) 0%, hsl(190 50% 90%) 50%, hsl(210 45% 90%) 100%)" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <ConcentricRings />

        <motion.div className="relative z-10 flex flex-col items-center w-full max-w-4xl">
          <motion.h2
            variants={fadeUp}
            custom={0}
            className="text-3xl md:text-5xl font-display font-bold text-center mb-4 text-foreground"
          >
            Features
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-muted-foreground text-center max-w-xl mb-14">
            Comprehensive analysis for every aspect of your music.
          </motion.p>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full" variants={staggerContainer}>
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
                whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.3 } }}
                className="group rounded-2xl border border-border/60 p-8 hover:shadow-xl transition-shadow bg-background/70 backdrop-blur-sm"
              >
                <motion.div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: "var(--gradient-card)" }}
                  whileHover={{ rotate: -15, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <f.icon size={24} className="text-foreground" />
                </motion.div>
                <h3 className="text-lg font-display font-bold mb-2 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════
          BUILT FOR COMPOSERS — Gradient cards in a row, clean bg
      ═══════════════════════════════════════════════════════════ */}
      <motion.section
        className="relative w-full flex flex-col items-center px-6 py-28" style={{ background: "linear-gradient(180deg, hsl(210 45% 90%) 0%, hsl(180 38% 91%) 50%, hsl(160 35% 91%) 100%)" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.h2
          variants={fadeUp}
          custom={0}
          className="text-3xl md:text-5xl font-display font-bold text-center mb-4 text-foreground"
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
              whileHover={{ y: -10, scale: 1.06, transition: { duration: 0.3, type: "spring", stiffness: 300 } }}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-border hover:shadow-xl transition-shadow"
              style={{ background: "var(--gradient-card)" }}
            >
              <motion.div
                className="w-14 h-14 rounded-full bg-background/50 flex items-center justify-center"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" as const }}
              >
                <item.icon size={28} className="text-foreground" />
              </motion.div>
              <span className="text-sm font-medium text-foreground text-center">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════════
          CTA — Accent-tinted bg, big card with floating notes
      ═══════════════════════════════════════════════════════════ */}
      <motion.section
        className="relative w-full flex flex-col items-center px-6 py-28"
        style={{ background: "linear-gradient(180deg, hsl(160 35% 91%) 0%, hsl(180 38% 91%) 50%, hsl(48 40% 95%) 100%)" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <DotPattern />

        <motion.div
          variants={scaleIn}
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          className="relative z-10 w-full max-w-3xl rounded-3xl border border-border p-12 md:p-16 text-center overflow-hidden"
          style={{ background: "var(--gradient-card)" }}
        >
          <motion.span
            className="absolute top-6 left-8 text-4xl pointer-events-none select-none"
            animate={{ y: [0, -10, 0], rotate: [-5, 10, -5], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
          >
            <span style={{ background: "linear-gradient(135deg, hsl(210 60% 60%), hsl(160 50% 55%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }} className="font-display">♫</span>
          </motion.span>
          <motion.span
            className="absolute bottom-8 right-10 text-5xl pointer-events-none select-none"
            animate={{ y: [0, -15, 0], rotate: [5, -10, 5], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "easeInOut" as const }}
          >
            <span style={{ background: "linear-gradient(135deg, hsl(160 50% 55%), hsl(210 60% 60%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }} className="font-display">𝄞</span>
          </motion.span>

          <h2 className="relative text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Start Improving Your Music Today
          </h2>
          <p className="relative text-muted-foreground max-w-lg mx-auto mb-8">
            Upload your composition and get instant AI feedback.
          </p>
          <motion.div className="flex justify-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
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

      <footer className="w-full py-8 px-6" />
    </main>
  );
};

export default Index;
