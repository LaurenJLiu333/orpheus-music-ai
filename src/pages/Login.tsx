import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged in!");
      navigate("/");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-[70vh] px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-display font-bold text-center mb-8">Welcome Back</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="rounded-xl bg-card border-border" />
          <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="rounded-xl bg-card border-border" />
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
