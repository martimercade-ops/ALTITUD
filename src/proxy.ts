import { NextResponse, type NextRequest } from "next/server";

import { filtrarPeticion } from "@/lib/proteccion";
import { isBotUserAgent } from "@/utils/bot-ua";

export function proxy(request: NextRequest) {
  const rechazo = filtrarPeticion(request);
  if (rechazo) return rechazo;

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
    "/((?!robots\\.txt|sitemap\\.xml|favicon|icon|apple-icon|android-icon|maskable-icon|manifest\\.json|browserconfig\\.xml|safari-pinned-tab|open-graph).*)",
  ],
};
