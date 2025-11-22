"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Plane, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

// Define custom shader material
const GradientWireframeMaterial = shaderMaterial(
    {
        uColor1: new THREE.Color("#00ffff"), // Purple
        uColor2: new THREE.Color("#a855f7"), // Cyan
        uOpacity: 0.5
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    // Fragment Shader
    `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform float uOpacity;
    varying vec2 vUv;
    void main() {
        // Mix colors based on UV y-coordinate
        vec3 color = mix(uColor1, uColor2, vUv.y);
        gl_FragColor = vec4(color, uOpacity);
    }
    `
);

// Extend Three.js with the custom material
extend({ GradientWireframeMaterial });

// Add type definition for the new material
declare global {
    namespace JSX {
        interface IntrinsicElements {
            gradientWireframeMaterial: any;
        }
    }
}

const Terrain = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const noise2D = useMemo(() => createNoise2D(), []);

    // Geometry parameters
    const width = 50;
    const height = 50;
    const widthSegments = 40;
    const heightSegments = 40;

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();
        const geometry = meshRef.current.geometry;
        const positionAttribute = geometry.attributes.position;

        for (let i = 0; i < positionAttribute.count; i++) {
            const x = positionAttribute.getX(i);
            const y = positionAttribute.getY(i);

            // Calculate noise based on position and time for the "flow" effect
            // We move the noise sampling window over time to simulate movement
            const z = noise2D(x * 0.1, y * 0.1 - time * 0.2) * 2;

            positionAttribute.setZ(i, z);
        }

        positionAttribute.needsUpdate = true;

        // Rotate slightly for a better angle
        // meshRef.current.rotation.z = time * 0.05;
    });

    return (
        <group rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -5, -10]}>
            <Plane args={[width, height, widthSegments, heightSegments]} ref={meshRef}>
                {/* @ts-ignore */}
                <gradientWireframeMaterial
                    wireframe
                    transparent
                    side={THREE.DoubleSide}
                    uOpacity={0.3}
                />
            </Plane>
            {/* Second plane for depth/layering */}
            <Plane args={[width, height, widthSegments, heightSegments]} position={[0, 0, -2]} rotation={[0, 0, 0]}>
                {/* @ts-ignore */}
                <gradientWireframeMaterial
                    wireframe
                    transparent
                    side={THREE.DoubleSide}
                    uColor1={new THREE.Color("#22d3ee")}
                    uColor2={new THREE.Color("#a855f7")} // Lighter cyan
                    uOpacity={0.1}
                />
            </Plane>
        </group>
    );
};

const TechBackgroundContent = () => {
    return (
        <>
            <color attach="background" args={["#030014"]} />
            <fog attach="fog" args={["#030014", 5, 30]} />
            <ambientLight intensity={0.5} />
            <Terrain />
        </>
    );
};

interface TechBackgroundProps {
    className?: string;
}

const TechBackground = ({ className = "fixed inset-0 z-[0]" }: TechBackgroundProps) => {
    return (
        <div className={className}>
            <Canvas camera={{ position: [0, 2, 5], fov: 60 }}>
                <TechBackgroundContent />
            </Canvas>
        </div>
    );
};

export default TechBackground;
