import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged in!");
      navigate("/upload");
    }
  };

  if (!authLoading && user) {
    navigate("/upload");
    return null;
  }

  return (
    <main className="flex items-center justify-center min-h-[70vh] px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-display font-bold text-center mb-8">Welcome</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="rounded-xl bg-card border-border" />
          <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="rounded-xl bg-card border-border" />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="accent-primary w-4 h-4 rounded" />
              <span className="text-sm text-muted-foreground">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-muted-foreground hover:text-foreground underline">Forgot password?</Link>
          </div>
          <Button type="submit" disabled={loading} className="w-full rounded-full bg-primary text-primary-foreground font-semibold">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Don't have an account? <Link to="/signup" className="text-foreground underline">Sign up</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
