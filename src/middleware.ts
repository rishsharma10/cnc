import { NextRequest, NextResponse } from "next/server";
import { COOKIES_USER_COPPER_CRUMB_ACCESS_TOKEN } from "./context/actionTypes";

export function middleware(req: NextRequest) {
  const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

  const pathname = req.nextUrl.pathname;

  const isStaticFile = pathname.startsWith("/_next");
  const isApiRoute = pathname.startsWith("/api");
  const isAdminRoute = pathname.startsWith("/admin");
  const isMaintenancePage = pathname.startsWith("/maintenance");
  const isLoginOrRegister = ["/login", "/signup"].includes(pathname);
  const isAccountRoute = pathname.startsWith("/account");

  const token = req.cookies.get(COOKIES_USER_COPPER_CRUMB_ACCESS_TOKEN)?.value;

  // 🔐 Redirect to login if user tries to access /account without a valid token
  if (!token && isAccountRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ⛔ Redirect to home if logged-in user tries to visit /login or /signup
  if (token && isLoginOrRegister) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🛠 Maintenance mode handling
  if (
    maintenanceMode &&
    !isStaticFile &&
    !isApiRoute &&
    !isAdminRoute &&
    !isMaintenancePage
  ) {
    return NextResponse.redirect(new URL("/maintenance", req.url));
  }

  return NextResponse.next();
}

// 📍 Apply middleware to all routes + account pages
export const config = {
  matcher: ["/:path*", "/account/:path*"],
};
