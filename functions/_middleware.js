// Cloudflare Pages middleware: asks for a username and password before serving
// anything. The credentials live in the Pages project's environment variables
// (BASIC_USER, BASIC_PASS), never in this public repository.
// If they are not set, the site stays locked.
const REALM = 'System Design study copy';

function same(a, b) {
  const x = new TextEncoder().encode(a);
  const y = new TextEncoder().encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

function deny(message) {
  return new Response(message, {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

export async function onRequest({ request, env, next }) {
  const user = env.BASIC_USER;
  const pass = env.BASIC_PASS;
  if (!user || !pass) return deny('Chưa đặt BASIC_USER / BASIC_PASS trong Cloudflare Pages.');

  const header = request.headers.get('Authorization') || '';
  const [scheme, encoded] = header.split(' ');
  if (scheme === 'Basic' && encoded) {
    let decoded = '';
    try {
      decoded = new TextDecoder().decode(Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0)));
    } catch {}
    const i = decoded.indexOf(':');
    if (i >= 0 && same(decoded.slice(0, i), user) & same(decoded.slice(i + 1), pass)) {
      const res = await next();
      const out = new Response(res.body, res);
      out.headers.set('X-Robots-Tag', 'noindex, nofollow');
      return out;
    }
  }
  return deny('Cần đăng nhập.');
}
