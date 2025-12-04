import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin route'larını koru
  if (pathname.startsWith('/admin')) {
    const authToken = request.cookies.get('admin-auth')?.value;

    // Login sayfasına gitmiyorsa ve auth token yoksa redirect et
    if (pathname !== '/admin/login' && authToken !== 'objektif-admin-2024') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

// Config - admin route'larını işle
export const config = {
  matcher: [
    '/admin',
    '/admin/:path*'
  ],
};
