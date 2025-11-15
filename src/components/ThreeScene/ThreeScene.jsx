import { Suspense, lazy, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './threeScene.css';

// Lazy load heavy Three.js components
const SceneContent = lazy(() => import('./SceneContent'));

const ThreeScene = ({ className = '' }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isInView) {
    return (
      <div ref={containerRef} className={`three-scene-placeholder ${className}`}>
        <div className="three-scene-loading">Loading 3D Scene...</div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`three-scene-container ${className}`}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <SceneContent isMobile={isMobile} />
          {!isMobile && <Environment preset="city" />}
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
    </div>
  );
};

export default ThreeScene;

