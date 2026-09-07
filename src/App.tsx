import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ScrollProgress } from './components/ScrollProgress';
import { Toast, ToastMessage } from './components/Toast';
import { GitHubPortfolioProvider } from './context/GitHubPortfolioContext';
import { Rotate360Provider } from './context/Rotate360Context';
import { Rotate360Stage } from './components/Rotate360Stage';
import { PageErrorBoundary } from './components/PageErrorBoundary';

// Dedicated Separate Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SkillsPage } from './pages/SkillsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AppsPage } from './pages/AppsPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { CertificatesPage } from './pages/CertificatesPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Initialize theme from localStorage or system preference (dark-first by default)
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('nh_portfolio_theme') as 'dark' | 'light' | null;
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        setTheme('dark');
      }
    } catch {
      setTheme('dark');
    }
  }, []);

  // Update DOM class when theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      document.body.classList.add('bg-slate-950', 'text-slate-100');
      document.body.classList.remove('bg-slate-50', 'text-slate-900');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      document.body.classList.remove('bg-slate-950', 'text-slate-100');
      document.body.classList.add('bg-slate-50', 'text-slate-900');
    }
    try {
      localStorage.setItem('nh_portfolio_theme', theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = (message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    const newToast: ToastMessage = { id, message, type };

    setToasts((prev) => [...prev.slice(-3), newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <HashRouter>
      <GitHubPortfolioProvider>
        <Rotate360Provider>
          <ScrollToTop />
          <ScrollProgress />

          <Rotate360Stage>
            <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 dark:bg-slate-950 dark:text-slate-100 light:bg-slate-50 light:text-slate-900 transition-colors duration-200">
              {/* Consistent Top Navigation Across All Pages */}
              <Navbar
                theme={theme}
                onToggleTheme={toggleTheme}
              />

              {/* Dedicated Route Views */}
              <main className="flex-grow">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <PageErrorBoundary pageName="Home">
                        <HomePage theme={theme} onShowToast={showToast} />
                      </PageErrorBoundary>
                    }
                  />
                  <Route path="/about" element={<PageErrorBoundary pageName="About"><AboutPage /></PageErrorBoundary>} />
                  <Route path="/skills" element={<PageErrorBoundary pageName="Skills"><SkillsPage /></PageErrorBoundary>} />
                  <Route path="/projects" element={<PageErrorBoundary pageName="Projects"><ProjectsPage /></PageErrorBoundary>} />
                  <Route path="/apps" element={<PageErrorBoundary pageName="Apps"><AppsPage onShowToast={showToast} /></PageErrorBoundary>} />
                  <Route path="/experience" element={<PageErrorBoundary pageName="Experience"><ExperiencePage /></PageErrorBoundary>} />
                  <Route path="/certificates" element={<PageErrorBoundary pageName="Certificates"><CertificatesPage /></PageErrorBoundary>} />
                  <Route path="/contact" element={<PageErrorBoundary pageName="Contact"><ContactPage onShowToast={showToast} /></PageErrorBoundary>} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              {/* Consistent Footer Across All Pages */}
              <Footer />
            </div>
          </Rotate360Stage>

          {/* Global Interactive Notification Toasts */}
          <Toast toasts={toasts} onDismiss={dismissToast} />
        </Rotate360Provider>
      </GitHubPortfolioProvider>
    </HashRouter>
  );
}
