"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Line } from "@react-three/drei";
import * as THREE from "three";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

const PlexusParticles = ({ count = 100 }) => {
    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);

    // Generate random points
    const [positions, velocities] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 10; // x
            pos[i * 3 + 1] = (Math.random() - 0.5) * 10; // y
            pos[i * 3 + 2] = (Math.random() - 0.5) * 5;  // z

            vel[i * 3] = (Math.random() - 0.5) * 0.01;
            vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
            vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
        }
        return [pos, vel];
    }, [count]);

    // Buffer geometry for lines
    const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);

    useFrame(() => {
        if (!pointsRef.current) return;

        // Update positions
        for (let i = 0; i < count; i++) {
            positions[i * 3] += velocities[i * 3];
            positions[i * 3 + 1] += velocities[i * 3 + 1];
            positions[i * 3 + 2] += velocities[i * 3 + 2];

            // Bounce off boundaries
            if (Math.abs(positions[i * 3]) > 5) velocities[i * 3] *= -1;
            if (Math.abs(positions[i * 3 + 1]) > 5) velocities[i * 3 + 1] *= -1;
            if (Math.abs(positions[i * 3 + 2]) > 2.5) velocities[i * 3 + 2] *= -1;
        }

        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Update connections
        if (linesRef.current) {
            const connections = [];
            const connectionDistance = 1.5;

            for (let i = 0; i < count; i++) {
                for (let j = i + 1; j < count; j++) {
                    const dx = positions[i * 3] - positions[j * 3];
                    const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                    const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < connectionDistance) {
                        connections.push(
                            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                        );
                    }
                }
            }

            lineGeometry.setAttribute(
                'position',
                new THREE.Float32BufferAttribute(connections, 3)
            );
            linesRef.current.geometry = lineGeometry;
        }
    });

    return (
        <group>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={count}
                        array={positions}
                        itemSize={3}
                        args={[positions, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.03}
                    color="#a855f7"
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                />
            </points>
            <lineSegments ref={linesRef}>
                <lineBasicMaterial
                    color="#22d3ee"
                    transparent
                    opacity={0.15}
                    linewidth={1}
                />
            </lineSegments>
        </group>
    );
};

interface PlexusBackgroundProps {
    className?: string;
}

const PlexusBackground = ({ className = "absolute inset-0 z-0" }: PlexusBackgroundProps) => {
    return (
        <div className={className}>
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <PlexusParticles count={80} />
            </Canvas>
        </div>
    );
};

export default PlexusBackground;
