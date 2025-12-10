import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import classes from "./three-background.module.css";

function FloatingParticles({ count = 100 }) {
  const mesh = useRef();
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      scales[i] = Math.random();
    }
    
    return { positions, scales };
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.y = time * 0.05;
    mesh.current.rotation.x = time * 0.03;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#1e6fd9"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// Main wireframe icosahedron (emphasized)
function FloatingMesh() {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.5;
  });

  return (
    <mesh ref={meshRef} position={[3, 0, -2]}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshBasicMaterial
        color="#1e6fd9"
        wireframe
        transparent
        opacity={0.2}
      />
    </mesh>
  );
}

// Secondary smaller icosahedron on the left
function SecondaryMesh() {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * -0.15;
    meshRef.current.rotation.y = time * 0.25;
    meshRef.current.rotation.z = time * 0.1;
    meshRef.current.position.y = Math.cos(time * 0.4) * 0.3 + 1;
    meshRef.current.position.x = Math.sin(time * 0.3) * 0.3 - 3;
  });

  return (
    <mesh ref={meshRef} position={[-3, 1, -3]}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshBasicMaterial
        color="#1e6fd9"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  );
}

// DNA-like helix structure (medical related)
function DNAHelix() {
  const groupRef = useRef();
  
  const helixPoints = useMemo(() => {
    const points1 = [];
    const points2 = [];
    const connectors = [];
    
    for (let i = 0; i < 40; i++) {
      const t = i / 40;
      const y = t * 8 - 4;
      const angle = t * Math.PI * 4;
      
      points1.push(new THREE.Vector3(
        Math.cos(angle) * 0.5,
        y,
        Math.sin(angle) * 0.5
      ));
      
      points2.push(new THREE.Vector3(
        Math.cos(angle + Math.PI) * 0.5,
        y,
        Math.sin(angle + Math.PI) * 0.5
      ));
      
      // Add connector lines every 4 points
      if (i % 4 === 0) {
        connectors.push({
          start: new THREE.Vector3(Math.cos(angle) * 0.5, y, Math.sin(angle) * 0.5),
          end: new THREE.Vector3(Math.cos(angle + Math.PI) * 0.5, y, Math.sin(angle + Math.PI) * 0.5)
        });
      }
    }
    
    return { points1, points2, connectors };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.2;
    groupRef.current.position.y = Math.sin(time * 0.3) * 0.3;
  });

  return (
    <group ref={groupRef} position={[-4, 0, -4]} scale={0.6}>
      {/* First helix strand */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={helixPoints.points1.length}
            array={new Float32Array(helixPoints.points1.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#1e6fd9" transparent opacity={0.15} />
      </line>
      
      {/* Second helix strand */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={helixPoints.points2.length}
            array={new Float32Array(helixPoints.points2.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#1e6fd9" transparent opacity={0.15} />
      </line>
      
      {/* Connector rungs */}
      {helixPoints.connectors.map((connector, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                connector.start.x, connector.start.y, connector.start.z,
                connector.end.x, connector.end.y, connector.end.z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#1e6fd9" transparent opacity={0.1} />
        </line>
      ))}
    </group>
  );
}

// Heartbeat/pulse line (medical related)
function PulseLine() {
  const lineRef = useRef();
  
  const pulsePoints = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 100; i++) {
      const x = (i / 100) * 8 - 4;
      let y = 0;
      
      // Create ECG-like pulse pattern
      const normalizedX = (i % 25) / 25;
      if (normalizedX > 0.3 && normalizedX < 0.35) {
        y = -0.3;
      } else if (normalizedX > 0.35 && normalizedX < 0.4) {
        y = 1.2;
      } else if (normalizedX > 0.4 && normalizedX < 0.45) {
        y = -0.5;
      } else if (normalizedX > 0.45 && normalizedX < 0.5) {
        y = 0.3;
      }
      
      points.push(new THREE.Vector3(x, y, 0));
    }
    return points;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    lineRef.current.position.x = Math.sin(time * 0.5) * 0.5;
    lineRef.current.position.y = Math.cos(time * 0.3) * 0.2 + 2.5;
  });

  return (
    <group ref={lineRef} position={[0, 2.5, -5]} scale={0.8}>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={pulsePoints.length}
            array={new Float32Array(pulsePoints.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#1e6fd9" transparent opacity={0.15} />
      </line>
    </group>
  );
}

// Small floating icosahedrons scattered around
function SmallIcosahedrons() {
  const groupRef = useRef();
  
  const positions = useMemo(() => [
    { pos: [4, 2, -6], scale: 0.3, speed: 1.2 },
    { pos: [-5, -1, -5], scale: 0.25, speed: 0.9 },
    { pos: [2, -2, -4], scale: 0.2, speed: 1.1 },
    { pos: [-2, 3, -7], scale: 0.35, speed: 0.8 },
  ], []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    groupRef.current.children.forEach((mesh, i) => {
      const { speed } = positions[i];
      mesh.rotation.x = time * 0.2 * speed;
      mesh.rotation.y = time * 0.3 * speed;
      mesh.position.y = positions[i].pos[1] + Math.sin(time * 0.5 * speed) * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {positions.map((item, i) => (
        <mesh key={i} position={item.pos} scale={item.scale}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial
            color="#1e6fd9"
            wireframe
            transparent
            opacity={0.1}
          />
        </mesh>
      ))}
    </group>
  );
}

const ThreeBackground = () => {
  return (
    <div className={classes["three-container"]}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <FloatingParticles count={150} />
        <FloatingMesh />
        <SecondaryMesh />
        <DNAHelix />
        <PulseLine />
        <SmallIcosahedrons />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
