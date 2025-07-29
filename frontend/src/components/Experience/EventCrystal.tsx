import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';
import type { TimelineEvent } from '../../lib/supabase';
import ParticleSystem from './ParticleSystem';
import PopulationFlow from './PopulationFlow';

interface EventCrystalProps {
  event: TimelineEvent;
  position: [number, number, number];
  index: number;
  onSelect: (event: TimelineEvent) => void;
}

export default function EventCrystal({ event, position, index, onSelect }: EventCrystalProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  
  // Animation spring
  const { scale, emissiveIntensity } = useSpring({
    scale: active ? 1.5 : hovered ? 1.2 : 1,
    emissiveIntensity: active ? 1 : hovered ? 0.5 : 0.2,
    config: { mass: 1, tension: 280, friction: 60 }
  });
  
  // Get color based on category
  const color = useMemo(() => {
    switch (event.category) {
      case 'win': return '#00ff00';
      case 'attack': return '#ff0000';
      case 'struggle': return '#ff8800';
      case 'population': return '#0088ff';
      default: return '#ffffff';
    }
  }, [event.category]);
  
  // Floating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + index) * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      
      // Pulse effect for active events
      if (active) {
        const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.1 + 1;
        meshRef.current.scale.setScalar(pulse * 1.5);
      }
    }
  });
  
  const handleClick = () => {
    setActive(!active);
    onSelect(event);
  };
  
  // Show population flow for diaspora events
  const showPopulationFlow = event.category === 'population' && 
    event.population_before && 
    event.population_after && 
    event.population_after < event.population_before;

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <group position={position}>
        {/* Main crystal */}
        <animated.mesh
          ref={meshRef}
          scale={scale}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <octahedronGeometry args={[0.5, 0]} />
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={emissiveIntensity}
            roughness={0.1}
            metalness={0.8}
            distort={0.2}
            speed={2}
          />
        </animated.mesh>
        
        {/* Event title */}
        <Text
          position={[0, 1, 0]}
          fontSize={0.2}
          color={color}
          anchorX="center"
          anchorY="middle"
          maxWidth={3}
        >
          {event.title}
        </Text>
        
        {/* Year label */}
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.15}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {new Date(event.start_date).getFullYear()} 
          {event.start_date.startsWith('-') ? ' BCE' : ' CE'}
        </Text>
        
        {/* Particle effects when active */}
        {active && (
          <ParticleSystem
            count={500}
            category={event.category}
            position={[0, 0, 0]}
            intensity={event.severity_impact || 5}
          />
        )}
        
        {/* Population flow visualization */}
        {showPopulationFlow && active && (
          <>
            <PopulationFlow
              sourcePos={[0, 0, 0]}
              targetPos={[-3, -1, -2]}
              particleCount={200}
            />
            <PopulationFlow
              sourcePos={[0, 0, 0]}
              targetPos={[3, -1, -2]}
              particleCount={200}
            />
            <PopulationFlow
              sourcePos={[0, 0, 0]}
              targetPos={[0, -1, -4]}
              particleCount={200}
            />
          </>
        )}
        
        {/* Impact indicator rings */}
        {event.severity_impact && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.7, 0.8, 32]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={0.3 * (event.severity_impact / 10)}
              side={THREE.DoubleSide}
            />
          </mesh>
        )}
      </group>
    </Float>
  );
}