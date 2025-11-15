import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// Create loaders with optimizations
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();

// Configure DRACO loader for compressed models
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * Load a GLTF model
 * @param {string} url - URL to the GLTF/GLB file
 * @returns {Promise} Promise that resolves to the loaded GLTF
 */
export const loadGLTF = (url) => {
  return new Promise((resolve, reject) => {
    gltfLoader.load(
      url,
      (gltf) => resolve(gltf),
      (progress) => {
        // Progress callback
        if (progress.lengthComputable) {
          const percentComplete = (progress.loaded / progress.total) * 100;
          console.log(`Loading model: ${percentComplete.toFixed(2)}%`);
        }
      },
      (error) => reject(error)
    );
  });
};

/**
 * Create LOD (Level of Detail) helper
 * @param {Object} models - Object with distance keys and model URLs
 * @returns {Function} Function to get appropriate model based on camera distance
 */
export const createLODHelper = (models) => {
  return (cameraDistance) => {
    const distances = Object.keys(models)
      .map(Number)
      .sort((a, b) => a - b);

    for (const distance of distances) {
      if (cameraDistance <= distance) {
        return models[distance];
      }
    }

    return models[distances[distances.length - 1]];
  };
};

/**
 * Dispose of Three.js resources
 * @param {Object} scene - Three.js scene object
 */
export const disposeScene = (scene) => {
  scene.traverse((object) => {
    if (object.geometry) {
      object.geometry.dispose();
    }
    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach((material) => material.dispose());
      } else {
        object.material.dispose();
      }
    }
  });
};

