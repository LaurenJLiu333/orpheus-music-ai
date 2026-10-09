import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { FileAudio, FileText, Download, Trash2, Loader2, ChevronDown, ChevronUp, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";
import jsPDF from "jspdf";

interface Analysis {
  id: string;
  file_name: string;
  file_type: string;
  feedback: string;
  created_at: string;
}

interface FeedbackSection {
  title: string;
  status: "success" | "warning" | "suggestion";
  content: string;
}

const stripMarkdown = (text: string) => text.replace(/\*{3,}/g, "").replace(/\*\*/g, "");

const parseFeedbackCards = (text: string): FeedbackSection[] => {
  const cleaned = text.replace(/\*{3,}/g, "");
  const lines = cleaned.split("\n");
  const sections: FeedbackSection[] = [];
  let current: { title: string; lines: string[] } | null = null;

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

const statusIcon = (status: FeedbackSection["status"]) => {
  switch (status) {
    case "success": return <CheckCircle2 size={16} className="text-green-600" />;
    case "warning": return <AlertTriangle size={16} className="text-yellow-600" />;
    case "suggestion": return <Sparkles size={16} style={{ color: "#200f3f" }} />;
  }
};

const History = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const fetchAnalyses = async () => {
      const { data, error } = await supabase
        .from("analyses")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setAnalyses(data as Analysis[]);
      setLoading(false);
    };
    fetchAnalyses();
  }, [user]);

  const downloadPdf = (analysis: Analysis) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    let y = 20;

    const checkPageBreak = (needed: number) => {
      if (y + needed > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
    };

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Orpheus Music AI — Feedback", margin, y);
    y += 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`File name: ${analysis.file_name}`, margin, y);
    y += 7;
    doc.text(`Date: ${new Date(analysis.created_at).toLocaleString()}`, margin, y);
    y += 12;

    const sections = parseFeedbackCards(analysis.feedback);
    if (sections.length > 0) {
      for (const section of sections) {
        checkPageBreak(14);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.text(stripMarkdown(section.title), margin, y);
        y += 7;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        const bodyLines = doc.splitTextToSize(stripMarkdown(section.content), maxWidth);
        for (const line of bodyLines) {
          checkPageBreak(6);
          doc.text(line, margin, y);
          y += 6;
        }
        y += 6;
      }
    } else {
      doc.setFontSize(11);
      const lines = doc.splitTextToSize(stripMarkdown(analysis.feedback), maxWidth);
      for (const line of lines) {
        checkPageBreak(6);
        doc.text(line, margin, y);
        y += 6;
      }
    }

    doc.save(`${analysis.file_name.replace(/\.[^.]+$/, "")}-feedback.pdf`);
  };

  const deleteAnalysis = async (id: string) => {
    const { error } = await supabase.from("analyses").delete().eq("id", id);
    if (!error) setAnalyses((prev) => prev.filter((a) => a.id !== id));
  };

  if (!authLoading && !user) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[60vh] px-6">
        <p className="text-lg text-muted-foreground mb-4">Please log in to view your feedback history.</p>
        <Button onClick={() => navigate("/login")} variant="outline" className="rounded-full px-8 border-foreground">Login</Button>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center px-6 py-10 max-w-5xl mx-auto w-full">
      <h1 className="text-3xl font-display font-bold mb-2" style={{ color: "#200f3f" }}>Feedback History</h1>
      <p className="text-sm text-muted-foreground mb-8">Your past analyses — view them again or download as a PDF.</p>

      {loading ? (
        <div className="flex items-center gap-2 text-muted-foreground p-6">
          <Loader2 className="animate-spin" size={16} /> Loading your history...
        </div>
      ) : analyses.length === 0 ? (
        <div className="w-full rounded-2xl border border-border bg-card p-10 text-center">
          <p className="text-muted-foreground text-sm mb-4">No analyses yet. Upload a MIDI or PDF file to get your first feedback.</p>
          <Button onClick={() => navigate("/upload")} className="rounded-full px-8 font-semibold text-foreground" style={{ background: "var(--gradient-button)" }} variant="ghost">
            Upload a composition
          </Button>
        </div>
      ) : (
        <div className="w-full space-y-4">
          {analyses.map((analysis) => {
            const expanded = expandedId === analysis.id;
            const sections = expanded ? parseFeedbackCards(analysis.feedback) : [];
            return (
              <div key={analysis.id} className="rounded-2xl border border-border bg-muted shadow-lg p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {analysis.file_type === "pdf" ? <FileText size={20} style={{ color: "#200f3f" }} /> : <FileAudio size={20} style={{ color: "#200f3f" }} />}
                    <div>
                      <p className="font-semibold" style={{ color: "#200f3f" }}>File name: {analysis.file_name}</p>
                      <p className="text-xs text-muted-foreground">{new Date(analysis.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-full border-foreground text-foreground" onClick={() => setExpandedId(expanded ? null : analysis.id)}>
                      {expanded ? <><ChevronUp size={14} className="mr-1" /> Hide</> : <><ChevronDown size={14} className="mr-1" /> View</>}
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full border-foreground text-foreground" onClick={() => downloadPdf(analysis)}>
                      <Download size={14} className="mr-1" /> PDF
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive" onClick={() => deleteAnalysis(analysis.id)}>
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>

                {expanded && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
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
                            <p key={j} className="mb-1">{line.replace(/\*\*/g, "")}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default History;
