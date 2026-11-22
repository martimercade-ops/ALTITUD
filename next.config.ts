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
      {
        // Imatges i icones: el navegador i la CDN de Hostinger les guarden 30 dies
        source: "/assets/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
        ],
      },
    ];
  },

  /** URL de l'antic web: es redirigeixen perquè no es perdi el posicionament */
  async redirects() {
    return [
      { source: "/contacto", destination: "/parlem", permanent: true },
      { source: "/contacte", destination: "/parlem", permanent: true },
      { source: "/quienes-somos", destination: "/equip", permanent: true },
      { source: "/qui-som", destination: "/equip", permanent: true },
      { source: "/proyectos", destination: "/projectes", permanent: true },
      { source: "/proyectos/:path*", destination: "/projectes", permanent: true },
      { source: "/servicios", destination: "/serveis", permanent: true },
      { source: "/servicios/optimizacion-seo", destination: "/serveis/seo-sem", permanent: true },
      { source: "/servicios/publicidad-digital", destination: "/serveis/seo-sem", permanent: true },
      { source: "/servicios/social-media", destination: "/serveis/xarxes-socials", permanent: true },
      { source: "/servicios/diseno-grafico", destination: "/serveis/branding", permanent: true },
      { source: "/servicios/desarrollo-web-y-aplicaciones", destination: "/serveis/web-ecommerce", permanent: true },
      { source: "/servicios/creacion-de-contenido-audiovisual", destination: "/serveis/audiovisual", permanent: true },
      { source: "/servicios/email-marketing", destination: "/serveis", permanent: true },
      { source: "/servicios/:path*", destination: "/serveis", permanent: true },
      { source: "/formaciones", destination: "/serveis/formacions-ia", permanent: true },
      { source: "/formaciones/:path*", destination: "/serveis/formacions-ia", permanent: true },
      { source: "/preguntas-frecuentes", destination: "/parlem", permanent: true },
      { source: "/serveis/programari-a-mida", destination: "/serveis/crm-erp-a-mida", permanent: true },
      { source: "/serveis/estoc-automatic-ia", destination: "/serveis/crm-erp-a-mida", permanent: true },
      { source: "/es/servicios/seo-sem", destination: "/es/agencia-seo-andorra", permanent: true },
      { source: "/es/servicios/web-ecommerce", destination: "/es/diseno-web-andorra", permanent: true },
      { source: "/es/servicios/xarxes-socials", destination: "/es/redes-sociales-andorra", permanent: true },
      { source: "/es/servicios/branding", destination: "/es/branding-andorra", permanent: true },
      { source: "/es/servicios/chatbots-ia", destination: "/es/chatbots-ia-andorra", permanent: true },
      { source: "/es/servicios/formacions-ia", destination: "/es/cursos-marketing-digital-andorra", permanent: true },
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
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [480, 960, 1440, 1920, 2560],
    imageSizes: [64, 128, 256],
  },

};

export default nextConfig;
