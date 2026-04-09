import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          console.error("Auth callback error:", error.message);
        }
      }

      navigate("/", { replace: true });
    };

    handleCallback();
  }, [navigate]);

  return (
    <main className="flex items-center justify-center min-h-[70vh]">
      <p className="text-muted-foreground">Signing you in...</p>
    </main>
  );
};

export default AuthCallback;
