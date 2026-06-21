import { useTheme } from '@/contexts/ThemeContext';

const LIGHT_INVISIBLE_COLORS = new Set(['#FFFFFF', '#FFF']);

export function resolveTechIconColor(color, lightColor, theme) {
  if (theme === 'light') {
    if (lightColor) return lightColor;
    if (LIGHT_INVISIBLE_COLORS.has(color?.toUpperCase())) return '#181717';
  }

  return color;
}

const TechIcon = ({ name, Icon, color, lightColor, index = 0, variant = 'card' }) => {
  const { theme } = useTheme();
  const iconColor = resolveTechIconColor(color, lightColor, theme);

  if (variant === 'badge') {
    return (
      <span className="tech-badge" style={{ animationDelay: `${index * 30}ms` }}>
        <span className="tech-badge-icon" style={{ color: iconColor }}>
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
      <div className="tech-icon-wrap" style={{ color: iconColor }}>
        <Icon className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />
      </div>
      <span className="tech-icon-label">{name}</span>
    </div>
  );
};

export default TechIcon;
