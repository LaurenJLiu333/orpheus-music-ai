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

const DotGrid = ({ className = "" }: { className?: string }) => (
  <div
    className={`absolute inset-0 pointer-events-none ${className}`}
    style={{
      backgroundImage: "radial-gradient(circle, hsl(var(--foreground) / 0.06) 1px, transparent 1px)",
      backgroundSize: "24px 24px",
    }}
  />
);

const floatingNote = (x: string, y: string, delay: number, rotate: number, size: number) => ({
  className: "absolute pointer-events-none select-none",
  style: { left: x, top: y, fontSize: size },
  initial: { opacity: 0, rotate: rotate - 20, scale: 0.5 },
  animate: {
    opacity: [0, 0.7, 0.4, 0.7],
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

const EqualizerBars = ({ count = 7 }: { count?: number }) => (
  <div className="flex items-end gap-1 h-8">
    {Array.from({ length: count }).map((_, i) => {
      const h = [0.3, 0.7, 0.5, 1, 0.4, 0.8, 0.6, 0.9, 0.35][i % 9];
      const colors = [
        "from-[#c471f5] to-[#fa71cd]",
        "from-[#43e97b] to-[#38f9d7]",
        "from-[#4facfe] to-[#00f2fe]",
        "from-[#f093fb] to-[#f5576c]",
        "from-[#ffecd2] to-[#fcb69f]",
        "from-[#a18cd1] to-[#fbc2eb]",
        "from-[#43e97b] to-[#38f9d7]",
      ];
      return (
        <motion.div
          key={i}
          className={`w-1.5 rounded-full bg-gradient-to-t ${colors[i % colors.length]}`}
          initial={{ height: 4 }}
          animate={{ height: [4, h * 32, 8, h * 24, 4] }}
          transition={{ duration: 1.8, delay: i * 0.12, repeat: Infinity, ease: "easeInOut" as const }}
        />
      );
    })}
  </div>
);

const Waveform = ({ color = "hsl(var(--color-violet))" }: { color?: string }) => (
  <div className="flex items-center gap-0.5 h-6">
    {Array.from({ length: 24 }).map((_, i) => (
      <motion.div
        key={i}
        className="w-0.5 rounded-full"
        style={{ backgroundColor: color, opacity: 0.4 }}
        initial={{ height: 3 }}
        animate={{ height: [3, Math.random() * 18 + 5, 3] }}
        transition={{ duration: 1.4 + Math.random() * 0.6, delay: i * 0.04, repeat: Infinity, ease: "easeInOut" as const }}
      />
    ))}
  </div>
);

const ColorBlob = ({ className = "", color }: { className?: string; color: string }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    style={{ background: color, width: 300, height: 300 }}
    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
  />
);

const Index = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="flex flex-col items-center overflow-hidden">

      {/* ═══════════════ SECTION 1 — HERO ═══════════════ */}
      <section
        ref={heroRef}
        className="relative w-full flex flex-col items-center justify-center px-6 pt-28 pb-24 min-h-[90vh] overflow-hidden"
      >
        <DotGrid />
        {/* Color blobs */}
        <ColorBlob className="top-10 left-[10%]" color="hsl(270, 70%, 60%, 0.15)" />
        <ColorBlob className="bottom-20 right-[10%]" color="hsl(170, 60%, 50%, 0.12)" />
        <ColorBlob className="top-[40%] right-[30%]" color="hsl(340, 80%, 65%, 0.1)" />

        {/* Floating music notes with colorful gradients */}
        {[
          { symbol: "𝄞", gradient: "from-[#c471f5] to-[#fa71cd]", ...floatingNote("8%", "12%", 0, -20, 80) },
          { symbol: "♪", gradient: "from-[#43e97b] to-[#38f9d7]", ...floatingNote("86%", "18%", 0.4, 15, 64) },
          { symbol: "♫", gradient: "from-[#4facfe] to-[#00f2fe]", ...floatingNote("14%", "65%", 1, -10, 56) },
          { symbol: "♬", gradient: "from-[#f093fb] to-[#f5576c]", ...floatingNote("78%", "70%", 0.7, 25, 60) },
          { symbol: "♩", gradient: "from-[#ffecd2] to-[#fcb69f]", ...floatingNote("50%", "6%", 1.3, -30, 48) },
          { symbol: "♪", gradient: "from-[#a18cd1] to-[#fbc2eb]", ...floatingNote("92%", "44%", 0.2, 20, 52) },
          { symbol: "𝄢", gradient: "from-[#f093fb] to-[#f5576c]", ...floatingNote("5%", "40%", 1.8, 12, 70) },
          { symbol: "♫", gradient: "from-[#43e97b] to-[#38f9d7]", ...floatingNote("60%", "80%", 1.5, -18, 50) },
        ].map(({ symbol, gradient, ...props }, i) => (
          <motion.span key={i} {...props}>
            <span className={`font-display font-bold bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
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
              className="bg-gradient-to-r from-[#c471f5] via-[#fa71cd] to-[#f5576c] bg-clip-text text-transparent inline-block"
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
                className="rounded-full px-8 py-3 text-base font-semibold text-white border-0"
                style={{ background: "var(--gradient-violet)" }}
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

      {/* ═══════════════ SECTION 2 — PRODUCT DEMO ═══════════════ */}
      <motion.section
        id="demo"
        className="relative w-full flex flex-col items-center px-6 py-28"
        style={{ background: "linear-gradient(180deg, hsl(270, 70%, 60%, 0.06) 0%, hsl(170, 60%, 50%, 0.06) 100%)" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <motion.div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span variants={fadeUp} custom={0} className="inline-block text-xs font-mono uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(270, 70%, 60%)" }}>
            Live Preview
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            See How Orpheus{" "}
            <span className="bg-gradient-to-r from-[#43e97b] to-[#38f9d7] bg-clip-text text-transparent">Analyzes</span>{" "}
            Your Music
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
              <Music size={20} style={{ color: "hsl(270, 70%, 60%)" }} />
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
                icon: <CheckCircle2 size={16} style={{ color: "hsl(160, 60%, 45%)" }} />,
                title: "Melody Analysis",
                accent: "hsl(160, 60%, 45%)",
                content: "The melody spans C2 to A4, showing a healthy rise from the bass register into the tenor range. With only 8 unique pitches across 84 notes, the motif is highly repetitive. Introduce chromatic passing tones to break predictability.",
              },
              {
                icon: <AlertTriangle size={16} style={{ color: "hsl(38, 95%, 55%)" }} />,
                title: "Harmony & Chord Fit",
                accent: "hsl(38, 95%, 55%)",
                content: "The pitch classes suggest C Major or A Natural Minor tonality. The lack of accidentals suggests a safe but static harmonic progression. Introduce a leading tone (G#) for stronger A minor cadences.",
              },
              {
                icon: <CheckCircle2 size={16} style={{ color: "hsl(200, 85%, 55%)" }} />,
                title: "Rhythm & Meter",
                accent: "hsl(200, 85%, 55%)",
                content: "The note count suggests ~7 notes per bar. Ensure rhythmic variety; avoid constant eighth notes. Use ties across barlines for a more lyrical, vocal quality idiomatic to the cello.",
              },
              {
                icon: <CheckCircle2 size={16} style={{ color: "hsl(270, 70%, 60%)" }} />,
                title: "Range & Playability",
                accent: "hsl(270, 70%, 60%)",
                content: "C2 to A4 is perfectly idiomatic for Cello. C2 is the open C-string providing a resonant foundation. A4 is reachable in thumb position. Avoid rapid leaps from C2 to A4.",
              },
              {
                icon: <CheckCircle2 size={16} style={{ color: "hsl(340, 80%, 60%)" }} />,
                title: "Style Consistency",
                accent: "hsl(340, 80%, 60%)",
                content: "The limited pitch set suggests a Minimalist or Neo-Classical style. The average velocity of 80 is static. Incorporate crescendos and diminuendos to enhance expressive quality.",
              },
              {
                icon: <Sparkles size={16} style={{ color: "hsl(12, 90%, 60%)" }} />,
                title: "Top 3 Fixes",
                accent: "hsl(12, 90%, 60%)",
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
                  card.special ? "border-foreground/15" : "bg-background/60 border-border"
                }`}
                style={card.special ? { background: `linear-gradient(135deg, ${card.accent}10, ${card.accent}05)` } : {}}
              >
                <div className="flex items-center gap-2 mb-2">
                  {card.icon}
                  <span className="text-sm font-semibold text-foreground">{card.title}</span>
                </div>
                <div className="w-8 h-0.5 rounded-full mb-3" style={{ backgroundColor: card.accent, opacity: 0.5 }} />
                <p className="text-sm text-muted-foreground leading-relaxed">{card.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ═══════════════ SECTION 3 — HOW IT WORKS ═══════════════ */}
      <motion.section
        id="how-it-works"
        className="relative w-full flex flex-col items-center px-6 py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <motion.div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span variants={fadeUp} custom={0} className="inline-block text-xs font-mono uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(340, 80%, 65%)" }}>
            Simple Process
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            How It{" "}
            <span className="bg-gradient-to-r from-[#f093fb] to-[#f5576c] bg-clip-text text-transparent">Works</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground">
            Three simple steps to better compositions.
          </motion.p>
        </motion.div>

        <div className="relative w-full max-w-4xl mx-auto">
          <motion.div
            className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px"
            style={{ background: "linear-gradient(90deg, hsl(270, 70%, 60%, 0.3), hsl(340, 80%, 65%, 0.3), hsl(12, 90%, 65%, 0.3))", transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6" variants={staggerContainer}>
            {[
              { icon: Upload, step: "01", title: "Upload Music", desc: "Upload MIDI, sheet music, or audio files in seconds.", variant: slideFromLeft, color: "#c471f5", bg: "linear-gradient(135deg, #c471f520, #fa71cd10)" },
              { icon: Brain, step: "02", title: "AI Analysis", desc: "Our AI evaluates harmony, melody, rhythm, and structure.", variant: fadeUp, color: "#43e97b", bg: "linear-gradient(135deg, #43e97b20, #38f9d710)" },
              { icon: MessageSquare, step: "03", title: "Get Feedback", desc: "Receive clear, actionable suggestions to improve your work.", variant: slideFromRight, color: "#4facfe", bg: "linear-gradient(135deg, #4facfe20, #00f2fe10)" },
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
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-md"
                  style={{ background: item.bg }}
                >
                  <item.icon size={24} style={{ color: item.color }} />
                </motion.div>
                <span className="text-xs font-mono mb-2 tracking-wider" style={{ color: item.color }}>{item.step}</span>
                <h3 className="text-lg font-display font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px]">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-14 w-56 mx-auto"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 0.6, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Waveform color="hsl(340, 80%, 65%)" />
        </motion.div>
      </motion.section>

      {/* ═══════════════ SECTION 4 — FEATURES ═══════════════ */}
      <motion.section
        id="features"
        className="relative w-full flex flex-col items-center px-6 py-28 overflow-hidden"
        style={{ background: "linear-gradient(180deg, hsl(200, 85%, 60%, 0.06) 0%, hsl(270, 70%, 60%, 0.06) 100%)" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        {/* Decorative blobs */}
        <ColorBlob className="right-[-80px] top-20" color="hsl(200, 85%, 60%, 0.08)" />
        <ColorBlob className="left-[-60px] bottom-20" color="hsl(270, 70%, 60%, 0.08)" />

        <motion.div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
          <motion.span variants={fadeUp} custom={0} className="inline-block text-xs font-mono uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(200, 85%, 55%)" }}>
            Capabilities
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-[#4facfe] to-[#00f2fe] bg-clip-text text-transparent">Analysis</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground">
            Every aspect of your music, examined and refined.
          </motion.p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-4xl mx-auto relative z-10" variants={staggerContainer}>
          {[
            { icon: BarChart3, title: "Harmony Analysis", desc: "Detect weak chord progressions, find voice-leading issues, and receive reharmonization suggestions.", color: "#c471f5", gradient: "from-[#c471f5] to-[#fa71cd]" },
            { icon: Mic2, title: "Melody Insights", desc: "Identify repetitive phrases, analyze contour, and get ideas for melodic development.", color: "#43e97b", gradient: "from-[#43e97b] to-[#38f9d7]" },
            { icon: Layers, title: "Structure Feedback", desc: "Improve pacing, form, and musical development across all sections of your piece.", color: "#4facfe", gradient: "from-[#4facfe] to-[#00f2fe]" },
            { icon: Headphones, title: "Orchestration Tips", desc: "Balance instrumentation, texture, and dynamics for a richer, more professional sound.", color: "#f5576c", gradient: "from-[#f093fb] to-[#f5576c]" },
          ].map((f, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              custom={i}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group flex gap-5 rounded-2xl border border-border bg-card p-7 hover:shadow-lg transition-all cursor-default"
            >
              <motion.div
                className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-br ${f.gradient}`}
                style={{ opacity: 0.15 }}
                whileHover={{ rotate: -10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <f.icon size={22} style={{ color: f.color, opacity: 1 }} />
              </motion.div>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center" style={{ background: `${f.color}15` }}>
                  <f.icon size={22} style={{ color: f.color }} />
                </div>
                <div>
                  <h3 className="text-base font-display font-bold text-foreground mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-14 w-56 mx-auto"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 0.5, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Waveform color="hsl(200, 85%, 60%)" />
        </motion.div>
      </motion.section>

      {/* ═══════════════ SECTION 5 — BUILT FOR COMPOSERS ═══════════════ */}
      <motion.section
        className="w-full flex flex-col items-center px-6 py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <motion.div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span variants={fadeUp} custom={0} className="inline-block text-xs font-mono uppercase tracking-[0.2em] mb-4" style={{ color: "hsl(38, 95%, 55%)" }}>
            Who It's For
          </motion.span>
          <motion.h2 variants={fadeUp} custom={1} className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Built for{" "}
            <span className="bg-gradient-to-r from-[#ffecd2] to-[#fcb69f] bg-clip-text text-transparent">Composers</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-muted-foreground">
            Whether you're a student, professional, or hobbyist — Orpheus has you covered.
          </motion.p>
        </motion.div>

        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-5 w-full max-w-3xl mx-auto" variants={staggerContainer}>
          {[
            { icon: GraduationCap, label: "Composition Students", color: "#c471f5", bg: "#c471f515" },
            { icon: Film, label: "Film Composers", color: "#f5576c", bg: "#f5576c15" },
            { icon: PenTool, label: "Music Producers", color: "#43e97b", bg: "#43e97b15" },
            { icon: Music, label: "Classical Musicians", color: "#4facfe", bg: "#4facfe15" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              custom={i}
              whileHover={{ y: -8, scale: 1.04, transition: { duration: 0.25, type: "spring", stiffness: 300 } }}
              className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-all cursor-default"
            >
              <motion.div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: item.bg }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.5, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" as const }}
              >
                <item.icon size={26} style={{ color: item.color }} />
              </motion.div>
              <span className="text-sm font-medium text-foreground text-center leading-tight">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ═══════════════ SECTION 6 — FINAL CTA ═══════════════ */}
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
          style={{ background: "linear-gradient(135deg, #a8edea, #fed6e3)" }}
        >
          <DotGrid className="opacity-20" />

          {/* Floating accents */}
          <motion.span
            className="absolute top-8 left-10 text-4xl pointer-events-none select-none"
            animate={{ y: [0, -10, 0], rotate: [-5, 10, -5], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
          >
            <span className="bg-gradient-to-br from-[#c471f5] to-[#fa71cd] bg-clip-text text-transparent font-display">♫</span>
          </motion.span>
          <motion.span
            className="absolute bottom-8 right-12 text-5xl pointer-events-none select-none"
            animate={{ y: [0, -12, 0], rotate: [5, -8, 5], opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "easeInOut" as const }}
          >
            <span className="bg-gradient-to-br from-[#4facfe] to-[#00f2fe] bg-clip-text text-transparent font-display">𝄞</span>
          </motion.span>
          <motion.span
            className="absolute top-12 right-16 text-3xl pointer-events-none select-none"
            animate={{ y: [0, -8, 0], rotate: [10, -5, 10], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4.5, delay: 0.5, repeat: Infinity, ease: "easeInOut" as const }}
          >
            <span className="bg-gradient-to-br from-[#43e97b] to-[#38f9d7] bg-clip-text text-transparent font-display">♪</span>
          </motion.span>

          <motion.h2 variants={fadeUp} custom={0} className="relative text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Start Improving Your Music{" "}
            <span className="bg-gradient-to-r from-[#c471f5] to-[#f5576c] bg-clip-text text-transparent">Today</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="relative text-muted-foreground max-w-lg mx-auto mb-8">
            Upload your composition and get instant AI feedback.
          </motion.p>
          <motion.div variants={fadeUp} custom={2} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              onClick={() => navigate("/upload")}
              className="relative rounded-full px-10 py-3 text-base font-semibold text-white border-0"
              style={{ background: "linear-gradient(135deg, #c471f5, #fa71cd)" }}
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
