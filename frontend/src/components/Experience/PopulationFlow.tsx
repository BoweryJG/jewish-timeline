import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { populationFlowVertexShader, populationFlowFragmentShader } from '../../shaders/particleShader';

interface PopulationFlowProps {
  sourcePos: [number, number, number];
  targetPos: [number, number, number];
  particleCount?: number;
  flowSpeed?: number;
  color?: THREE.Color;
}

export default function PopulationFlow({
  sourcePos,
  targetPos,
  particleCount = 500,
  flowSpeed = 0.2,
  color = new THREE.Color(0xffd700)
}: PopulationFlowProps) {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create flow particles
  const { positions, progress, offsets } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const progress = new Float32Array(particleCount);
    const offsets = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Start all particles at source
      positions[i3] = sourcePos[0];
      positions[i3 + 1] = sourcePos[1];
      positions[i3 + 2] = sourcePos[2];
      
      // Random initial progress
      progress[i] = Math.random();
      
      // Random offset for variation
      offsets[i] = Math.random();
    }
    
    return { positions, progress, offsets };
  }, [particleCount, sourcePos]);

  // Create shader material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        flowSpeed: { value: flowSpeed },
        sourcePos: { value: new THREE.Vector3(...sourcePos) },
        targetPos: { value: new THREE.Vector3(...targetPos) }
      },
      vertexShader: populationFlowVertexShader,
      fragmentShader: populationFlowFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
  }, [sourcePos, targetPos, flowSpeed]);

  // Create geometry
  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aProgress', new THREE.BufferAttribute(progress, 1));
    geometry.setAttribute('aOffset', new THREE.BufferAttribute(offsets, 1));
    return geometry;
  }, [positions, progress, offsets]);

  useFrame((state) => {
    if (material) {
      material.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}