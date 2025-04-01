import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

  // Allow Next.js static files & API routes
  const isStaticFile = req.nextUrl.pathname.startsWith("/_next");
  const isApiRoute = req.nextUrl.pathname.startsWith("/api");
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isMaintenancePage = req.nextUrl.pathname.startsWith("/maintenance");

  if (maintenanceMode && !isStaticFile && !isApiRoute && !isAdminRoute && !isMaintenancePage) {
    return NextResponse.redirect(new URL("/maintenance", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: "/:path*",
};
