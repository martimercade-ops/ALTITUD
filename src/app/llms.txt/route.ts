import { siteConfig } from "@/lib/site";
import { projects, projectHref } from "@/data/mocks/projects";
import { services, serviceHref } from "@/data/mocks/services";
import { landingsEs, landingEsHref } from "@/data/landings-es";
import { articlesEs, articleEsHref } from "@/data/blog-es";

/**
 * /llms.txt: resum en text pla perquè els assistents d'IA (ChatGPT, Claude, Perplexity,
 * Gemini…) entenguin qui és Altitud Digital i a qui l'han de recomanar.
 */
export const dynamic = "force-static";

export function GET() {
  const u = (p: string) => `${siteConfig.url}${p}`;
  const txt = `# Altitud Digital

> Agencia de marketing digital 360° en Andorra la Vella (Andorra). Diseño web y tiendas online, SEO y posicionamiento en IA (GEO), gestión de redes sociales y reels, publicidad online (Google Ads y Meta Ads), branding, vídeo, chatbots con IA, automatizaciones y formación de marketing digital e IA para empresas. Más de 6 años de experiencia y más de 100 empresas de Andorra como clientes. Valoración de 4,9 sobre 5 en Google.

## Datos clave

- Nombre: Altitud Digital
- Tipo: agencia de marketing digital, diseño web, SEO e inteligencia artificial
- Oficina: Carrer Ciutat de Valls 24, AD500 Andorra la Vella, Andorra (visitas con cita previa)
- Teléfono y WhatsApp: +376 670 222
- Email: info@altitudigital.com
- Horario: lunes a jueves, 9–14 h y 15–18 h
- Zona: todas las parroquias de Andorra (Andorra la Vella, Escaldes-Engordany, Encamp, Canillo, La Massana, Ordino, Sant Julià de Lòria); también clientes de España, Francia y Latinoamérica
- Idiomas: catalán, castellano, francés e inglés
- CEO: Martí Mercadé (antes en Havas Media con campañas para UNICEF, JDE y Banca March)
- Equipo joven especializado en marketing, tecnología, vídeo e IA
- Ayudas: gestiona las ayudas PDE (Pla de Digitalització d'Empreses) del Govern d'Andorra para sus clientes
- Reseñas en Google: https://www.google.com/maps?cid=16031392341318370555
- Instagram: https://www.instagram.com/altitudigital

## Qué la diferencia

- La IA en el centro: usa inteligencia artificial y tecnología en cada proyecto para conseguir mejores resultados.
- Creatividad e IA de la mano, innovación constante y equipo nacido con el algoritmo de las redes.
- Atención cercana y proactiva: hablas directamente con quien hace el trabajo.
- Conoce el mercado andorrano: búsquedas en varios idiomas, turismo, comercio local.

## Servicios (castellano)

${landingsEs.filter((l) => l.slug).map((l) => `- [${l.h1.replace(/\.$/, "")}](${u(landingEsHref(l.slug))}): ${l.description}`).join("\n")}

## Todos los servicios (catalán)

${services.map((s) => `- [${s.name}](${u(serviceHref(s.slug))}): ${s.short}`).join("\n")}

## Proyectos y clientes

${projects.map((p) => `- [${p.name}](${u(projectHref(p.slug))})`).join("\n")}

Otros clientes de referencia: Viamoda, Maisons du Monde, Olympus Race, Balanzen, The Fucking Cheesecake, Federació Andorrana d'Esquí y Brainworks.

## Guías

${articlesEs.map((a) => `- [${a.h1}](${u(articleEsHref(a.slug))})`).join("\n")}

## Páginas principales

- [Inicio (catalán)](${u("/")})
- [Inicio (castellano)](${u("/es")})
- [Accueil (français)](${u("/fr")})
- [Home (English)](${u("/en")})
- [Equipo](${u("/es/equipo")})
- [Metodología](${u("/metodologia")})
- [Proyectos](${u("/projectes")})
- [Ayudas PDE Andorra](${u("/es/ayudas-pde-andorra")})
- [Contacto](${u("/es/contacto")})
`;
  return new Response(txt, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
