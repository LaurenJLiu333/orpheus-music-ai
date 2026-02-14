import { useState, useCallback, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload as UploadIcon, X, FileAudio, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";

const Upload = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const analyze = async () => {
    if (!file) return;
    setAnalyzing(true);
    setFeedback("");
    setError("");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

      const { data, error: fnError } = await supabase.functions.invoke("analyze-midi", {
        body: { midiBase64: base64, fileName: file.name, fileSize: file.size },
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

  if (!authLoading && !user) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[60vh] px-6">
        <p className="text-lg text-muted-foreground mb-4">Please log in to upload and analyze MIDI files.</p>
        <Button onClick={() => navigate("/login")} variant="outline" className="rounded-full px-8 border-foreground">Login</Button>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center px-6 py-10 max-w-3xl mx-auto">
      <div
        onDragOver={e => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`w-full rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all ${
          dragActive ? "border-accent bg-accent/10" : "border-border bg-card"
        }`}
        style={{ background: dragActive ? undefined : "var(--gradient-hero)" }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".mid,.midi"
          className="hidden"
          onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        <UploadIcon className="mx-auto mb-4 text-foreground/40" size={48} />
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">UPLOAD</h2>
        <p className="text-sm text-muted-foreground">Drag & drop a .mid file or click to browse</p>

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

      {error && <p className="text-destructive text-sm mt-4">{error}</p>}

      <div className="w-full mt-8 rounded-2xl border border-border bg-card p-6 min-h-[200px]">
        <h3 className="text-lg font-bold text-foreground mb-4 font-sans">Feedback</h3>
        {analyzing ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="animate-spin" size={16} /> Analyzing your MIDI file...
          </div>
        ) : feedback ? (
          <div className="prose prose-sm max-w-none text-foreground/90">
            <ReactMarkdown>{feedback}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">Upload and analyze a MIDI file to see feedback here.</p>
        )}
      </div>
    </main>
  );
};

export default Upload;
