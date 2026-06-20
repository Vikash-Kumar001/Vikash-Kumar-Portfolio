import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function scrollToTop(immediate = true) {
  if (window.lenis) {
    window.lenis.scrollTo(0, { immediate });
    return;
  }

  window.scrollTo({ top: 0, left: 0, behavior: immediate ? 'instant' : 'smooth' });
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop(true);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
