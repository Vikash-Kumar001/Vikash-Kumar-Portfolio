import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiArrowUpRight } from 'react-icons/hi2';
import ProjectModal from './ProjectModal';
import ProjectThumbnail from './ProjectThumbnail';
import './projectCard.css';

const ProjectCard = ({ project, autoOpen = false, onOpen, featured = false, onView }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (autoOpen) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        onOpen?.();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoOpen, onOpen]);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const showThumbnail = !project.image || imageError;

  return (
    <>
      <motion.div
        className={`project-card ${featured ? 'project-card-featured' : ''}`}
        onMouseMove={handleMouseMove}
        onClick={() => {
          onView?.();
          setIsModalOpen(true);
        }}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        data-cursor="pointer"
      >
        <div
          className="project-card-glow"
          style={{
            background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(234, 88, 12, 0.14), transparent 42%)`,
          }}
        />

        <div className="project-card-image-wrapper">
          {featured && <span className="project-card-badge">Featured</span>}
          {showThumbnail ? (
            <ProjectThumbnail title={project.title} subtitle={project.category} />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="project-card-image"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        <div className="project-card-content">
          <div className="project-card-header">
            <h3 className="project-card-title">{project.title}</h3>
            <HiArrowUpRight className="project-card-arrow" aria-hidden="true" />
          </div>
          <p className="project-card-description">{project.description}</p>
          <div className="project-card-tags">
            {project.tags?.slice(0, 6).map((tag) => (
              <span key={tag} className="project-card-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} project={project} />
    </>
  );
};

export default ProjectCard;
