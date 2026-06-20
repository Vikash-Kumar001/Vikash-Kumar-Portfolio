import { Suspense, lazy, useState, useEffect, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useInView } from 'framer-motion';
import {
  disposeWebGLRenderer,
  isWebGLAvailable,
  markWebGLBlocked,
} from '@/lib/webgl';
import ThreeSceneErrorBoundary from './ThreeSceneErrorBoundary';
import ThreeSceneFallback from './ThreeSceneFallback';
import './threeScene.css';

const SceneContent = lazy(() => import('./SceneContent'));

const ThreeScene = ({ className = '' }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [isMobile, setIsMobile] = useState(false);
  const [canUseWebGL, setCanUseWebGL] = useState(false);
  const [contextFailed, setContextFailed] = useState(false);

  useEffect(() => {
    setCanUseWebGL(isWebGLAvailable());
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    return () => {
      disposeWebGLRenderer(rendererRef.current);
      rendererRef.current = null;
    };
  }, []);

  const handleContextCreationError = useCallback((error) => {
    console.warn('WebGL unavailable, using fallback background.', error);
    markWebGLBlocked();
    setContextFailed(true);
    disposeWebGLRenderer(rendererRef.current);
    rendererRef.current = null;
  }, []);

  const handleCreated = useCallback(({ gl }) => {
    rendererRef.current = gl;
  }, []);

  const showCanvas = canUseWebGL && isInView && !contextFailed;

  return (
    <div ref={containerRef} className={`three-scene-container ${className}`.trim()}>
      {!isInView && (
        <div className="three-scene-placeholder">
          <div className="three-scene-loading">Loading 3D Scene...</div>
        </div>
      )}

      {isInView && !showCanvas && <ThreeSceneFallback className="three-scene-fallback--fill" />}

      {showCanvas && (
        <ThreeSceneErrorBoundary
          className="three-scene-fallback--fill"
          onError={() => setContextFailed(true)}
        >
          <Canvas
            className="three-scene-canvas"
            gl={{
              antialias: !isMobile,
              alpha: true,
              powerPreference: 'default',
              onContextCreationError: handleContextCreationError,
            }}
            dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)}
            performance={{ min: 0.5 }}
            onCreated={handleCreated}
            frameloop="always"
          >
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-10, -10, -5]} intensity={0.5} />
              <SceneContent isMobile={isMobile} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
              />
            </Suspense>
          </Canvas>
        </ThreeSceneErrorBoundary>
      )}
    </div>
  );
};

export default ThreeScene;
