import { motion } from 'framer-motion';
import { HiArrowUpRight } from 'react-icons/hi2';

const ExpertiseCard = ({ icon: Icon, title, description, index = 0, onClick }) => {
  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className="expertise-card group text-left w-full"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      data-cursor={onClick ? 'pointer' : undefined}
    >
      <div className="expertise-card-icon">
        <Icon className="w-6 h-6" aria-hidden="true" />
      </div>
      <h3 className="expertise-card-title">{title}</h3>
      <p className="expertise-card-description">{description}</p>
      <span className="expertise-card-arrow" aria-hidden="true">
        <HiArrowUpRight className="w-4 h-4" />
      </span>
    </Component>
  );
};

export default ExpertiseCard;
