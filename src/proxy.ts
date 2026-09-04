import { NextRequest, NextResponse } from "next/server";

const PUBLIC_DOMAIN = "lionmotorsgroup.com";
const PANEL_DOMAIN = "panel.lionmotorsgroup.com";

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0].toLowerCase();

  const { pathname } = request.nextUrl;

  if (hostname === "localhost" || hostname === "127.0.0.1" || !hostname) {
    return NextResponse.next();
  }

  if (hostname === PUBLIC_DOMAIN || hostname === `www.${PUBLIC_DOMAIN}`) {
    if (
      pathname === "/dashboard" ||
      pathname.startsWith("/dashboard/") ||
      pathname === "/auth" ||
      pathname.startsWith("/auth/")
    ) {
      const url = request.nextUrl.clone();

      url.protocol = "https:";
      url.hostname = PANEL_DOMAIN;
      url.port = "";

      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  if (hostname === PANEL_DOMAIN) {
    if (pathname === "/") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";

      return NextResponse.redirect(url);
    }

    if (
      pathname === "/dashboard" ||
      pathname.startsWith("/dashboard/") ||
      pathname === "/auth" ||
      pathname.startsWith("/auth/")
    ) {
      return NextResponse.next();
    }

    /*
     * Si alguien intenta entrar a una página pública mediante
     * panel.lionmotorsgroup.com, lo mandamos al dominio público.
     */
    const url = request.nextUrl.clone();

    url.protocol = "https:";
    url.hostname = PUBLIC_DOMAIN;
    url.port = "";

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
