import { motion } from 'framer-motion';
import Modal from '../Modal/Modal';
import './certificateCard.css';

const CertificateModal = ({ isOpen, onClose, certificate, asset }) => {
  if (!certificate) return null;

  const downloadHref = asset?.downloadPath;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={null}
      ariaLabel={`${certificate.title} certificate`}
      contentClassName="modal-content--certificate"
    >
      <div className="certificate-modal-content">
        <button
          type="button"
          className="certificate-modal-close"
          onClick={onClose}
          aria-label="Close certificate view"
          data-cursor="pointer"
        >
          ×
        </button>

        <motion.div
          className="certificate-modal-frame"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <img
            src={certificate.preview}
            alt={certificate.title}
            className="certificate-modal-certificate"
          />
        </motion.div>

        <motion.div
          className="certificate-modal-footer"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          <div className="certificate-modal-meta">
            <p className="certificate-modal-meta-title">{certificate.title}</p>
            <p className="certificate-modal-meta-sub">
              {certificate.issuer} · Issued {certificate.issuedDate}
            </p>
          </div>

          <div className="certificate-modal-actions">
            {downloadHref && (
              <a
                href={downloadHref}
                download
                className="certificate-modal-action certificate-modal-action-primary"
                data-cursor="pointer"
              >
                Download PDF
              </a>
            )}
            {certificate.verifyUrl && (
              <a
                href={certificate.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-modal-action certificate-modal-action-secondary"
                data-cursor="pointer"
              >
                Verify on Credly
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </Modal>
  );
};

export default CertificateModal;
