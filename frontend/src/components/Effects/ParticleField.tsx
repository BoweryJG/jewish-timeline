import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';

interface ParticleFieldProps {
  count?: number;
  category?: 'win' | 'struggle' | 'attack' | 'population';
  intensity?: number;
}

export default function ParticleField({ 
  count = 500, 
  category = 'win',
  intensity = 1 
}: ParticleFieldProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const { quality } = useStore();
  
  // Adjust particle count based on quality setting
  const adjustedCount = useMemo(() => {
    switch (quality) {
      case 'low': return Math.floor(count * 0.3);
      case 'medium': return Math.floor(count * 0.6);
      case 'high': return count;
      default: return Math.floor(count * 0.6);
    }
  }, [count, quality]);

  // Create particle geometry and material
  const [geometry, material] = useMemo(() => {
    const positions = new Float32Array(adjustedCount * 3);
    const colors = new Float32Array(adjustedCount * 3);
    const sizes = new Float32Array(adjustedCount);
    
    // Category-based color schemes
    const colorMap = {
      win: new THREE.Color(0xffd700), // Gold
      struggle: new THREE.Color(0xff8c00), // Orange
      attack: new THREE.Color(0xff0000), // Red
      population: new THREE.Color(0x00bfff) // Blue
    };
    
    const baseColor = colorMap[category];
    
    for (let i = 0; i < adjustedCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      // Color with variation
      const colorVariation = 0.2;
      colors[i * 3] = baseColor.r + (Math.random() - 0.5) * colorVariation;
      colors[i * 3 + 1] = baseColor.g + (Math.random() - 0.5) * colorVariation;
      colors[i * 3 + 2] = baseColor.b + (Math.random() - 0.5) * colorVariation;
      
      // Size
      sizes[i] = Math.random() * 0.3 + 0.1;
    }
    
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        intensity: { value: intensity },
        pixelRatio: { value: window.devicePixelRatio }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float time;
        uniform float intensity;
        
        void main() {
          vColor = color;
          vec3 pos = position;
          
          // Floating motion
          pos.y += sin(time + position.x * 0.5) * 0.3;
          pos.x += cos(time * 0.8 + position.y * 0.5) * 0.2;
          pos.z += sin(time * 0.6 + position.z * 0.5) * 0.2;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Size attenuation
          gl_PointSize = size * intensity * (300.0 / -mvPosition.z);
          
          // Fade based on distance
          vAlpha = (1.0 - smoothstep(3.0, 10.0, length(pos))) * intensity;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          // Circular particle shape
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          if (dist > 0.5) discard;
          
          // Soft edges
          float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
          
          // Glow effect
          vec3 finalColor = vColor * (1.0 + (1.0 - dist) * 0.5);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });
    
    return [geo, mat];
  }, [adjustedCount, category, intensity]);

  // Animate particles
  useFrame((state) => {
    if (particlesRef.current && material) {
      material.uniforms.time.value = state.clock.elapsedTime;
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef} geometry={geometry} material={material} />
  );
}