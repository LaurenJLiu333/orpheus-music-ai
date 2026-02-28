import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Music } from "lucide-react";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const scrollTo = (id: string) => {
    if (!isHome) {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 backdrop-blur-md border-b border-border bg-background/80">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Music size={18} className="text-primary-foreground" />
        </div>
        <span className="text-xl font-display font-bold text-foreground">Orpheus</span>
      </Link>
      <div className="flex items-center gap-1 md:gap-3">
        {isHome && (
          <>
            <button onClick={() => scrollTo("how-it-works")} className="hidden md:block text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
              How it Works
            </button>
            <button onClick={() => scrollTo("demo")} className="hidden md:block text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
              Example
            </button>
            <button onClick={() => scrollTo("features")} className="hidden md:block text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-2">
              Features
            </button>
          </>
        )}
        <Link to="/upload">
          <Button variant="outline" className="rounded-full px-6 border-border text-foreground hover:bg-muted font-semibold text-sm">
            Upload
          </Button>
        </Link>
        {user ? (
          <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground hover:text-foreground font-semibold text-sm">
            Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground font-semibold text-sm">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
