#!/usr/bin/env node
/**
 * Generates on-brand cover images for the posts in content/blog/.
 *
 *   node scripts/generate-blog-covers.mjs
 *
 * Writes content/blog/covers/<slug>.png (1600×900). Each cover has the site's
 * dark palette, a short two-line title and a topic illustration drawn in SVG.
 */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const root = new URL("..", import.meta.url).pathname;
const outDir = join(root, "content/blog/covers");
mkdirSync(outDir, { recursive: true });

const W = 1600;
const H = 900;
const C = { ink: "#08080a", surface: "#111116", line: "rgba(255,255,255,0.08)", fg: "#ededef", muted: "#a1a1aa", dim: "#6b6b75", accent: "#b4a1ff", deep: "#7c5cff", signal: "#d4ff4f", red: "#ff6b6b" };
const SANS = "Helvetica Neue, Helvetica, Arial, sans-serif";
const SERIF = "Georgia, Times New Roman, serif";
const MONO = "Menlo, Monaco, Courier New, monospace";

// Deterministic randomness so covers are reproducible.
const rng = (seed) => () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ---------- motifs (drawn in the right half, centred near 1210, 450) ----------

const phone = (x, y, w, h, inner = "") => `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="46" fill="#15151b" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
  <rect x="${x + 10}" y="${y + 10}" width="${w - 20}" height="${h - 20}" rx="38" fill="#0b0a16"/>
  <rect x="${x + w / 2 - 45}" y="${y + 22}" width="90" height="24" rx="12" fill="#000"/>
  ${inner}`;

const motifs = {
    "on-device-ai-apple-foundation-models": () => {
        const r = rng(3);
        const dots = Array.from({ length: 70 }, () => {
            const a = r() * Math.PI * 2, d = 230 + r() * 160;
            return `<circle cx="${1210 + Math.cos(a) * d}" cy="${450 + Math.sin(a) * d * 0.8}" r="${1 + r() * 2.5}" fill="${r() > 0.7 ? C.signal : C.accent}" opacity="${0.25 + r() * 0.6}"/>`;
        }).join("");
        return `${dots}${phone(1080, 150, 260, 540, `
          <circle cx="1210" cy="420" r="120" fill="url(#orb)" filter="url(#glow)"/>
          <circle cx="1210" cy="420" r="80" fill="url(#orbCore)"/>
          <text x="1210" y="600" text-anchor="middle" font-family="${MONO}" font-size="16" fill="${C.muted}" letter-spacing="2">ON DEVICE · OFFLINE</text>
          <g transform="translate(1188,630)"><rect x="4" y="16" width="36" height="28" rx="6" fill="${C.signal}"/><path d="M10 16 v-6 a12 12 0 0 1 24 0 v6" fill="none" stroke="${C.signal}" stroke-width="4"/></g>`)}`;
    },

    "mcp-default-way-to-connect-agents": () => {
        const labels = ["database", "crm", "files", "email", "calendar", "search"];
        const nodes = labels.map((l, i) => {
            const a = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
            const x = 1210 + Math.cos(a) * 260, y = 450 + Math.sin(a) * 250;
            return `<line x1="1210" y1="450" x2="${x}" y2="${y}" stroke="${C.accent}" stroke-opacity="0.45" stroke-width="2" stroke-dasharray="6 8"/>
              <g transform="translate(${x},${y})"><rect x="-70" y="-28" width="140" height="56" rx="16" fill="${C.surface}" stroke="rgba(255,255,255,0.14)"/>
              <circle cx="-44" cy="0" r="6" fill="${i % 2 ? C.signal : C.accent}"/>
              <text x="-28" y="6" font-family="${MONO}" font-size="18" fill="${C.fg}">${l}</text></g>`;
        }).join("");
        return `${nodes}
          <circle cx="1210" cy="450" r="110" fill="url(#orb)" filter="url(#glow)" opacity="0.8"/>
          <rect x="1135" y="395" width="150" height="110" rx="28" fill="${C.ink}" stroke="${C.accent}" stroke-width="3"/>
          <text x="1210" y="465" text-anchor="middle" font-family="${MONO}" font-size="40" font-weight="bold" fill="${C.fg}">MCP</text>`;
    },

    "ai-voice-agents-n8n-production": () => {
        const r = rng(9);
        const bars = Array.from({ length: 44 }, (_, i) => {
            const x = 930 + i * 13;
            const env = Math.sin((i / 43) * Math.PI);
            const h = 20 + env * (60 + r() * 220);
            return `<rect x="${x}" y="${450 - h / 2}" width="7" height="${h}" rx="3.5" fill="${i > 18 && i < 26 ? C.signal : C.accent}" opacity="${0.35 + env * 0.65}"/>`;
        }).join("");
        const rings = [150, 220, 290].map((rad, i) => `<circle cx="1210" cy="450" r="${rad}" fill="none" stroke="${C.accent}" stroke-opacity="${0.22 - i * 0.06}" stroke-width="2"/>`).join("");
        return `${rings}${bars}
          <g transform="translate(1210,180)"><rect x="-120" y="-30" width="240" height="60" rx="30" fill="${C.surface}" stroke="rgba(255,255,255,0.14)"/>
          <circle cx="-88" cy="0" r="8" fill="${C.signal}"/><text x="-68" y="7" font-family="${MONO}" font-size="20" fill="${C.fg}">00:42 · live</text></g>
          <g transform="translate(1210,720)"><rect x="-150" y="-28" width="300" height="56" rx="16" fill="${C.surface}" stroke="rgba(255,255,255,0.14)"/>
          <text x="0" y="7" text-anchor="middle" font-family="${MONO}" font-size="18" fill="${C.muted}">book_appointment()</text></g>`;
    },

    "virtual-try-on-diffusion-production": () => {
        const shirt = "M1090 250 L1160 210 Q1210 245 1260 210 L1330 250 L1385 340 L1335 370 L1310 330 L1310 660 L1110 660 L1110 330 L1085 370 L1035 340 Z";
        const stripes = Array.from({ length: 14 }, (_, i) => `<line x1="1000" y1="${230 + i * 34}" x2="1420" y2="${200 + i * 34}" stroke="${["#7c5cff", "#b4a1ff", "#5ee1c2", "#d4ff4f"][i % 4]}" stroke-width="10" opacity="0.55"/>`).join("");
        const grid = Array.from({ length: 9 }, (_, i) => `<line x1="${1080 + i * 30}" y1="200" x2="${1080 + i * 30}" y2="680" stroke="#fff" stroke-opacity="0.08"/>`).join("");
        return `<defs><clipPath id="shirt"><path d="${shirt}"/></clipPath></defs>
          <path d="M1210 150 q-14 0 -14 14 q0 12 14 16 l-150 70 h300 l-150 -70" fill="none" stroke="${C.muted}" stroke-width="5" stroke-linejoin="round"/>
          <g clip-path="url(#shirt)"><rect x="1000" y="180" width="420" height="500" fill="#1b1730"/>${stripes}${grid}</g>
          <path d="${shirt}" fill="none" stroke="${C.accent}" stroke-width="3"/>
          <g font-family="${MONO}" font-size="17">
            <rect x="900" y="300" width="130" height="40" rx="10" fill="${C.surface}" stroke="rgba(255,255,255,0.14)"/><text x="918" y="326" fill="${C.fg}">DensePose</text>
            <rect x="1390" y="450" width="96" height="40" rx="10" fill="${C.surface}" stroke="rgba(255,255,255,0.14)"/><text x="1408" y="476" fill="${C.fg}">SCHP</text>
            <rect x="1130" y="720" width="160" height="40" rx="10" fill="${C.surface}" stroke="${C.signal}"/><text x="1148" y="746" fill="${C.signal}">diffusion ✓</text>
          </g>`;
    },

    "ai-coding-agents-one-year-later": () => {
        const lines = [
            [0, 220, C.accent], [1, 340, C.muted], [1, 260, C.muted], [0, 180, C.accent],
            [2, 300, C.signal, "+"], [2, 240, C.signal, "+"], [3, 280, C.red, "−"], [1, 200, C.muted], [0, 120, C.accent],
        ];
        const rows = lines.map(([ind, w, col, mark], i) => {
            const y = 300 + i * 42;
            const bg = mark ? `<rect x="942" y="${y - 22}" width="536" height="36" fill="${mark === "+" ? "rgba(212,255,79,0.07)" : "rgba(255,107,107,0.08)"}"/>` : "";
            return `${bg}<text x="958" y="${y + 4}" font-family="${MONO}" font-size="18" fill="${C.dim}">${mark ?? i + 1}</text>
              <rect x="${1000 + ind * 28}" y="${y - 9}" width="${w}" height="14" rx="7" fill="${col}" opacity="0.85"/>`;
        }).join("");
        return `<rect x="940" y="190" width="540" height="520" rx="22" fill="${C.surface}" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
          <line x1="940" y1="250" x2="1480" y2="250" stroke="rgba(255,255,255,0.08)"/>
          <circle cx="972" cy="220" r="7" fill="#333"/><circle cx="996" cy="220" r="7" fill="#333"/><circle cx="1020" cy="220" r="7" fill="#333"/>
          <text x="1460" y="227" text-anchor="end" font-family="${MONO}" font-size="16" fill="${C.dim}">agent · plan → edit → verify</text>
          ${rows}
          <rect x="1000" y="676" width="12" height="22" fill="${C.accent}"/>
          <g transform="translate(1370,660)"><rect x="-90" y="-26" width="180" height="52" rx="26" fill="${C.signal}"/><text x="0" y="7" text-anchor="middle" font-family="${MONO}" font-size="18" font-weight="bold" fill="${C.ink}">tests ✓ pass</text></g>`;
    },

    "nextjs-16-what-changed-in-practice": () => {
        const layer = (y, label, col, op) => `<g transform="translate(1210,${y})">
            <path d="M0 -70 L230 0 L0 70 L-230 0 Z" fill="${col}" fill-opacity="${op}" stroke="${col}" stroke-opacity="0.8" stroke-width="2"/>
            <text x="250" y="8" font-family="${MONO}" font-size="20" fill="${C.fg}">${label}</text></g>`;
        return `<text x="1500" y="830" text-anchor="end" font-family="${SERIF}" font-style="italic" font-size="420" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="2">16</text>
          ${layer(620, "turbopack", C.deep, 0.18)}${layer(480, "use cache", C.accent, 0.16)}${layer(340, "proxy.ts", C.signal, 0.14)}
          <line x1="1210" y1="140" x2="1210" y2="270" stroke="${C.signal}" stroke-width="3" stroke-dasharray="4 8"/>
          <circle cx="1210" cy="140" r="9" fill="${C.signal}"/>`;
    },

    "tailwind-v4-migration-gotchas": () => {
        const tokens = [["ink", C.ink], ["surface", "#16161b"], ["fg", C.fg], ["muted", C.muted], ["accent", C.accent], ["deep", C.deep], ["signal", C.signal], ["dim", C.dim], ["line", "#26262c"]];
        const sw = tokens.map(([n, col], i) => {
            const x = 960 + (i % 3) * 180, y = 200 + Math.floor(i / 3) * 180;
            return `<rect x="${x}" y="${y}" width="150" height="110" rx="20" fill="${col}" stroke="rgba(255,255,255,0.16)" stroke-width="2"/>
              <text x="${x}" y="${y + 140}" font-family="${MONO}" font-size="16" fill="${C.muted}">--color-${n}</text>`;
        }).join("");
        return `<text x="960" y="160" font-family="${MONO}" font-size="20" fill="${C.accent}">@theme {</text>${sw}
          <text x="960" y="770" font-family="${MONO}" font-size="20" fill="${C.accent}">}</text>`;
    },

    "react-three-fiber-hero-performance": () => {
        const n = 900, pts = [];
        const golden = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < n; i++) {
            const y = 1 - (i / (n - 1)) * 2, r = Math.sqrt(1 - y * y), t = golden * i;
            const x = Math.cos(t) * r, z = Math.sin(t) * r;
            const rx = x * Math.cos(0.5) - z * Math.sin(0.5), rz = x * Math.sin(0.5) + z * Math.cos(0.5);
            const ry = y * Math.cos(0.35) - rz * Math.sin(0.35), rz2 = y * Math.sin(0.35) + rz * Math.cos(0.35);
            const s = 1 + 0.09 * Math.sin(x * 5 + y * 4);
            const front = (rz2 + 1) / 2;
            pts.push(`<circle cx="${(1210 + rx * 300 * s).toFixed(1)}" cy="${(450 + ry * 300 * s).toFixed(1)}" r="${(1.2 + front * 3).toFixed(2)}" fill="${front > 0.85 && i % 3 === 0 ? C.signal : C.accent}" opacity="${(0.15 + front * 0.85).toFixed(2)}"/>`);
        }
        return `<circle cx="1210" cy="450" r="260" fill="url(#orb)" opacity="0.35" filter="url(#glow)"/>${pts.join("")}
          <g transform="translate(1210,820)"><rect x="-130" y="-26" width="260" height="52" rx="26" fill="${C.surface}" stroke="rgba(255,255,255,0.14)"/>
          <text x="0" y="7" text-anchor="middle" font-family="${MONO}" font-size="18" fill="${C.fg}">1 draw call · 60fps</text></g>`;
    },

    "adaptive-quizzes-llm-spaced-repetition": () => {
        const days = [1, 3, 7, 21];
        const xs = [960, 1080, 1230, 1460];
        const path = `M940 640 C 1060 640, 1100 560, 1180 500 S 1380 300, 1490 260`;
        const marks = days.map((d, i) => {
            const y = [630, 585, 470, 270][i];
            return `<circle cx="${xs[i]}" cy="${y}" r="16" fill="${C.ink}" stroke="${i === 3 ? C.signal : C.accent}" stroke-width="4"/>
              <text x="${xs[i]}" y="${y + 50}" text-anchor="middle" font-family="${MONO}" font-size="20" fill="${C.muted}">day ${d}</text>`;
        }).join("");
        const card = `<g transform="translate(950,170)"><rect width="330" height="210" rx="22" fill="${C.surface}" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
            <rect x="26" y="30" width="220" height="14" rx="7" fill="${C.fg}" opacity="0.8"/>
            ${[0, 1, 2].map((k) => `<rect x="26" y="${70 + k * 42}" width="278" height="32" rx="10" fill="${k === 1 ? "rgba(212,255,79,0.12)" : "rgba(255,255,255,0.04)"}" stroke="${k === 1 ? C.signal : "rgba(255,255,255,0.1)"}"/>
            <rect x="42" y="${82 + k * 42}" width="${[150, 190, 130][k]}" height="9" rx="4.5" fill="${k === 1 ? C.signal : C.muted}" opacity="0.8"/>`).join("")}</g>`;
        return `<path d="${path}" fill="none" stroke="${C.accent}" stroke-opacity="0.6" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/>${marks}${card}`;
    },

    "client-websites-that-sell-2026": () => `
        <rect x="900" y="170" width="520" height="400" rx="22" fill="${C.surface}" stroke="rgba(255,255,255,0.14)" stroke-width="2"/>
        <line x1="900" y1="222" x2="1420" y2="222" stroke="rgba(255,255,255,0.08)"/>
        <circle cx="930" cy="196" r="7" fill="#333"/><circle cx="954" cy="196" r="7" fill="#333"/><circle cx="978" cy="196" r="7" fill="#333"/>
        <rect x="940" y="270" width="300" height="22" rx="11" fill="${C.fg}" opacity="0.85"/>
        <rect x="940" y="306" width="220" height="22" rx="11" fill="${C.fg}" opacity="0.85"/>
        <rect x="940" y="350" width="360" height="12" rx="6" fill="${C.muted}" opacity="0.5"/>
        <rect x="940" y="372" width="300" height="12" rx="6" fill="${C.muted}" opacity="0.5"/>
        <rect x="940" y="420" width="190" height="56" rx="16" fill="${C.signal}"/>
        <text x="1035" y="455" text-anchor="middle" font-family="${SANS}" font-size="20" font-weight="bold" fill="${C.ink}">Book now</text>
        <circle cx="1120" cy="470" r="34" fill="none" stroke="${C.signal}" stroke-opacity="0.5" stroke-width="2"/>
        ${phone(1330, 330, 200, 420, `
          <rect x="1352" y="400" width="130" height="14" rx="7" fill="${C.fg}" opacity="0.8"/>
          <rect x="1352" y="424" width="96" height="14" rx="7" fill="${C.fg}" opacity="0.8"/>
          <rect x="1352" y="610" width="156" height="44" rx="14" fill="${C.signal}"/>
          <rect x="1352" y="664" width="156" height="44" rx="14" fill="none" stroke="${C.accent}"/>`)}
        <g font-family="${MONO}" font-size="17"><rect x="900" y="620" width="240" height="44" rx="12" fill="${C.surface}" stroke="rgba(255,255,255,0.14)"/>
        <text x="920" y="648" fill="${C.muted}">new lead → owner ✉</text></g>`,
};

const COPY = {
    "on-device-ai-apple-foundation-models": ["On-device AI,", "finally practical.", "Apple Intelligence"],
    "mcp-default-way-to-connect-agents": ["MCP: one plug", "for every agent.", "Agentic AI"],
    "ai-voice-agents-n8n-production": ["AI voice agents", "that pick up.", "Automation"],
    "virtual-try-on-diffusion-production": ["Virtual try-on", "in production.", "Computer Vision"],
    "ai-coding-agents-one-year-later": ["A year with", "coding agents.", "Dev Tools"],
    "nextjs-16-what-changed-in-practice": ["Next.js 16", "in practice.", "Web Development"],
    "tailwind-v4-migration-gotchas": ["Tailwind v4,", "CSS-first.", "Frontend"],
    "react-three-fiber-hero-performance": ["A 3D hero", "that stays fast.", "WebGL"],
    "adaptive-quizzes-llm-spaced-repetition": ["Quizzes that", "never repeat.", "EdTech"],
    "client-websites-that-sell-2026": ["Small-business sites", "that sell.", "Web Development"],
};

const cover = (slug) => {
    const [l1, l2, tag] = COPY[slug];
    const size = Math.min(104, Math.floor(760 / (Math.max(l1.length, l2.length) * 0.52)));
    const r = rng(slug.length * 31);
    const stars = Array.from({ length: 40 }, () => `<circle cx="${r() * 820}" cy="${r() * H}" r="${0.6 + r()}" fill="#fff" opacity="${0.05 + r() * 0.12}"/>`).join("");
    const gridV = Array.from({ length: Math.ceil(W / 80) }, (_, i) => `<line x1="${i * 80}" y1="0" x2="${i * 80}" y2="${H}"/>`).join("");
    const gridH = Array.from({ length: Math.ceil(H / 80) }, (_, i) => `<line x1="0" y1="${i * 80}" x2="${W}" y2="${i * 80}"/>`).join("");

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="bgGlow" cx="0.78" cy="0.45" r="0.6"><stop offset="0" stop-color="${C.deep}" stop-opacity="0.35"/><stop offset="1" stop-color="${C.deep}" stop-opacity="0"/></radialGradient>
    <radialGradient id="bgGlow2" cx="0.05" cy="1" r="0.5"><stop offset="0" stop-color="${C.signal}" stop-opacity="0.06"/><stop offset="1" stop-color="${C.signal}" stop-opacity="0"/></radialGradient>
    <radialGradient id="gridMask" cx="0.75" cy="0.45" r="0.55"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
    <mask id="m"><rect width="${W}" height="${H}" fill="url(#gridMask)"/></mask>
    <radialGradient id="orb" cx="0.35" cy="0.3" r="0.75"><stop offset="0" stop-color="#e6dcff"/><stop offset="0.45" stop-color="${C.accent}"/><stop offset="1" stop-color="${C.deep}" stop-opacity="0"/></radialGradient>
    <radialGradient id="orbCore" cx="0.35" cy="0.3" r="0.7"><stop offset="0" stop-color="#f1ecff"/><stop offset="0.5" stop-color="#8b7bff"/><stop offset="1" stop-color="#3b2a9a"/></radialGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="28"/></filter>
  </defs>
  <rect width="${W}" height="${H}" fill="${C.ink}"/>
  <rect width="${W}" height="${H}" fill="url(#bgGlow)"/>
  <rect width="${W}" height="${H}" fill="url(#bgGlow2)"/>
  <g stroke="rgba(255,255,255,0.05)" stroke-width="1" mask="url(#m)">${gridV}${gridH}</g>
  ${stars}
  ${motifs[slug]()}
  <g>
    <rect x="130" y="90" width="56" height="56" rx="14" fill="${C.fg}"/>
    <text x="158" y="127" text-anchor="middle" font-family="${MONO}" font-size="20" font-weight="bold" fill="${C.ink}">KA</text>
    <text x="206" y="114" font-family="${SANS}" font-size="22" fill="${C.fg}">Kabeer Ahmad</text>
    <text x="206" y="138" font-family="${MONO}" font-size="14" letter-spacing="3" fill="${C.dim}">TECH WITH KABEER · BLOG</text>
    <circle cx="138" cy="${H - 330}" r="6" fill="${C.accent}"/>
    <text x="156" y="${H - 324}" font-family="${MONO}" font-size="18" letter-spacing="4" fill="${C.muted}">${esc(tag.toUpperCase())}</text>
    <text x="130" y="${H - 210}" font-family="${SANS}" font-size="${size}" font-weight="500" letter-spacing="-3" fill="${C.fg}">${esc(l1)}</text>
    <text x="130" y="${H - 210 + size * 1.05}" font-family="${SERIF}" font-style="italic" font-size="${size}" fill="${C.accent}">${esc(l2)}</text>
  </g>
</svg>`;
};

for (const slug of Object.keys(COPY)) {
    const file = join(outDir, `${slug}.png`);
    await sharp(Buffer.from(cover(slug))).png({ compressionLevel: 9 }).toFile(file);
    console.log("wrote", file.replace(root, ""));
}
