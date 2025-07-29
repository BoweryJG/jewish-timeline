import { useEffect, useState, useRef, useCallback } from 'react';

interface GyroscopeData {
  alpha: number; // Z axis (0-360)
  beta: number;  // X axis (-180 to 180)
  gamma: number; // Y axis (-90 to 90)
  supported: boolean;
  permission: 'granted' | 'denied' | 'pending';
}

export const useGyroscope = (enabled: boolean = true) => {
  const [data, setData] = useState<GyroscopeData>({
    alpha: 0,
    beta: 0,
    gamma: 0,
    supported: false,
    permission: 'pending',
  });
  
  const calibration = useRef({ alpha: 0, beta: 0, gamma: 0 });
  const isCalibrated = useRef(false);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    if (!enabled) return;
    
    // Calibrate on first reading
    if (!isCalibrated.current && event.alpha !== null) {
      calibration.current = {
        alpha: event.alpha || 0,
        beta: event.beta || 0,
        gamma: event.gamma || 0,
      };
      isCalibrated.current = true;
    }

    setData(prev => ({
      ...prev,
      alpha: (event.alpha || 0) - calibration.current.alpha,
      beta: (event.beta || 0) - calibration.current.beta,
      gamma: (event.gamma || 0) - calibration.current.gamma,
    }));
  }, [enabled]);

  const requestPermission = useCallback(async () => {
    // Check if we need to request permission (iOS 13+)
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        setData(prev => ({ ...prev, permission }));
        return permission === 'granted';
      } catch (error) {
        console.error('Error requesting device orientation permission:', error);
        setData(prev => ({ ...prev, permission: 'denied' }));
        return false;
      }
    }
    // Permission not required
    setData(prev => ({ ...prev, permission: 'granted' }));
    return true;
  }, []);

  const calibrate = useCallback(() => {
    isCalibrated.current = false;
  }, []);

  useEffect(() => {
    const checkSupport = () => {
      const supported = 'DeviceOrientationEvent' in window;
      setData(prev => ({ ...prev, supported }));
      return supported;
    };

    if (!checkSupport() || !enabled) return;

    // Auto-request permission
    requestPermission().then(granted => {
      if (granted) {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    });

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [enabled, handleOrientation, requestPermission]);

  return {
    ...data,
    requestPermission,
    calibrate,
  };
};