/**
 * Static, GPU-cheap page backdrop: hairline grid that fades out, a soft
 * accent glow at the top, and a light film grain.
 */
export const Background = () => (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_30%,transparent_75%)]" />
        <div className="absolute -top-[30vh] left-1/2 h-[70vh] w-[110vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(124_92_255/0.22),transparent)]" />
        <div className="absolute top-[35vh] -right-[20vw] h-[60vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,rgb(212_255_79/0.05),transparent)]" />
        <div className="absolute inset-0 bg-noise opacity-[0.035] mix-blend-overlay" />
    </div>
);
