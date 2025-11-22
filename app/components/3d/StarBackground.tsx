"use client";

import { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Points, PointMaterial, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

// 1. Twinkling Star Shader Material
const TwinklingStarMaterial = shaderMaterial(
    {
        uTime: 0,
        uColor: new THREE.Color("white"),
        uSize: 10.0, // Base size
        uPixelRatio: 2 // Default pixel ratio
    },
    // Vertex Shader
    `
    uniform float uTime;
    uniform float uSize;
    uniform float uPixelRatio;
    attribute float aScale;
    attribute float aSpeed;
    varying float vAlpha;

    void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        
        // Twinkle effect based on time and random speed
        float twinkle = sin(uTime * aSpeed + position.x * 100.0) * 0.5 + 0.5;
        vAlpha = twinkle;

        gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
    }
    `,
    // Fragment Shader
    `
    uniform vec3 uColor;
    varying float vAlpha;

    void main() {
        // Circular particle
        float r = distance(gl_PointCoord, vec2(0.5));
        if (r > 0.5) discard;

        // Soft edge
        float glow = 1.0 - (r * 2.0);
        glow = pow(glow, 1.5);

        gl_FragColor = vec4(uColor, vAlpha * glow);
    }
    `
);

extend({ TwinklingStarMaterial });

// Add type definition
declare global {
    namespace JSX {
        interface IntrinsicElements {
            twinklingStarMaterial: any;
        }
    }
}

const Stars = (props: any) => {
    const ref = useRef<any>(null);
    const materialRef = useRef<any>(null);

    const [sphere] = useState(() => {
        const positions = random.inSphere(new Float32Array(props.count || 5000), { radius: 1.2 });
        // Ensure no NaN
        for (let i = 0; i < positions.length; i++) {
            if (isNaN(positions[i])) positions[i] = 0;
        }
        return positions;
    });

    // Generate random attributes for twinkling
    const [attributes] = useState(() => {
        const count = props.count || 5000;
        const scales = new Float32Array(count);
        const speeds = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            scales[i] = Math.random();
            speeds[i] = 1.0 + Math.random() * 3.0; // Random twinkling speed
        }
        return { scales, speeds };
    });

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / (props.rotationSpeed || 10);
            ref.current.rotation.y -= delta / (props.rotationSpeed ? props.rotationSpeed * 1.5 : 15);
        }
        if (materialRef.current) {
            materialRef.current.uTime = state.clock.getElapsedTime();
            materialRef.current.uPixelRatio = Math.min(window.devicePixelRatio, 2);
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
                {/* @ts-ignore */}
                <twinklingStarMaterial
                    ref={materialRef}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    uSize={props.size || 15.0}
                    uColor={new THREE.Color(props.color || "white")}
                />
                {/* Pass attributes to geometry */}
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={sphere.length / 3}
                        array={sphere}
                        itemSize={3}
                        args={[sphere, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-aScale"
                        count={attributes.scales.length}
                        array={attributes.scales}
                        itemSize={1}
                        args={[attributes.scales, 1]}
                    />
                    <bufferAttribute
                        attach="attributes-aSpeed"
                        count={attributes.speeds.length}
                        array={attributes.speeds}
                        itemSize={1}
                        args={[attributes.speeds, 1]}
                    />
                </bufferGeometry>
            </Points>
        </group>
    );
};

// 2. Shooting Star Component
const ShootingStar = () => {
    const ref = useRef<THREE.Mesh>(null);
    const [active, setActive] = useState(false);

    // Reset shooting star position
    const reset = () => {
        if (!ref.current) return;
        const x = (Math.random() - 0.5) * 2;
        const y = (Math.random() - 0.5) * 2;
        const z = (Math.random() - 0.5) * 2;
        ref.current.position.set(x, y, z);

        // Random direction
        const dirX = (Math.random() - 0.5) * 2;
        const dirY = (Math.random() - 0.5) * 2;
        ref.current.userData = {
            velocity: new THREE.Vector3(dirX, dirY, 0).normalize().multiplyScalar(2),
            life: 1.0
        };
        setActive(true);
    };

    useFrame((state, delta) => {
        // Randomly trigger shooting star
        if (!active && Math.random() < 0.005) { // 0.1% chance per frame (reduced for calm vibe)
            reset();
        }

        if (active && ref.current) {
            ref.current.position.add(ref.current.userData.velocity.clone().multiplyScalar(delta));
            ref.current.userData.life -= delta * 1.5;

            // Fade out
            const material = ref.current.material as THREE.MeshBasicMaterial;
            material.opacity = ref.current.userData.life;

            if (ref.current.userData.life <= 0) {
                setActive(false);
                material.opacity = 0;
            }
        }
    });

    return (
        <mesh ref={ref} scale={[0.1, 0.1, 0.1]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#a855f7" transparent opacity={0} />
            {/* Trail could be added here with Trail component from drei if desired */}
        </mesh>
    );
};

const StarBackground = () => {
    return (
        <group>
            {/* Layer 1: Distant, very small, very slow */}
            <Stars count={1500} size={3.5} rotationSpeed={60} color="#a855f7" />

            {/* Layer 2: Closer, slightly larger, slow */}
            <Stars count={500} size={3.5} rotationSpeed={50} color="#ffffff" />

            {/* Layer 3: Cyan accents, sparse */}
            <Stars count={200} size={3.5} rotationSpeed={55} color="#00ffff" />

            <ShootingStar />
        </group>
    );
};

const StarsCanvas = () => (
    <div className="fixed inset-0 z-[0]">
        <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
                <StarBackground />
            </Suspense>
        </Canvas>
    </div>
);

export default StarsCanvas;
