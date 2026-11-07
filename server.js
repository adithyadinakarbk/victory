/**
 * Zero-Dependency Cyber Local Server
 * Runs on Node.js to serve the static portfolio with proper MIME types.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const BASE_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.md': 'text/markdown; charset=utf-8'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/') reqUrl = '/index.html';

  let filePath = path.join(BASE_DIR, reqUrl);

  // Security check to prevent directory traversal
  if (!filePath.startsWith(BASE_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden // Access Denied');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      // Try appending .html
      if (!path.extname(filePath)) {
        filePath += '.html';
        return fs.stat(filePath, (err2, stats2) => {
          if (err2 || !stats2.isFile()) {
            return send404(res);
          }
          serveFile(filePath, res);
        });
      }
      return send404(res);
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    serveFile(filePath, res);
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff'
    });
    res.end(data);
  });
}

function send404(res) {
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <!DOCTYPE html>
    <html class="dark" lang="en">
    <head>
      <meta charset="utf-8"/>
      <title>404 // SIGNAL LOST</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-[#13131b] text-[#e4e1ed] font-mono flex items-center justify-center min-h-screen p-4">
      <div class="max-w-md p-6 bg-[#1b1b23] border border-[#39ff14]/40 rounded-xl shadow-2xl text-center flex flex-col gap-4">
        <div class="text-[#39ff14] text-5xl font-bold font-mono">404</div>
        <div class="text-lg font-bold">NODE NOT FOUND</div>
        <p class="text-sm text-[#baccb0]">The requested telemetry coordinate does not exist in this sector.</p>
        <a href="/" class="mt-2 px-4 py-2 bg-[#39ff14] text-[#053900] font-bold rounded hover:bg-[#79ff5b] transition-all">RETURN TO CORE</a>
      </div>
    </body>
    </html>
  `);
}

server.listen(PORT, () => {
  console.log(`[OBSIDIAN RADIUM] Tactical local node active on: http://localhost:${PORT}`);
  console.log(`Ready for developer verification and Incognito browser testing.`);
});
