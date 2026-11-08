---
title: "Tailwind CSS v4: CSS-First Config, Design Tokens, and the One Bug That Cost Me an Hour"
excerpt: "No more tailwind.config.js, tokens live in CSS, and a build pipeline that rewrites your CSS for you. Notes from moving my projects to Tailwind v4."
tags: ["Tailwind CSS", "CSS", "Design Systems", "Frontend", "Web Development"]
---

I've moved every active project — this portfolio included — to **Tailwind CSS v4**. It's a genuinely better tool, but it's a different shape from v3, and a couple of its behaviours surprised me. Here's what I wish I'd known on day one.

## Configuration moved into CSS

There's no `tailwind.config.js` by default anymore. You import Tailwind in your stylesheet and define your design tokens with `@theme`:

```css
@import "tailwindcss";

@theme {
    --color-ink: #08080a;
    --color-fg: #ededef;
    --color-accent: #b4a1ff;
    --color-signal: #d4ff4f;
}
```

Every token automatically becomes utilities — `bg-ink`, `text-accent`, `border-signal/30` — **and** a real CSS variable you can use anywhere with `var(--color-accent)`. That second part is what I love: SVG strokes, canvas code and inline styles all read from the same tokens as your classes.

## Fonts from `next/font` need `@theme inline`

If your fonts come from `next/font`, they're exposed as CSS variables on `<html>`. To wire them into Tailwind's font utilities, use `@theme inline` so the value is resolved where it's used, not at build time:

```css
@theme inline {
    --font-sans: var(--font-geist), system-ui, sans-serif;
    --font-serif: var(--font-instrument), Georgia, serif;
}
```

Forget `inline` and your `font-serif` class quietly falls back to the default stack.

## Custom utilities are just CSS

Reusable patterns that used to be plugins or `@apply` soup are now `@utility` blocks:

```css
@utility eyebrow {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}
```

They work with variants (`md:eyebrow`, `hover:eyebrow`) like built-in classes.

## The bug: `overflow-x: clip` became `hidden`

Here's the one that cost me an hour. I had `overflow-x: hidden` on both `html` and `body` to stop a wide 3D element from causing horizontal scroll. That's a classic mistake: it turns `body` into a scroll container, and **every `position: sticky` element on the page stops working**.

The modern fix is `overflow-x: clip`, which clips without creating a scroll container. So I wrote it in my global CSS… and sticky was still broken.

The reason: Tailwind v4 runs your CSS through **Lightning CSS**, which lowers newer properties for your browser targets. My `overflow-x: clip` on `body` was shipped as `overflow-x: hidden`. I only found it by fetching the built stylesheet in the browser and reading what was actually served.

The fix that worked: put `overflow-x-clip` only on `<html>` (it propagates to the viewport) and remove the overflow rule from `body` entirely. Sticky headers, pinned sections and stacked cards all came back to life.

**Lesson:** when CSS "should" work and doesn't, read the CSS the browser actually received, not the CSS you wrote.

## Other small differences

- **Arbitrary values are everywhere** — `size-[min(560px,100vw)]`, `[mask-image:radial-gradient(...)]` — and they're great for one-offs. If you use the same one three times, make it a token or a utility.
- **Opacity modifiers work on your own colours** — `bg-accent/10` just works with `@theme` colours.
- **Automatic content detection** means you rarely configure source paths. If a class from a package isn't generated, add an `@source` line instead of fighting it.

## Verdict

Tailwind v4 makes a design system feel like CSS again: tokens in one place, real variables everywhere, and utilities generated from them. Just remember there's a compiler between your stylesheet and the browser — and when something looks wrong, check what it produced.
