/**
 * Pàgines en castellà pensades per a les cerques locals reals (Search Console):
 * «agencia marketing andorra», «agencia seo andorra», «diseño web andorra»…
 * Cada pàgina té contingut propi; no són traduccions automàtiques.
 */

const A = "/assets/altitud";

export interface LandingEs {
  /** Ruta dins /es ("" = /es) */
  slug: string;
  /** Pàgina catalana equivalent (hreflang) */
  ca?: string;
  /** Nom curt per als enllaços entre pàgines */
  nom: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  image: string;
  imageAlt: string;
  /** Servei per preseleccionar al formulari de /parlem */
  servei?: string;
  incluye: { title: string; text: string }[];
  /** Bloc de text llarg: per què nosaltres / com ho fem */
  porQue: { title: string; paragraphs: string[] };
  /** Projectes a mostrar (slugs de projects.ts) */
  projectes: string[];
  faqs: { q: string; a: string }[];
}

export const landingsEs: LandingEs[] = [
  {
    slug: "",
    ca: "/",
    nom: "Agencia de marketing",
    title: "Agencia de marketing digital en Andorra | Altitud Digital",
    description:
      "Agencia de marketing digital en Andorra la Vella: diseño web, SEO, redes sociales, publicidad online e IA para empresas de Andorra. Más de 100 clientes y 4,9★ en Google.",
    eyebrow: "Agencia de marketing · Andorra la Vella",
    h1: "Agencia de marketing digital en Andorra.",
    intro:
      "Somos Altitud Digital, un equipo de Andorra que ayuda a empresas del país a conseguir más clientes: webs que venden, SEO, redes sociales, publicidad online, vídeo e inteligencia artificial. Todo con un mismo equipo y una sola persona de contacto.",
    image: `${A}/oficina.jpg`,
    imageAlt: "Oficina de Altitud Digital en Andorra la Vella",
    incluye: [
      { title: "Diseño web y tiendas online", text: "Webs rápidas, fáciles de gestionar y pensadas para convertir visitas en clientes. WordPress, Shopify, WooCommerce o a medida." },
      { title: "SEO y posicionamiento", text: "Que te encuentren cuando buscan lo que haces en Andorra. SEO técnico, contenidos y SEO local en Google Maps." },
      { title: "Redes sociales", text: "Contenido, reels, fotografía y gestión de Instagram, Facebook, TikTok y LinkedIn con un plan mensual claro." },
      { title: "Publicidad online", text: "Campañas en Google Ads y Meta Ads medidas al euro: sabes cuánto inviertes y cuánto te devuelve." },
      { title: "Branding y vídeo", text: "Logotipos, identidad corporativa, fotografía de producto y vídeo para que tu marca se vea como se merece." },
      { title: "IA y automatizaciones", text: "Chatbots que atienden a tus clientes 24 h, stock automático y procesos que te ahorran horas cada semana." },
    ],
    porQue: {
      title: "Por qué una agencia de aquí",
      paragraphs: [
        "Andorra es un mercado pequeño y muy particular: mucho turismo, mucho comercio, clientes que buscan en catalán, castellano y francés, y una competencia que se conoce entre sí. Llevamos más de seis años trabajando aquí y hemos ayudado a más de cien empresas de todas las parroquias, desde tiendas de Andorra la Vella y restaurantes de Escaldes hasta inmobiliarias, clínicas y federaciones deportivas.",
        "Trabajamos con un método en cuatro fases: diagnóstico, estrategia, ejecución y resultados. Primero entendemos tu negocio y a tu competencia, después decidimos qué canales tienen sentido y, al final de cada mes, te enseñamos los números. Sin permanencias imposibles ni informes que no se entienden.",
        "Y si quieres conocernos, ven a tomar un café a la oficina de la calle Ciutat de Valls, 24, en Andorra la Vella.",
      ],
    },
    projectes: ["la-casa", "auro-jardiners", "espai-dor"],
    faqs: [
      { q: "¿Qué hace una agencia de marketing digital en Andorra?", a: "Te ayuda a conseguir clientes por internet: diseña tu web, la posiciona en Google, gestiona tus redes sociales y tus campañas de publicidad, y mide los resultados. En Altitud Digital lo hacemos todo desde un mismo equipo, en Andorra la Vella." },
      { q: "¿Cuánto cuesta contratar una agencia de marketing?", a: "Depende de los servicios y del volumen de trabajo. Tenemos packs cerrados para redes sociales e identidad visual, y presupuestos a medida para webs y campañas. La primera reunión y la propuesta son sin compromiso." },
      { q: "¿Trabajáis con empresas pequeñas?", a: "Sí, la mayoría de nuestros clientes son pymes y comercios de Andorra. Adaptamos el plan al tamaño y a los objetivos de cada negocio." },
      { q: "¿Puedo pedir las ayudas PDE del Govern para digitalizarme?", a: "Sí. El Programa de Digitalització d'Empreses subvenciona entre el 30% y el 50% de muchos de nuestros servicios. Te ayudamos con los trámites y preparamos el presupuesto para la convocatoria." },
    ],
  },
  {
    slug: "agencia-seo-andorra",
    ca: "/serveis/seo-sem",
    nom: "Agencia SEO",
    title: "Agencia SEO en Andorra: posicionamiento web y SEO local | Altitud Digital",
    description:
      "Posicionamiento SEO en Andorra: auditoría, SEO técnico, contenidos y Google Maps para que tu empresa salga arriba en Google. Agencia SEO en Andorra la Vella.",
    eyebrow: "SEO · Posicionamiento en Google",
    h1: "Agencia SEO en Andorra.",
    intro:
      "Hacemos que tu empresa aparezca cuando alguien busca en Google lo que vendes en Andorra. Auditoría, SEO técnico, contenidos que responden lo que pregunta la gente y SEO local para que salgas en Google Maps.",
    image: `${A}/serveis/foto-seo-sem.jpg`,
    imageAlt: "Análisis de posicionamiento SEO en un portátil",
    servei: "seo-sem",
    incluye: [
      { title: "Auditoría SEO", text: "Revisamos tu web a fondo: velocidad, indexación, errores, contenido y enlaces. Sabrás qué falla y en qué orden arreglarlo." },
      { title: "Investigación de palabras clave", text: "Descubrimos cómo te buscan de verdad en Andorra, en castellano, catalán y francés, y qué búsquedas traen clientes." },
      { title: "SEO técnico", text: "Corregimos lo que impide a Google entender tu web: sitemap, redirecciones, datos estructurados, Core Web Vitals." },
      { title: "Contenidos que posicionan", text: "Páginas de servicio y artículos útiles, escritos por personas, que responden a lo que busca tu cliente." },
      { title: "SEO local y Google Maps", text: "Optimizamos tu ficha de Google Business para que salgas en el mapa cuando buscan cerca de ti." },
      { title: "Informes mensuales", text: "Posiciones, clics y contactos que llegan desde Google, explicados de forma clara cada mes." },
    ],
    porQue: {
      title: "Cómo trabajamos el SEO en Andorra",
      paragraphs: [
        "En Andorra hay poca competencia en Google comparado con Barcelona o Madrid, pero también menos búsquedas, y casi siempre mezcladas en varios idiomas. Por eso no basta con aplicar una receta: hay que saber qué busca la gente de aquí y los turistas que vienen, y en qué idioma lo hace.",
        "Empezamos con una auditoría y un análisis de tu competencia directa. Después arreglamos la base técnica, que es lo que más rápido da resultados, y trabajamos el contenido y la ficha de Google Business. El SEO es una carrera de fondo: los primeros cambios se notan en semanas y los resultados sólidos, en pocos meses.",
        "Usamos Search Console, Semrush y Google Analytics, y te damos acceso a todo. Los datos son tuyos.",
      ],
    },
    projectes: ["espai-dor", "auro-jardiners", "henkan"],
    faqs: [
      { q: "¿Cuánto tarda el SEO en dar resultados?", a: "Las mejoras técnicas suelen notarse en pocas semanas. Para posicionarse de forma estable en búsquedas competidas hay que contar con 3 a 6 meses de trabajo constante." },
      { q: "¿Qué diferencia hay entre SEO y SEM?", a: "El SEO trabaja los resultados orgánicos de Google, que no se pagan por clic. El SEM son los anuncios de Google Ads: resultados inmediatos mientras inviertes. Lo ideal suele ser combinarlos." },
      { q: "¿Hacéis SEO en catalán, castellano y francés?", a: "Sí. En Andorra es habitual que los clientes busquen en varios idiomas, así que planteamos el SEO según los idiomas de tu público." },
      { q: "¿Necesito cambiar de web para hacer SEO?", a: "No siempre. Primero auditamos la que tienes; si la base es buena, la optimizamos. Si te frena, te lo diremos con datos." },
    ],
  },
  {
    slug: "diseno-web-andorra",
    ca: "/serveis/web-ecommerce",
    nom: "Diseño web",
    title: "Diseño web en Andorra: páginas web y tiendas online | Altitud Digital",
    description:
      "Diseño de páginas web y tiendas online en Andorra: rápidas, bonitas y pensadas para vender. WordPress, Shopify, WooCommerce o a medida, con SEO incluido.",
    eyebrow: "Diseño web · Tiendas online",
    h1: "Diseño web en Andorra.",
    intro:
      "Diseñamos y programamos webs y tiendas online para empresas de Andorra: rápidas, fáciles de actualizar y pensadas para que la visita acabe en una llamada, una reserva o una venta.",
    image: `${A}/serveis/foto-web-ecommerce.jpg`,
    imageAlt: "Diseño de una página web en pantalla",
    servei: "web-ecommerce",
    incluye: [
      { title: "Diseño a medida", text: "Nada de plantillas genéricas: diseño UX/UI pensado para tu marca y para tus clientes, primero en Figma." },
      { title: "Tiendas online", text: "Shopify, WooCommerce o PrestaShop, con pasarela de pago, envíos y gestión de stock." },
      { title: "Reservas y formularios", text: "Motores de reservas para restaurantes y hoteles, formularios que llegan directos a tu correo o a tu CRM." },
      { title: "SEO desde el primer día", text: "Estructura, velocidad y textos preparados para Google antes de publicar." },
      { title: "Multidioma", text: "Webs en catalán, castellano, francés e inglés, como pide un país como Andorra." },
      { title: "Mantenimiento", text: "Actualizaciones, copias de seguridad y cambios cuando los necesites. No te dejamos solo después de publicar." },
    ],
    porQue: {
      title: "Webs hechas para negocios de aquí",
      paragraphs: [
        "Hemos hecho webs para restaurantes como La Casa Gastrobar y La Llotja, joyerías como Espai d'Or, inmobiliarias, aseguradoras, centros de salud y federaciones deportivas. Cada una tenía un objetivo distinto: reservas, ventas online, contactos o información clara para sus socios.",
        "El proceso es sencillo: una reunión para entender tu negocio, una propuesta de diseño que puedes tocar antes de programar nada, el desarrollo y la publicación. Te enseñamos a actualizar la web tú mismo y, si lo prefieres, nos ocupamos nosotros del mantenimiento.",
        "Todas nuestras webs salen con SEO básico, certificado SSL, versión móvil cuidada y medición de visitas configurada.",
      ],
    },
    projectes: ["la-casa", "espai-dor", "henkan"],
    faqs: [
      { q: "¿Cuánto cuesta una página web en Andorra?", a: "Depende del número de páginas, los idiomas y las funcionalidades (tienda, reservas, área privada). Te damos un presupuesto cerrado después de una primera reunión gratuita." },
      { q: "¿Cuánto se tarda en hacer una web?", a: "Una web corporativa suele estar lista en 4 a 8 semanas. Una tienda online o una web con desarrollos a medida puede llevar algo más." },
      { q: "¿Podré modificar la web yo mismo?", a: "Sí. Te formamos para que puedas cambiar textos, fotos, productos o noticias sin depender de nadie." },
      { q: "¿Se puede pagar con las ayudas PDE?", a: "Sí, el diseño web y las tiendas online entran en el Programa de Digitalització d'Empreses del Govern, que cubre entre el 30% y el 50%." },
    ],
  },
  {
    slug: "redes-sociales-andorra",
    ca: "/serveis/xarxes-socials",
    nom: "Redes sociales",
    title: "Gestión de redes sociales en Andorra: Instagram y reels | Altitud Digital",
    description:
      "Gestión de redes sociales para empresas de Andorra: estrategia, reels, fotografía, Instagram, TikTok y Meta Ads. Contenido grabado aquí, por un equipo de aquí.",
    eyebrow: "Redes sociales · Reels · Meta Ads",
    h1: "Gestión de redes sociales en Andorra.",
    intro:
      "Nos encargamos de tus redes de principio a fin: estrategia, grabación de reels y fotos en tu negocio, edición, publicación y anuncios en Meta. Contenido real, grabado en Andorra, que se parece a tu marca.",
    image: `${A}/serveis/foto-xarxes-socials.jpg`,
    imageAlt: "Grabación de contenido para redes sociales con el móvil",
    servei: "xarxes-socials",
    incluye: [
      { title: "Estrategia y calendario", text: "Definimos qué contar, a quién y con qué frecuencia. Cada mes validas el calendario antes de publicar." },
      { title: "Reels y vídeo", text: "Grabamos en tu negocio y editamos reels con ritmo, subtítulos y voz en off cuando hace falta." },
      { title: "Fotografía", text: "Fotos de producto, de equipo y de espacio para que tu feed tenga nivel." },
      { title: "Publicación y comunidad", text: "Publicamos, respondemos y cuidamos la comunidad para que tu cuenta no esté nunca parada." },
      { title: "Meta Ads", text: "Campañas en Instagram y Facebook para llegar a más gente de Andorra y de los alrededores." },
      { title: "Informes", text: "Alcance, interacciones, seguidores y contactos cada mes, con lo que haremos para mejorar." },
    ],
    porQue: {
      title: "Contenido que se graba aquí",
      paragraphs: [
        "Hacemos reels cada mes para negocios como Balanzen, El Rato, La Casa Gastrobar, Hotel Niu, Farmàcia Guitart, Auró Jardiners o inmobiliarias como Nou Aire y ARK Immo. Venimos a grabar a tu local, te pasamos los guiones para que los apruebes y nos ocupamos del resto.",
        "Las redes funcionan cuando hay constancia y cuando el contenido parece de verdad. Por eso trabajamos con packs mensuales claros, sin sorpresas, y combinamos contenido orgánico con anuncios cuando tiene sentido para el negocio.",
      ],
    },
    projectes: ["la-rostisseria", "brainworks-center", "auro-jardiners"],
    faqs: [
      { q: "¿Cuántas publicaciones incluye la gestión de redes?", a: "Tenemos packs con distinto número de reels y publicaciones al mes. Te recomendamos el que encaja con tus objetivos y presupuesto." },
      { q: "¿Venís a grabar al negocio?", a: "Sí. Grabamos en tu local o en exteriores de Andorra, normalmente en una o dos sesiones al mes." },
      { q: "¿Gestionáis también la publicidad en Instagram?", a: "Sí, creamos y optimizamos campañas de Meta Ads. La inversión en anuncios la pagas directamente a Meta." },
      { q: "¿En qué idioma publicáis?", a: "En el que hable tu cliente: catalán, castellano, francés o una combinación." },
    ],
  },
  {
    slug: "publicidad-online-andorra",
    ca: "/serveis/seo-sem",
    nom: "Publicidad online",
    title: "Publicidad online en Andorra: Google Ads y Meta Ads | Altitud Digital",
    description:
      "Campañas de Google Ads y Meta Ads para empresas de Andorra. Te ayudamos a conseguir clientes desde el primer día, midiendo cada euro invertido.",
    eyebrow: "Google Ads · Meta Ads",
    h1: "Publicidad online en Andorra.",
    intro:
      "Campañas en Google, Instagram y Facebook para que te encuentren hoy mismo los clientes que ya están buscando lo que ofreces. Segmentamos por zona, idioma e intereses y medimos cada contacto.",
    image: `${A}/serveis/foto-cro-growth.jpg`,
    imageAlt: "Panel de resultados de una campaña de publicidad online",
    servei: "seo-sem",
    incluye: [
      { title: "Google Ads", text: "Anuncios en el buscador, en Google Maps y en YouTube para captar a quien ya te está buscando." },
      { title: "Meta Ads", text: "Campañas en Instagram y Facebook para darte a conocer y llenar tu agenda o tu tienda." },
      { title: "Segmentación local", text: "Andorra, Alt Urgell, Cerdanya, el sur de Francia o los turistas que vienen: decidimos a quién y dónde." },
      { title: "Landings que convierten", text: "Páginas de destino pensadas para la campaña, con formulario o WhatsApp a un clic." },
      { title: "Medición", text: "Conversiones, llamadas y formularios bien medidos para saber qué funciona y qué no." },
      { title: "Optimización continua", text: "Ajustamos anuncios, pujas y públicos cada semana para bajar el coste por cliente." },
    ],
    porQue: {
      title: "Anuncios con los pies en el suelo",
      paragraphs: [
        "Con presupuestos de Andorra, cada euro cuenta. Antes de lanzar nada, revisamos qué buscan tus clientes, cuánto cuesta cada clic y qué página van a ver cuando hagan clic. Si la web no está preparada, te lo decimos.",
        "Trabajamos con campañas pequeñas que crecen cuando demuestran que funcionan. La inversión en anuncios la pagas directamente a Google o a Meta, y tienes acceso a las cuentas en todo momento.",
      ],
    },
    projectes: ["perfect-home", "olympus-race", "medic-estetic"],
    faqs: [
      { q: "¿Cuánto hay que invertir en Google Ads en Andorra?", a: "Depende del sector y de la competencia. Para muchos negocios locales se puede empezar con un presupuesto moderado y subirlo cuando hay resultados." },
      { q: "¿Qué es mejor, Google Ads o Meta Ads?", a: "Google Ads capta a quien ya busca lo que vendes; Meta Ads crea demanda y da a conocer tu marca. En la mayoría de casos se complementan." },
      { q: "¿Las cuentas publicitarias son mías?", a: "Sí. Las cuentas son tuyas y tienes acceso total. Nosotros las gestionamos." },
    ],
  },
  {
    slug: "branding-andorra",
    ca: "/serveis/branding",
    nom: "Branding",
    title: "Branding y diseño de logotipos en Andorra | Altitud Digital",
    description:
      "Diseño de logotipos, identidad corporativa y diseño gráfico para empresas de Andorra: tarjetas, cartelería, packaging y manual de marca.",
    eyebrow: "Branding · Diseño gráfico",
    h1: "Branding y diseño de logotipos en Andorra.",
    intro:
      "Creamos marcas que se recuerdan: logotipo, colores, tipografías y todo lo que necesitas para que tu negocio se vea igual de bien en la web, en redes, en el escaparate y en una tarjeta.",
    image: `${A}/rostisseria-cap-de-carrera.jpg`,
    imageAlt: "Bolsa con el logotipo de La Rostisseria junto a un pollo a l'ast",
    servei: "branding",
    incluye: [
      { title: "Logotipo", text: "Varias propuestas, revisiones y versiones para cada uso: color, negativo, icono." },
      { title: "Identidad corporativa", text: "Paleta de colores, tipografías, estilo fotográfico y tono de comunicación." },
      { title: "Manual de marca", text: "Un documento claro para que cualquiera aplique la marca sin errores." },
      { title: "Papelería y packaging", text: "Tarjetas de visita, bolsas, etiquetas, cartas y menús." },
      { title: "Cartelería y exterior", text: "Rótulos, vinilos y campañas en la calle, como las que hicimos para Projecte Vida." },
      { title: "Plantillas para redes", text: "Diseños listos para que tus publicaciones mantengan la misma imagen." },
    ],
    porQue: {
      title: "Una marca coherente en todas partes",
      paragraphs: [
        "Hemos renovado la imagen de negocios como Farmàcia Guitart, Brainworks o La Rostisseria de Cap de Carrera, y hemos diseñado campañas de calle en Andorra la Vella y Escaldes. Nos gusta que una marca funcione igual de bien en un reel que en una bolsa de papel.",
        "Tenemos packs de identidad visual cerrados, desde solo logotipo hasta una identidad completa, para que sepas el precio antes de empezar.",
      ],
    },
    projectes: ["farmacia-guitart", "brainworks-center", "la-rostisseria"],
    faqs: [
      { q: "¿Cuánto cuesta diseñar un logotipo?", a: "Tenemos packs de identidad visual con precio cerrado, desde el logotipo solo hasta una identidad completa con manual de marca." },
      { q: "¿Cuántas propuestas de logotipo recibo?", a: "Presentamos varias líneas creativas y trabajamos las revisiones contigo hasta llegar al resultado final." },
      { q: "¿Puedo renovar mi logotipo sin perder la esencia?", a: "Sí, a menudo lo mejor es modernizar la marca que ya tienes en lugar de empezar de cero." },
    ],
  },
  {
    slug: "chatbots-ia-andorra",
    ca: "/serveis/chatbots-ia",
    nom: "Chatbots con IA",
    title: "Chatbots con IA y automatizaciones en Andorra | Altitud Digital",
    description:
      "Chatbots con inteligencia artificial para webs y tiendas online de Andorra: atienden clientes 24 h, reservan citas y responden en varios idiomas. También formaciones de IA.",
    eyebrow: "Inteligencia artificial",
    h1: "Chatbots con IA para empresas de Andorra.",
    intro:
      "Ponemos la inteligencia artificial a trabajar para tu negocio: chatbots que responden a tus clientes a cualquier hora y en su idioma, reservan citas y te pasan los contactos listos para cerrar.",
    image: `${A}/serveis/foto-chatbots-ia.jpg`,
    imageAlt: "Conversación con un chatbot de inteligencia artificial",
    servei: "chatbots-ia",
    incluye: [
      { title: "Chatbot para tu web", text: "Entrenado con la información de tu negocio: productos, precios, horarios y preguntas frecuentes." },
      { title: "Reserva de citas", text: "El chatbot consulta tu agenda y reserva directamente, como hace el de Espai d'Or." },
      { title: "Multidioma", text: "Responde en catalán, castellano, francés e inglés sin que tengas que hacer nada." },
      { title: "Stock automático", text: "Sistemas que controlan el inventario y avisan antes de que te quedes sin producto." },
      { title: "Automatizaciones", text: "Conectamos tus herramientas para que los datos pasen solos de un sitio a otro." },
      { title: "Formaciones de IA", text: "Talleres presenciales para que tu equipo use Claude o ChatGPT en el día a día." },
    ],
    porQue: {
      title: "IA útil, no humo",
      paragraphs: [
        "Ya hemos puesto chatbots en marcha en tiendas online y negocios de Andorra como Espai d'Or o Perfect Home, y hacemos formaciones de IA para empresas como Advantia. Empezamos siempre por un diagnóstico: dónde pierde tiempo tu equipo y dónde la IA puede aportar de verdad.",
        "Diseñamos la solución, la conectamos a las herramientas que ya usas, la probamos con casos reales y formamos a tu equipo. Después la revisamos para que siga mejorando.",
      ],
    },
    projectes: ["espai-dor", "perfect-home", "la-casa"],
    faqs: [
      { q: "¿Un chatbot con IA puede equivocarse?", a: "Lo entrenamos solo con la información de tu negocio y le marcamos límites claros. Cuando no sabe algo, deriva la conversación a una persona." },
      { q: "¿Funciona con mi web actual?", a: "En la mayoría de casos sí: se integra en WordPress, Shopify, WooCommerce y webs a medida." },
      { q: "¿Hacéis formaciones de IA para empresas?", a: "Sí, hacemos diagnósticos y talleres presenciales adaptados a cada equipo." },
    ],
  },
  {
    slug: "ayudas-pde-andorra",
    ca: "/ajuts-pde",
    nom: "Ayudas PDE",
    title: "Ayudas PDE del Govern d'Andorra para digitalizar tu empresa | Altitud Digital",
    description:
      "El Programa de Digitalització d'Empreses (PDE) subvenciona entre el 30% y el 50% de tu web, tienda online, SEO o redes. Te ayudamos con los trámites para la convocatoria 2027.",
    eyebrow: "Ayudas del Govern · PDE",
    h1: "Ayudas PDE para digitalizar tu empresa en Andorra.",
    intro:
      "El Programa de Digitalització d'Empreses del Govern d'Andorra subvenciona entre el 30% y el 50% de la digitalización de tu negocio. Te ayudamos a prepararlo todo para la convocatoria 2027: la última se agotó en pocos días.",
    image: `${A}/nevado-3.jpg`,
    imageAlt: "Montañas nevadas de Andorra",
    incluye: [
      { title: "Cuestionario de autodiagnóstico", text: "Es obligatorio para pedir la ayuda y ya está abierto. Te acompañamos para rellenarlo." },
      { title: "Elección de soluciones", text: "Nos reunimos y escogemos los paquetes de digitalización que tienen sentido para tu negocio." },
      { title: "Presupuesto preparado", text: "Te lo dejamos listo para presentarlo el primer día de la convocatoria." },
      { title: "Web y tienda online", text: "Diseño web, e-commerce y reservas, subvencionables con el PDE." },
      { title: "Marketing digital", text: "SEO, redes sociales y publicidad online dentro de las soluciones del programa." },
      { title: "IA y automatización", text: "Chatbots y herramientas de gestión para ahorrar tiempo." },
    ],
    porQue: {
      title: "Cómo funciona el PDE",
      paragraphs: [
        "El porcentaje de ayuda depende del tamaño de la empresa: cuanto más pequeña, mayor es la subvención. Para optar a ella hay que hacer antes el cuestionario de madurez digital y presentar el presupuesto de un proveedor dentro del plazo de la convocatoria.",
        "Como las ayudas se agotan rápido, lo mejor es tenerlo todo preparado antes de que abra. Apúntate a nuestra lista de espera y te avisamos con tiempo.",
      ],
    },
    projectes: ["farmacia-guitart", "espai-dor", "la-casa"],
    faqs: [
      { q: "¿Quién puede pedir las ayudas PDE?", a: "Empresas y autónomos con actividad en Andorra que quieran digitalizarse. El porcentaje depende del tamaño de la empresa." },
      { q: "¿Cuándo abre la próxima convocatoria?", a: "La próxima está prevista para 2027. El cuestionario de autodiagnóstico, que es obligatorio, ya se puede hacer." },
      { q: "¿Os encargáis de los trámites?", a: "Te acompañamos en todo el proceso y preparamos el presupuesto para que lo presentes el primer día." },
    ],
  },
];

export const landingEsHref = (slug: string) => (slug ? `/es/${slug}` : "/es");
export const findLandingEs = (slug: string) => landingsEs.find((l) => l.slug === slug);
