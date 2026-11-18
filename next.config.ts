import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'",
          },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          { key: "tdm-reservation", value: "1" },
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
        ],
      },
    ];
  },

  /** URL de l'antic web: es redirigeixen perquè no es perdi el posicionament */
  async redirects() {
    return [
      { source: "/contacto", destination: "/parlem", permanent: true },
      { source: "/contacte", destination: "/parlem", permanent: true },
      { source: "/servicios/optimizacion-seo", destination: "/serveis/seo-sem", permanent: true },
      { source: "/servicios/:path*", destination: "/#services", permanent: true },
      { source: "/quienes-somos", destination: "/#about", permanent: true },
    ];
  },

  poweredByHeader: false,

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  images: {
    formats: ["image/webp"],
    qualities: [30, 75, 90],
    deviceSizes: [360, 640, 768, 1024, 1280, 1440, 1920, 2560, 3200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
