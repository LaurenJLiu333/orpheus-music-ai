import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created! You're logged in.");
      navigate("/");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-[70vh] px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-display font-bold text-center mb-8">Create Account</h1>
        <form onSubmit={handleSignUp} className="space-y-4">
          <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="rounded-xl bg-card border-border" />
          <Input type="password" placeholder="Password (min 6 chars)" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} className="rounded-xl bg-card border-border" />
          <Button type="submit" disabled={loading} className="w-full rounded-full bg-primary text-primary-foreground font-semibold">
            {loading ? "Creating..." : "Sign Up"}
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account? <Link to="/login" className="text-foreground underline">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default SignUp;
