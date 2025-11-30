import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

// SVG Icons
const DownloadIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const FileIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ChevronDownIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ResumeButton = ({ variant = 'default', className = '' }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleDownload = (format) => {
    // Use the actual filename from the resume folder
    const filename = `Vikash-Kumar-Resume.${format}`;
    const resumePath = `/resume/${filename}`;
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDropdownOpen(false);
  };

  // Minimal navbar-style button classes
  const navbarButtonClass = 'text-neutral-400 hover:text-white font-medium transition-colors duration-300 relative flex items-center gap-2 cursor-pointer';
  const navbarButtonActive = 'text-white';

  if (variant === 'split') {
    return (
      <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
        <button
          onClick={() => handleDownload('pdf')}
          className={`${navbarButtonClass} ${className.includes('w-full') ? 'w-full justify-center' : ''}`}
          data-cursor="pointer"
        >
          <FileIcon className="w-4 h-4" />
          <span>PDF</span>
        </button>
        <button
          onClick={() => handleDownload('docx')}
          className={`${navbarButtonClass} ${className.includes('w-full') ? 'w-full justify-center' : ''}`}
          data-cursor="pointer"
        >
          <FileIcon className="w-4 h-4" />
          <span>DOCX</span>
        </button>
      </div>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div 
        ref={dropdownRef}
        className={`relative ${className}`}
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <button
          className={`${navbarButtonClass} ${isDropdownOpen ? navbarButtonActive : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsDropdownOpen(!isDropdownOpen);
          }}
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          data-cursor="pointer"
        >
          <DownloadIcon className="w-4 h-4" />
          <span>Resume</span>
          <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {isDropdownOpen && (
            <>
              {/* Backdrop overlay for mobile */}
              <motion.div
                className="fixed inset-0 z-40 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDropdownOpen(false)}
              />
              <motion.div
                className="absolute top-full right-0 mt-4 glass p-3 rounded-lg border border-neutral-700/50 min-w-[180px] z-50 backdrop-blur-xl"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <button
                  onClick={() => handleDownload('pdf')}
                  className="w-full text-left px-4 py-2.5 rounded-md hover:text-white text-neutral-400 text-sm transition-colors flex items-center gap-2.5 group/item"
                  data-cursor="pointer"
                >
                  <FileIcon className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium">PDF</span>
                </button>
                <div className="h-px bg-neutral-700/50 my-1"></div>
                <button
                  onClick={() => handleDownload('docx')}
                  className="w-full text-left px-4 py-2.5 rounded-md hover:text-white text-neutral-400 text-sm transition-colors flex items-center gap-2.5 group/item"
                  data-cursor="pointer"
                >
                  <FileIcon className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium">DOCX</span>
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Default variant - single button that downloads PDF
  return (
    <button
      onClick={() => handleDownload('pdf')}
      className={`${navbarButtonClass} ${className}`}
      data-cursor="pointer"
    >
      <DownloadIcon className="w-4 h-4" />
      <span>Resume</span>
    </button>
  );
};

export default ResumeButton;

