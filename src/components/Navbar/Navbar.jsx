import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMoon, HiSun } from 'react-icons/hi2';
import { useTheme } from '@/contexts/ThemeContext';
import ResumeButton from '../ResumeButton/ResumeButton';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" data-cursor="pointer">
          Vikash Kumar<span className="navbar-logo-dot">.</span>
        </Link>

        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`navbar-link ${isActive(link.path) ? 'active' : ''}`}
                data-cursor="pointer"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <Link to="/contact" className="navbar-connect hidden lg:inline-flex" data-cursor="pointer">
            Let&apos;s Connect
          </Link>
          <div className="hidden lg:block">
            <ResumeButton variant="dropdown" />
          </div>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            data-cursor="pointer"
          >
            {theme === 'dark' ? <HiMoon className="w-5 h-5" /> : <HiSun className="w-5 h-5" />}
          </button>
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            data-cursor="pointer"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`mobile-menu-link ${isActive(link.path) ? 'active' : ''}`}
                data-cursor="pointer"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="mobile-menu-link text-primary font-semibold" data-cursor="pointer">
              Let&apos;s Connect
            </Link>
            <div className="mobile-menu-resume pt-3 border-t border-[var(--color-border)] mt-2">
              <ResumeButton variant="dropdown" className="mobile-menu-resume-dropdown" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
