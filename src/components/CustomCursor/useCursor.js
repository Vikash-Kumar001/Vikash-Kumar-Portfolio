import { useState, useEffect } from 'react';

export const useCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);
  const [variant, setVariant] = useState('default');

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      
      // Check if target is a valid DOM element
      if (!target || typeof target.getAttribute !== 'function') {
        return;
      }

      const cursorAttr = target.getAttribute('data-cursor');
      const magneticAttr = target.getAttribute('data-magnetic');

      if (cursorAttr) {
        setVariant(cursorAttr);
        setIsHovering(true);
      } else {
        setVariant('default');
        setIsHovering(false);
      }

      if (magneticAttr === 'true' || (target.closest && target.closest('[data-magnetic="true"]'))) {
        setIsMagnetic(true);
      } else {
        setIsMagnetic(false);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setIsMagnetic(false);
      setVariant('default');
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return {
    x: position.x,
    y: position.y,
    isHovering,
    isMagnetic,
    variant,
  };
};

