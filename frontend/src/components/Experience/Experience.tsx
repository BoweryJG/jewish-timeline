import { Canvas } from '@react-three/fiber';
import { Suspense, useMemo } from 'react';
import { Loader } from '@react-three/drei';
import { useDeviceOrientation } from '../../hooks/useDeviceOrientation';
import { useStore } from '../../store/useStore';
import EnhancedTimeTunnel from './EnhancedTimeTunnel';
import EnhancedPortraitTimeline from '../Portrait/EnhancedPortraitTimeline';
import { getDeviceInfo } from '../../utils/deviceDetection';

export default function Experience() {
  const { isLandscape } = useDeviceOrientation();
  const { viewMode, quality } = useStore();
  const deviceInfo = useMemo(() => getDeviceInfo(), []);

  // Determine actual view mode based on orientation and user preference
  const shouldShowLandscape = isLandscape && viewMode === 'landscape' && deviceInfo.isMobile;
  
  // Calculate pixel ratio based on quality setting
  const getPixelRatio = () => {
    if (!deviceInfo.isMobile) return Math.min(window.devicePixelRatio, 2);
    
    switch (quality) {
      case 'low': return 1;
      case 'medium': return Math.min(window.devicePixelRatio, 1.5);
      case 'high': return Math.min(window.devicePixelRatio, 2);
      default: return 1.5;
    }
  };

  if (!shouldShowLandscape) {
    return <EnhancedPortraitTimeline />;
  }

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={getPixelRatio()}
        performance={{ min: 0.5 }}
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          <EnhancedTimeTunnel />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}