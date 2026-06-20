const TechIcon = ({ name, Icon, color, index = 0, variant = 'card' }) => {
  if (variant === 'badge') {
    return (
      <span className="tech-badge" style={{ animationDelay: `${index * 30}ms` }}>
        <span className="tech-badge-icon" style={{ color }}>
          <Icon className="w-4 h-4" aria-hidden="true" />
        </span>
        <span className="tech-badge-label">{name}</span>
      </span>
    );
  }

  return (
    <div
      className="tech-icon-card group"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="tech-icon-wrap" style={{ color }}>
        <Icon className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />
      </div>
      <span className="tech-icon-label">{name}</span>
    </div>
  );
};

export default TechIcon;
