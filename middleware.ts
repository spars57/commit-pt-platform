import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { isPremiumRoute } from "@/lib/premium-routes";

export default auth((request) => {
  const { pathname } = request.nextUrl;

  // Auth temporarily disabled for page navigation
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/courses/:path*"],
};
