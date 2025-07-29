import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { particleVertexShader, particleFragmentShader } from '../../shaders/particleShader';

interface ParticleSystemProps {
  count?: number;
  category: 'struggle' | 'attack' | 'win' | 'population';
  position?: [number, number, number];
  intensity?: number;
}

export default function ParticleSystem({ 
  count = 1000, 
  category, 
  position = [0, 0, 0],
  intensity = 1
}: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { quality } = useStore();
  const { size } = useThree();
  
  // Adjust particle count based on quality setting
  const adjustedCount = useMemo(() => {
    switch (quality) {
      case 'low': return Math.floor(count * 0.3);
      case 'medium': return Math.floor(count * 0.6);
      case 'high': return count;
      default: return Math.floor(count * 0.6);
    }
  }, [count, quality]);

  // Create particle attributes
  const { positions, scales, velocities, lifetimes, colors } = useMemo(() => {
    const positions = new Float32Array(adjustedCount * 3);
    const scales = new Float32Array(adjustedCount);
    const velocities = new Float32Array(adjustedCount * 3);
    const lifetimes = new Float32Array(adjustedCount);
    const colors = new Float32Array(adjustedCount * 3);
    
    // Set color based on category
    const baseColor = {
      win: new THREE.Color(0x00ff00),
      attack: new THREE.Color(0xff0000),
      struggle: new THREE.Color(0xff8800),
      population: new THREE.Color(0xffd700)
    }[category];
    
    for (let i = 0; i < adjustedCount; i++) {
      const i3 = i * 3;
      
      // Initial position (spread around origin)
      positions[i3] = (Math.random() - 0.5) * 2;
      positions[i3 + 1] = (Math.random() - 0.5) * 2;
      positions[i3 + 2] = (Math.random() - 0.5) * 2;
      
      // Scale variation
      scales[i] = Math.random() * 0.5 + 0.5;
      
      // Velocity based on category
      if (category === 'attack') {
        // Explosive outward
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;
        velocities[i3] = Math.cos(angle) * speed;
        velocities[i3 + 1] = Math.random() * 2 - 1;
        velocities[i3 + 2] = Math.sin(angle) * speed;
      } else if (category === 'population') {
        // Flowing stream
        velocities[i3] = Math.random() * 0.5 - 0.25;
        velocities[i3 + 1] = Math.random() * 0.2 - 0.1;
        velocities[i3 + 2] = -Math.random() * 2 - 1;
      } else if (category === 'win') {
        // Rising celebration
        velocities[i3] = (Math.random() - 0.5) * 0.5;
        velocities[i3 + 1] = Math.random() * 2 + 1;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.5;
      } else {
        // Turbulent for struggles
        velocities[i3] = (Math.random() - 0.5) * 2;
        velocities[i3 + 1] = (Math.random() - 0.5) * 2;
        velocities[i3 + 2] = (Math.random() - 0.5) * 2;
      }
      
      // Lifetime variation
      lifetimes[i] = Math.random() * 3 + 2;
      
      // Color with slight variation
      const colorVariation = 0.2;
      colors[i3] = baseColor.r + (Math.random() - 0.5) * colorVariation;
      colors[i3 + 1] = baseColor.g + (Math.random() - 0.5) * colorVariation;
      colors[i3 + 2] = baseColor.b + (Math.random() - 0.5) * colorVariation;
    }
    
    return { positions, scales, velocities, lifetimes, colors };
  }, [adjustedCount, category]);

  // Create particle texture
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Create shader material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        size: { value: 10 * intensity },
        pointTexture: { value: particleTexture }
      },
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
  }, [particleTexture, intensity]);

  // Create geometry
  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('aVelocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('aLifetime', new THREE.BufferAttribute(lifetimes, 1));
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, [positions, scales, velocities, lifetimes, colors]);

  useFrame((state) => {
    if (pointsRef.current && material) {
      material.uniforms.time.value = state.clock.elapsedTime;
      
      // Rotate particle system slowly
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef} position={position} geometry={geometry} material={material} />
  );
}