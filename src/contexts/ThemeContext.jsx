import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      // Override Tailwind gradient utilities for light mode
      root.style.setProperty('--tw-gradient-from', '#fafafa');
      root.style.setProperty('--tw-gradient-to', '#ffffff');
      root.style.setProperty('--tw-gradient-via', '#fafafa');
    } else {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      // Reset gradient variables for dark mode
      root.style.removeProperty('--tw-gradient-from');
      root.style.removeProperty('--tw-gradient-to');
      root.style.removeProperty('--tw-gradient-via');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

