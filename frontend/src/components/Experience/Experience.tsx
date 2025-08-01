import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Loader } from '@react-three/drei';
import { useStore } from '../../store/useStore';
import EnhancedTimeTunnel from './EnhancedTimeTunnel';
import EventDetailOverlay from '../UI/EventDetailOverlay';
import MobileNavbar from '../UI/MobileNavbar';
import NavigationHelp from '../UI/NavigationHelp';

export default function Experience() {
  const { quality } = useStore();
  
  // Calculate pixel ratio based on quality setting
  const getPixelRatio = () => {
    switch (quality) {
      case 'low': return 1;
      case 'medium': return Math.min(window.devicePixelRatio, 1.5);
      case 'high': return Math.min(window.devicePixelRatio, 2);
      default: return Math.min(window.devicePixelRatio, 2);
    }
  };

  return (
    <>
      <MobileNavbar /> {/* Works for all devices now */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={getPixelRatio()}
        performance={{ min: 0.5 }}
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          <EnhancedTimeTunnel />
        </Suspense>
      </Canvas>
      <Loader />
      <NavigationHelp />
      <EventDetailOverlay />
    </>
  );
}