import { Suspense, lazy, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './threeScene.css';

// Lazy load Spline runtime if available
// Note: Spline runtime requires a scene ID from Spline
const SplineLoader = ({ sceneId, className = '', fallback = null }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [SplineComponent, setSplineComponent] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isInView || !sceneId) return;

    const loadSpline = async () => {
      try {
        // Dynamically import Spline runtime
        // This requires @splinetool/runtime package
        // For now, we'll provide a fallback
        const Spline = await import('@splinetool/runtime');
        setSplineComponent(() => Spline);
      } catch (err) {
        console.warn('Spline runtime not available, using fallback');
        setError(true);
      }
    };

    loadSpline();
  }, [isInView, sceneId]);

  if (!sceneId) {
    return fallback || <div className="spline-placeholder">No Spline scene ID provided</div>;
  }

  if (error || !SplineComponent) {
    return fallback || <div className="spline-placeholder">Spline scene unavailable</div>;
  }

  return (
    <div ref={containerRef} className={`spline-container ${className}`}>
      <Suspense fallback={fallback || <div className="spline-loading">Loading Spline scene...</div>}>
        {/* Spline canvas would be rendered here */}
        {/* <canvas id="spline-canvas" /> */}
        <div className="spline-placeholder">
          Spline integration requires @splinetool/runtime package.
          <br />
          Scene ID: {sceneId}
        </div>
      </Suspense>
    </div>
  );
};

export default SplineLoader;

