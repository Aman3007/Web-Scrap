import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Flame, Bookmark, LogIn, LogOut, UserPlus, RefreshCw, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useScrape } from '../../hooks/useStories';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { mutate: scrape, isPending: scraping } = useScrape();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `btn-ghost text-sm ${isActive ? 'text-brand-400 bg-surface-700' : ''}`;

  return (
    <header className="sticky top-0 z-50 glass border-b border-surface-700/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/40 group-hover:scale-105 transition-transform">
              <Flame size={16} className="text-white" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">
              HN<span className="text-brand-400">Feed</span>
            </span>
          </Link>

          {}
          <nav className="hidden sm:flex items-center gap-2">
            <NavLink to="/" end className={navLinkClass}>
              Stories
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/bookmarks" className={navLinkClass}>
                <Bookmark size={15} />
                Bookmarks
              </NavLink>
            )}

            <div className="w-px h-5 bg-surface-600 mx-1" />

            <button
              onClick={() => scrape()}
              disabled={scraping}
              className="btn-ghost text-sm disabled:opacity-50"
              title="Refresh stories from HN"
            >
              <RefreshCw size={15} className={scraping ? 'animate-spin' : ''} />
              {scraping ? 'Scraping…' : 'Refresh'}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-surface-300 hidden md:block">
                  Hi, <span className="text-white font-medium">{user?.name}</span>
                </span>
                <button onClick={handleLogout} className="btn-ghost text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10">
                  <LogOut size={15} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-ghost text-sm">
                  <LogIn size={15} />
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  <UserPlus size={15} />
                  Sign up
                </Link>
              </div>
            )}
          </nav>

          {}
          <button
            className="sm:hidden btn-ghost p-2"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {}
        {mobileOpen && (
          <div className="sm:hidden border-t border-surface-700/60 py-3 space-y-1">
            <NavLink to="/" end className={navLinkClass} onClick={() => setMobileOpen(false)}>
              Stories
            </NavLink>
            {isAuthenticated && (
              <NavLink to="/bookmarks" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                <Bookmark size={15} />
                Bookmarks
              </NavLink>
            )}
            <button
              onClick={() => { scrape(); setMobileOpen(false); }}
              disabled={scraping}
              className="btn-ghost text-sm w-full justify-start disabled:opacity-50"
            >
              <RefreshCw size={15} className={scraping ? 'animate-spin' : ''} />
              Refresh Stories
            </button>
            {isAuthenticated ? (
              <button onClick={handleLogout} className="btn-ghost text-sm w-full justify-start text-red-400 hover:text-red-300">
                <LogOut size={15} />
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="btn-ghost text-sm w-full justify-start" onClick={() => setMobileOpen(false)}>
                  <LogIn size={15} />
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm w-full justify-center" onClick={() => setMobileOpen(false)}>
                  <UserPlus size={15} />
                  Sign up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
