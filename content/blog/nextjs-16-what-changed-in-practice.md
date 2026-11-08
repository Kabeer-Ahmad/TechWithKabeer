---
title: "Next.js 16 in Practice: The Changes That Actually Affected My Projects"
excerpt: "Turbopack by default, middleware renamed to proxy, explicit caching and the React Compiler. What I had to change across a dozen client sites — and what I'd tell you before you upgrade."
tags: ["Next.js", "React", "Web Development", "Turbopack", "Full Stack"]
---

Most of the sites I've shipped this year — client storefronts, agency sites, dashboards, this portfolio — run on **Next.js 16**. Release notes tell you everything that changed. This post is about the handful of changes that actually touched my code.

## 1. Turbopack is just… the bundler now

Turbopack is the default for both `next dev` and `next build`. On my projects that meant noticeably faster cold starts and near-instant refreshes on large pages, and for most sites the upgrade needed no config at all.

Where it did need attention: **custom webpack config**. If your `next.config` has a `webpack()` function for loaders or aliases, check whether Turbopack has an equivalent before you upgrade, or keep using webpack explicitly for that project until you've migrated.

## 2. `middleware.ts` became `proxy.ts`

The file that runs before your routes was renamed from `middleware.ts` to `proxy.ts`, and the exported function from `middleware` to `proxy`. The new name is more honest: it's a network boundary for redirects, rewrites and auth checks, not a place for heavy logic.

```ts
// proxy.ts
import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const session = request.cookies.get("session");
    if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
}

export const config = { matcher: ["/dashboard/:path*"] };
```

On sites with Supabase auth, this is where I refresh the session cookie and gate the account area. The rename itself is a two-minute job; the real win is keeping this file small.

## 3. Caching is opt-in and explicit

The old App Router caching rules confused everyone, me included. In 16, the direction is clear: **dynamic by default, cache what you choose**. With Cache Components turned on, you mark cacheable work with the `"use cache"` directive and invalidate it by tag.

```ts
async function getProducts() {
    "use cache";
    // cached until something invalidates the "products" tag
    return db.products.findMany();
}
```

For a storefront, that's exactly the mental model I want: the product catalogue is cached, the cart and checkout are always fresh, and an admin edit invalidates only what changed.

## 4. The React Compiler is ready for real use

Next.js 16 ships stable support for the **React Compiler**, which memoises components automatically. On animation-heavy pages — like the scroll-driven sections on this site — it removed a lot of manual `useMemo`/`useCallback` noise.

One practical note: the compiler pairs with stricter lint rules. Code that mutates values inside render or calls `Math.random()` during render gets flagged. Every warning I hit pointed at a real (if small) bug, so I'd treat them as free code review rather than noise.

## 5. Smaller things that bit me

- **Node.js version.** Next 16 requires a modern Node 20+ runtime. Check your hosting settings before you deploy, not after.
- **Async request APIs.** `params`, `searchParams`, `cookies()` and `headers()` are async. If you skipped the deprecation warnings in 15, you'll fix them now.
- **Images.** Remote images still need `remotePatterns` in `next.config`. Every time I add a new storage bucket, I forget this exactly once.

## Should you upgrade?

For new projects: yes, start on 16. For existing ones, my order is:

1. Update Node and dependencies, run the codemod.
2. Rename `middleware.ts` to `proxy.ts`.
3. Fix async API usage and lint errors.
4. Only then think about adopting Cache Components page by page.

Upgrades go smoothly when you do them in small, boring steps. Next.js 16 is mostly a cleaner version of what we already had, and that's exactly what I want from a framework.
