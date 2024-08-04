



import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUserFromSession } from './lib/auth'



const public_routes = ['/login', '/signup', '/forgot-password', '/reset-password']

export function middleware(request: NextRequest) {
  const pathname = new URL(request.url).pathname
  const user = getUserFromSession()

  if (!user && !public_routes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url).toString())
  }

  return NextResponse.next()
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}