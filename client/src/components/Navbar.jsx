import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200/40 dark:border-slate-700/40 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-brand-600">
          NextHire AI
        </Link>
        <div className="flex items-center gap-3">
          <button className="rounded-lg p-2 hover:bg-slate-200/60 dark:hover:bg-slate-800/60" onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium hover:text-brand-600">Dashboard</Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="rounded-lg bg-brand-600 px-3 py-2 text-sm text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium">Login</Link>
              <Link to="/register" className="rounded-lg bg-brand-600 px-3 py-2 text-sm text-white">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
