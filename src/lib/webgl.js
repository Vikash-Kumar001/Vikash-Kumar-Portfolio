const WEBGL_BLOCKED_KEY = 'portfolio-webgl-blocked';

export const isWebGLBlocked = () => {
  if (typeof window === 'undefined') return true;
  try {
    return window.sessionStorage.getItem(WEBGL_BLOCKED_KEY) === '1';
  } catch {
    return false;
  }
};

export const markWebGLBlocked = () => {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(WEBGL_BLOCKED_KEY, '1');
  } catch {
    // ignore storage errors
  }
};

export const isWebGLAvailable = () => {
  if (typeof window === 'undefined') return false;
  if (isWebGLBlocked()) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;

  try {
    const canvas = document.createElement('canvas');
    const context =
      canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true }) ||
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true }) ||
      canvas.getContext('experimental-webgl');

    if (!context) return false;

    const loseContext = context.getExtension('WEBGL_lose_context');
    loseContext?.loseContext();
    return true;
  } catch {
    return false;
  }
};

export const disposeWebGLRenderer = (gl) => {
  if (!gl) return;

  try {
    gl.dispose();
    gl.forceContextLoss?.();
  } catch {
    // renderer may already be disposed
  }
};
