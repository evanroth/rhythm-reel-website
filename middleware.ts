import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow the coming-soon page and API unlock route through unconditionally
  if (
    pathname.startsWith('/coming-soon') ||
    pathname.startsWith('/api/unlock') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/logo') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  const hasAccess = request.cookies.get('rr-access')?.value === '1'
  if (!hasAccess) {
    return NextResponse.redirect(new URL('/coming-soon', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
