"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const HexagonGrid = ({ count = 20 }) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const color = useMemo(() => new THREE.Color(), []);

    // Grid parameters
    const hexRadius = 0.5;
    const hexWidth = hexRadius * 2;
    const hexHeight = Math.sqrt(3) * hexRadius;
    const gap = 0.1;

    // Generate grid positions
    const particles = useMemo(() => {
        const temp = [];
        // Create a grid centered at (0,0)
        for (let i = -count; i < count; i++) {
            for (let j = -count; j < count; j++) {
                let x = (i * (hexWidth + gap)) + ((j % 2) * ((hexWidth + gap) / 2));
                let y = j * (hexHeight + gap) * 0.75;

                // Add some randomness to Z for initial variation
                // const z = (Math.random() - 0.5) * 0.5;
                const z = 0;

                temp.push({ x, y, z, initialZ: z, phase: Math.random() * Math.PI * 2 });
            }
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();

        particles.forEach((particle, i) => {
            const { x, y, initialZ, phase } = particle;

            // Pulse effect calculation
            // Combine time, position, and random phase for organic movement
            const pulse = Math.sin(time * 2 + x * 0.5 + y * 0.5 + phase);

            // Update position (z-axis movement)
            // dummy.position.set(x, y, initialZ + pulse * 0.2);
            dummy.position.set(x, y, initialZ);

            // Rotation (slight tilt based on pulse)
            dummy.rotation.x = pulse * 0.1;
            dummy.rotation.y = pulse * 0.1;

            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);

            // Update color
            // Base color: Dark Purple/Blue
            // Pulse color: Cyan/Bright Purple
            const intensity = (pulse + 1) / 2; // 0 to 1

            // Mix colors
            // Low intensity: #1e1b4b (Dark Indigo)
            // High intensity: #a855f7 (Purple) or #06b6d4 (Cyan) randomly

            if (i % 2 === 0) {
                color.set("#1e1b4b").lerp(new THREE.Color("#a855f7"), intensity * 0.5);
            } else {
                color.set("#1e1b4b").lerp(new THREE.Color("#06b6d4"), intensity * 0.5);
            }

            meshRef.current!.setColorAt(i, color);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
        if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
    });

    return (
        <instancedMesh
            ref={meshRef}
            args={[undefined, undefined, particles.length]}
            rotation={[-Math.PI / 3, 0, 0]} // Tilt the whole grid
            position={[0, 5, -5]}
        >
            <cylinderGeometry args={[0.5, 0.5, 0.2, 6]} />
            <meshStandardMaterial
                transparent
                opacity={0.9}
                metalness={0.6}
                roughness={0.2}
                emissive="#1e1b4b"
                emissiveIntensity={0.2}
            />
        </instancedMesh>
    );
};

const Lights = () => {
    return (
        <>
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#a855f7" />
            <pointLight position={[-10, -10, -10]} intensity={2} color="#06b6d4" />
            <directionalLight position={[0, 5, 5]} intensity={1} />
        </>
    );
};

interface HexagonBackgroundProps {
    className?: string;
}

const HexagonBackground = ({ className = "absolute inset-0 z-0" }: HexagonBackgroundProps) => {
    return (
        <div className={className}>
            <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
                <Lights />
                <HexagonGrid count={17} />
                <fog attach="fog" args={["#030014", 10, 30]} />
            </Canvas>
        </div>
    );
};

export default HexagonBackground;
