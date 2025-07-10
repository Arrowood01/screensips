import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Info, Coffee } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: Info },
    { path: '/tip', label: 'Tip Jar', icon: Coffee },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-slate-800/90 border-b border-amber-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-amber-100 hover:text-orange-400 transition-colors">
              Screen Sips
            </Link>
            
            <div className="hidden md:flex space-x-8">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    isActive(path)
                      ? 'bg-orange-500 text-amber-100'
                      : 'text-amber-200/80 hover:text-amber-100 hover:bg-slate-700/50'
                  }`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-amber-100 p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-800/50 border-t border-amber-200/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-amber-200/60 text-sm">
              © 2025 Screen Sips. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link to="/drink-responsibly" className="text-amber-200/60 hover:text-amber-100 text-sm transition-colors">
                Drink Responsibly
              </Link>
              <Link to="/terms" className="text-amber-200/60 hover:text-amber-100 text-sm transition-colors">
                Terms
              </Link>
              <Link to="/privacy" className="text-amber-200/60 hover:text-amber-100 text-sm transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;