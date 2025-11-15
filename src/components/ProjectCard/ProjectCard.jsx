import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectModal from './ProjectModal';
import './projectCard.css';

const ProjectCard = ({ project, autoOpen = false, onOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (autoOpen) {
      // Small delay to ensure the page has loaded
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        if (onOpen) {
          onOpen();
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoOpen, onOpen]);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <>
      <motion.div
        className="project-card"
        onMouseMove={handleMouseMove}
        onClick={() => setIsModalOpen(true)}
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        data-cursor="pointer"
        data-magnetic="true"
      >
        <div
          className="project-card-glow"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
          }}
        />
        <div className="project-card-image-wrapper">
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="project-card-image"
            />
          )}
        </div>
        <div className="project-card-content">
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-description">{project.description}</p>
          <div className="project-card-tags">
            {project.tags?.map((tag, index) => (
              <span key={index} className="project-card-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={project}
      />
    </>
  );
};

export default ProjectCard;

