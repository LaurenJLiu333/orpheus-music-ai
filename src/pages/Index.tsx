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

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (i: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Decorative Components ─── */

// Dot grid background (matcha-inspired)
const DotGrid = ({ className = "" }: { className?: string }) => (
  <div
    className={`absolute inset-0 pointer-events-none ${className}`}
    style={{
      backgroundImage: "radial-gradient(circle, hsl(var(--foreground) / 0.06) 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    }}
  />
);

// Floating music symbols for hero
const floatingNote = (x: string, y: string, delay: number, rotate: number, size: number) => ({
  className: "absolute pointer-events-none select-none",
  style: { left: x, top: y, fontSize: size },
  initial: { opacity: 0, rotate: rotate - 20, scale: 0.5 },
  animate: {
    opacity: [0, 0.6, 0.35, 0.6],
    rotate: [rotate - 20, rotate + 15, rotate - 8, rotate + 20],
    y: [0, -25, 8, -15],
    scale: [0.5, 1.05, 0.9, 1.05],
  },
  transition: {
    duration: 7,
    delay,
    repeat: Infinity,
    repeatType: "mirror" as const,
    ease: "easeInOut" as const,
  },
});

// Equalizer bars
const EqualizerBars = ({ count = 7, barClass = "" }: { count?: number; barClass?: string }) => (
  <div className="flex items-end gap-1 h-8">
    {Array.from({ length: count }).map((_, i) => {
      const h = [0.3, 0.7, 0.5, 1, 0.4, 0.8, 0.6, 0.9, 0.35][i % 9];
      return (
        <motion.div
          key={i}
          className={`w-1.5 rounded-full bg-gradient-to-t from-[hsl(var(--foreground))] to-[hsl(160,40%,50%)] ${barClass}`}
          initial={{ height: 4 }}
          animate={{ height: [4, h * 32, 8, h * 24, 4] }}
          transition={{ duration: 1.8, delay: i * 0.12, repeat: Infinity, ease: "easeInOut" as const }}
        />
      );
    })}
  </div>
);

// Waveform line
const Waveform = () => (
  <div className="flex items-center gap-0.5 h-6">
    {Array.from({ length: 24 }).map((_, i) => (
      <motion.div
        key={i}
        className="w-0.5 rounded-full bg-foreground/20"
        initial={{ height: 3 }}
        animate={{ height: [3, Math.random() * 18 + 5, 3] }}
        transition={{ duration: 1.4 + Math.random() * 0.6, delay: i * 0.04, repeat: Infinity, ease: "easeInOut" as const }}
      />
    ))}
  </div>
);

// Concentric circles decoration
const ConcentricCircles = () => (
  <div className="absolute pointer-events-none select-none">
    {[120, 200, 280].map((size, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full border border-foreground/[0.06]"
        style={{ width: size, height: size, top: `50%`, left: `50%`, transform: "translate(-50%, -50%)" }}
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: i * 0.2 }}
      />
    ))}
  </div>
);

const Index = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="flex flex-col items-center overflow-hidden">

      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO
          Style: Dot grid bg, floating music notes, centered text
          ═══════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative w-full flex flex-col items-center justify-center px-6 pt-28 pb-24 min-h-[90vh] overflow-hidden"
      >
        <DotGrid />

        {/* Floating music notes */}
        {[
          { symbol: "𝄞", ...floatingNote("8%", "12%", 0, -20, 80) },
          { symbol: "♪", ...floatingNote("86%", "18%", 0.4, 15, 64) },
          { symbol: "♫", ...floatingNote("14%", "65%", 1, -10, 56) },
          { symbol: "♬", ...floatingNote("78%", "70%", 0.7, 25, 60) },
          { symbol: "♩", ...floatingNote("50%", "6%", 1.3, -30, 48) },
          { symbol: "♪", ...floatingNote("92%", "44%", 0.2, 20, 52) },
          { symbol: "𝄢", ...floatingNote("5%", "40%", 1.8, 12, 70) },
          { symbol: "♫", ...floatingNote("60%", "80%", 1.5, -18, 50) },
        ].map(({ symbol, ...props }, i) => (
          <motion.span key={i} {...props}>
            <span className="font-display font-bold bg-gradient-to-br from-foreground/50 to-secondary/60 bg-clip-text text-transparent">
              {symbol}
            </span>
          </motion.span>
        ))}

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[1.08] mb-6 text-foreground"
          >
            Improve Your Music{" "}
            <motion.span
              initial={{ opacity: 0, scale: 0.85, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              className="bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent inline-block"
            >
              With AI
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Upload your composition and receive instant feedback on harmony, melody, structure, and emotional impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
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
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex justify-center mt-8"
          >
            <EqualizerBars />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2 — PRODUCT DEMO
          Style: Subtle cream-tinted bg, rounded card, inner grid
          ═══════════════════════════════════════════ */}
      <motion.section
        id="demo"
        className="relative w-full flex flex-col items-center px-6 py-28"
        style={{ background: "hsl(var(--muted) / 0.5)" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <motion.div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span variants={fadeUp} custom={0} className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Live Preview
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            See How Orpheus Analyzes Your Music
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground">
            Deep analysis of every dimension of your composition.
          </motion.p>
        </motion.div>

        <motion.div
          variants={scaleIn}
          custom={3}
          className="w-full max-w-5xl rounded-2xl border border-border p-6 md:p-8 shadow-lg bg-card mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" as const }}>
              <Music size={20} className="text-foreground" />
            </motion.div>
            <span className="font-semibold text-foreground">Composition: Cello.midi</span>
            <div className="ml-auto">
              <EqualizerBars count={5} />
            </div>
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <CheckCircle2 size={16} className="text-green-600" />,
                title: "Melody Analysis",
                content: "The melody spans C2 to A4, showing a healthy rise from the bass register into the tenor range. With only 8 unique pitches across 84 notes, the motif is highly repetitive. Introduce chromatic passing tones to break predictability.",
              },
              {
                icon: <AlertTriangle size={16} className="text-yellow-600" />,
                title: "Harmony & Chord Fit",
                content: "The pitch classes suggest C Major or A Natural Minor tonality. The lack of accidentals suggests a safe but static harmonic progression. Introduce a leading tone (G#) for stronger A minor cadences.",
              },
              {
                icon: <CheckCircle2 size={16} className="text-green-600" />,
                title: "Rhythm & Meter",
                content: "The note count suggests ~7 notes per bar. Ensure rhythmic variety; avoid constant eighth notes. Use ties across barlines for a more lyrical, vocal quality idiomatic to the cello.",
              },
              {
                icon: <CheckCircle2 size={16} className="text-green-600" />,
                title: "Range & Playability",
                content: "C2 to A4 is perfectly idiomatic for Cello. C2 is the open C-string providing a resonant foundation. A4 is reachable in thumb position. Avoid rapid leaps from C2 to A4.",
              },
              {
                icon: <CheckCircle2 size={16} className="text-green-600" />,
                title: "Style Consistency",
                content: "The limited pitch set suggests a Minimalist or Neo-Classical style. The average velocity of 80 is static. Incorporate crescendos and diminuendos to enhance expressive quality.",
              },
              {
                icon: <Sparkles size={16} className="text-foreground" />,
                title: "Top 3 Fixes",
                content: "1. Vary velocity (60–100) for realistic bowing. 2. Introduce G# leading tone for stronger cadences. 3. Break patterns with dotted rhythms or rests for better flow.",
                special: true,
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                custom={i}
                whileHover={{ scale: 1.02, y: -3, transition: { duration: 0.2 } }}
                className={`rounded-xl border p-5 cursor-default transition-shadow hover:shadow-md ${
                  card.special ? "bg-foreground/[0.04] border-foreground/15" : "bg-background/60 border-border"
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
      </motion.section>

      {/* ═══════════════════════════════════════════
          SECTION 3 — HOW IT WORKS
          Style: Clean white bg, horizontal numbered steps with connecting line
          ═══════════════════════════════════════════ */}
      <motion.section
        id="how-it-works"
        className="relative w-full flex flex-col items-center px-6 py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <motion.div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span variants={fadeUp} custom={0} className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Simple Process
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            How It Works
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground">
            Three simple steps to better compositions.
          </motion.p>
        </motion.div>

        {/* Connecting line behind steps (desktop) */}
        <div className="relative w-full max-w-4xl mx-auto">
          <motion.div
            className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-border"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
          />

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6" variants={staggerContainer}>
            {[
              { icon: Upload, step: "01", title: "Upload Music", desc: "Upload MIDI, sheet music, or audio files in seconds.", variant: slideFromLeft },
              { icon: Brain, step: "02", title: "AI Analysis", desc: "Our AI evaluates harmony, melody, rhythm, and structure.", variant: fadeUp },
              { icon: MessageSquare, step: "03", title: "Get Feedback", desc: "Receive clear, actionable suggestions to improve your work.", variant: slideFromRight },
            ].map((item) => (
              <motion.div
                key={item.step}
                variants={item.variant}
                custom={parseInt(item.step) - 1}
                className="flex flex-col items-center text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center mb-5 shadow-md"
                >
                  <item.icon size={24} className="text-primary-foreground" />
                </motion.div>
                <span className="text-xs font-mono text-muted-foreground mb-2 tracking-wider">{item.step}</span>
                <h3 className="text-lg font-display font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px]">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════
          SECTION 4 — FEATURES
          Style: Gradient bg, 2x2 grid with icon + concentric circles accent
          ═══════════════════════════════════════════ */}
      <motion.section
        id="features"
        className="relative w-full flex flex-col items-center px-6 py-28 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(var(--muted) / 0.4) 0%, hsl(var(--background)) 100%)" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        {/* Decorative circles */}
        <div className="absolute right-[-60px] top-20 opacity-40">
          <ConcentricCircles />
        </div>

        <motion.div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
          <motion.span variants={fadeUp} custom={0} className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Capabilities
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Comprehensive Analysis
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground">
            Every aspect of your music, examined and refined.
          </motion.p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl mx-auto relative z-10" variants={staggerContainer}>
          {[
            { icon: BarChart3, title: "Harmony Analysis", desc: "Detect weak chord progressions, find voice-leading issues, and receive reharmonization suggestions." },
            { icon: Mic2, title: "Melody Insights", desc: "Identify repetitive phrases, analyze contour, and get ideas for melodic development." },
            { icon: Layers, title: "Structure Feedback", desc: "Improve pacing, form, and musical development across all sections of your piece." },
            { icon: Headphones, title: "Orchestration Tips", desc: "Balance instrumentation, texture, and dynamics for a richer, more professional sound." },
          ].map((f, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              custom={i}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group flex gap-5 rounded-2xl border border-border bg-card p-7 hover:shadow-lg transition-all cursor-default"
            >
              <motion.div
                className="w-12 h-12 shrink-0 rounded-xl bg-foreground/[0.06] flex items-center justify-center"
                whileHover={{ rotate: -10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <f.icon size={22} className="text-foreground" />
              </motion.div>
              <div>
                <h3 className="text-base font-display font-bold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Waveform accent */}
        <motion.div
          className="mt-14 w-56 mx-auto"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 0.5, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Waveform />
        </motion.div>
      </motion.section>

      {/* ═══════════════════════════════════════════
          SECTION 5 — BUILT FOR COMPOSERS
          Style: Clean bg, 4-column icon grid with floating animation
          ═══════════════════════════════════════════ */}
      <motion.section
        className="w-full flex flex-col items-center px-6 py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <motion.div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span variants={fadeUp} custom={0} className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Who It's For
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Built for Composers
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground">
            Whether you're a student, professional, or hobbyist — Orpheus has you covered.
          </motion.p>
        </motion.div>

        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full max-w-3xl mx-auto" variants={staggerContainer}>
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
              whileHover={{ y: -8, scale: 1.04, transition: { duration: 0.25, type: "spring", stiffness: 300 } }}
              className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-all cursor-default"
            >
              <motion.div
                className="w-14 h-14 rounded-2xl bg-foreground/[0.06] flex items-center justify-center"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" as const }}
              >
                <item.icon size={26} className="text-foreground" />
              </motion.div>
              <span className="text-sm font-medium text-foreground text-center leading-tight">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ═══════════════════════════════════════════
          SECTION 6 — FINAL CTA
          Style: Gradient card with dot grid overlay, floating notes
          ═══════════════════════════════════════════ */}
      <motion.section
        className="w-full flex flex-col items-center px-6 py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <motion.div
          variants={scaleIn}
          className="relative w-full max-w-3xl mx-auto rounded-3xl border border-border p-12 md:p-16 text-center overflow-hidden"
          style={{ background: "var(--gradient-card)" }}
        >
          <DotGrid className="opacity-30" />

          {/* Floating accents */}
          <motion.span
            className="absolute top-8 left-10 text-4xl pointer-events-none select-none"
            animate={{ y: [0, -10, 0], rotate: [-5, 10, -5], opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
          >
            <span className="bg-gradient-to-br from-foreground/30 to-accent/30 bg-clip-text text-transparent font-display">♫</span>
          </motion.span>
          <motion.span
            className="absolute bottom-8 right-12 text-5xl pointer-events-none select-none"
            animate={{ y: [0, -12, 0], rotate: [5, -8, 5], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "easeInOut" as const }}
          >
            <span className="bg-gradient-to-br from-foreground/30 to-accent/30 bg-clip-text text-transparent font-display">𝄞</span>
          </motion.span>

          <motion.h2 variants={fadeUp} custom={0} className="relative text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Start Improving Your Music Today
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="relative text-muted-foreground max-w-lg mx-auto mb-8">
            Upload your composition and get instant AI feedback.
          </motion.p>
          <motion.div variants={fadeUp} custom={2} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
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
