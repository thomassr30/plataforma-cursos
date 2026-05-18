import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactStrictMode desactivado en dev porque Next 15 + extensiones del navegador
  // (React DevTools, Grammarly, etc.) modifican el HTML y disparan warnings de
  // hidratación en el wrapper interno __next_metadata_boundary__.
  // Estos warnings son "Recoverable Errors" (la app funciona), pero contaminan la consola.
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
