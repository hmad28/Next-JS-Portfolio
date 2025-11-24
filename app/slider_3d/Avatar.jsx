import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  ContactShadows,
  Stage,
} from "@react-three/drei";

function Avatar() {
  const { scene } = useGLTF("/hammad.glb");
  return <primitive object={scene} scale={4} position={[0, -4, 0]} />;
}

function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg font-medium">Loading 3D Model...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <section className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      {/* Title */}
      <div className="absolute top-8 left-8 z-10">
        <h1 className="text-4xl font-bold text-white mb-2">3D Avatar</h1>
        <p className="text-blue-200">Drag to rotate • Scroll to zoom</p>
      </div>

      {/* Canvas */}
      <div className="w-full h-full">
        <Canvas
          shadows
          camera={{ position: [0, 0, 10], fov: 50 }}
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
              color="#4a90e2"
            />
            <pointLight
              position={[10, 5, -10]}
              intensity={0.3}
              color="#9b59b6"
            />

            {/* Environment for reflections */}
            <Environment preset="city" />

            {/* Avatar Model */}
            <Avatar />

            {/* Contact Shadows for ground effect */}
            <ContactShadows
              position={[0, -2, 0]}
              opacity={0.5}
              scale={15}
              blur={2}
              far={4}
            />

            {/* Controls */}
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={5}
              maxDistance={20}
              minPolarAngle={Math.PI / 4}
              maxPolarAngle={Math.PI / 1.5}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Loading overlay */}
      <Suspense fallback={<Loader />}>
        <div style={{ display: "none" }}>
          <Avatar />
        </div>
      </Suspense>

      {/* Info cards */}
      <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
        <div className="flex gap-4 text-white">
          <div className="text-center">
            <div className="text-2xl font-bold">360°</div>
            <div className="text-xs text-blue-200">Rotation</div>
          </div>
          <div className="w-px bg-white/20"></div>
          <div className="text-center">
            <div className="text-2xl font-bold">3D</div>
            <div className="text-xs text-blue-200">Model</div>
          </div>
        </div>
      </div>
    </section>
  );
}
