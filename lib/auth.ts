import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_TOKEN = 'objektif-admin-2024';
const COOKIE_NAME = 'admin-auth';

/**
 * Server-side authentication check
 * Returns true if authenticated, throws redirect if not
 */
export async function requireAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(COOKIE_NAME)?.value;

  if (authToken !== ADMIN_TOKEN) {
    redirect('/admin/login');
  }

  return true;
}

/**
 * Check if user is authenticated (without redirect)
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(COOKIE_NAME)?.value;
  return authToken === ADMIN_TOKEN;
}

/**
 * Verify login credentials
 */
export function verifyPassword(password: string): boolean {
  return password === 'objektif2024';
}

/**
 * Get admin token for cookie
 */
export function getAdminToken(): string {
  return ADMIN_TOKEN;
}

/**
 * Get cookie name
 */
export function getCookieName(): string {
  return COOKIE_NAME;
}
