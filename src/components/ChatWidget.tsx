import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import lyreLogo from "@/assets/lyre-logo.png";

type Msg = { role: "user" | "assistant"; content: string; timestamp: Date };

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

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
      const assistantContent = data?.choices?.[0]?.message?.content || data?.content || "Sorry, I couldn't generate a response.";
      setMessages(prev => [...prev, { role: "assistant", content: assistantContent, timestamp: new Date() }]);
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

  const newChat = () => setMessages([]);

  const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      >
        <img src={lyreLogo} alt="Chat" className="w-9 h-9 rounded-full" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 w-full sm:w-96 h-[500px] sm:h-[550px] sm:bottom-6 sm:right-6 flex flex-col rounded-t-xl sm:rounded-xl overflow-hidden shadow-2xl animate-slide-in-right border border-border">
      <div className="bg-chat-dark text-chat-dark-foreground p-4 flex items-center justify-between">
        <h3 className="text-lg font-bold">AI Assistant</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={newChat} className="text-chat-dark-foreground hover:bg-white/10 text-xs">New Chat</Button>
          <button onClick={() => setOpen(false)} className="text-chat-dark-foreground hover:text-white/70"><X size={20} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-background space-y-4">
        {messages.length === 0 && (
          <p className="text-center text-muted-foreground text-sm mt-8">Ask me anything about music theory!</p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            {msg.role === "assistant" ? (
              <img src={lyreLogo} alt="Orpheus" className="w-8 h-8 rounded-full flex-shrink-0" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-primary-foreground text-xs">♪</span>
              </div>
            )}
            <div className={`max-w-[75%] ${msg.role === "user" ? "text-right" : ""}`}>
              <div className="rounded-2xl px-4 py-2 text-sm bg-card border border-border">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
              <span className="text-xs text-muted-foreground mt-1 block">{formatTime(msg.timestamp)}</span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-start gap-2">
            <img src={lyreLogo} alt="Orpheus" className="w-8 h-8 rounded-full" />
            <div className="bg-card border border-border rounded-2xl px-4 py-2 text-sm text-muted-foreground">Thinking...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-chat-dark p-3 flex gap-2">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={user ? "Ask about music theory..." : "Login to chat"}
          disabled={!user || loading}
          rows={1}
          className="flex-1 bg-chat-input text-chat-dark-foreground rounded-full px-4 py-2 text-sm resize-none focus:outline-none placeholder:text-chat-dark-foreground/50 disabled:opacity-50"
        />
        <button
          onClick={sendMessage}
          disabled={!user || loading || !input.trim()}
          className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground disabled:opacity-50 hover:opacity-80 transition-opacity"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;
