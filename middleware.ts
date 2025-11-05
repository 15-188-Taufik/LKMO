import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/myreservation", "/checkout", "/admin"];

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const role = session?.user?.role;
  const { pathname } = request.nextUrl;

  // 1️⃣ Jika belum login dan akses route protected
  if (!isLoggedIn && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // 2️⃣ Jika login tapi bukan admin dan akses /admin
  if (isLoggedIn && role !== "admin" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3️⃣ Jika sudah login tapi mencoba buka /signin
  if (isLoggedIn && pathname.startsWith("/signin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Default: lanjutkan request
  return NextResponse.next();
}

export const config = {
  // Gunakan pola matcher yang benar untuk semua route kecuali API, _next, dan static files
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
