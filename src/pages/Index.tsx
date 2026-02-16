import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Music, MessageSquare, BookOpen } from "lucide-react";

const features = [
  { icon: Music, title: "Analyze Music Notation", description: "Upload MIDI files and get detailed AI-powered analysis of your compositions." },
  { icon: MessageSquare, title: "Real-time Feedback", description: "Receive instant, actionable suggestions to improve your music." },
  { icon: BookOpen, title: "Learn Music Theory", description: "Chat with our AI tutor about harmony, melody, rhythm, and more." },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center px-6 py-16">
      <section className="text-center max-w-2xl mb-16">
        <h1 className="text-6xl md:text-7xl font-display font-black text-foreground mb-4">Orpheus</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Orpheus aims to help musicians improve compositions with AI feedback.
        </p>
        <Button
          onClick={() => navigate("/upload")}
          className="rounded-full px-8 py-3 text-base font-semibold border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-primary-foreground transition-all"
          variant="outline"
        >
          Get Started →
        </Button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {features.map((f, i) => (
          <div
            key={i}
            className="relative rounded-2xl p-8 h-56 flex flex-col justify-end overflow-hidden border border-border"
            style={{ background: "var(--gradient-card)" }}
          >
            <f.icon className="absolute top-4 right-4 text-foreground" size={40} />
            <h3 className="text-lg font-bold text-foreground font-sans">{f.title}</h3>
            <p className="text-sm text-foreground/70 mt-1">{f.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Index;
