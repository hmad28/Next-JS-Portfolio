import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  ContactShadows,
} from "@react-three/drei";

function AvatarNoBG() {
  const { scene } = useGLTF("/hammad.glb");
  return <primitive object={scene} scale={8} position={[0, -11, 4]} />;
}

function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
    </div>
  );
}

export default function App() {
  return (
    <div className="w-full h-screen">
      <Canvas
        shadows
        camera={{ position: [0, 4, 10], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Lighting Setup */}
          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.3}
            penumbra={1}
            intensity={2}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight
            position={[-10, -10, -10]}
            intensity={0.5}
            color="#ffffff"
          />
          <pointLight position={[10, 5, -10]} intensity={0.3} color="#ffffff" />

          {/* Environment for reflections */}
          <Environment preset="city" />

          {/* Avatar Model */}
          <AvatarNoBG />

          {/* Contact Shadows for ground effect */}
          <ContactShadows
            position={[0, -4, 0]}
            opacity={0.4}
            scale={15}
            blur={2}
            far={4}
          />

          {/* Controls */}
          {/* <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={5}
            maxDistance={20}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.5}
          /> */}
        </Suspense>
      </Canvas>

      {/* Loading overlay */}
      <Suspense fallback={<Loader />}>
        <div style={{ display: "none" }}>
          <AvatarNoBG />
        </div>
      </Suspense>
    </div>
  );
}
