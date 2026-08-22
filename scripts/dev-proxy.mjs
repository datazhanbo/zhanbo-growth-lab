// Local dev proxy: serves Hugo on :1313 and routes /api/* to Netlify functions.
// Usage: node scripts/dev-proxy.mjs (after `hugo server` is running)
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const HUGO = 'http://127.0.0.1:1313';
const PORT = 8888;
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FN_DIR = path.join(ROOT, 'netlify/functions');

const ROUTES = {
  '/api/checkup': 'checkup.js',
  '/api/submit-roas': 'submit-roas.js',
  '/api/benchmark-catalog': 'benchmark-catalog.js',
  '/api/benchmark-slice': 'benchmark-slice.js',
};

async function invokeFn(rel, req) {
  const mod = await import(path.join(FN_DIR, rel));
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const body = Buffer.concat(chunks).toString('utf8');
  const event = {
    httpMethod: req.method,
    path: req.url,
    headers: req.headers,
    body,
    rawUrl: req.url,
  };
  return mod.handler(event);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const fn = ROUTES[url.pathname];
  if (fn) {
    try {
      const out = await invokeFn(fn, req);
      res.writeHead(out.statusCode || 200, out.headers || {});
      res.end(out.body || '');
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'dev_fn_error', msg: String(e?.message || e) }));
    }
    return;
  }
  // Proxy the rest to hugo
  const target = new URL(req.url, HUGO);
  const upstream = await fetch(target, {
    method: req.method,
    headers: { ...req.headers, host: target.host },
    body: req.method === 'GET' || req.method === 'HEAD' ? undefined : await readBody(req),
    redirect: 'manual',
  }).catch(e => ({ error: e }));
  if (upstream.error) {
    res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('hugo server not reachable on :1313 — run `hugo server` first.\n' + upstream.error.message);
    return;
  }
  const headers = {};
  upstream.headers.forEach((v, k) => { headers[k] = v; });
  delete headers['content-encoding'];
  delete headers['transfer-encoding'];
  res.writeHead(upstream.status, headers);
  const buf = Buffer.from(await upstream.arrayBuffer());
  res.end(buf);
});

function readBody(req) {
  return new Promise((resolve) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
  });
}

server.listen(PORT, () => {
  console.log(`dev proxy: http://localhost:${PORT}  (hugo: ${HUGO})`);
});
