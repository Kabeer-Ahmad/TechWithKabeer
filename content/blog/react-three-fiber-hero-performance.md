---
title: "A 3D Hero That Doesn't Wreck Performance: Building a Particle Orb with React Three Fiber"
excerpt: "Six thousand particles, a custom shader, mouse and scroll reactions — and a page that still feels fast. How I built the 3D orb on my portfolio, and the gotchas along the way."
tags: ["Three.js", "React Three Fiber", "WebGL", "Shaders", "Performance", "Framer Motion"]
---

The hero of my portfolio has a glowing sphere of particles behind my ID card. It breathes, tilts towards your cursor, and scatters as you scroll away. It's built with **React Three Fiber** and a small custom shader — and it was designed from the start not to make the site feel heavy.

Here's how it works and what I learned.

## The idea: one draw call

Rendering 6,000 separate meshes would be slow. Instead the whole orb is a single `THREE.Points` object: one geometry, one material, one draw call. All the motion happens on the GPU in the vertex shader.

The points are laid out on a **Fibonacci sphere**, which spreads them evenly without clumping at the poles:

```ts
const golden = Math.PI * (3 - Math.sqrt(5));
for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    positions.set([Math.cos(t) * r, y, Math.sin(t) * r], i * 3);
}
```

## Motion lives in the shader

In the vertex shader, each particle is pushed in and out along the sphere using 3D simplex noise that drifts over time. That's the "breathing". A second, finer noise layer adds shimmer, and a `uScroll` uniform pushes particles outward as the hero leaves the screen:

```glsl
float n = snoise(position * 1.35 + vec3(0.0, uTime * 0.18, uTime * 0.12));
vec3 p = position * (1.0 + n * 0.16);
p *= 1.0 + uScroll * (0.6 + aRandom * 1.6);   // scatter on scroll
```

The fragment shader draws a soft circle per point and blends two brand colours based on the noise value, with additive blending for the glow.

## JavaScript does almost nothing per frame

Each frame, the only JavaScript work is updating three numbers: time, a smoothed scroll value, and the group's rotation easing towards the mouse position. No React state changes, no re-renders. I update the uniforms through a ref to the material, which is the idiomatic React Three Fiber pattern — and it keeps the React Compiler's lint rules happy too.

## The performance rules

1. **Load it after first paint.** The 3D component is imported with `next/dynamic` and `ssr: false`, so the page text and layout render instantly and three.js arrives a moment later.
2. **Stop rendering when it's off-screen.** An `IntersectionObserver` switches the canvas `frameloop` to `"never"` once the hero scrolls away. A WebGL scene you can't see shouldn't use your battery.
3. **Cap the pixel ratio.** `dpr={[1, 1.75]}` keeps it sharp on retina screens without rendering 9× the pixels on a 3× phone.
4. **Fewer particles on phones.** Mobile gets about 2,600 points instead of 6,000. Nobody can tell the difference at that size.
5. **Respect reduced motion.** If the visitor's system asks for reduced motion, the orb isn't rendered at all.

## Two gotchas worth knowing

**The canvas measured itself mid-animation.** I faded and scaled the orb in with Framer Motion. React Three Fiber measures its container with `getBoundingClientRect`, which includes CSS transforms — so it measured the container at 60% size during the scale-in and rendered a small canvas. The fix was to stop scaling the canvas's parent with CSS and scale the 3D group inside the scene instead.

**It made phones zoom out.** On a 375px-wide phone, the 560px orb container stuck out of the viewport, and mobile browsers responded by zooming the whole page out to fit it. Capping the size at `min(560px, 100vw)` fixed it instantly. Always check your 3D on a real phone-sized viewport.

## Was it worth it?

A 3D hero is decoration — it has to earn its place by being fast and by not getting in the way of the content. Built this way, it costs one draw call while it's visible and nothing when it isn't. That's a trade I'm happy with.
