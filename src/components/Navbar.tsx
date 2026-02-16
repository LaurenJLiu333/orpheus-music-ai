import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import lyreLogo from "@/assets/lyre-logo.png";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 backdrop-blur-sm border-b border-border"
      style={{ background: "var(--gradient-nav)" }}
    >
      <Link to="/" className="flex items-center gap-2">
        <img src={lyreLogo} alt="Orpheus" className="w-10 h-10 rounded-lg" />
        <span className="text-2xl font-bold text-foreground">Orpheus</span>
      </Link>
      <div className="flex items-center gap-3">
        <Link to="/upload">
          <Button variant="outline" className="rounded-full px-6 border-foreground text-foreground hover:bg-foreground hover:text-primary-foreground">
            Upload
          </Button>
        </Link>
        {user ? (
          <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground">
            Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button variant="ghost" className="text-muted-foreground">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
