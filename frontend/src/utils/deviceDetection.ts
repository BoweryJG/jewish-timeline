// Cache device info to prevent recreating WebGL context
let cachedDeviceInfo: ReturnType<typeof getDeviceInfo> | null = null;

export const getDeviceInfo = () => {
  // Return cached info if available
  if (cachedDeviceInfo) {
    return cachedDeviceInfo;
  }

  const ua = navigator.userAgent;
  const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  
  // Get screen dimensions
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const pixelRatio = window.devicePixelRatio || 1;
  
  // Estimate GPU tier (simplified)
  let gpuTier = 'low';
  
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (gl && 'getExtension' in gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo && 'getParameter' in gl) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string;
        // Simplified GPU detection
        if (renderer.includes('Apple') || renderer.includes('Mali-G') || renderer.includes('Adreno 6')) {
          gpuTier = 'high';
        } else if (renderer.includes('Adreno 5') || renderer.includes('Mali-T')) {
          gpuTier = 'medium';
        }
      }
    }
  } catch (error) {
    console.warn('Failed to detect GPU:', error);
  }
  
  // Cache the result
  cachedDeviceInfo = {
    isMobile,
    isIOS,
    isAndroid,
    screenWidth,
    screenHeight,
    pixelRatio,
    gpuTier,
    supportsGyroscope: 'DeviceOrientationEvent' in window,
    supportsTouch: 'ontouchstart' in window,
  };
  
  return cachedDeviceInfo;
};

export const getOrientation = () => {
  if (window.screen?.orientation) {
    return window.screen.orientation.type.includes('landscape') ? 'landscape' : 'portrait';
  }
  // Fallback for older browsers
  const orientation = (window as any).orientation;
  if (typeof orientation === 'number') {
    return Math.abs(orientation) === 90 ? 'landscape' : 'portrait';
  }
  // Default fallback
  return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
};

export const isLandscape = () => getOrientation() === 'landscape';
export const isPortrait = () => getOrientation() === 'portrait';