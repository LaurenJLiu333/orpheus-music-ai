import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
      toast.success("Check your email for a reset link!");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-[70vh] px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-display font-bold text-center mb-4" style={{ color: "#200f3f" }}>Forgot Password</h1>
        {sent ? (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">We've sent a password reset link to <strong>{email}</strong>. Check your inbox.</p>
            <Link to="/login" className="text-muted-foreground underline text-sm">Back to Login</Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground text-center mb-6">Enter your email and we'll send you a link to reset your password.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="rounded-xl bg-card border-border" />
              <Button type="submit" disabled={loading} className="w-full rounded-full bg-primary text-primary-foreground font-semibold">
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-4">
              <Link to="/login" className="text-foreground underline">Back to Login</Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
};

export default ForgotPassword;
