const ProjectThumbnail = ({ title, subtitle, className = '' }) => {
  const initial = title?.trim().charAt(0)?.toUpperCase() || 'P';

  return (
    <div className={`project-thumbnail ${className}`.trim()} aria-hidden="true">
      <div className="project-thumbnail-glow" />
      <div className="project-thumbnail-grid" />
      <span className="project-thumbnail-letter">{initial}</span>
      {subtitle && <span className="project-thumbnail-subtitle">{subtitle}</span>}
    </div>
  );
};

export default ProjectThumbnail;
