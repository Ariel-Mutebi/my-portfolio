import blueMarbleTexture from "./images/blue-marble-texture.jpg";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { Group, Mesh, TextureLoader } from "three";
import { useRef } from "react";

function Globe() {
  const texture = useLoader(TextureLoader, blueMarbleTexture);
  const globeRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!globeRef.current) return;
    globeRef.current.rotation.y += 0.0008;
  });

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhongMaterial map={texture} shininess={40} />
    </mesh>
  );
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

const MESSAGE = "   STRIVING TO BE ONE OF THE BEST IN THE WORLD   ";

function RingOfSaturn() {
  const groupRef = useRef<Group>(null);

  const radius = 2.2;
  const chars = MESSAGE.split("");

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y -= delta * toRadians(20);
  });

  return (
    <group ref={groupRef} rotation={[0, 0, 0]} scale={[-1, 1, 1]}>
      {chars.map((char, i) => {
        const angle = toRadians((i / chars.length) * 360);
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const outwardRotationY = -angle - toRadians(90);
  
        return (
          <Text
            key={i}
            position={[x, 0, z]}
            rotation={[0, outwardRotationY, 0]}
            fontSize={0.2}
            font="/fonts/Modak-Regular.ttf"
            color="#ffb86a" // orange-300
            anchorX="center"
            anchorY="middle"
          >
            {char}
          </Text>
        );
      })}
    </group>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [3, 1, 4], fov: 26 }}>
      <ambientLight intensity={5} />
      <directionalLight position={[5, 3, 5]} intensity={15} />

      <Globe />
      <RingOfSaturn />

      <OrbitControls enablePan={false} />
    </Canvas>
  );
}

export function Article4 () {
  return <div className="h-dvh bg-slate-400"><Scene /></div>
}
