import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { isPremiumRoute } from "@/lib/premium-routes";

export default auth((request) => {
  const { pathname } = request.nextUrl;

  if (!request.auth) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!request.auth.user?.isPremium && isPremiumRoute(pathname)) {
    return NextResponse.redirect(new URL("/upgrade", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/courses/:path*"],
};
