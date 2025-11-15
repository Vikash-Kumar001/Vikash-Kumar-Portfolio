import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import CustomCursor from './components/CustomCursor/CustomCursor';
import './styles/index.css';

// Initialize Lenis smooth scroll
let lenisInstance = null;

const initLenis = async () => {
  if (typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const Lenis = (await import('lenis')).default;
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Expose Lenis instance globally for use in components
    window.lenis = lenisInstance;

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }
};

// Initialize analytics
const initAnalytics = async () => {
  if (import.meta.env.VITE_PLAUSIBLE_DOMAIN) {
    const script = document.createElement('script');
    script.defer = true;
    script.dataset.domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
    script.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(script);
  } else if (import.meta.env.VITE_GA4_MEASUREMENT_ID) {
    // GA4 initialization would go here if needed
    console.log('GA4 configured:', import.meta.env.VITE_GA4_MEASUREMENT_ID);
  }
};

// Unregister any existing service workers
const unregisterServiceWorkers = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
        console.log('Service worker unregistered:', registration.scope);
      }
    } catch (error) {
      console.warn('Error unregistering service workers:', error);
    }
  }
};

// Initialize app
const init = async () => {
  // Unregister any existing service workers first
  await unregisterServiceWorkers();
  
  await initLenis();
  initAnalytics();

  const root = createRoot(document.getElementById('root'));

  root.render(
    <StrictMode>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ThemeProvider>
          <CustomCursor />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

init();

