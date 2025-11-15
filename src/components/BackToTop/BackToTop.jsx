import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './backToTop.css';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = (scrollY) => {
      if (scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    let lenisInstance = null;
    let scrollHandler = null;

    // Try to use Lenis if available
    const setupLenis = () => {
      if (window.lenis) {
        lenisInstance = window.lenis;
        scrollHandler = ({ scroll }) => {
          toggleVisibility(scroll);
        };
        lenisInstance.on('scroll', scrollHandler);
        return true;
      }
      return false;
    };

    // Try immediately
    if (!setupLenis()) {
      // If not available, wait a bit and try again
      const timeoutId = setTimeout(() => {
        setupLenis();
      }, 200);

      // Fallback to regular scroll event
      const handleScroll = () => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        toggleVisibility(scrollY);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener('scroll', handleScroll);
        if (lenisInstance && scrollHandler) {
          lenisInstance.off('scroll', scrollHandler);
        }
      };
    }

    return () => {
      if (lenisInstance && scrollHandler) {
        lenisInstance.off('scroll', scrollHandler);
      }
    };
  }, []);

  const scrollToTop = () => {
    // Check if Lenis is available
    const lenisInstance = window.lenis;
    
    if (lenisInstance) {
      // Use Lenis smooth scroll
      lenisInstance.scrollTo(0, {
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      // Fallback to native smooth scroll
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={scrollToTop}
          className="back-to-top"
          aria-label="Back to top"
          data-cursor="pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="back-to-top-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;

