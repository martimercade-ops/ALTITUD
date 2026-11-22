import { NextResponse, type NextRequest } from "next/server";

import { filtrarPeticion } from "@/lib/proteccion";
import { isBotUserAgent } from "@/utils/bot-ua";

export function proxy(request: NextRequest) {
  const rechazo = filtrarPeticion(request);
  if (rechazo) return rechazo;

  // Pàgines brossa que es van colar a l'antic WordPress (casinos, ?p=…): 410 perquè Google les oblidi
  const ruta = request.nextUrl.pathname.toLowerCase();
  if (/casino|apuesta|slot|bet365|poker/.test(ruta) || (ruta === "/" && request.nextUrl.searchParams.has("p"))) {
    return new NextResponse("Aquesta pàgina ja no existeix.", {
      status: 410,
      headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
    });
  }

  const bot = isBotUserAgent(request.headers.get("user-agent"));
  const { pathname } = request.nextUrl;
  if (pathname === "/" && bot) {
    return NextResponse.rewrite(new URL("/robot-view", request.url));
  }
  if (pathname === "/robot-view" && !bot) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!robots\\.txt|sitemap\\.xml|llms\\.txt|llms-full\\.txt|favicon|icon|apple-icon|android-icon|maskable-icon|manifest\\.json|browserconfig\\.xml|safari-pinned-tab|open-graph|b03906c42712fa20c387763bae49ed17\\.txt).*)",
  ],
};
