import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Admin route'larını koru
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const authToken = request.cookies.get('admin-auth')?.value;

    // Login sayfasına gitmiyorsa ve auth token yoksa
    if (request.nextUrl.pathname !== '/admin/login' && authToken !== 'objektif-admin-2024') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin'],
};
