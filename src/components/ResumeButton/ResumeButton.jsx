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

  const resumeFiles = {
    pdf: 'Vikash-Kumar-Fullstack-Resume.pdf',
    docx: 'Vikash-Kumar-Resume.docx',
  };

  const handleDownload = (format) => {
    const filename = resumeFiles[format];
    const resumePath = `/resume/${filename}`;
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDropdownOpen(false);
  };

  // Navbar trigger + dropdown menu classes
  const navbarButtonClass = 'navbar-resume-trigger';
  const navbarButtonActive = 'is-open';

  if (variant === 'editorial') {
    return (
      <div className={`about-resume-actions ${className}`}>
        <button
          type="button"
          onClick={() => handleDownload('pdf')}
          className="about-resume-btn"
          data-cursor="pointer"
        >
          <FileIcon className="w-4 h-4" />
          <span>PDF</span>
        </button>
        <button
          type="button"
          onClick={() => handleDownload('docx')}
          className="about-resume-btn"
          data-cursor="pointer"
        >
          <FileIcon className="w-4 h-4" />
          <span>DOCX</span>
        </button>
      </div>
    );
  }

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
        className={`navbar-resume ${className}`}
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <button
          type="button"
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
          <ChevronDownIcon className={`navbar-resume-chevron ${isDropdownOpen ? 'is-open' : ''}`} />
        </button>
        <AnimatePresence>
          {isDropdownOpen && (
            <>
              <motion.div
                className="navbar-resume-backdrop lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDropdownOpen(false)}
              />
              <motion.div
                className="navbar-resume-menu"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <button
                  type="button"
                  onClick={() => handleDownload('pdf')}
                  className="navbar-resume-option"
                  data-cursor="pointer"
                >
                  <FileIcon className="w-4 h-4 flex-shrink-0" />
                  <span>Download PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownload('docx')}
                  className="navbar-resume-option"
                  data-cursor="pointer"
                >
                  <FileIcon className="w-4 h-4 flex-shrink-0" />
                  <span>Download DOCX</span>
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

