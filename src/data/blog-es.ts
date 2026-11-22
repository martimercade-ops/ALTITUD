/**
 * Articles del blog en castellà, pensats per a cerques reals de Search Console
 * on encara som lluny (seo andorra, diseño web andorra, google ads andorra, GEO).
 * Als paràgrafs, [text](/ruta) es converteix en un enllaç intern.
 */

export interface ArticleEs {
  slug: string;
  title: string;
  description: string;
  h1: string;
  /** Data de publicació (ISO) */
  date: string;
  minutos: number;
  categoria: string;
  intro: string;
  secciones: { h2: string; p: string[]; li?: string[] }[];
  /** Landing del servei relacionat (crida final) */
  landing: { href: string; label: string };
  faqs?: { q: string; a: string }[];
}

export const articlesEs: ArticleEs[] = [
  {
    slug: "posicionamiento-seo-andorra",
    title: "Posicionamiento SEO en Andorra: guía práctica para salir en Google | Altitud Digital",
    description:
      "Cómo funciona el posicionamiento SEO en Andorra: búsquedas en varios idiomas, SEO local en Google Maps, SEO técnico y contenidos. Guía práctica para empresas andorranas.",
    h1: "Posicionamiento SEO en Andorra: guía práctica para salir en Google",
    date: "2026-11-22",
    minutos: 7,
    categoria: "SEO",
    intro:
      "Hacer SEO en Andorra no es lo mismo que hacerlo en Barcelona o en Madrid. Hay menos competencia, pero también menos búsquedas, y la gente busca en catalán, castellano, francés e inglés. En esta guía te explicamos qué funciona de verdad para que una empresa andorrana aparezca en Google cuando la buscan.",
    secciones: [
      {
        h2: "Qué tiene de especial el SEO en Andorra",
        p: [
          "Andorra es un mercado pequeño y multilingüe. Un mismo cliente puede buscar «restaurante Andorra la Vella», «restaurant Escaldes» o «meilleur restaurant Andorre» según su idioma. Si tu web solo existe en un idioma, te pierdes una parte de las búsquedas.",
          "Además, mucha de la gente que busca no vive aquí: turistas, esquiadores, compradores que vienen de Francia o de Cataluña, o personas que se plantean mudarse o abrir una empresa en el país. Cada grupo busca cosas distintas y en momentos distintos del año.",
          "La buena noticia es que, en muchos sectores, hay pocas webs bien trabajadas. Con una base técnica correcta y contenido útil se puede llegar a las primeras posiciones mucho antes que en una gran ciudad.",
        ],
      },
      {
        h2: "1. Empieza por la investigación de palabras clave",
        p: [
          "Antes de tocar nada, hay que saber cómo te busca la gente. No sirve adivinarlo: Google Search Console, el planificador de Google Ads y herramientas como Semrush te dicen qué búsquedas existen y cuántas veces se hacen.",
          "En Andorra conviene mirar cada idioma por separado y fijarse en las búsquedas locales, las que incluyen «Andorra», el nombre de la parroquia o «cerca de mí». Suelen tener menos volumen, pero quien las hace está mucho más cerca de comprar.",
        ],
        li: [
          "Búsquedas de servicio + lugar: «dentista Andorra la Vella», «agencia SEO Andorra».",
          "Búsquedas de problema: «cómo abrir una empresa en Andorra», «cuánto cuesta una web».",
          "Búsquedas de marca: tu nombre y el de tu competencia.",
        ],
      },
      {
        h2: "2. Arregla la base técnica",
        p: [
          "El SEO técnico es lo que más rápido da resultados porque elimina los frenos. Si Google no puede leer bien tu web, da igual lo buenos que sean tus textos.",
          "Revisa que la web cargue rápido en el móvil, que tenga un sitemap enviado a Search Console, que cada página tenga un título y una descripción propios, que no haya enlaces rotos ni páginas duplicadas y que las versiones en cada idioma estén bien marcadas con hreflang. Los datos estructurados (por ejemplo, LocalBusiness o FAQ) ayudan a Google a entender quién eres y dónde estás.",
        ],
      },
      {
        h2: "3. Una página para cada servicio y cada búsqueda importante",
        p: [
          "Un error muy habitual es tener una sola página de «Servicios» con todo mezclado. Google posiciona páginas, no webs: si quieres salir por «diseño web Andorra» y por «SEO Andorra», necesitas una página dedicada a cada uno, con un título claro, un texto útil y respuestas a las preguntas que se hace el cliente.",
          "Escribe para personas: qué incluye el servicio, cómo trabajas, cuánto tarda, ejemplos reales y preguntas frecuentes. Ese contenido es el que Google acaba premiando, porque es el que resuelve la búsqueda.",
        ],
      },
      {
        h2: "4. SEO local: Google Maps y Google Business",
        p: [
          "Para la mayoría de negocios andorranos, la ficha de Google Business es tan importante como la web. Cuando alguien busca un servicio cerca, Google enseña primero el mapa con tres negocios y, muchas veces, la gente ni llega a los resultados de debajo.",
          "Completa la ficha al cien por cien: categoría correcta, horario, fotos reales, servicios y una descripción clara. Pide reseñas a tus clientes satisfechos y respóndelas todas. Y asegúrate de que el nombre, la dirección y el teléfono sean idénticos en la web, en la ficha y en los directorios donde aparezcas.",
        ],
      },
      {
        h2: "5. Contenido que responde preguntas",
        p: [
          "Un blog solo tiene sentido si responde dudas reales de tus clientes. Piensa en las preguntas que te hacen cada semana por teléfono o por WhatsApp: cada una puede ser un artículo que atraiga visitas durante años.",
          "Además, este tipo de contenido es el que usan las respuestas con IA de Google y herramientas como ChatGPT para recomendar negocios. Lo explicamos en nuestro artículo sobre [GEO y posicionamiento en IA](/es/blog/geo-posicionamiento-ia).",
        ],
      },
      {
        h2: "6. Mide y mejora cada mes",
        p: [
          "El SEO no se hace una vez y se olvida. Con Search Console puedes ver por qué búsquedas apareces, en qué posición y cuántos clics recibes. Las búsquedas con muchas impresiones y posiciones entre la 5 y la 20 son las mejores oportunidades: con poco trabajo pueden subir a la primera página.",
          "Cuenta con unas semanas para ver los primeros cambios técnicos y con unos meses de trabajo constante para posicionarte de forma estable en búsquedas competidas.",
        ],
      },
    ],
    landing: { href: "/es/agencia-seo-andorra", label: "Ver nuestro servicio de SEO en Andorra" },
    faqs: [
      { q: "¿Cuánto tarda el SEO en dar resultados en Andorra?", a: "Las mejoras técnicas suelen notarse en pocas semanas. Para posicionarse de forma estable hay que contar con unos meses de trabajo constante, según la competencia de tu sector." },
      { q: "¿En qué idioma tengo que hacer SEO en Andorra?", a: "Depende de tus clientes. Lo habitual es catalán y castellano, y francés o inglés si trabajas con turistas o con público extranjero. Lo mejor es mirar en Search Console desde qué idiomas y países te encuentran." },
      { q: "¿Puedo hacer SEO yo mismo?", a: "Sí, sobre todo la parte de Google Business y el contenido. La parte técnica y la estrategia de palabras clave es donde una agencia suele ahorrarte más tiempo y errores." },
    ],
  },
  {
    slug: "diseno-web-andorra-que-debe-tener",
    title: "Diseño web en Andorra: qué debe tener la página web de tu empresa | Altitud Digital",
    description:
      "Qué debe tener una buena página web para una empresa de Andorra: varios idiomas, móvil, velocidad, SEO, WhatsApp, reservas y mantenimiento. Checklist práctica antes de encargar tu web.",
    h1: "Diseño web en Andorra: qué debe tener la página web de tu empresa",
    date: "2026-11-22",
    minutos: 6,
    categoria: "Diseño web",
    intro:
      "Una página web no es un folleto: es la herramienta que trabaja por tu negocio cuando tú no estás. Si estás pensando en hacer o renovar la web de tu empresa en Andorra, esta es la lista de lo que no puede faltar, explicada sin tecnicismos.",
    secciones: [
      {
        h2: "1. Pensada primero para el móvil",
        p: [
          "La mayoría de visitas llegan desde el móvil, y en negocios como restaurantes, tiendas o servicios a domicilio todavía más. Diseña primero para la pantalla pequeña: textos que se lean sin hacer zoom, botones fáciles de pulsar y el teléfono o el WhatsApp siempre a mano.",
        ],
      },
      {
        h2: "2. En los idiomas de tus clientes",
        p: [
          "En Andorra es casi obligatorio tener la web al menos en catalán y castellano, y en francés o inglés si trabajas con turistas o con clientes de fuera. No vale una traducción automática: los textos tienen que sonar naturales y cada idioma debe estar bien configurado para Google.",
        ],
      },
      {
        h2: "3. Rápida",
        p: [
          "Una web lenta pierde visitas antes de que se vea la primera foto, y Google también lo tiene en cuenta. Imágenes optimizadas, un buen alojamiento y un código limpio marcan la diferencia. Puedes comprobar la velocidad de tu web gratis con PageSpeed Insights de Google.",
        ],
      },
      {
        h2: "4. Con un objetivo claro en cada página",
        p: [
          "Cada página tiene que llevar a una acción: pedir presupuesto, reservar, comprar o llamar. Si el visitante no sabe qué hacer, se va. Un buen diseño UX/UI ordena la información para que el siguiente paso sea obvio.",
        ],
        li: [
          "Formulario corto y visible (nombre, contacto y mensaje).",
          "Botón de WhatsApp y teléfono clicable.",
          "Reservas o tienda online si tu negocio lo necesita.",
          "Opiniones de clientes y proyectos reales para generar confianza.",
        ],
      },
      {
        h2: "5. Preparada para salir en Google",
        p: [
          "El SEO empieza en el diseño: una página para cada servicio, títulos y descripciones propios, URLs claras, datos estructurados y un sitemap. Rehacer todo esto después de publicar cuesta mucho más. Si quieres saber más, lee nuestra [guía de posicionamiento SEO en Andorra](/es/blog/posicionamiento-seo-andorra).",
        ],
      },
      {
        h2: "6. Fácil de actualizar y con mantenimiento",
        p: [
          "Tu web tiene que poder cambiar contigo: nuevos servicios, precios, fotos o promociones. Elige una plataforma que puedas gestionar (WordPress, Shopify o una web a medida con panel) y asegúrate de que alguien se encarga de las actualizaciones, las copias de seguridad y la seguridad.",
        ],
      },
      {
        h2: "7. Legal y con las cookies bien hechas",
        p: [
          "Aviso legal, política de privacidad y un banner de cookies que funcione de verdad. Es una obligación, pero también genera confianza en quien te visita.",
        ],
      },
      {
        h2: "¿Y la plantilla o la web a medida?",
        p: [
          "Una plantilla puede servir para empezar, pero suele quedarse corta cuando quieres diferenciarte o crecer. Una web a medida parte de tu marca y de tus clientes: primero se diseña en Figma, se valida contigo y después se desarrolla. Es lo que hacemos en nuestros [proyectos de diseño web](/projectes).",
          "Si tu empresa está en Andorra, recuerda que puedes consultar las ayudas del Pla de Digitalització d'Empreses: te lo explicamos en nuestra [página sobre las ayudas PDE](/es/ayudas-pde-andorra).",
        ],
      },
    ],
    landing: { href: "/es/diseno-web-andorra", label: "Ver nuestro servicio de diseño web" },
    faqs: [
      { q: "¿Cuánto tarda en hacerse una página web?", a: "Depende del tamaño y de las funcionalidades. Una web corporativa suele llevar unas semanas; una tienda online o una web con reservas, algo más. Lo importante es tener los textos y las fotos a tiempo." },
      { q: "¿Necesito una tienda online o basta con una web?", a: "Si vendes productos y quieres vender fuera del horario o fuera de Andorra, una tienda online tiene sentido. Si ofreces servicios, una web con formulario y WhatsApp suele ser suficiente." },
    ],
  },
  {
    slug: "google-ads-andorra",
    title: "Google Ads en Andorra: cómo hacer campañas rentables en un mercado pequeño | Altitud Digital",
    description:
      "Guía de Google Ads para empresas de Andorra: segmentación por zona e idioma, palabras clave, anuncios, landings y medición. Cómo invertir sin malgastar el presupuesto.",
    h1: "Google Ads en Andorra: cómo hacer campañas rentables en un mercado pequeño",
    date: "2026-11-22",
    minutos: 6,
    categoria: "Publicidad",
    intro:
      "Google Ads te pone delante de la gente que ya está buscando lo que vendes. En un país pequeño como Andorra puede ser muy rentable, pero también es fácil malgastar dinero si la campaña no se configura bien. Estos son los puntos clave.",
    secciones: [
      {
        h2: "1. Elige bien dónde y a quién se muestran los anuncios",
        p: [
          "Andorra es pequeña, pero tu cliente puede estar en el país o fuera: en el Alt Urgell, en la Cerdanya, en el sur de Francia o en Barcelona, preparando su viaje. Define la ubicación según tu negocio y revisa la opción de mostrar anuncios a quien está «en» la zona o también a quien está «interesado» en ella.",
          "Haz lo mismo con los idiomas: un anuncio en francés para el público francés suele funcionar mucho mejor que uno traducido a medias.",
        ],
      },
      {
        h2: "2. Palabras clave con intención de compra",
        p: [
          "No todas las búsquedas valen lo mismo. «Fontanero urgente Escaldes» vale mucho más que «cómo arreglar un grifo». Empieza por las búsquedas que indican que alguien quiere contratar o comprar, y añade palabras negativas para no pagar por clics que no te interesan (por ejemplo, «gratis», «curso» o «empleo», si no aplican a tu negocio).",
        ],
      },
      {
        h2: "3. Anuncios que se diferencian",
        p: [
          "Usa todos los recursos del anuncio: varios títulos, extensiones de llamada, de ubicación y de enlaces a otras páginas. Di algo concreto que te diferencie: años de experiencia, reseñas, entrega en el día, presupuesto sin compromiso. Los anuncios genéricos se confunden con los de la competencia.",
        ],
      },
      {
        h2: "4. Una página de destino pensada para la campaña",
        p: [
          "Enviar el tráfico a la portada de la web es tirar parte del presupuesto. Cada campaña debería llevar a una página que hable exactamente de lo que se anuncia, con un formulario corto o un botón de WhatsApp a la vista. Es lo que más mejora el coste por cliente.",
        ],
      },
      {
        h2: "5. Medir conversiones, no clics",
        p: [
          "Lo que importa no son los clics, sino los contactos y las ventas. Configura la medición de formularios, llamadas y clics en WhatsApp para saber qué palabras clave y qué anuncios traen clientes. Sin esto, Google Ads optimiza a ciegas.",
        ],
      },
      {
        h2: "6. Revisar cada semana",
        p: [
          "Las primeras semanas son de aprendizaje. Revisa los términos de búsqueda reales, añade negativas, pausa lo que no funciona y sube la inversión en lo que sí. Combinado con el SEO, Google Ads te da resultados mientras el posicionamiento orgánico crece. Lo explicamos en nuestra [guía de SEO en Andorra](/es/blog/posicionamiento-seo-andorra).",
        ],
      },
    ],
    landing: { href: "/es/publicidad-online-andorra", label: "Ver nuestro servicio de Google Ads y Meta Ads" },
    faqs: [
      { q: "¿Cuánto hay que invertir en Google Ads en Andorra?", a: "No hay una cifra única: depende del sector y de la zona. Lo recomendable es empezar con un presupuesto moderado, medir las conversiones durante unas semanas y aumentar la inversión en lo que demuestra que funciona." },
      { q: "¿Google Ads o Meta Ads?", a: "Google Ads capta a quien ya te está buscando; Meta Ads (Instagram y Facebook) te da a conocer a quien todavía no te busca. Muchos negocios combinan los dos." },
    ],
  },
  {
    slug: "geo-posicionamiento-ia",
    title: "GEO: cómo conseguir que ChatGPT y Google recomienden tu empresa en Andorra | Altitud Digital",
    description:
      "Qué es el GEO (posicionamiento en buscadores con IA) y cómo preparar la web de tu empresa en Andorra para aparecer en ChatGPT, Gemini y las respuestas con IA de Google.",
    h1: "GEO: cómo conseguir que ChatGPT y Google recomienden tu empresa en Andorra",
    date: "2026-11-22",
    minutos: 5,
    categoria: "IA y SEO",
    intro:
      "Cada vez más gente pregunta directamente a ChatGPT, a Gemini o a las respuestas con IA de Google: «¿qué agencia me recomiendas en Andorra?», «¿dónde comer bien en Escaldes?». Si tu empresa no aparece en esas respuestas, te estás perdiendo clientes. A esto se le llama GEO (Generative Engine Optimization).",
    secciones: [
      {
        h2: "Qué es el GEO y en qué se diferencia del SEO",
        p: [
          "El SEO busca que tu web salga en la lista de resultados de Google. El GEO busca que los asistentes de inteligencia artificial te mencionen en sus respuestas. Las dos cosas van de la mano: los asistentes se basan en gran parte en el contenido que encuentran en la web y en los buscadores.",
          "La diferencia es que la IA no muestra diez enlaces, sino una respuesta resumida con unos pocos nombres. Estar entre ellos depende de que tu información sea clara, coherente y fiable.",
        ],
      },
      {
        h2: "1. Explica claramente quién eres, qué haces y dónde",
        p: [
          "Las IA necesitan entender tu negocio sin ambigüedades. Tu web debe decir de forma explícita qué servicios ofreces, en qué zona trabajas, para quién y cómo contactarte. Las frases vagas («soluciones integrales para tu negocio») no ayudan; las concretas («diseño web y SEO para empresas de Andorra la Vella y Escaldes») sí.",
        ],
      },
      {
        h2: "2. Responde las preguntas que hace la gente",
        p: [
          "Los asistentes de IA responden preguntas. Si tu web tiene páginas con preguntas frecuentes, guías y explicaciones claras, es más fácil que tomen tu contenido como referencia. Piensa en las dudas reales de tus clientes y respóndelas con precisión.",
        ],
      },
      {
        h2: "3. Datos estructurados y coherencia",
        p: [
          "Los datos estructurados (schema.org) le dicen a las máquinas qué es cada cosa: tu empresa, tu dirección, tus horarios, tus servicios, tus reseñas. Además, el nombre, la dirección y el teléfono tienen que ser iguales en la web, en Google Business y en los directorios donde aparezcas.",
        ],
      },
      {
        h2: "4. Reputación fuera de tu web",
        p: [
          "La IA no solo lee tu web: también lo que dicen de ti. Las reseñas en Google, las menciones en medios y directorios del sector y los perfiles bien completados en redes sociales refuerzan que eres una opción fiable para recomendar.",
        ],
      },
      {
        h2: "5. Una web técnicamente accesible",
        p: [
          "Si los rastreadores no pueden leer tu contenido, no te tendrán en cuenta. Una web rápida, con el texto en HTML (no dentro de imágenes), un sitemap actualizado y sin bloqueos innecesarios es la base, igual que para el SEO clásico. Te lo contamos en nuestra [guía de posicionamiento SEO en Andorra](/es/blog/posicionamiento-seo-andorra).",
        ],
      },
      {
        h2: "Cómo saber si apareces",
        p: [
          "Haz la prueba: pregunta a ChatGPT, a Gemini y a Google por tu sector en Andorra con las palabras que usaría un cliente. Anota quién aparece y qué dicen de cada uno. Repite la prueba cada cierto tiempo para ver la evolución mientras mejoras tu web y tu reputación.",
        ],
      },
    ],
    landing: { href: "/es/agencia-seo-andorra", label: "Ver nuestro servicio de SEO y GEO" },
    faqs: [
      { q: "¿El GEO sustituye al SEO?", a: "No. El GEO se apoya en el SEO: una web bien posicionada y con buen contenido tiene muchas más posibilidades de aparecer en las respuestas de la IA." },
      { q: "¿Se puede pagar para salir en ChatGPT?", a: "A día de hoy, las recomendaciones de los asistentes dependen sobre todo del contenido y de la reputación de tu negocio en la web, no de un pago directo." },
    ],
  },
];

export const articleEsHref = (slug: string) => `/es/blog/${slug}`;
export const findArticleEs = (slug: string) => articlesEs.find((a) => a.slug === slug);
