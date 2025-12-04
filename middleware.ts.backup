import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Sadece /admin ile başlayan route'ları kontrol et
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Login sayfasına gidiyorsa direkt geçir
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Admin auth kontrolü
  const authToken = request.cookies.get('admin-auth')?.value;

  if (authToken !== 'objektif-admin-2024') {
    // Auth yoksa login'e yönlendir
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // Auth varsa devam et
  return NextResponse.next();
}

// Sadece /admin route'larını yakala
export const config = {
  matcher: '/admin/:path*',
};
