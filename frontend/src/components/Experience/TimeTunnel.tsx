import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { useGyroscope } from '../../hooks/useGyroscope';

export default function TimeTunnel() {
  const tunnelRef = useRef<THREE.Mesh>(null);
  const { events } = useStore();
  const gyro = useGyroscope(true);

  // Create tunnel geometry
  const tunnelGeometry = useMemo(() => {
    const geometry = new THREE.CylinderGeometry(5, 5, 100, 32, 1, true);
    geometry.rotateZ(Math.PI / 2);
    return geometry;
  }, []);

  // Create shader material for the tunnel
  const tunnelMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        eventProgress: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float eventProgress;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          // Create moving bands
          float bands = sin(vUv.x * 20.0 - time * 2.0) * 0.5 + 0.5;
          
          // Add glow effect
          float glow = pow(1.0 - abs(vUv.y - 0.5) * 2.0, 3.0);
          
          // Color based on event progress
          vec3 color = mix(
            vec3(0.1, 0.1, 0.3),  // Deep blue
            vec3(1.0, 0.84, 0.0), // Royal gold
            eventProgress * glow
          );
          
          // Add some noise
          float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
          color += noise * 0.05;
          
          gl_FragColor = vec4(color * bands, 0.8);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
    });
  }, []);

  useFrame((state) => {
    if (tunnelRef.current) {
      // Update time uniform
      tunnelMaterial.uniforms.time.value = state.clock.elapsedTime;
      
      // Apply gyroscope rotation
      if (gyro.supported && gyro.permission === 'granted') {
        tunnelRef.current.rotation.x = THREE.MathUtils.degToRad(gyro.beta * 0.3);
        tunnelRef.current.rotation.y = THREE.MathUtils.degToRad(gyro.gamma * 0.3);
      }
      
      // Move camera through tunnel
      state.camera.position.z = -state.clock.elapsedTime * 2 % 100;
    }
  });

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#FFD700" />
      
      {/* Background stars */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1}
      />
      
      {/* The tunnel */}
      <mesh 
        ref={tunnelRef}
        geometry={tunnelGeometry}
        material={tunnelMaterial}
      />
      
      {/* Floating event markers */}
      {events.map((event, index) => (
        <Float
          key={event.id}
          speed={2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
          floatingRange={[-0.5, 0.5]}
        >
          <mesh position={[
            Math.sin(index * 0.5) * 3,
            Math.cos(index * 0.5) * 3,
            -index * 10
          ]}>
            <octahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial 
              color={
                event.category === 'win' ? '#00ff00' :
                event.category === 'attack' ? '#ff0000' :
                event.category === 'struggle' ? '#ff8800' :
                '#0088ff'
              }
              emissive={
                event.category === 'win' ? '#00ff00' :
                event.category === 'attack' ? '#ff0000' :
                event.category === 'struggle' ? '#ff8800' :
                '#0088ff'
              }
              emissiveIntensity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}