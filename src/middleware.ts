import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getUserFromSession } from "./lib/auth"

const public_routes = [
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
]

export async function middleware(request: NextRequest) {
  const pathname = new URL(request.url).pathname
  const user = await getUserFromSession()
  console.info("\x1b[36m%s\x1b[0m", "Middleware")
  console.info("\x1b[36m%s %s\x1b[0m", request.method, pathname)
  console.info("\x1b[36m%s\x1b[0m", "User:", user?.username)

  if (!user && !public_routes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url).toString())
  } else if (user && public_routes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url).toString())
  } else {
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
