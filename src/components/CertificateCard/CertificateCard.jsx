import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { HiArrowUpRight } from 'react-icons/hi2';
import { getCertificateAsset } from '@/data/certifications';
import CertificateModal from './CertificateModal';
import './certificateCard.css';

const CertificateCard = ({ certificate, variant = 'card' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const asset = useMemo(() => getCertificateAsset(certificate.file), [certificate.file]);

  if (variant === 'list') {
    return (
      <>
        <button
          type="button"
          className="certificate-list-item group"
          onClick={() => setIsModalOpen(true)}
          aria-label={`View ${certificate.title} certificate`}
          data-cursor="pointer"
        >
          <span className="certificate-list-badge-wrap">
            <img
              src={certificate.badge}
              alt=""
              className="certificate-list-badge"
              loading="lazy"
            />
          </span>

          <span className="certificate-list-content">
            <span className="certificate-list-title">{certificate.title}</span>
            <span className="certificate-list-meta">
              <span className="certificate-list-issuer">{certificate.issuer}</span>
              <span className="certificate-list-separator" aria-hidden="true" />
              <span className="certificate-list-date">Issued {certificate.issuedDate}</span>
            </span>
          </span>

          <span className="certificate-list-action">
            View
            <HiArrowUpRight className="w-4 h-4" />
          </span>
        </button>

        <CertificateModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          certificate={certificate}
          asset={asset}
        />
      </>
    );
  }

  return (
    <>
      <motion.button
        type="button"
        className="certificate-card group"
        onClick={() => setIsModalOpen(true)}
        aria-label={`View ${certificate.title} certificate`}
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        data-cursor="pointer"
      >
        <div className="certificate-card-badge-wrap">
          <img
            src={certificate.badge}
            alt=""
            className="certificate-card-badge"
            loading="lazy"
          />
        </div>

        <div className="certificate-card-content">
          <h3 className="certificate-card-title">{certificate.title}</h3>
          <p className="certificate-card-issuer">{certificate.issuer}</p>
          <p className="certificate-card-date">Issued {certificate.issuedDate}</p>
        </div>
      </motion.button>

      <CertificateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        certificate={certificate}
        asset={asset}
      />
    </>
  );
};

export default CertificateCard;
