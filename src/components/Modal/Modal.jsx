import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './modal.css';

const getScrollPosition = () => {
  if (typeof window === 'undefined') return 0;
  return window.lenis?.scroll ?? window.scrollY;
};

const restoreScrollPosition = (scrollY) => {
  if (typeof window === 'undefined') return;

  const lenis = window.lenis;
  if (lenis) {
    lenis.scrollTo(scrollY, { immediate: true });
    lenis.start();
    return;
  }

  window.scrollTo({ top: scrollY, left: 0, behavior: 'instant' });
};

const Modal = ({ isOpen, onClose, children, title, ariaLabel, contentClassName = '' }) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    if (!isOpen) return;

    scrollPositionRef.current = getScrollPosition();
    previousFocusRef.current = document.activeElement;

    const lenis = window.lenis;
    if (lenis) {
      lenis.stop();
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';

      restoreScrollPosition(scrollPositionRef.current);

      if (previousFocusRef.current?.focus) {
        try {
          previousFocusRef.current.focus({ preventScroll: true });
        } catch {
          // ignore unsupported browsers
        }
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      if (firstElement) {
        firstElement.focus({ preventScroll: true });
      }
    }
  }, [isOpen]);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={modalRef}
            className={`modal-content ${contentClassName}`.trim()}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel || title}
            initial={{ opacity: 0, scale: 0.96, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.96, x: '-50%', y: '-50%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
            }}
          >
            {title && (
              <div className="modal-header">
                <h2 className="modal-title">{title}</h2>
                <button
                  className="modal-close"
                  onClick={onClose}
                  aria-label="Close modal"
                  data-cursor="pointer"
                >
                  ×
                </button>
              </div>
            )}
            <div className="modal-body">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
