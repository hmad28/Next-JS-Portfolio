import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-super-secret-key-change-this-in-production"
);

async function verifyToken(token: string) {
  try {
    await jwtVerify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ambil token dari cookies
  const token = request.cookies.get("auth-token")?.value;

  // Cek apakah token valid
  const isAuthenticated = token ? await verifyToken(token) : false;

  // Jika user sudah login dan mencoba akses /dashboard/login
  if (isAuthenticated && pathname === "/dashboard/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Jika user belum login dan mencoba akses halaman dashboard (selain login)
  if (
    !isAuthenticated &&
    pathname.startsWith("/dashboard") &&
    pathname !== "/dashboard/login"
  ) {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
