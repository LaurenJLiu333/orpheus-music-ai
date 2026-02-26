import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for the PASSWORD_RECOVERY event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
      }
    });

    // Also check URL hash for recovery token
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setIsRecovery(true);
    }

    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated successfully!");
      navigate("/login");
    }
  };

  if (!isRecovery) {
    return (
      <main className="flex items-center justify-center min-h-[70vh] px-6">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold mb-4">Invalid Reset Link</h1>
          <p className="text-muted-foreground">This link is invalid or has expired. Please request a new password reset.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-[70vh] px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-display font-bold text-center mb-8">Set New Password</h1>
        <form onSubmit={handleReset} className="space-y-4">
          <Input type="password" placeholder="New password" value={password} onChange={e => setPassword(e.target.value)} required className="rounded-xl bg-card border-border" />
          <Input type="password" placeholder="Confirm new password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="rounded-xl bg-card border-border" />
          <Button type="submit" disabled={loading} className="w-full rounded-full bg-primary text-primary-foreground font-semibold">
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;
