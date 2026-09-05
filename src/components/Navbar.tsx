import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Smartphone, 
  FileText, 
  Github, 
  ExternalLink,
  ChevronRight,
  Home,
  User,
  Wrench,
  FolderGit2,
  Briefcase,
  Award,
  Mail
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenResume: () => void;
}

interface NavItem {
  name: string;
  path: string;
  badge?: string;
  icon?: React.ReactNode;
}

const NAV_LINKS: NavItem[] = [
  { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
  { name: 'About', path: '/about', icon: <User className="w-4 h-4" /> },
  { name: 'Skills', path: '/skills', icon: <Wrench className="w-4 h-4" /> },
  { name: 'Projects', path: '/projects', icon: <FolderGit2 className="w-4 h-4" /> },
  { name: 'Apps', path: '/apps', badge: 'APK', icon: <Smartphone className="w-4 h-4" /> },
  { name: 'Experience', path: '/experience', icon: <Briefcase className="w-4 h-4" /> },
  { name: 'Certificates', path: '/certificates', icon: <Award className="w-4 h-4" /> },
  { name: 'Contact', path: '/contact', icon: <Mail className="w-4 h-4" /> },
];

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme, onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2.5 bg-slate-950/90 dark:bg-slate-950/90 light:bg-white/90 backdrop-blur-md border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 shadow-sm'
          : 'py-3.5 bg-slate-950/60 dark:bg-slate-950/60 light:bg-white/60 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
          aria-label="Nahid Hossain - Home"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
            NH
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-950 rounded-full" title="Available for projects"></span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-100 dark:text-slate-100 light:text-slate-900 tracking-tight text-base group-hover:text-blue-400 transition-colors">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[11px] font-medium text-slate-400 dark:text-slate-400 light:text-slate-500">
              Student & Developer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 bg-slate-900/70 dark:bg-slate-900/70 light:bg-slate-100/90 px-3 py-1.5 rounded-full border border-slate-800/70 dark:border-slate-800 light:border-slate-200 backdrop-blur-md">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={`relative px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white bg-blue-600 shadow-sm shadow-blue-500/25'
                    : 'text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white dark:hover:text-white light:hover:text-slate-950 hover:bg-slate-800/60'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                    isActive ? 'bg-white/25 text-white' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {link.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Medium Screen Nav (Compact Icons + Text) */}
        <nav className="hidden lg:flex xl:hidden items-center gap-1">
          {NAV_LINKS.slice(0, 6).map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  isActive
                    ? 'text-blue-400 font-bold bg-blue-500/10'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Action Controls: Theme toggle + Resume button + Mobile menu */}
        <div className="flex items-center gap-2.5">
          {/* Quick Resume CTA */}
          <button
            id="nav-resume-btn"
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-slate-900 light:bg-slate-100 hover:bg-slate-800 text-slate-200 dark:text-slate-200 light:text-slate-800 border border-slate-800 dark:border-slate-800 light:border-slate-300 transition-all duration-200 hover:-translate-y-0.5"
            title="Preview and download printable resume"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Resume</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            className="p-2 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 hover:bg-slate-800 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white border border-slate-800/80 dark:border-slate-800 light:border-slate-300 transition-all duration-200"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-blue-400" />
            )}
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-slate-100 hover:bg-slate-800 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-white border border-slate-800/80 dark:border-slate-800 light:border-slate-300 transition-colors"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden animate-in slide-in-from-top-3 duration-200 bg-slate-950/95 dark:bg-slate-950/95 light:bg-white/95 backdrop-blur-xl border-b border-slate-800/80 dark:border-slate-800 light:border-slate-200 px-4 pt-3 pb-6 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
            Navigation Pages
          </div>

          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-blue-600 font-bold shadow-sm'
                    : 'text-slate-300 dark:text-slate-300 light:text-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  {link.icon}
                  <span>{link.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {link.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-400">
                      {link.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </div>
              </NavLink>
            );
          })}

          <div className="pt-4 mt-2 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-blue-600 text-white flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Preview & Print Resume</span>
            </button>

            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4 text-purple-400" />
              <span>Visit GitHub Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
