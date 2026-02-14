import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Send, Loader2, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import lyreLogo from "@/assets/lyre-logo.png";

type Msg = { role: "user" | "assistant"; content: string; timestamp: Date };

const Chat = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: input.trim(), timestamp: new Date() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { messages: newMessages.map(m => ({ role: m.role, content: m.content })) },
      });
      if (error) throw error;
      const content = data?.choices?.[0]?.message?.content || data?.content || "Sorry, I couldn't respond.";
      setMessages(prev => [...prev, { role: "assistant", content, timestamp: new Date() }]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: "assistant", content: "An error occurred. Please try again.", timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  if (!authLoading && !user) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[60vh] px-6">
        <p className="text-lg text-muted-foreground mb-4">Please log in to use the AI assistant.</p>
        <Button onClick={() => navigate("/login")} variant="outline" className="rounded-full px-8 border-foreground">Login</Button>
      </main>
    );
  }

  return (
    <main className="flex flex-col max-w-3xl mx-auto h-[calc(100vh-64px)]">
      <div className="bg-chat-dark text-chat-dark-foreground p-4 flex items-center justify-between rounded-t-xl mt-6 mx-6">
        <h2 className="text-xl font-bold">AI Assistant</h2>
        <Button variant="ghost" size="sm" onClick={() => setMessages([])} className="text-chat-dark-foreground hover:bg-white/10">
          <Plus size={16} className="mr-1" /> New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-background mx-6 border-x border-border">
        {messages.length === 0 && (
          <p className="text-center text-muted-foreground text-sm mt-12">Ask me anything about music theory!</p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            {msg.role === "assistant" ? (
              <img src={lyreLogo} alt="Orpheus" className="w-10 h-10 rounded-full flex-shrink-0" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground text-lg">♪</span>
              </div>
            )}
            <div className={`max-w-[75%] ${msg.role === "user" ? "text-right" : ""}`}>
              <div className="rounded-2xl px-4 py-3 bg-card border border-border">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
              <span className="text-xs text-muted-foreground mt-1 block">{formatTime(msg.timestamp)}</span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-start gap-3">
            <img src={lyreLogo} alt="Orpheus" className="w-10 h-10 rounded-full" />
            <div className="bg-card border border-border rounded-2xl px-4 py-3 flex items-center gap-2 text-muted-foreground text-sm">
              <Loader2 className="animate-spin" size={14} /> Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-chat-dark p-4 flex gap-3 mx-6 rounded-b-xl mb-6">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about music theory..."
          disabled={loading}
          rows={1}
          className="flex-1 bg-chat-input text-chat-dark-foreground rounded-full px-5 py-3 text-sm resize-none focus:outline-none placeholder:text-chat-dark-foreground/50 disabled:opacity-50"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="w-11 h-11 rounded-full bg-accent flex items-center justify-center text-accent-foreground disabled:opacity-50 hover:opacity-80 transition-opacity"
        >
          <Send size={18} />
        </button>
      </div>
    </main>
  );
};

export default Chat;
