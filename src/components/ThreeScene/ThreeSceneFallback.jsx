import './threeScene.css';

const ThreeSceneFallback = ({ className = '' }) => (
  <div className={`three-scene-fallback ${className}`.trim()} aria-hidden="true">
    <div className="three-scene-fallback-glow three-scene-fallback-glow--primary" />
    <div className="three-scene-fallback-glow three-scene-fallback-glow--accent" />
    <div className="three-scene-fallback-ring" />
  </div>
);

export default ThreeSceneFallback;
