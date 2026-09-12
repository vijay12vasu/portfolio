import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleTorus() {
  const ref = useRef<THREE.Points>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  // Generate particles around a torus shape
  const particles = useMemo(() => {
    const geometry = new THREE.TorusKnotGeometry(10, 3, 200, 32);
    geometry.computeBoundingBox();
    
    const count = 4000;
    const positions = new Float32Array(count * 3);
    
    // Distribute particles near the surface of the torus knot
    const posAttribute = geometry.getAttribute('position');
    
    for (let i = 0; i < count; i++) {
      const vertexIndex = Math.floor(Math.random() * posAttribute.count);
      
      const x = posAttribute.getX(vertexIndex);
      const y = posAttribute.getY(vertexIndex);
      const z = posAttribute.getZ(vertexIndex);
      
      // Add slight noise
      const spread = 0.5;
      positions[i * 3] = x + (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = y + (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = z + (Math.random() - 0.5) * spread;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1;
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      torusRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group>
      <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      <mesh ref={torusRef}>
        <torusKnotGeometry args={[10, 3, 100, 16]} />
        <meshBasicMaterial 
          color="#3b82f6" 
          wireframe 
          transparent 
          opacity={0.03}
        />
      </mesh>
    </group>
  );
}

export function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-80">
      <Canvas camera={{ position: [0, 0, 25], fov: 60 }}>
        <fog attach="fog" args={['#030305', 10, 40]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
        <ParticleTorus />
      </Canvas>
    </div>
  );
}
