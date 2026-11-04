import { useLayoutEffect, useRef, type ComponentType } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Html, Line, Sparkles } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import {
  HiOutlineArrowTrendingUp,
  HiOutlineChartBar,
  HiOutlineCheckCircle,
  HiOutlineCircleStack,
  HiOutlineSparkles,
} from "react-icons/hi2";import tmsLogo from "../assets/tms-logo.png";

const COLORS = {
  coral: "#FF565F",
  coralLight: "#FF777E",
  blue: "#4AA8FF",
  ice: "#9BD7FF",
  indigo: "#292D55",
  cube: "#101A2D",
};

type CubeModule = {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  opacity: number;
  rotation: [number, number, number];
};

const CUBE_MODULES: CubeModule[] = [
  { position: [-1.12, 1.02, -0.62], size: [0.58, 0.62, 0.48], color: COLORS.blue, opacity: 0.2, rotation: [0.08, 0.12, -0.08] },
  { position: [-0.46, 1.43, -0.72], size: [0.38, 0.42, 0.4], color: COLORS.ice, opacity: 0.19, rotation: [-0.12, 0.06, 0.08] },
  { position: [0.42, 1.36, -0.68], size: [0.48, 0.43, 0.4], color: COLORS.blue, opacity: 0.2, rotation: [0.08, -0.08, -0.1] },
  { position: [1.13, 1.05, -0.55], size: [0.62, 0.58, 0.48], color: COLORS.coral, opacity: 0.2, rotation: [-0.1, 0.12, 0.08] },
  { position: [-1.48, 0.42, -0.66], size: [0.5, 0.86, 0.48], color: COLORS.blue, opacity: 0.18, rotation: [0.02, -0.08, 0.03] },
  { position: [1.51, 0.38, -0.62], size: [0.48, 0.82, 0.45], color: COLORS.ice, opacity: 0.19, rotation: [-0.03, 0.1, -0.05] },
  { position: [-1.53, -0.48, -0.44], size: [0.46, 0.72, 0.42], color: COLORS.coral, opacity: 0.21, rotation: [0.08, -0.06, 0.06] },
  { position: [1.52, -0.52, -0.5], size: [0.56, 0.66, 0.42], color: COLORS.blue, opacity: 0.2, rotation: [-0.08, 0.12, -0.05] },
  { position: [-1.02, 0.93, 0.62], size: [0.5, 0.55, 0.48], color: COLORS.ice, opacity: 0.2, rotation: [0.06, 0.05, 0.08] },
  { position: [0.98, 0.9, 0.58], size: [0.48, 0.55, 0.46], color: COLORS.coralLight, opacity: 0.18, rotation: [-0.08, 0.02, -0.06] },
  { position: [-1.04, -0.06, 0.66], size: [0.58, 0.7, 0.5], color: COLORS.coral, opacity: 0.22, rotation: [-0.05, 0.07, 0.08] },
  { position: [1.08, -0.03, 0.58], size: [0.55, 0.68, 0.48], color: COLORS.blue, opacity: 0.23, rotation: [0.04, -0.06, -0.08] },
  { position: [-0.92, -0.89, 0.42], size: [0.55, 0.42, 0.46], color: COLORS.blue, opacity: 0.22, rotation: [0.08, 0.02, 0.08] },
  { position: [0.02, -1.12, 0.18], size: [0.5, 0.4, 0.42], color: COLORS.coral, opacity: 0.22, rotation: [-0.06, 0.04, -0.06] },
  { position: [0.95, -0.88, 0.38], size: [0.54, 0.43, 0.44], color: COLORS.ice, opacity: 0.2, rotation: [0.05, -0.08, 0.07] },
  { position: [0.02, 1.72, -0.72], size: [0.32, 0.34, 0.35], color: COLORS.coralLight, opacity: 0.18, rotation: [0.1, 0.12, 0.08] },
];

type NodeDefinition = {
  title: string;
  position: [number, number, number];
  color: string;
  icon: ComponentType<{ className?: string }>;
  connector: [number, number, number][];
};

const NODES: NodeDefinition[] = [
  { title: "Architecture Understanding", position: [2.36, 1.58, 0.1], color: COLORS.coral, icon: HiOutlineCircleStack, connector: [[0.9, 0.8, 0.12], [1.45, 1.2, 0.1], [1.98, 1.54, 0.1], [2.36, 1.58, 0.1]] },
  { title: "Intent to Implementation", position: [-2.36, 0.57, 0.16], color: COLORS.blue, icon: HiOutlineSparkles, connector: [[-0.98, 0.45, 0.2], [-1.48, 0.68, 0.16], [-1.96, 0.62, 0.16], [-2.36, 0.57, 0.16]] },
  { title: "Software Correctness", position: [-2.3, -1.15, 0.12], color: COLORS.coral, icon: HiOutlineCheckCircle, connector: [[-0.94, -0.7, 0.18], [-1.4, -0.98, 0.14], [-1.92, -1.12, 0.12], [-2.3, -1.15, 0.12]] },
  { title: "Runtime Intelligence", position: [2.38, 0.47, 0.12], color: COLORS.coral, icon: HiOutlineChartBar, connector: [[0.95, 0.32, 0.18], [1.46, 0.38, 0.14], [1.98, 0.47, 0.12], [2.38, 0.47, 0.12]] },
  { title: "Continuous Evolution", position: [2.3, -1.25, 0.16], color: COLORS.blue, icon: HiOutlineArrowTrendingUp, connector: [[0.92, -0.76, 0.2], [1.42, -1.08, 0.18], [1.92, -1.22, 0.16], [2.3, -1.25, 0.16]] },
];

function GlassModule({ module }: { module: CubeModule }) {
  return (
    <mesh position={module.position} rotation={module.rotation}>
      <boxGeometry args={module.size} />
      <meshPhysicalMaterial
        color={module.color}
        transparent
        opacity={Math.min(module.opacity * 1.38, 0.34)}
        roughness={0.12}
        metalness={0.24}
        transmission={0.16}
        thickness={0.42}
        clearcoat={1}
        clearcoatRoughness={0.1}
        emissive={module.color}
        emissiveIntensity={0.18}
        depthWrite={false}
      />
      <Edges scale={1.012} color={module.color} threshold={12} />
    </mesh>
  );
}

function CentralLogoCube() {
  const cubeRef = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();
  useFrame(({ clock }) => {
    if (!cubeRef.current || reducedMotion) return;
    cubeRef.current.rotation.y = -0.12 + Math.sin(clock.elapsedTime * 0.18) * 0.025;
    cubeRef.current.rotation.x = 0.055;
  });

  return (
    <group ref={cubeRef}>
      <mesh>
        <boxGeometry args={[1.68, 1.68, 1.68]} />
        <meshPhysicalMaterial color={COLORS.cube} roughness={0.22} metalness={0.42} clearcoat={1} clearcoatRoughness={0.14} emissive={COLORS.indigo} emissiveIntensity={0.34} />
        <Edges scale={1.006} color={COLORS.blue} threshold={12} />
      </mesh>
      <mesh position={[0, 0, 0.852]}>
        <planeGeometry args={[1.58, 1.58]} />
        <meshBasicMaterial color={COLORS.indigo} transparent opacity={0.4} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0.858]}>
        <planeGeometry args={[1.48, 1.48]} />
        <meshBasicMaterial color={COLORS.cube} transparent opacity={0.42} />
      </mesh>
      <Edges scale={1.02} color={COLORS.coral} threshold={18} />
      <Html position={[0, 0, 0.88]} transform distanceFactor={5.2} center>
        <img src={tmsLogo} alt="TMS logo" className="software-core-logo" />
      </Html>
    </group>
  );
}

function CubeAssembly() {
  const ref = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();
  useFrame(({ clock }) => {
    if (!ref.current || reducedMotion) return;
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.58) * 0.035;
  });

  return (
    <group ref={ref}>
      <group scale={1.12}>
        {CUBE_MODULES.filter((module) => module.position[2] < 0).map((module, index) => <GlassModule key={`rear-${index}`} module={module} />)}
        <CentralLogoCube />
        {CUBE_MODULES.filter((module) => module.position[2] >= 0).map((module, index) => <GlassModule key={`front-${index}`} module={module} />)}
      </group>
    </group>
  );
}

function OrbitRing({ radius, color, rotation, speed, opacity = 0.64 }: { radius: number; color: string; rotation: [number, number, number]; speed: number; opacity?: number }) {
  const ref = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();
  useFrame((_, delta) => {
    if (ref.current && !reducedMotion) ref.current.rotation.y += delta * speed;
  });
  return (
    <group ref={ref} rotation={rotation}>
      <mesh scale={[1.36, 1, 0.82]}>
        <torusGeometry args={[radius, 0.009, 6, 180]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
      </mesh>
    </group>
  );
}

function EnergyPlatform() {
  const sweep = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();
  useFrame((_, delta) => {
    if (sweep.current && !reducedMotion) sweep.current.rotation.z += delta * 0.16;
  });
  return (
    <group position={[0, -1.58, 0]}>
      <mesh position={[0, -0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.88, 0.98, 0.075, 96]} />
        <meshPhysicalMaterial color={COLORS.cube} transparent opacity={0.78} roughness={0.24} metalness={0.5} clearcoat={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} scale={[1.95, 0.88, 1]}>
        <torusGeometry args={[0.91, 0.018, 6, 144]} />
        <meshBasicMaterial color={COLORS.blue} transparent opacity={0.92} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} scale={[1.65, 0.76, 1]}>
        <torusGeometry args={[0.84, 0.022, 6, 144]} />
        <meshBasicMaterial color={COLORS.coral} transparent opacity={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} scale={[2.08, 1.02, 1]}>
        <torusGeometry args={[0.9, 0.008, 6, 144]} />
        <meshBasicMaterial color={COLORS.ice} transparent opacity={0.62} />
      </mesh>
      <group ref={sweep}>
        <mesh position={[1.5, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color={COLORS.coralLight} />
        </mesh>
        <mesh position={[-1.52, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color={COLORS.ice} />
        </mesh>
      </group>
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.27, 0.76, 96]} />
        <meshBasicMaterial color={COLORS.blue} transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function IntelligenceNode({ node, horizontalScale = 1 }: { node: NodeDefinition; horizontalScale?: number }) {
  const Icon = node.icon;
  return (
    <group position={[node.position[0] * horizontalScale, node.position[1], node.position[2]]}>
      <mesh>
        <sphereGeometry args={[0.11, 20, 20]} />
        <meshBasicMaterial color={node.color} />
      </mesh>
      <pointLight color={node.color} intensity={1.3} distance={0.8} />
      <Html position={[0, 0, 0.02]} center distanceFactor={7}>
        <div className="software-3d-node" style={{ "--node-accent": node.color } as React.CSSProperties}>
          <span className="software-3d-node-icon"><Icon className="h-3.5 w-3.5" /></span>
          <span className="software-3d-node-label">{node.title}</span>
        </div>
      </Html>
    </group>
  );
}

function CoreCamera() {
  const { camera, size } = useThree();
  useLayoutEffect(() => {
    camera.position.set(0, 0.15, size.width < 540 ? 9.3 : 8.1);
    camera.lookAt(0, -0.12, 0);
    camera.updateProjectionMatrix();
  }, [camera, size.width]);
  return null;
}

function SoftwareIntelligenceScene() {
  const { size } = useThree();
  const nodeHorizontalScale = size.width < 290 ? 0.64 : 1;

  return (
    <>
      <CoreCamera />
      <ambientLight intensity={0.82} />
      <hemisphereLight args={[COLORS.ice, COLORS.indigo, 0.85]} />
      <pointLight position={[2.7, 3.5, 4]} color={COLORS.blue} intensity={36} distance={10} />
      <pointLight position={[-2.8, -1.5, 3]} color={COLORS.coral} intensity={26} distance={9} />
      <pointLight position={[0, -3.5, -2]} color={COLORS.indigo} intensity={22} distance={8} />
      <Sparkles count={28} scale={[6.5, 4.2, 3.4]} size={1.5} speed={0.18} color={COLORS.ice} opacity={0.62} />

      <OrbitRing radius={1.72} color={COLORS.blue} rotation={[0.18, 0.12, 0.08]} speed={0.018} opacity={0.76} />
      <OrbitRing radius={1.94} color={COLORS.coral} rotation={[0.34, 0.42, -0.04]} speed={-0.014} opacity={0.68} />
      <OrbitRing radius={2.12} color={COLORS.ice} rotation={[0.42, 0.24, 0.12]} speed={0.01} opacity={0.56} />
      <OrbitRing radius={2.24} color={COLORS.blue} rotation={[0.22, -0.38, 0.08]} speed={-0.007} opacity={0.42} />

      <CubeAssembly />
      <EnergyPlatform />
      {NODES.map((node) => (
        <group key={node.title}>
          <Line points={node.connector.map(([x, y, z]) => [x * nodeHorizontalScale, y, z] as [number, number, number])} color={node.color} lineWidth={1.15} transparent opacity={0.72} />
          <IntelligenceNode node={node} horizontalScale={nodeHorizontalScale} />
        </group>
      ))}
    </>
  );
}

export default function SoftwareIntelligenceCore3D({ className = "" }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0.15, 8.1], fov: 39 }}
      dpr={[1, 1.5]}
      frameloop={reducedMotion ? "demand" : "always"}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      aria-label="Three-dimensional TarvyX Software Intelligence Core"
    >
      <SoftwareIntelligenceScene />
    </Canvas>
  );
}
