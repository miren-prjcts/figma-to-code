/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/tokens"],
  // @repo/ui's barrel (packages/ui/src/index.ts) re-exports both server-safe components and
  // "use client" ones (Modal, FormField, Checkbox, Radio, Switch) from the same file. Without
  // this, `next dev`'s RSC bundler can mis-evaluate the barrel's client-boundary splitting
  // (surfaces as `createContext is not a function` for a component that was never imported)
  // even when the actually-consumed export is server-safe. `optimizePackageImports` rewrites
  // barrel imports into direct per-file imports, which resolves it — this is Next's own
  // documented fix for large barrel-exporting workspace packages.
  experimental: {
    optimizePackageImports: ["@repo/ui"],
  },
};

export default nextConfig;
