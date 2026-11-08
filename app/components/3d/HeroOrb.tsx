"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * A breathing sphere of particles. Noise displaces the surface, the cursor
 * tilts it, and scrolling past the hero scatters the particles outward.
 */

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uScroll;
uniform float uPixelRatio;
attribute float aRandom;
varying float vAlpha;
varying float vHeat;
${NOISE}
void main(){
  vec3 p = position;
  float n = snoise(p * 1.35 + vec3(0.0, uTime * 0.18, uTime * 0.12));
  float n2 = snoise(p * 3.2 - uTime * 0.25);
  p *= 1.0 + n * 0.16 + n2 * 0.03;
  // scatter outward with scroll
  p *= 1.0 + uScroll * (0.6 + aRandom * 1.6);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float size = 1.4 + aRandom * 2.4 + max(n, 0.0) * 2.0;
  gl_PointSize = size * uPixelRatio * (6.0 / -mv.z);
  vHeat = smoothstep(-0.2, 0.7, n);
  // back-facing particles dimmer for depth
  vAlpha = (0.25 + 0.75 * smoothstep(-1.2, 1.0, mv.z + 4.2)) * (1.0 - uScroll * 0.9);
}`;

const fragmentShader = /* glsl */ `
varying float vAlpha;
varying float vHeat;
uniform vec3 uColorA;
uniform vec3 uColorB;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float soft = smoothstep(0.5, 0.0, d);
  vec3 col = mix(uColorA, uColorB, vHeat * 0.55);
  gl_FragColor = vec4(col, soft * vAlpha);
}`;

/** Small seeded PRNG so the particle layout is deterministic (and render stays pure). */
const mulberry32 = (seed: number) => () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const Particles = ({ count, pixelRatio }: { count: number; pixelRatio: number }) => {
    const group = useRef<THREE.Group>(null);
    const material = useRef<THREE.ShaderMaterial>(null);
    const mouse = useRef({ x: 0, y: 0 });

    const { geometry, uniforms } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const rnd = new Float32Array(count);
        const random = mulberry32(7);
        const golden = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < count; i++) {
            // Fibonacci sphere for an even distribution
            const y = 1 - (i / (count - 1)) * 2;
            const r = Math.sqrt(1 - y * y);
            const t = golden * i;
            const jitter = 1 + (random() - 0.5) * 0.04;
            pos[i * 3] = Math.cos(t) * r * 1.5 * jitter;
            pos[i * 3 + 1] = y * 1.5 * jitter;
            pos[i * 3 + 2] = Math.sin(t) * r * 1.5 * jitter;
            rnd[i] = random();
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        g.setAttribute("aRandom", new THREE.BufferAttribute(rnd, 1));
        return {
            geometry: g,
            uniforms: {
                uTime: { value: 0 },
                uScroll: { value: 0 },
                uPixelRatio: { value: pixelRatio },
                uColorA: { value: new THREE.Color("#b4a1ff") },
                uColorB: { value: new THREE.Color("#d4ff4f") },
            },
        };
    }, [count, pixelRatio]);

    useEffect(() => {
        const onMove = (e: PointerEvent) => {
            mouse.current.x = e.clientX / window.innerWidth - 0.5;
            mouse.current.y = e.clientY / window.innerHeight - 0.5;
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => {
            window.removeEventListener("pointermove", onMove);
            geometry.dispose();
        };
    }, [geometry]);

    useFrame((_, delta) => {
        const m = material.current;
        const g = group.current;
        if (!m || !g) return;
        const u = m.uniforms;
        u.uTime.value += delta;
        const target = Math.min(window.scrollY / window.innerHeight, 1);
        u.uScroll.value += (target - u.uScroll.value) * 0.08;
        // ease in from 0.55 on load, swell slightly as the hero scrolls away
        const targetScale = 1 + u.uScroll.value * 0.25;
        const sc = g.scale.x + (targetScale - g.scale.x) * 0.035;
        g.scale.setScalar(sc);
        g.rotation.y += delta * 0.06;
        g.rotation.x += (mouse.current.y * 0.5 - g.rotation.x) * 0.04;
        g.rotation.z += (-mouse.current.x * 0.3 - g.rotation.z) * 0.04;
    });

    return (
        <group ref={group} scale={0.55}>
            <points geometry={geometry}>
                <shaderMaterial
                    ref={material}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
};

export default function HeroOrb() {
    const wrap = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(true);
    const [count] = useState(() => (window.innerWidth < 768 ? 2600 : 6000));
    const [pixelRatio] = useState(() => Math.min(window.devicePixelRatio, 1.75));

    // Stop rendering once the hero is off-screen.
    useEffect(() => {
        const el = wrap.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div ref={wrap} className="h-full w-full">
            <Canvas
                frameloop={visible ? "always" : "never"}
                dpr={[1, 1.75]}
                camera={{ position: [0, 0, 4.2], fov: 45 }}
                gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
            >
                <Particles count={count} pixelRatio={pixelRatio} />
            </Canvas>
        </div>
    );
}
