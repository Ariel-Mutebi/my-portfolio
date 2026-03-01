import blueMarbleTexture from "./images/blueMarbleTexture.jpg";
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
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function SatelliteText() {
  const orbitRef = useRef<Group>(null);

  useFrame(() => {
    if (!orbitRef.current) return;
    orbitRef.current.rotation.y += 0.01;
  });

  return (
    <group ref={orbitRef} rotation={[0.4, 0, 0]}>
      <Text
        position={[2.2, 0, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        striving to be the best in the world
      </Text>
    </group>
  );
}

function Scene() {
  return (
    <Canvas camera={{ position: [3, 2, 4], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} />

      <Globe />
      <SatelliteText />

      <OrbitControls enablePan={false} />
    </Canvas>
  );
}

export function Article4 () {
  return <div className="h-dvh"><Scene /></div>
}
