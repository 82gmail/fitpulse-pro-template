import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Busboy from 'busboy'
import fs from 'fs'
import path from 'path'

// ─── Upload plugin: saves files to public/images/ ───────────────────────────
function uploadPlugin() {
  return {
    name: 'image-upload-server',
    configureServer(server) {
      server.middlewares.use('/api/upload', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          return res.end('Method Not Allowed');
        }

        const uploadsDir = path.resolve(__dirname, 'public/images');
        if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

        const bb = Busboy({ headers: req.headers });
        let savedPath = null;

        bb.on('file', (fieldname, fileStream, info) => {
          // Sanitize filename: keep original name, strip unsafe chars
          const safeName = info.filename.replace(/[^a-zA-Z0-9._-]/g, '_');
          const destPath = path.join(uploadsDir, safeName);
          savedPath = `/images/${safeName}`;

          fileStream.pipe(fs.createWriteStream(destPath));
        });

        bb.on('finish', () => {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          if (savedPath) {
            res.end(JSON.stringify({ ok: true, path: savedPath }));
          } else {
            res.statusCode = 400;
            res.end(JSON.stringify({ ok: false, error: 'No file received' }));
          }
        });

        bb.on('error', (err) => {
          res.statusCode = 500;
          res.end(JSON.stringify({ ok: false, error: err.message }));
        });

        req.pipe(bb);
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    uploadPlugin(),
  ],
})
