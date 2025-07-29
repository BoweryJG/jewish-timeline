import { useEffect, useState, useCallback } from 'react';
import { getOrientation } from '../utils/deviceDetection';

export type Orientation = 'portrait' | 'landscape';

interface DeviceOrientationState {
  orientation: Orientation;
  angle: number;
  isLandscape: boolean;
  isPortrait: boolean;
}

export const useDeviceOrientation = () => {
  const [state, setState] = useState<DeviceOrientationState>(() => ({
    orientation: getOrientation(),
    angle: 0,
    isLandscape: getOrientation() === 'landscape',
    isPortrait: getOrientation() === 'portrait',
  }));

  const handleOrientationChange = useCallback(() => {
    const orientation = getOrientation();
    const angle = (window as any).orientation || 0;
    
    setState({
      orientation,
      angle: typeof angle === 'number' ? angle : 0,
      isLandscape: orientation === 'landscape',
      isPortrait: orientation === 'portrait',
    });
  }, []);

  useEffect(() => {
    // Handle both old and new orientation APIs
    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
    
    // Also listen to the modern API
    if (window.screen?.orientation) {
      window.screen.orientation.addEventListener('change', handleOrientationChange);
    }

    // Initial check
    handleOrientationChange();

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener('change', handleOrientationChange);
      }
    };
  }, [handleOrientationChange]);

  return state;
};