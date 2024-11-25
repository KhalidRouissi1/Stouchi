import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.Mesh;
  };
  materials: {};
};

// Separate Model component that will be rendered inside Canvas
function Model(props: JSX.IntrinsicElements['group']) {
  const groupRef = useRef<THREE.Group>(null);
  const { nodes } = useGLTF(
    '/Generate_a_3d_Wallet__1119102127_refine.glb',
  ) as GLTFResult;

  // Add rotation logic using useFrame
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0009; // Adjust speed here
      // groupRef.current.rotation.x += 0.005; // Optional additional axis
    }
  });

  return (
    <group ref={groupRef} {...props}>
      <mesh geometry={nodes.mesh_0.geometry} material={nodes.mesh_0.material} />
    </group>
  );
}

// The main component that wraps everything
export default function Wallet3d({ scale = 20 }) {
  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 25], fov: 120 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Environment preset="city" />
          <Model scale={scale} />
          <OrbitControls />
        </Canvas>
      </Suspense>
    </div>
  );
}

useGLTF.preload('/Generate_a_3d_Wallet__1119102127_refine.glb');
