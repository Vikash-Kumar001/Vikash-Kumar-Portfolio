import { useEffect, useRef } from 'react';
import { useCursor } from './useCursor';
import './customCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const { x, y, isHovering, isMagnetic, variant } = useCursor();

  useEffect(() => {
    // Hide native cursor
    document.body.style.cursor = 'none';

    // Detect touch devices and hide custom cursor
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      document.body.style.cursor = 'auto';
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      if (cursorDotRef.current) cursorDotRef.current.style.display = 'none';
      return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.body.style.cursor = 'auto';
      if (cursorRef.current) cursorRef.current.style.display = 'none';
      if (cursorDotRef.current) cursorDotRef.current.style.display = 'none';
      return;
    }

    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  if (typeof window === 'undefined') return null;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (prefersReducedMotion || isTouchDevice) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'cursor-hover' : ''} ${isMagnetic ? 'cursor-magnetic' : ''} cursor-${variant}`}
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
        aria-hidden="true"
      />
      <div
        ref={cursorDotRef}
        className="custom-cursor-dot"
        style={{
          left: `${x}px`,
          top: `${y}px`,
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;

