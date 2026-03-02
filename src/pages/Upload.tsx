import { useState, useCallback, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload as UploadIcon, X, FileAudio, Loader2, Check, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const INSTRUMENTS = [
  "Piano", "Guitar", "Bass", "Drums", "Violin", "Viola", "Cello",
  "Flute", "Clarinet", "Saxophone", "Trumpet", "Trombone", "French Horn",
  "Oboe", "Bassoon", "Harp", "Organ", "Synthesizer", "Voice/Vocals",
  "Ukulele", "Banjo", "Mandolin", "Accordion", "Harmonica", "Timpani",
  "Vibraphone", "Marimba", "Xylophone",
];

interface FeedbackSection {
  title: string;
  status: "success" | "warning" | "suggestion";
  content: string;
}

const Upload = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (user && !authLoading) {
      setShowWelcome(true);
      const timer = setTimeout(() => setShowWelcome(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [user, authLoading]);

  const handleFile = useCallback((f: File) => {
    if (f.name.match(/\.(mid|midi)$/i)) {
      setFile(f);
      setError("");
      setFeedback("");
    } else {
      setError("Please upload a .mid or .midi file.");
    }
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const toggleInstrument = (instrument: string) => {
    setSelectedInstruments(prev =>
      prev.includes(instrument) ? prev.filter(i => i !== instrument) : [...prev, instrument]
    );
  };

  const analyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    setFeedback("");
    setError("");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

      const { data, error: fnError } = await supabase.functions.invoke("analyze-midi", {
        body: {
          midiBase64: base64,
          fileName: file.name,
          fileSize: file.size,
          instruments: selectedInstruments,
        },
      });

      if (fnError) throw fnError;
      setFeedback(data?.analysis || "No feedback received.");
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Analysis failed. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const stripMarkdown = (text: string) => text.replace(/\*{3,}/g, "");

  const parseFeedbackCards = (text: string): FeedbackSection[] => {
    const cleaned = stripMarkdown(text);
    const lines = cleaned.split("\n");
    const sections: FeedbackSection[] = [];
    let current: { title: string; lines: string[] } | null = null;

    for (const line of lines) {
      const headerMatch = line.match(/^#{1,3}\s+(.+)/);
      if (headerMatch) {
        if (current) sections.push(buildSection(current));
        current = { title: headerMatch[1].trim(), lines: [] };
      } else if (current && line.trim()) {
        current.lines.push(line);
      }
    }
    if (current) sections.push(buildSection(current));
    return sections;
  };

  const buildSection = (raw: { title: string; lines: string[] }): FeedbackSection => {
    const titleLower = raw.title.toLowerCase();
    let status: FeedbackSection["status"] = "success";
    const content = raw.lines.join("\n");

    if (titleLower.includes("top 3") || titleLower.includes("suggestion") || titleLower.includes("fix")) {
      status = "suggestion";
    } else if (content.includes("⚠") || content.toLowerCase().includes("repetit") || content.toLowerCase().includes("weak") || content.toLowerCase().includes("warning")) {
      status = "warning";
    }
    return { title: raw.title, status, content };
  };

  const renderContent = (text: string) => {
    // Split on bold markers **...**
    const parts = text.split(/\*\*(.*?)\*\*/g);
    const elements: React.ReactNode[] = [];
    parts.forEach((part, k) => {
      if (k % 2 === 1) {
        // This is a bold subheading — put it on a new line
        elements.push(<br key={`br-${k}`} />);
        elements.push(<strong key={k} className="font-bold" style={{ color: "#200f3f" }}>{part}</strong>);
      } else {
        elements.push(<span key={k}>{part}</span>);
      }
    });
    return elements;
  };

  if (!authLoading && !user) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[60vh] px-6">
        <p className="text-lg text-muted-foreground mb-4">Please log in to upload and analyze MIDI files.</p>
        <Button onClick={() => navigate("/login")} variant="outline" className="rounded-full px-8 border-foreground">Login</Button>
      </main>
    );
  }

  const sections = feedback ? parseFeedbackCards(feedback) : [];
  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split("@")[0] || "there";

  const statusIcon = (status: FeedbackSection["status"]) => {
    switch (status) {
      case "success": return <CheckCircle2 size={16} className="text-green-600" />;
      case "warning": return <AlertTriangle size={16} className="text-yellow-600" />;
      case "suggestion": return <Sparkles size={16} style={{ color: "#200f3f" }} />;
    }
  };

  return (
    <main className="flex flex-col items-center px-6 py-10 max-w-5xl mx-auto">
      {showWelcome && (
        <div className="w-full mb-6 rounded-2xl border border-accent/30 bg-accent/10 p-6 text-center animate-in fade-in slide-in-from-top-4 duration-500">
          <h2 className="text-2xl font-display font-bold" style={{ color: "#200f3f" }}>
            Welcome, {displayName}! 👋
          </h2>
          <p className="text-sm text-muted-foreground mt-1">You're logged in and ready to analyze.</p>
        </div>
      )}

      {/* Upload area */}
      <div
        onDragOver={e => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`w-full rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all ${
          dragActive ? "border-accent bg-accent/10" : "border-border bg-card"
        }`}
      >
        <input ref={inputRef} type="file" accept=".mid,.midi" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
        <UploadIcon className="mx-auto mb-4 text-foreground" size={48} />
        <h2 className="text-2xl font-bold text-foreground mb-2">UPLOAD</h2>
        <p className="text-sm text-muted-foreground">Drag and drop a .mid file or click to browse</p>

        {file && (
          <div className="mt-4 flex items-center justify-center gap-3 bg-background/80 rounded-xl px-4 py-2 mx-auto w-fit">
            <FileAudio size={20} className="text-foreground" />
            <span className="text-sm font-medium text-foreground">{file.name}</span>
            <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
            <button onClick={(e) => { e.stopPropagation(); setFile(null); setFeedback(""); }} className="text-muted-foreground hover:text-destructive"><X size={16} /></button>
          </div>
        )}

        <Button
          onClick={(e) => { e.stopPropagation(); analyze(); }}
          disabled={!file || analyzing}
          className="mt-6 rounded-full px-10 py-2 font-semibold text-foreground disabled:opacity-50"
          style={{ background: "var(--gradient-button)" }}
          variant="ghost"
        >
          {analyzing ? <><Loader2 className="animate-spin mr-2" size={16} /> Analyzing...</> : "Analyze"}
        </Button>
      </div>

      {/* Instrument selector */}
      <div className="w-full mt-8 rounded-2xl border border-border bg-card p-6">
        <h3 className="text-lg font-bold text-foreground mb-2">Instruments in Your Score</h3>
        <p className="text-sm text-muted-foreground mb-4">Select the instruments used so the AI can give specialized feedback.</p>
        <div className="flex flex-wrap gap-2">
          {INSTRUMENTS.map(inst => {
            const selected = selectedInstruments.includes(inst);
            return (
              <button
                key={inst}
                onClick={() => toggleInstrument(inst)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all flex items-center gap-1.5 ${
                  selected
                    ? "border-foreground bg-foreground text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-foreground/50"
                }`}
              >
                {selected && <Check size={14} />}
                {inst}
              </button>
            );
          })}
        </div>
        {selectedInstruments.length > 0 && (
          <p className="text-xs text-muted-foreground mt-3">
            {selectedInstruments.length} instrument{selectedInstruments.length > 1 ? "s" : ""} selected
          </p>
        )}
      </div>

      {error && <p className="text-destructive text-sm mt-4">{error}</p>}

      {/* Feedback - card-based layout matching landing page */}
      <div className="w-full mt-8">
        <h3 className="text-lg font-bold mb-4" style={{ color: "#200f3f" }}>Feedback</h3>
        {analyzing ? (
          <div className="flex items-center gap-2 text-muted-foreground p-6">
            <Loader2 className="animate-spin" size={16} /> Analyzing your MIDI file...
          </div>
        ) : sections.length > 0 ? (
          <div className="rounded-2xl border border-border p-6 shadow-lg bg-muted">
            {file && (
              <div className="flex items-center gap-3 mb-6">
                <FileAudio size={20} style={{ color: "#200f3f" }} />
                <span className="font-semibold" style={{ color: "#200f3f" }}>Composition: {file.name}</span>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sections.map((section, i) => (
                <div
                  key={i}
                  className={`rounded-xl border p-5 ${
                    section.status === "suggestion"
                      ? "bg-background/30 border-foreground/20"
                      : "bg-background/40 border-border"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {statusIcon(section.status)}
                    <span className="text-sm font-semibold" style={{ color: "#200f3f" }}>{section.title}</span>
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {section.content.split("\n").map((line, j) => (
                      <p key={j} className="mb-1">{renderContent(line)}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-muted-foreground text-sm">Upload and analyze a MIDI file to see feedback here.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Upload;
