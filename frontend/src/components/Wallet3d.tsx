import * as THREE from 'three';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.Mesh;
  };
  materials: {};
  animations: GLTFAction[];
};

// Separate Wallet model component
function WalletModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF(
    '../public/Generate_a_3d_Wallet__1119102127_refine.glb',
  ) as GLTFResult;

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.mesh_0.geometry} material={nodes.mesh_0.material} />
    </group>
  );
}

// Error boundary component
function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[400px] w-full bg-background flex items-center justify-center">
      {children}
    </div>
  );
}

// Loading component
function LoadingFallback() {
  return (
    <div className="min-h-[400px] w-full bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}

// Main Wallet3D component
export default function Wallet3D({ scale = 30 }: { scale?: number }) {
  return (
    <ErrorBoundary>
      <div className="w-full h-[400px] bg-background rounded-lg overflow-hidden">
        <Suspense fallback={<LoadingFallback />}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <WalletModel scale={scale} />
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.5}
            />
            <Environment preset="city" />
          </Canvas>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

// Preload the model
useGLTF.preload('../public/Generate_a_3d_Wallet__1119102127_refine.glb');
