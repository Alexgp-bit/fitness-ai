import { requirePassword, setLoginCookie } from '@/lib/auth';

export async function POST(request: Request) {
  const { password } = await request.json();
  if (!requirePassword(password || '')) {
    return Response.json({ error: 'Contraseña incorrecta.' }, { status: 401 });
  }
  setLoginCookie();
  return Response.json({ ok: true });
}
