import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { 
  Stars, 
  Float, 
  Text3D, 
  Center,
  MeshDistortMaterial,
  Environment,
  Sparkles
} from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useStore } from '../../store/useStore';
import { useGyroscope } from '../../hooks/useGyroscope';
import { audioManager } from '../../utils/audioManager';

// Event Crystal Component
const EventCrystal = ({ event, position, index }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  const color = useMemo(() => {
    switch (event.category) {
      case 'win': return '#00ff00';
      case 'attack': return '#ff0000';
      case 'struggle': return '#ff8800';
      case 'population': return '#0088ff';
      default: return '#ffffff';
    }
  }, [event.category]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.005;
      
      // Pulse effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.1;
      meshRef.current.scale.setScalar(hovered ? scale * 1.5 : scale);
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[-0.5, 0.5]}
    >
      <group position={position}>
        {/* Crystal mesh */}
        <mesh
          ref={meshRef}
          onPointerOver={() => {
            setHovered(true);
            audioManager.playHover();
          }}
          onPointerOut={() => setHovered(false)}
          onClick={() => {
            setClicked(!clicked);
            audioManager.playCategory(event.category);
          }}
        >
          <octahedronGeometry args={[0.8, 0]} />
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 2 : 0.5}
            roughness={0.1}
            metalness={0.8}
            distort={0.4}
            speed={2}
            transparent
            opacity={0.9}
          />
        </mesh>
        
        {/* Particle cloud around crystal */}
        <Sparkles
          count={30}
          scale={3}
          size={2}
          speed={0.5}
          color={color}
          opacity={0.8}
        />
        
        {/* Event title on hover */}
        {hovered && (
          <Center position={[0, 2, 0]}>
            <Text3D
              font="/fonts/helvetiker_regular.typeface.json"
              size={0.3}
              height={0.1}
              curveSegments={12}
              bevelEnabled
              bevelThickness={0.02}
              bevelSize={0.02}
              bevelSegments={5}
            >
              {event.title}
              <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
              />
            </Text3D>
          </Center>
        )}
      </group>
    </Float>
  );
};

// Volumetric fog shader
const VolumetricFog = () => {
  const fogRef = useRef<THREE.Mesh>(null);
  
  const fogMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        fogColor: { value: new THREE.Color(0x0a0a2a) },
        fogNear: { value: 0.1 },
        fogFar: { value: 50 },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 fogColor;
        uniform float fogNear;
        uniform float fogFar;
        varying vec3 vWorldPosition;
        
        void main() {
          float depth = gl_FragCoord.z / gl_FragCoord.w;
          float fogFactor = smoothstep(fogNear, fogFar, depth);
          
          // Add some noise to the fog
          float noise = sin(vWorldPosition.x * 0.1 + time) * 
                       sin(vWorldPosition.y * 0.1 + time * 0.8) * 
                       sin(vWorldPosition.z * 0.1 + time * 0.6);
          
          fogFactor += noise * 0.1;
          
          gl_FragColor = vec4(fogColor, fogFactor * 0.3);
        }
      `,
      transparent: true,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    if (fogRef.current) {
      fogMaterial.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={fogRef} material={fogMaterial}>
      <boxGeometry args={[200, 200, 200]} />
    </mesh>
  );
};

export default function EnhancedTimeTunnel() {
  const tunnelRef = useRef<THREE.Mesh>(null);
  const { events } = useStore();
  const gyro = useGyroscope(true);
  const { camera } = useThree();

  // Enhanced tunnel geometry with more segments
  const tunnelGeometry = useMemo(() => {
    const geometry = new THREE.CylinderGeometry(5, 5, 200, 64, 32, true);
    geometry.rotateZ(Math.PI / 2);
    return geometry;
  }, []);

  // Enhanced shader material with historical textures
  const tunnelMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        eventProgress: { value: 0 },
        selectedCategory: { value: 0 },
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vUv = uv;
          vPosition = position;
          vNormal = normal;
          
          // Add some vertex displacement for organic feel
          vec3 pos = position;
          float displacement = sin(position.x * 0.1 + time * 2.0) * 0.2;
          pos += normal * displacement;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float eventProgress;
        uniform float selectedCategory;
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        vec3 getCategoryColor(float category) {
          if (category < 0.25) return vec3(0.0, 1.0, 0.0); // Win - Green
          else if (category < 0.5) return vec3(1.0, 0.0, 0.0); // Attack - Red
          else if (category < 0.75) return vec3(1.0, 0.5, 0.0); // Struggle - Orange
          else return vec3(0.0, 0.5, 1.0); // Population - Blue
        }
        
        void main() {
          // Create temporal bands
          float bands = sin(vUv.x * 30.0 - time * 3.0) * 0.5 + 0.5;
          bands *= sin(vUv.y * 20.0 + time * 2.0) * 0.5 + 0.5;
          
          // Historical data visualization
          float dataFlow = step(0.5, fract(vUv.x * 50.0 + time * 0.5));
          
          // Energy glow
          float glow = pow(1.0 - abs(vUv.y - 0.5) * 2.0, 3.0);
          
          // Base color with category influence
          vec3 baseColor = mix(
            vec3(0.05, 0.05, 0.2),  // Deep blue background
            vec3(1.0, 0.84, 0.0),   // Royal gold
            eventProgress * glow
          );
          
          // Mix in category color
          vec3 categoryColor = getCategoryColor(selectedCategory);
          baseColor = mix(baseColor, categoryColor, 0.3 * glow);
          
          // Add data flow visualization
          vec3 dataColor = mix(baseColor, vec3(0.0, 1.0, 1.0), dataFlow * 0.3);
          
          // Holographic interference patterns
          float interference = sin(vPosition.x * 10.0 + time) * 
                              sin(vPosition.y * 10.0 - time) * 0.1;
          
          vec3 finalColor = mix(dataColor, baseColor + interference, bands);
          
          // Edge glow
          float edgeFactor = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          finalColor += categoryColor * edgeFactor * 0.5;
          
          gl_FragColor = vec4(finalColor, 0.85);
        }
      `,
      side: THREE.BackSide,
      transparent: true,
    });
  }, []);

  useFrame((state) => {
    if (tunnelRef.current) {
      // Update shader uniforms
      tunnelMaterial.uniforms.time.value = state.clock.elapsedTime;
      
      // Calculate event progress based on camera position
      const progress = (Math.abs(camera.position.z) % 100) / 100;
      tunnelMaterial.uniforms.eventProgress.value = progress;
      
      // Apply gyroscope rotation with smoothing
      if (gyro.supported && gyro.permission === 'granted') {
        const targetRotationX = THREE.MathUtils.degToRad(gyro.beta * 0.3);
        const targetRotationY = THREE.MathUtils.degToRad(gyro.gamma * 0.3);
        
        tunnelRef.current.rotation.x = THREE.MathUtils.lerp(
          tunnelRef.current.rotation.x,
          targetRotationX,
          0.1
        );
        tunnelRef.current.rotation.y = THREE.MathUtils.lerp(
          tunnelRef.current.rotation.y,
          targetRotationY,
          0.1
        );
      }
      
      // Rotate tunnel slowly
      tunnelRef.current.rotation.z += 0.001;
      
      // Move camera through tunnel with acceleration near events
      const baseSpeed = 2;
      const eventInfluence = Math.sin(progress * Math.PI) * 1.5;
      camera.position.z = -(state.clock.elapsedTime * (baseSpeed + eventInfluence)) % 200;
    }
  });

  return (
    <>
      {/* Ambient environment */}
      <Environment preset="night" />
      
      {/* Lighting setup */}
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#FFD700" />
      <pointLight position={[0, 0, -50]} intensity={0.3} color="#0088ff" />
      <pointLight position={[0, 0, -100]} intensity={0.3} color="#ff0088" />
      
      {/* Enhanced background stars */}
      <Stars 
        radius={200} 
        depth={100} 
        count={10000} 
        factor={4} 
        saturation={0.1} 
        fade 
        speed={0.5}
      />
      
      {/* The enhanced tunnel */}
      <mesh 
        ref={tunnelRef}
        geometry={tunnelGeometry}
        material={tunnelMaterial}
      />
      
      {/* Volumetric fog */}
      <VolumetricFog />
      
      {/* Event crystals distributed in 3D space */}
      {events.map((event, index) => {
        const angle = (index / events.length) * Math.PI * 2;
        const radius = 3 + Math.sin(index * 0.5) * 1.5;
        const z = -index * 15;
        
        return (
          <EventCrystal
            key={event.id}
            event={event}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              z
            ]}
            index={index}
          />
        );
      })}
      
      {/* Floating particles throughout the tunnel */}
      <Sparkles
        count={1000}
        scale={[100, 100, 200]}
        size={3}
        speed={0.5}
        color="#FFD700"
        opacity={0.3}
      />
      
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom 
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          radius={0.8}
        />
        <ChromaticAberration
          offset={new THREE.Vector2(0.0005, 0.0005)}
          radialModulation
          modulationOffset={0}
        />
      </EffectComposer>
    </>
  );
}